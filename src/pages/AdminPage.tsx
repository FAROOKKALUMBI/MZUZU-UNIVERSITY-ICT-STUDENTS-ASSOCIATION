import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, RefreshCw, CheckCircle, Newspaper, BookOpen, Users, Shield } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { UpdateItem, ResourceItem, ExecutiveMember } from '../types';
import { Button } from '../components/common/Button';

export const AdminPage: React.FC = () => {
  const {
    updates,
    resources,
    executives,
    addUpdate,
    editUpdate,
    deleteUpdate,
    addResource,
    deleteResource,
    editExecutive,
    resetToDefaults,
  } = useContent();

  const [activeTab, setActiveTab] = useState<'updates' | 'resources' | 'executives'>('updates');
  const [editingUpdate, setEditingUpdate] = useState<UpdateItem | null>(null);
  const [isCreatingUpdate, setIsCreatingUpdate] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

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

  // New Resource Form State
  const [isCreatingResource, setIsCreatingResource] = useState(false);
  const [newResourceForm, setNewResourceForm] = useState<Omit<ResourceItem, 'id'>>({
    title: '',
    category: 'past-papers',
    year: 'Year 1',
    semester: 'Semester 1',
    courseCode: 'ICT1101',
    fileSize: '1.5 MB',
    fileType: 'PDF',
    downloadUrl: '#',
  });

  // Executive Edit State
  const [editingExec, setEditingExec] = useState<ExecutiveMember | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

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

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    addResource(newResourceForm);
    setIsCreatingResource(false);
    showNotification('Academic resource published successfully!');
  };

  const handleSaveExecutive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExec) return;
    editExecutive(editingExec.id, editingExec);
    setEditingExec(null);
    showNotification('Executive details updated!');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
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

          <button
            onClick={() => {
              if (confirm('Reset all website content back to initial default data?')) {
                resetToDefaults();
                showNotification('Content reset to original defaults');
              }
            }}
            className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-semibold px-3 py-1.5 rounded border border-red-200 bg-red-50 hover:bg-red-100 transition"
          >
            <RefreshCw size={13} />
            <span>Reset Defaults</span>
          </button>
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
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-bold text-gray-900">Edit Story: {editingUpdate.title}</h3>
                <button onClick={() => setEditingUpdate(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleSaveEditUpdate} className="space-y-3 text-xs">
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
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Academic Files & Examination Archive</h2>
              <Button onClick={() => setIsCreatingResource(true)} variant="gold-filled" size="sm">
                <Plus size={14} className="mr-1 inline" />
                Upload New Resource
              </Button>
            </div>

            {isCreatingResource && (
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
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
                      <label className="block font-bold text-gray-700 mb-1">Course Code</label>
                      <input
                        type="text"
                        required
                        value={newResourceForm.courseCode}
                        onChange={(e) => setNewResourceForm({ ...newResourceForm, courseCode: e.target.value })}
                        placeholder="e.g. ICT3102"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                        <option value="books">Books</option>
                        <option value="notes">Notes</option>
                        <option value="outlines">Course Outlines</option>
                        <option value="tutorials">Tutorials</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Year Level</label>
                      <input
                        type="text"
                        value={newResourceForm.year}
                        onChange={(e) => setNewResourceForm({ ...newResourceForm, year: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">File Size</label>
                      <input
                        type="text"
                        value={newResourceForm.fileSize}
                        onChange={(e) => setNewResourceForm({ ...newResourceForm, fileSize: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
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

            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
              {resources.map((res) => (
                <div key={res.id} className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-[#1B6B35] bg-green-50 px-2 py-0.5 rounded">
                      {res.courseCode} • {res.category}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 mt-1">{res.title}</h4>
                    <p className="text-xs text-gray-500">
                      {res.year} • {res.semester} • {res.fileType} ({res.fileSize})
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Remove ${res.title}?`)) {
                        deleteResource(res.id);
                        showNotification('Resource deleted.');
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 rounded transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EXECUTIVES */}
        {activeTab === 'executives' && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-gray-900">Executive Profiles & Leadership Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {executives.map((exec) => (
                <div key={exec.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-3">
                  <img src={exec.image} alt={exec.name} className="w-full h-44 object-cover rounded-lg" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{exec.name}</h4>
                    <span className="text-xs text-[#1B6B35] font-semibold">{exec.role}</span>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">{exec.bio}</p>
                  </div>
                  <button
                    onClick={() => setEditingExec(exec)}
                    className="w-full text-center text-xs font-bold text-[#1B6B35] bg-green-50 hover:bg-green-100 py-1.5 rounded transition"
                  >
                    Edit Bio & Contacts
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Exec Modal */}
        {editingExec && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-3">
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
      </div>
    </div>
  );
};
