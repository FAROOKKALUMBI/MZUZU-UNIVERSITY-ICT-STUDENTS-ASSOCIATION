import React, { useState, useMemo } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  RefreshCw,
  CheckCircle,
  Newspaper,
  BookOpen,
  Users,
  Shield,
  LogOut,
  KeyRound,
  Clock,
  ShieldCheck,
  Search,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import { UpdateItem, ResourceItem, ExecutiveMember } from '../types';
import { Button } from '../components/common/Button';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminSecurityModal } from '../components/admin/AdminSecurityModal';

export const AdminPage: React.FC = () => {
  const {
    isAuthenticated,
    currentAdmin,
    sessionTimeRemaining,
    logout,
  } = useAuth();

  const {
    updates,
    resources,
    executives,
    addUpdate,
    editUpdate,
    deleteUpdate,
    addResource,
    editResource,
    deleteResource,
    addExecutive,
    editExecutive,
    deleteExecutive,
    resetToDefaults,
  } = useContent();

  const [activeTab, setActiveTab] = useState<'updates' | 'resources' | 'executives'>('updates');
  const [editingUpdate, setEditingUpdate] = useState<UpdateItem | null>(null);
  const [isCreatingUpdate, setIsCreatingUpdate] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  // If not authenticated, render the secure login portal
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // New Update Form State
  const [newUpdateForm, setNewUpdateForm] = useState({
    title: '',
    category: 'Innovation',
    relativeTime: 'Just Now',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: '3 min read',
    author: 'MUISA Admin',
    summary: '',
    content: '',
    thumbnail: '/images/who-are-we.jpg',
  });

  // Resource State
  const [resourceSearch, setResourceSearch] = useState('');
  const [resourceYearFilter, setResourceYearFilter] = useState('all');
  const [resourceCategoryFilter, setResourceCategoryFilter] = useState('all');
  const [resourcePage, setResourcePage] = useState(1);
  const RESOURCES_PER_PAGE = 25;

  const [isCreatingResource, setIsCreatingResource] = useState(false);
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);
  const [newResourceForm, setNewResourceForm] = useState<Omit<ResourceItem, 'id'>>({
    title: '',
    category: 'past-papers',
    year: 'Year 1',
    semester: 'Semester 1',
    courseCode: 'BICT 1101',
    courseName: '',
    fileSize: '1.5 MB',
    fileType: 'PDF',
    downloadUrl: '',
    description: '',
  });

  // Executive State
  const [isCreatingExec, setIsCreatingExec] = useState(false);
  const [editingExec, setEditingExec] = useState<ExecutiveMember | null>(null);
  const [newExecForm, setNewExecForm] = useState<Omit<ExecutiveMember, 'id'>>({
    name: '',
    role: '',
    department: 'Department of ICT',
    yearOfStudy: 'Level 3',
    email: '',
    phone: '',
    image: '/images/who-are-we.jpg',
    bio: '',
    socials: {
      linkedin: '',
      twitter: '',
      github: '',
    },
  });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Updates Handlers
  const handleCreateUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    addUpdate(newUpdateForm);
    setIsCreatingUpdate(false);
    setNewUpdateForm({
      title: '',
      category: 'Innovation',
      relativeTime: 'Just Now',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '3 min read',
      author: 'MUISA Admin',
      summary: '',
      content: '',
      thumbnail: '/images/who-are-we.jpg',
    });
    showNotification('New announcement posted successfully!');
  };

  const handleSaveEditUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUpdate) return;
    editUpdate(editingUpdate.id, editingUpdate);
    setEditingUpdate(null);
    showNotification('Update modified successfully!');
  };

  // Resources Handlers & Filtering
  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const q = resourceSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        res.title.toLowerCase().includes(q) ||
        (res.courseCode && res.courseCode.toLowerCase().includes(q)) ||
        (res.fileName && res.fileName.toLowerCase().includes(q));

      const matchesYear =
        resourceYearFilter === 'all' ||
        res.year.toLowerCase() === resourceYearFilter.toLowerCase();

      const matchesCategory =
        resourceCategoryFilter === 'all' ||
        res.category.toLowerCase() === resourceCategoryFilter.toLowerCase();

      return matchesSearch && matchesYear && matchesCategory;
    });
  }, [resources, resourceSearch, resourceYearFilter, resourceCategoryFilter]);

  const totalResourcePages = Math.ceil(filteredResources.length / RESOURCES_PER_PAGE) || 1;
  const paginatedResources = useMemo(() => {
    const start = (resourcePage - 1) * RESOURCES_PER_PAGE;
    return filteredResources.slice(start, start + RESOURCES_PER_PAGE);
  }, [filteredResources, resourcePage]);

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    addResource({
      ...newResourceForm,
      downloadUrl: newResourceForm.downloadUrl || '#',
      fileName: newResourceForm.fileName || `${newResourceForm.title}.${newResourceForm.fileType.toLowerCase()}`,
    });
    setIsCreatingResource(false);
    setNewResourceForm({
      title: '',
      category: 'past-papers',
      year: 'Year 1',
      semester: 'Semester 1',
      courseCode: 'BICT 1101',
      courseName: '',
      fileSize: '1.5 MB',
      fileType: 'PDF',
      downloadUrl: '',
      description: '',
    });
    showNotification('Academic resource published successfully!');
  };

  const handleSaveEditResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResource) return;
    editResource(editingResource.id, editingResource);
    setEditingResource(null);
    showNotification('Academic resource updated successfully!');
  };

  // Executive Handlers
  const handleCreateExecutive = (e: React.FormEvent) => {
    e.preventDefault();
    addExecutive(newExecForm);
    setIsCreatingExec(false);
    setNewExecForm({
      name: '',
      role: '',
      department: 'Department of ICT',
      yearOfStudy: 'Level 3',
      email: '',
      phone: '',
      image: '/images/who-are-we.jpg',
      bio: '',
      socials: {
        linkedin: '',
        twitter: '',
        github: '',
      },
    });
    showNotification('New executive leader added to board!');
  };

  const handleSaveExecutive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExec) return;
    editExecutive(editingExec.id, editingExec);
    setEditingExec(null);
    showNotification('Executive details updated!');
  };

  const handleDeleteExecutive = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from the executive board?`)) {
      deleteExecutive(id);
      showNotification(`${name} removed from executive board.`);
    }
  };

  const formatSessionTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Top Session Security Banner */}
        <div className="bg-[#155429] text-white px-4 py-2.5 rounded-xl shadow-sm mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="font-semibold text-green-100">
              Authenticated Admin:{' '}
              <strong className="text-white">{currentAdmin?.username}</strong>{' '}
              ({currentAdmin?.email})
            </span>
          </div>
          <div className="flex items-center gap-4 text-green-200 text-[11px]">
            <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-full">
              <Clock size={12} className="text-[#F5B83D]" />
              <span>Auto-lock in {formatSessionTime(sessionTimeRemaining)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-green-300" />
              <span>PBKDF2 Protected</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#1B6B35] text-white flex items-center justify-center font-bold">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                MUISA Admin Content Studio
              </h1>
              <p className="text-xs text-gray-500">
                Live content management for Top News, Academic Archives, and Executive Team
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setIsSecurityModalOpen(true)}
              className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-gray-900 font-bold px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 transition shadow-sm"
            >
              <KeyRound size={14} className="text-[#1B6B35]" />
              <span>Security & Passwords</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Reset all website content back to initial default data?')) {
                  resetToDefaults();
                  showNotification('Content reset to original defaults');
                }
              }}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-700 font-semibold px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-red-50 transition"
              title="Reset sample content data"
            >
              <RefreshCw size={13} />
              <span>Reset Content</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to end your administrative session?')) {
                  logout();
                }
              }}
              className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-bold px-3 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition shadow-sm"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {notification && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 text-[#1B6B35] rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle size={18} />
            <span>{notification}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-gray-200 mb-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('updates')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'updates'
                ? 'border-[#1B6B35] text-[#1B6B35]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Newspaper size={16} />
            <span>Events & News ({updates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'resources'
                ? 'border-[#1B6B35] text-[#1B6B35]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <BookOpen size={16} />
            <span>Academic Vault ({resources.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('executives')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'executives'
                ? 'border-[#1B6B35] text-[#1B6B35]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Users size={16} />
            <span>Executive Board ({executives.length})</span>
          </button>
        </div>

        {/* TAB 1: UPDATES & TOP EVENTS */}
        {activeTab === 'updates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Manage Published News & Stories</h2>
              <Button
                onClick={() => setIsCreatingUpdate(true)}
                variant="gold-filled"
                size="sm"
                className="text-xs"
              >
                <Plus size={14} className="mr-1 inline" />
                Post New Event / News
              </Button>
            </div>

            {/* Create New Story Modal / Form */}
            {isCreatingUpdate && (
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900">Publish New Story</h3>
                  <button onClick={() => setIsCreatingUpdate(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleCreateUpdate} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Headline Title *</label>
                      <input
                        type="text"
                        required
                        value={newUpdateForm.title}
                        onChange={(e) => setNewUpdateForm({ ...newUpdateForm, title: e.target.value })}
                        placeholder="e.g. MUISA Hosts 2026 Northern Region Hackathon"
                        className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-[#1B6B35]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Category</label>
                      <select
                        value={newUpdateForm.category}
                        onChange={(e) => setNewUpdateForm({ ...newUpdateForm, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-[#1B6B35]"
                      >
                        <option value="Innovation">Innovation</option>
                        <option value="Projects">Projects</option>
                        <option value="Training">Training</option>
                        <option value="Entrepreneurship">Entrepreneurship</option>
                        <option value="Academic">Academic</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Relative Time Label</label>
                      <input
                        type="text"
                        value={newUpdateForm.relativeTime}
                        onChange={(e) => setNewUpdateForm({ ...newUpdateForm, relativeTime: e.target.value })}
                        placeholder="e.g. 10 Mins Ago / 1 Hour Ago"
                        className="w-full px-3 py-2 border border-gray-200 rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Date</label>
                      <input
                        type="text"
                        value={newUpdateForm.date}
                        onChange={(e) => setNewUpdateForm({ ...newUpdateForm, date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Thumbnail Path or URL</label>
                      <input
                        type="text"
                        value={newUpdateForm.thumbnail}
                        onChange={(e) => setNewUpdateForm({ ...newUpdateForm, thumbnail: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Short Summary (Preview)</label>
                    <textarea
                      rows={2}
                      required
                      value={newUpdateForm.summary}
                      onChange={(e) => setNewUpdateForm({ ...newUpdateForm, summary: e.target.value })}
                      placeholder="Brief 1-2 sentence overview..."
                      className="w-full px-3 py-2 border border-gray-200 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Full Article Body</label>
                    <textarea
                      rows={4}
                      required
                      value={newUpdateForm.content}
                      onChange={(e) => setNewUpdateForm({ ...newUpdateForm, content: e.target.value })}
                      placeholder="Full details of the announcement..."
                      className="w-full px-3 py-2 border border-gray-200 rounded"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingUpdate(false)}
                      className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded font-bold"
                    >
                      Cancel
                    </button>
                    <Button type="submit" variant="green-filled" size="sm">
                      Publish to Live Site
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* List of Published Updates */}
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-xs">
              {updates.map((item) => (
                <div key={item.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-14 h-14 rounded object-cover shrink-0 bg-gray-100"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1B6B35] bg-green-50 px-2 py-0.5 rounded">
                          {item.number} • {item.category}
                        </span>
                        <span className="text-[11px] text-gray-400">{item.relativeTime}</span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 truncate mt-1">{item.title}</h4>
                      <p className="text-xs text-gray-500 truncate">{item.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setEditingUpdate(item)}
                      className="p-2 text-gray-500 hover:text-[#1B6B35] hover:bg-gray-100 rounded transition"
                      title="Edit update"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${item.title}"?`)) {
                          deleteUpdate(item.id);
                          showNotification('Story removed.');
                        }
                      }}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition"
                      title="Delete update"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Update Modal */}
        {editingUpdate && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-bold text-gray-900">Edit Story: {editingUpdate.title}</h3>
                <button onClick={() => setEditingUpdate(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleSaveEditUpdate} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Headline</label>
                    <input
                      type="text"
                      value={editingUpdate.title}
                      onChange={(e) => setEditingUpdate({ ...editingUpdate, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Category</label>
                    <select
                      value={editingUpdate.category}
                      onChange={(e) => setEditingUpdate({ ...editingUpdate, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option value="Innovation">Innovation</option>
                      <option value="Projects">Projects</option>
                      <option value="Training">Training</option>
                      <option value="Entrepreneurship">Entrepreneurship</option>
                      <option value="Academic">Academic</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Date</label>
                    <input
                      type="text"
                      value={editingUpdate.date}
                      onChange={(e) => setEditingUpdate({ ...editingUpdate, date: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Read Time</label>
                    <input
                      type="text"
                      value={editingUpdate.readTime}
                      onChange={(e) => setEditingUpdate({ ...editingUpdate, readTime: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Relative Time</label>
                    <input
                      type="text"
                      value={editingUpdate.relativeTime}
                      onChange={(e) => setEditingUpdate({ ...editingUpdate, relativeTime: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Thumbnail Path or URL</label>
                  <input
                    type="text"
                    value={editingUpdate.thumbnail}
                    onChange={(e) => setEditingUpdate({ ...editingUpdate, thumbnail: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Summary</label>
                  <textarea
                    rows={2}
                    value={editingUpdate.summary}
                    onChange={(e) => setEditingUpdate({ ...editingUpdate, summary: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Content</label>
                  <textarea
                    rows={4}
                    value={editingUpdate.content}
                    onChange={(e) => setEditingUpdate({ ...editingUpdate, content: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingUpdate(null)}
                    className="px-3 py-1.5 text-gray-600 bg-gray-100 rounded font-bold"
                  >
                    Cancel
                  </button>
                  <Button type="submit" variant="green-filled" size="sm">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: ACADEMIC RESOURCES */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-gray-900">Academic Files & Examination Archive</h2>
                <p className="text-xs text-gray-500">
                  Showing {filteredResources.length.toLocaleString()} matching documents across all academic levels
                </p>
              </div>
              <Button onClick={() => setIsCreatingResource(true)} variant="gold-filled" size="sm">
                <Plus size={14} className="mr-1 inline" />
                Upload New Resource
              </Button>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
              <div className="relative w-full md:w-80">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources by title, code, file name..."
                  value={resourceSearch}
                  onChange={(e) => {
                    setResourceSearch(e.target.value);
                    setResourcePage(1);
                  }}
                  className="w-full pl-9 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
                />
                {resourceSearch && (
                  <button
                    onClick={() => setResourceSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <select
                  value={resourceYearFilter}
                  onChange={(e) => {
                    setResourceYearFilter(e.target.value);
                    setResourcePage(1);
                  }}
                  className="px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
                >
                  <option value="all">All Levels / Years</option>
                  <option value="Year 1">Year 1 (Level 1)</option>
                  <option value="Year 2">Year 2 (Level 2)</option>
                  <option value="Year 3">Year 3 (Level 3)</option>
                  <option value="Year 4">Year 4 (Level 4)</option>
                </select>

                <select
                  value={resourceCategoryFilter}
                  onChange={(e) => {
                    setResourceCategoryFilter(e.target.value);
                    setResourcePage(1);
                  }}
                  className="px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
                >
                  <option value="all">All Categories</option>
                  <option value="past-papers">Past Papers</option>
                  <option value="notes">Notes / Lectures</option>
                  <option value="lecture-notes">Lecture Notes</option>
                  <option value="books">Books & E-books</option>
                  <option value="course-outlines">Course Outlines</option>
                  <option value="tutorials">Tutorials & Labs</option>
                </select>

                {(resourceSearch || resourceYearFilter !== 'all' || resourceCategoryFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setResourceSearch('');
                      setResourceYearFilter('all');
                      setResourceCategoryFilter('all');
                      setResourcePage(1);
                    }}
                    className="text-xs text-red-600 hover:underline px-2 py-1 font-semibold"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* Upload New Resource Modal */}
            {isCreatingResource && (
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900">Add Academic File to Vault</h3>
                  <button onClick={() => setIsCreatingResource(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={18} />
                  </button>
                </div>
                <form onSubmit={handleCreateResource} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Document Title *</label>
                      <input
                        type="text"
                        required
                        value={newResourceForm.title}
                        onChange={(e) => setNewResourceForm({ ...newResourceForm, title: e.target.value })}
                        placeholder="e.g. Software Engineering End of Semester Exam 2025"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Course Code *</label>
                      <input
                        type="text"
                        required
                        value={newResourceForm.courseCode}
                        onChange={(e) => setNewResourceForm({ ...newResourceForm, courseCode: e.target.value })}
                        placeholder="e.g. BICT 1101, ICT 3102"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Category</label>
                      <select
                        value={newResourceForm.category}
                        onChange={(e) =>
                          setNewResourceForm({
                            ...newResourceForm,
                            category: e.target.value as ResourceItem['category'],
                          })
                        }
                        className="w-full px-3 py-2 border rounded"
                      >
                        <option value="past-papers">Past Papers</option>
                        <option value="notes">Lecture Notes</option>
                        <option value="books">Books</option>
                        <option value="course-outlines">Course Outlines</option>
                        <option value="tutorials">Tutorials & Labs</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Academic Year</label>
                      <select
                        value={newResourceForm.year}
                        onChange={(e) => setNewResourceForm({ ...newResourceForm, year: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                      >
                        <option value="Year 1">Year 1</option>
                        <option value="Year 2">Year 2</option>
                        <option value="Year 3">Year 3</option>
                        <option value="Year 4">Year 4</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Semester</label>
                      <select
                        value={newResourceForm.semester}
                        onChange={(e) => setNewResourceForm({ ...newResourceForm, semester: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                      >
                        <option value="Semester 1">Semester 1</option>
                        <option value="Semester 2">Semester 2</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Format & Size</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="PDF"
                          value={newResourceForm.fileType}
                          onChange={(e) => setNewResourceForm({ ...newResourceForm, fileType: e.target.value.toUpperCase() })}
                          className="w-1/2 px-2 py-2 border rounded uppercase"
                        />
                        <input
                          type="text"
                          placeholder="2.5 MB"
                          value={newResourceForm.fileSize}
                          onChange={(e) => setNewResourceForm({ ...newResourceForm, fileSize: e.target.value })}
                          className="w-1/2 px-2 py-2 border rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Download URL or Storage Path</label>
                    <input
                      type="text"
                      value={newResourceForm.downloadUrl}
                      onChange={(e) => setNewResourceForm({ ...newResourceForm, downloadUrl: e.target.value })}
                      placeholder="e.g. /RESOURCES/LEVEL 1/SEMESTER ONE/..."
                      className="w-full px-3 py-2 border rounded font-mono text-[11px]"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingResource(false)}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded font-bold"
                    >
                      Cancel
                    </button>
                    <Button type="submit" variant="green-filled" size="sm">
                      Publish Resource
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* List of Resources (Paginated) */}
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-xs">
              {filteredResources.length === 0 ? (
                <div className="p-12 text-center text-xs text-gray-500">
                  No academic resources match your filter criteria.
                </div>
              ) : (
                paginatedResources.map((res) => (
                  <div key={res.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/60 transition">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-bold text-[#1B6B35] bg-green-50 border border-green-100 px-2 py-0.5 rounded">
                          {res.courseCode || 'GEN'} • {res.category}
                        </span>
                        <span className="text-[10px] bg-gray-100 text-gray-700 font-semibold px-2 py-0.5 rounded">
                          {res.year}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {res.semester}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 truncate">{res.title}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                        <span>{res.fileType} • {res.fileSize}</span>
                        {res.fileName && <span className="text-gray-400 font-mono text-[11px]">({res.fileName})</span>}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {res.downloadUrl && res.downloadUrl !== '#' && (
                        <a
                          href={res.downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-gray-500 hover:text-[#1B6B35] hover:bg-gray-100 rounded transition"
                          title="Open resource"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                      <button
                        onClick={() => setEditingResource(res)}
                        className="p-2 text-gray-500 hover:text-[#1B6B35] hover:bg-gray-100 rounded transition"
                        title="Edit resource"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove "${res.title}" from the academic vault?`)) {
                            deleteResource(res.id);
                            showNotification('Resource deleted.');
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                        title="Delete resource"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination Controls */}
            {totalResourcePages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 text-xs text-gray-600 shadow-2xs">
                <div>
                  Showing{' '}
                  <strong className="text-gray-900">
                    {((resourcePage - 1) * RESOURCES_PER_PAGE + 1).toLocaleString()}
                  </strong>{' '}
                  to{' '}
                  <strong className="text-gray-900">
                    {Math.min(resourcePage * RESOURCES_PER_PAGE, filteredResources.length).toLocaleString()}
                  </strong>{' '}
                  of{' '}
                  <strong className="text-gray-900">
                    {filteredResources.length.toLocaleString()}
                  </strong>{' '}
                  documents
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setResourcePage((p) => Math.max(1, p - 1))}
                    disabled={resourcePage === 1}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1 font-semibold"
                  >
                    <ChevronLeft size={14} />
                    <span>Previous</span>
                  </button>

                  <span className="px-3 py-1.5 font-bold text-gray-900 bg-gray-100 rounded-lg">
                    {resourcePage} / {totalResourcePages}
                  </span>

                  <button
                    onClick={() => setResourcePage((p) => Math.min(totalResourcePages, p + 1))}
                    disabled={resourcePage === totalResourcePages}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1 font-semibold"
                  >
                    <span>Next</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Edit Resource Modal */}
        {editingResource && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-bold text-gray-900">Edit Academic Resource</h3>
                <button onClick={() => setEditingResource(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveEditResource} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Document Title *</label>
                  <input
                    type="text"
                    required
                    value={editingResource.title}
                    onChange={(e) => setEditingResource({ ...editingResource, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Course Code</label>
                    <input
                      type="text"
                      value={editingResource.courseCode || ''}
                      onChange={(e) => setEditingResource({ ...editingResource, courseCode: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Category</label>
                    <select
                      value={editingResource.category}
                      onChange={(e) =>
                        setEditingResource({
                          ...editingResource,
                          category: e.target.value as ResourceItem['category'],
                        })
                      }
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option value="past-papers">Past Papers</option>
                      <option value="notes">Notes</option>
                      <option value="lecture-notes">Lecture Notes</option>
                      <option value="books">Books</option>
                      <option value="course-outlines">Course Outlines</option>
                      <option value="tutorials">Tutorials</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Year</label>
                    <input
                      type="text"
                      value={editingResource.year}
                      onChange={(e) => setEditingResource({ ...editingResource, year: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Semester</label>
                    <input
                      type="text"
                      value={editingResource.semester}
                      onChange={(e) => setEditingResource({ ...editingResource, semester: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">File Size</label>
                    <input
                      type="text"
                      value={editingResource.fileSize}
                      onChange={(e) => setEditingResource({ ...editingResource, fileSize: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Download URL / Path</label>
                  <input
                    type="text"
                    value={editingResource.downloadUrl}
                    onChange={(e) => setEditingResource({ ...editingResource, downloadUrl: e.target.value })}
                    className="w-full px-3 py-2 border rounded font-mono text-[11px]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingResource(null)}
                    className="px-3 py-1.5 text-gray-600 bg-gray-100 rounded font-bold"
                  >
                    Cancel
                  </button>
                  <Button type="submit" variant="green-filled" size="sm">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: EXECUTIVES */}
        {activeTab === 'executives' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900">Executive Profiles & Leadership Information</h2>
                <p className="text-xs text-gray-500">Manage association directors, executive portfolios, and contact records</p>
              </div>
              <Button onClick={() => setIsCreatingExec(true)} variant="gold-filled" size="sm">
                <Plus size={14} className="mr-1 inline" />
                Add Executive Member
              </Button>
            </div>

            {/* Create Executive Modal */}
            {isCreatingExec && (
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900">Add New Executive Leader</h3>
                  <button onClick={() => setIsCreatingExec(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={18} />
                  </button>
                </div>
                <form onSubmit={handleCreateExecutive} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={newExecForm.name}
                        onChange={(e) => setNewExecForm({ ...newExecForm, name: e.target.value })}
                        placeholder="e.g. John Banda"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Portfolio / Role *</label>
                      <input
                        type="text"
                        required
                        value={newExecForm.role}
                        onChange={(e) => setNewExecForm({ ...newExecForm, role: e.target.value })}
                        placeholder="e.g. President / Director of Innovation"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        value={newExecForm.department}
                        onChange={(e) => setNewExecForm({ ...newExecForm, department: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Year of Study</label>
                      <input
                        type="text"
                        value={newExecForm.yearOfStudy}
                        onChange={(e) => setNewExecForm({ ...newExecForm, yearOfStudy: e.target.value })}
                        placeholder="e.g. Level 3 / Year 3"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Official Email *</label>
                      <input
                        type="email"
                        required
                        value={newExecForm.email}
                        onChange={(e) => setNewExecForm({ ...newExecForm, email: e.target.value })}
                        placeholder="e.g. president@muisa.org"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={newExecForm.phone || ''}
                        onChange={(e) => setNewExecForm({ ...newExecForm, phone: e.target.value })}
                        placeholder="+265 999 000 000"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Photo Path or URL</label>
                      <input
                        type="text"
                        value={newExecForm.image}
                        onChange={(e) => setNewExecForm({ ...newExecForm, image: e.target.value })}
                        placeholder="/images/executives/name.jpg"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Short Bio & Responsibilities</label>
                    <textarea
                      rows={3}
                      required
                      value={newExecForm.bio}
                      onChange={(e) => setNewExecForm({ ...newExecForm, bio: e.target.value })}
                      placeholder="Brief overview of portfolio leadership..."
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingExec(false)}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded font-bold"
                    >
                      Cancel
                    </button>
                    <Button type="submit" variant="green-filled" size="sm">
                      Add Executive Member
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Executives Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {executives.map((exec) => (
                <div key={exec.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <img src={exec.image} alt={exec.name} className="w-full h-44 object-cover rounded-lg bg-gray-100" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{exec.name}</h4>
                      <span className="text-xs text-[#1B6B35] font-semibold">{exec.role}</span>
                      <p className="text-[11px] text-gray-400">{exec.department} • {exec.yearOfStudy}</p>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">{exec.bio}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => setEditingExec(exec)}
                      className="flex-1 text-center text-xs font-bold text-[#1B6B35] bg-green-50 hover:bg-green-100 py-1.5 rounded transition"
                    >
                      Edit Bio
                    </button>
                    <button
                      onClick={() => handleDeleteExecutive(exec.id, exec.name)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                      title="Delete executive"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Exec Modal */}
        {editingExec && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-3 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-bold text-gray-900">Edit Leader: {editingExec.name}</h3>
                <button onClick={() => setEditingExec(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleSaveExecutive} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editingExec.name}
                    onChange={(e) => setEditingExec({ ...editingExec, name: e.target.value })}
                    className="w-full px-3 py-1.5 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    value={editingExec.role}
                    onChange={(e) => setEditingExec({ ...editingExec, role: e.target.value })}
                    className="w-full px-3 py-1.5 border rounded"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Department</label>
                    <input
                      type="text"
                      value={editingExec.department}
                      onChange={(e) => setEditingExec({ ...editingExec, department: e.target.value })}
                      className="w-full px-3 py-1.5 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Year of Study</label>
                    <input
                      type="text"
                      value={editingExec.yearOfStudy}
                      onChange={(e) => setEditingExec({ ...editingExec, yearOfStudy: e.target.value })}
                      className="w-full px-3 py-1.5 border rounded"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={editingExec.email}
                      onChange={(e) => setEditingExec({ ...editingExec, email: e.target.value })}
                      className="w-full px-3 py-1.5 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={editingExec.phone || ''}
                      onChange={(e) => setEditingExec({ ...editingExec, phone: e.target.value })}
                      className="w-full px-3 py-1.5 border rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={editingExec.image}
                    onChange={(e) => setEditingExec({ ...editingExec, image: e.target.value })}
                    className="w-full px-3 py-1.5 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Bio</label>
                  <textarea
                    rows={3}
                    value={editingExec.bio}
                    onChange={(e) => setEditingExec({ ...editingExec, bio: e.target.value })}
                    className="w-full px-3 py-1.5 border rounded"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingExec(null)}
                    className="px-3 py-1.5 text-gray-600 bg-gray-100 rounded font-bold"
                  >
                    Cancel
                  </button>
                  <Button type="submit" variant="green-filled" size="sm">
                    Save Profile
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Admin Security Modal */}
        <AdminSecurityModal
          isOpen={isSecurityModalOpen}
          onClose={() => setIsSecurityModalOpen(false)}
        />
      </div>
    </div>
  );
};
