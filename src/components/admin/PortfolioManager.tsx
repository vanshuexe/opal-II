import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  X,
  Upload,
  Image as ImageIcon,
  Link2,
  Star,
  RotateCcw,
  Check,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { Project } from '../../data/projectsData';
import {
  PROJECT_CATEGORIES,
  useProjects,
  saveProjects,
  resetProjects,
  uniqueSlug,
  compressImage,
  getProjectsStorageMB,
} from '../../data/projectsStore';

type ProjectDraft = Omit<Project, 'scope'> & { scopeText: string };

const emptyDraft = (): ProjectDraft => ({
  id: '',
  slug: '',
  title: '',
  subtitle: '',
  category: 'Residential',
  location: '',
  image: '',
  gallery: [],
  description: '',
  client: 'Private Residence',
  year: new Date().getFullYear().toString(),
  area: '',
  scopeText: '',
  hidden: false,
});

const toDraft = (p: Project): ProjectDraft => {
  const { scope, ...rest } = p;
  return { ...rest, gallery: [...p.gallery], scopeText: scope.join('\n') };
};

const inputClass =
  'w-full bg-[#0D1017] border border-white/15 focus:border-[#C99933] text-white text-xs rounded-lg px-3 py-2.5 outline-none';
const labelClass = 'block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium';

