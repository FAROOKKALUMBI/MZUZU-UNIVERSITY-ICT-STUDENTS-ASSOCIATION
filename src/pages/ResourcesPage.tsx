import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileText, Download, Search, Book, FileCode } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { ResourceItem } from '../types';

export const ResourcesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { resources } = useContent();
  const activeCategory = searchParams.get('cat') || 'all';
  const [search, setSearch] = useState('');

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'past-papers', label: 'Past Papers' },
    { id: 'books', label: 'Books' },
    { id: 'notes', label: 'Lecture Notes' },
    { id: 'outlines', label: 'Course Outlines' },
    { id: 'tutorials', label: 'Tutorials' },
  ];

  const filteredResources = resources.filter((item: ResourceItem) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.courseCode.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="bg-[#1B6B35] text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <span className="text-[#F5B83D] font-bold text-xs uppercase tracking-wider mb-2 block">
            Academic Vault
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Academic Resources & Study Packs
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mt-3 font-normal">
            Free access to examination papers, curated lecture notes, textbook references, and practical developer guides.
          </p>
        </div>
      </section>

      {/* Main List */}
      <section className="py-12 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        {/* Search & Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSearchParams(cat.id === 'all' ? {} : { cat: cat.id })}
                className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#1B6B35] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by code or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
            />
          </div>
        </div>

        {/* Resource Items Table/Cards */}
        <div className="space-y-3">
          {filteredResources.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-500 text-sm">No resources found matching your criteria.</p>
            </div>
          ) : (
            filteredResources.map((res: ResourceItem) => (
              <div
                key={res.id}
                className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#1B6B35] transition duration-150 shadow-2xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-green-50 text-[#1B6B35] flex items-center justify-center shrink-0">
                    {res.category === 'past-papers' ? (
                      <FileText size={20} />
                    ) : res.category === 'books' ? (
                      <Book size={20} />
                    ) : (
                      <FileCode size={20} />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-[#1B6B35]/10 text-[#1B6B35] font-bold text-[10px] px-2 py-0.5 rounded">
                        {res.courseCode}
                      </span>
                      <span className="text-[11px] text-gray-500">
                        {res.year} • {res.semester}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                      {res.title}
                    </h3>
                    <div className="text-[11px] text-gray-400">
                      Format: {res.fileType} • Size: {res.fileSize}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end sm:justify-start">
                  <button
                    onClick={() => alert(`Downloading "${res.title}"...`)}
                    className="inline-flex items-center gap-1.5 bg-[#1B6B35] hover:bg-[#155429] text-white text-xs font-bold px-4 py-2 rounded-[2px] transition shadow-xs"
                  >
                    <Download size={13} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
