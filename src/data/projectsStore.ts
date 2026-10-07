import { useEffect, useState } from 'react';
import { Project, PROJECTS_DATA } from './projectsData';

const STORAGE_KEY = 'opal_portfolio_projects';
const UPDATE_EVENT = 'opal-projects-updated';

export const PROJECT_CATEGORIES: Project['category'][] = ['Residential', 'Commercial', 'Bespoke'];

export const getProjects = (): Project[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return PROJECTS_DATA;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : PROJECTS_DATA;
  } catch {
    return PROJECTS_DATA;
  }
};

// Persists the full list; returns an error message when the browser storage quota is exceeded
export const saveProjects = (projects: Project[]): string | null => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event(UPDATE_EVENT));
    return null;
  } catch {
    return 'Storage is full. Remove some uploaded photos or use image URLs instead, then try again.';
  }
};

export const resetProjects = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(UPDATE_EVENT));
};

// Approximate space used by the portfolio in browser storage (in MB)
export const getProjectsStorageMB = (): number => {
  const raw = localStorage.getItem(STORAGE_KEY) || '';
  return (raw.length * 2) / (1024 * 1024);
};

export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'project';

export const uniqueSlug = (title: string, projects: Project[], ownId?: string): string => {
  const base = slugify(title);
  let slug = base;
  let n = 2;
  while (projects.some((p) => p.slug === slug && p.id !== ownId)) {
    slug = `${base}-${n++}`;
  }
  return slug;
};

// Live portfolio list that updates when the admin panel (this tab or another) saves changes
export const useProjects = (): Project[] => {
  const [projects, setProjects] = useState<Project[]>(getProjects);

  useEffect(() => {
    const refresh = () => setProjects(getProjects());
    const handleStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === STORAGE_KEY) refresh();
    };
    window.addEventListener(UPDATE_EVENT, refresh);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener(UPDATE_EVENT, refresh);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return projects;
};

// Projects shown on the public website (hidden ones stay in the admin panel only)
export const usePublicProjects = (): Project[] => useProjects().filter((p) => !p.hidden);

// Resizes and compresses an uploaded photo so it fits in browser storage
export const compressImage = (file: File, maxSize = 1400, quality = 0.78): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please choose an image file (JPG, PNG or WebP).'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the image file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('This image could not be opened.'));
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Image processing is not supported in this browser.'));
          return;
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