export const PortfolioManager: React.FC = () => {
  const projects = useProjects();
  const [draft, setDraft] = useState<ProjectDraft | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [coverUrlInput, setCoverUrlInput] = useState('');
  const [galleryUrlInput, setGalleryUrlInput] = useState('');
  const coverFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  const storageMB = getProjectsStorageMB();

  const flash = (msg: string) => {
    setSuccess(msg);
    setError('');
    setTimeout(() => setSuccess(''), 3500);
  };

  const persist = (list: Project[], msg: string): boolean => {
    const err = saveProjects(list);
    if (err) {
      setError(err);
      return false;
    }
    flash(msg);
    return true;
  };

  // Close the editor with Escape
  useEffect(() => {
    if (!draft) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeEditor();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [draft]);

  const openNew = () => {
    setDraft(emptyDraft());
    setIsNew(true);
    setFormError('');
    setCoverUrlInput('');
    setGalleryUrlInput('');
  };

  const openEdit = (p: Project) => {
    setDraft(toDraft(p));
    setIsNew(false);
    setFormError('');
    setCoverUrlInput('');
    setGalleryUrlInput('');
  };

  const closeEditor = () => {
    setDraft(null);
    setFormError('');
  };

  const update = (fields: Partial<ProjectDraft>) => setDraft((d) => (d ? { ...d, ...fields } : d));

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    setFormError('');
    try {
      update({ image: await compressImage(file) });
    } catch (err) {
      setFormError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    e.target.value = '';
    if (files.length === 0) return;
    setUploading(true);
    setFormError('');
    try {
      const images = await Promise.all(files.map((f) => compressImage(f)));
      setDraft((d) => (d ? { ...d, gallery: [...d.gallery, ...images] } : d));
    } catch (err) {
      setFormError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const addCoverUrl = () => {
    const url = coverUrlInput.trim();
    if (!/^https?:\/\//i.test(url)) {
      setFormError('Image link must start with http:// or https://');
      return;
    }
    update({ image: url });
    setCoverUrlInput('');
    setFormError('');
  };

  const addGalleryUrl = () => {
    const url = galleryUrlInput.trim();
    if (!/^https?:\/\//i.test(url)) {
      setFormError('Image link must start with http:// or https://');
      return;
    }
    setDraft((d) => (d ? { ...d, gallery: [...d.gallery, url] } : d));
    setGalleryUrlInput('');
    setFormError('');
  };

  const removeGalleryImage = (idx: number) =>
    setDraft((d) => (d ? { ...d, gallery: d.gallery.filter((_, i) => i !== idx) } : d));

  const moveGalleryImage = (idx: number, dir: -1 | 1) =>
    setDraft((d) => {
      if (!d) return d;
      const target = idx + dir;
      if (target < 0 || target >= d.gallery.length) return d;
      const gallery = [...d.gallery];
      [gallery[idx], gallery[target]] = [gallery[target], gallery[idx]];
      return { ...d, gallery };
    });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    if (!draft.title.trim()) {
      setFormError('Project title is required.');
      return;
    }
    if (!draft.image) {
      setFormError('Please add a cover image (upload a photo or paste an image link).');
      return;
    }

    const { scopeText, ...rest } = draft;
    const project: Project = {
      ...rest,
      title: draft.title.trim(),
      subtitle: draft.subtitle.trim(),
      location: draft.location.trim(),
      description: draft.description.trim(),
      client: draft.client.trim(),
      year: draft.year.trim(),
      area: draft.area.trim(),
      scope: scopeText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    let list: Project[];
    if (isNew) {
      project.id = `proj-${Date.now()}`;
      // New projects get a URL based on their title; existing ones keep theirs so shared links keep working
      project.slug = uniqueSlug(project.title, projects);
      list = [project, ...projects];
    } else {
      list = projects.map((p) => (p.id === project.id ? project : p));
    }

    if (persist(list, isNew ? `"${project.title}" added to the portfolio.` : `"${project.title}" updated.`)) {
      closeEditor();
    } else {
      setFormError('Storage is full. Remove some uploaded photos or use image links instead, then save again.');
    }
  };

  const handleDelete = (p: Project) => {
    if (!window.confirm(`Delete "${p.title}" from the portfolio? This cannot be undone.`)) return;
    persist(
      projects.filter((x) => x.id !== p.id),
      `"${p.title}" deleted.`
    );
  };

  const toggleHidden = (p: Project) => {
    persist(
      projects.map((x) => (x.id === p.id ? { ...x, hidden: !x.hidden } : x)),
      p.hidden ? `"${p.title}" is now visible on the website.` : `"${p.title}" is now hidden from the website.`
    );
  };

  const moveProject = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= projects.length) return;
    const list = [...projects];
    [list[idx], list[target]] = [list[target], list[idx]];
    persist(list, 'Project order updated.');
  };

  const handleReset = () => {
    if (!window.confirm('Reset the portfolio to the original projects? All edits, uploaded photos and added projects will be lost.')) return;
    resetProjects();
    flash('Portfolio reset to the original projects.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#151922] border border-white/10 rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-white">OPAL INTERIOR Portfolio</h3>
          <p className="text-xs text-slate-400">
            {projects.length} projects • {projects.filter((p) => !p.hidden).length} visible on website • First 6 appear on the
            Home &amp; Services pages
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Photo storage used: {storageMB.toFixed(1)} MB of ~5 MB</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={openNew}
            className="bg-[#C99933] hover:bg-[#b08328] text-white px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-lg transition-all"
          >
            <Plus size={16} />
            <span>Add New Project</span>
          </button>
          <button
            onClick={handleReset}
            className="bg-white/10 hover:bg-white/15 border border-white/20 text-slate-200 px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all"
            title="Restore the original portfolio"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
          <Link
            to="/work"
            target="_blank"
            className="bg-white/10 hover:bg-white/15 border border-white/20 text-slate-200 px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <span>View Public Work</span>
            <Link2 size={14} />
          </Link>
        </div>
      </div>

      {success && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-emerald-200 text-xs flex items-center gap-2">
          <Check size={16} />
          <span>{success}</span>
        </div>
      )}
      {error && (
        <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-red-200 text-xs flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className={`bg-[#151922] border rounded-xl overflow-hidden shadow-lg group flex flex-col ${
              proj.hidden ? 'border-white/5 opacity-60' : 'border-white/10'
            }`}
          >
            <div className="relative h-48 overflow-hidden bg-black">
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="bg-[#1A1612]/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-[#FFEFA2] border border-[#C99933]/40">
                  {proj.category}
                </span>
                {proj.hidden && (
                  <span className="bg-red-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-red-200 border border-red-500/40">
                    Hidden
                  </span>
                )}
              </div>
              <span className="absolute top-3 right-3 bg-black/70 text-white text-[10px] font-mono px-2 py-1 rounded">
                #{idx + 1}
              </span>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-[10px] text-[#C99933] uppercase tracking-widest font-semibold block mb-1 truncate">
                {proj.location || '—'}
              </span>
              <h4 className="text-base font-serif font-bold text-white mb-2">{proj.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2 flex-grow">{proj.description}</p>
              <div className="text-[10px] text-slate-500 mt-2">
                {proj.gallery.length} gallery photo{proj.gallery.length === 1 ? '' : 's'}
                {proj.area ? ` • ${proj.area}` : ''}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => openEdit(proj)}
                  className="bg-[#C99933]/20 hover:bg-[#C99933]/30 border border-[#C99933]/40 text-[#FFEFA2] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Pencil size={13} />
                  <span>Edit</span>
                </button>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveProject(idx, -1)}
                    disabled={idx === 0}
                    className="p-1.5 text-slate-300 hover:bg-white/10 rounded disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move earlier"
                  >
                    <ArrowUp size={15} />
                  </button>
                  <button
                    onClick={() => moveProject(idx, 1)}
                    disabled={idx === projects.length - 1}
                    className="p-1.5 text-slate-300 hover:bg-white/10 rounded disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move later"
                  >
                    <ArrowDown size={15} />
                  </button>
                  <button
                    onClick={() => toggleHidden(proj)}
                    className="p-1.5 text-slate-300 hover:bg-white/10 rounded"
                    title={proj.hidden ? 'Show on website' : 'Hide from website'}
                  >
                    {proj.hidden ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                  <Link
                    to={`/work/${proj.slug}`}
                    target="_blank"
                    className="p-1.5 text-slate-300 hover:bg-white/10 rounded"
                    title="Open project page"
                  >
                    <Link2 size={15} />
                  </Link>
                  <button
                    onClick={() => handleDelete(proj)}
                    className="p-1.5 text-red-400 hover:bg-red-950/40 rounded"
                    title="Delete project"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add card */}
        <button
          onClick={openNew}
          className="min-h-[300px] rounded-xl border-2 border-dashed border-[#C99933]/40 hover:border-[#C99933] hover:bg-[#C99933]/5 text-[#C99933] flex flex-col items-center justify-center gap-2 transition-colors"
        >
          <Plus size={28} />
          <span className="text-xs font-semibold uppercase tracking-wider">Add Custom Project</span>
        </button>
      </div>

      {/* ===================================== */}
      {/* EDITOR MODAL */}
      {/* ===================================== */}
      {draft && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4"
          onClick={closeEditor}
        >
          <div
            className="bg-[#151922] border border-[#C99933]/50 rounded-2xl max-w-3xl w-full shadow-2xl max-h-[96vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#C99933]">
                  {isNew ? 'New Portfolio Project' : `Editing /work/${draft.slug}`}
                </span>
                <h3 className="text-lg font-serif font-bold text-white">
                  {isNew ? 'Add Custom Project' : draft.title || 'Untitled Project'}
                </h3>
              </div>
              <button onClick={closeEditor} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col min-h-0 flex-grow">
              <div className="overflow-y-auto px-6 py-5 space-y-6">
                {/* Cover Image */}
                <div>
                  <span className={labelClass}>Cover Image *</span>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                    <div className="sm:col-span-2 h-40 rounded-xl overflow-hidden bg-[#0D1017] border border-white/10 flex items-center justify-center">
                      {draft.image ? (
                        <img src={draft.image} alt="Cover preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-slate-500 text-xs flex flex-col items-center gap-1">
                          <ImageIcon size={24} />
                          <span>No cover image</span>
                        </div>
                      )}
                    </div>
                    <div className="sm:col-span-3 flex flex-col gap-3 justify-center">
                      <button
                        type="button"
                        onClick={() => coverFileRef.current?.click()}
                        disabled={uploading}
                        className="bg-[#C99933] hover:bg-[#b08328] disabled:opacity-60 text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
                      >
                        {uploading ? <RefreshCw size={14} className="animate-spin" /> : <Upload size={14} />}
                        <span>{draft.image ? 'Replace with Photo from Device' : 'Upload Photo from Device'}</span>
                      </button>
                      <input ref={coverFileRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={coverUrlInput}
                          onChange={(e) => setCoverUrlInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addCoverUrl();
                            }
                          }}
                          placeholder="…or paste an image link (https://…)"
                          className={inputClass}
                        />
                        <button
                          type="button"
                          onClick={addCoverUrl}
                          className="bg-white/10 hover:bg-white/20 text-white px-3 py-2.5 rounded-lg text-xs font-semibold shrink-0"
                        >
                          Use
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Project Title *</label>
                    <input
                      type="text"
                      value={draft.title}
                      onChange={(e) => update({ title: e.target.value })}
                      placeholder="e.g. The Worli Sky Penthouse"
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Subtitle</label>
                    <input
                      type="text"
                      value={draft.subtitle}
                      onChange={(e) => update({ subtitle: e.target.value })}
                      placeholder="e.g. Refined Contemporary Duplex Residence"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Category</label>
                    <select
                      value={draft.category}
                      onChange={(e) => update({ category: e.target.value as Project['category'] })}
                      className={inputClass}
                    >
                      {PROJECT_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Location</label>
                    <input
                      type="text"
                      value={draft.location}
                      onChange={(e) => update({ location: e.target.value })}
                      placeholder="e.g. Worli Sea Face, Mumbai"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Client</label>
                    <input
                      type="text"
                      value={draft.client}
                      onChange={(e) => update({ client: e.target.value })}
                      placeholder="e.g. Private Residence"
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Year</label>
                      <input
                        type="text"
                        value={draft.year}
                        onChange={(e) => update({ year: e.target.value })}
                        placeholder="2026"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Area</label>
                      <input
                        type="text"
                        value={draft.area}
                        onChange={(e) => update({ area: e.target.value })}
                        placeholder="3,800 sq.ft."
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Description</label>
                    <textarea
                      rows={5}
                      value={draft.description}
                      onChange={(e) => update({ description: e.target.value })}
                      placeholder="Describe the project, materials, design approach…"
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Scope of Work (one item per line)</label>
                    <textarea
                      rows={4}
                      value={draft.scopeText}
                      onChange={(e) => update({ scopeText: e.target.value })}
                      placeholder={'Concept & Preliminary Design\nCustom Joinery & Wardrobes\nOn-Site Supervision'}
                      className={inputClass}
                    />
                  </div>
                  <label className="sm:col-span-2 flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!draft.hidden}
                      onChange={(e) => update({ hidden: e.target.checked })}
                      className="accent-[#C99933]"
                    />
                    <span>Hide this project from the public website</span>
                  </label>
                </div>

                {/* Gallery */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={labelClass}>Photo Gallery ({draft.gallery.length})</span>
                    <button
                      type="button"
                      onClick={() => galleryFileRef.current?.click()}
                      disabled={uploading}
                      className="bg-white/10 hover:bg-white/20 disabled:opacity-60 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                    >
                      {uploading ? <RefreshCw size={13} className="animate-spin" /> : <Upload size={13} />}
                      <span>Upload Photos</span>
                    </button>
                    <input
                      ref={galleryFileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      className="hidden"
                    />
                  </div>

                  {draft.gallery.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {draft.gallery.map((src, idx) => (
                        <div key={`${idx}-${src.slice(-24)}`} className="relative h-28 rounded-lg overflow-hidden border border-white/10 group">
                          <img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                          {draft.image === src && (
                            <span className="absolute top-1.5 left-1.5 bg-[#C99933] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                              COVER
                            </span>
                          )}
                          <div className="absolute inset-x-0 bottom-0 bg-black/75 flex items-center justify-between px-1 py-1">
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => moveGalleryImage(idx, -1)}
                                disabled={idx === 0}
                                className="p-1 text-white hover:text-[#FFEFA2] disabled:opacity-30"
                                title="Move left"
                              >
                                <ArrowUp size={12} className="-rotate-90" />
                              </button>
                              <button
                                type="button"
                                onClick={() => moveGalleryImage(idx, 1)}
                                disabled={idx === draft.gallery.length - 1}
                                className="p-1 text-white hover:text-[#FFEFA2] disabled:opacity-30"
                                title="Move right"
                              >
                                <ArrowDown size={12} className="-rotate-90" />
                              </button>
                            </div>
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => update({ image: src })}
                                className="p-1 text-white hover:text-[#FFEFA2]"
                                title="Use as cover image"
                              >
                                <Star size={12} />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeGalleryImage(idx)}
                                className="p-1 text-red-300 hover:text-red-400"
                                title="Remove photo"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 bg-[#0D1017] border border-dashed border-white/15 rounded-lg p-4 text-center">
                      No gallery photos yet. Upload photos or add image links below.
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="url"
                      value={galleryUrlInput}
                      onChange={(e) => setGalleryUrlInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addGalleryUrl();
                        }
                      }}
                      placeholder="Add gallery photo by link (https://…)"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={addGalleryUrl}
                      className="bg-white/10 hover:bg-white/20 text-white px-3 py-2.5 rounded-lg text-xs font-semibold shrink-0"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-white/10 shrink-0 space-y-3">
                {formError && (
                  <div className="p-2.5 bg-red-950/60 border border-red-500/50 rounded-lg text-red-200 text-xs flex items-center gap-2">
                    <AlertTriangle size={14} className="text-red-400 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeEditor}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/15 rounded-lg text-slate-300 text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-5 py-2.5 bg-[#C99933] hover:bg-[#b08328] disabled:opacity-60 text-white text-xs font-semibold rounded-lg shadow-md"
                  >
                    {isNew ? 'Add Project' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
