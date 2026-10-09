import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { topUpdates } from '../data/updates';
import { UpdateItem } from '../types';
import { Button } from '../components/common/Button';

export const UpdatesPage = () => {
  const { id } = useParams<{ id?: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const selectedArticle = id ? topUpdates.find((u: UpdateItem) => u.id === id) : null;

  const categories = ['All', 'Innovation', 'Projects', 'Training', 'Entrepreneurship'];

  const filteredUpdates = topUpdates.filter((item: UpdateItem) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // If viewing a single article
  if (selectedArticle) {
    return (
      <div className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Link
            to="/updates"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1B6B35] mb-6 hover:underline"
          >
            <ArrowLeft size={14} />
            Back to All Updates
          </Link>

          <span className="inline-block bg-green-50 text-[#1B6B35] font-bold text-xs px-3 py-1 rounded-full mb-3 border border-green-200">
            {selectedArticle.category}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            {selectedArticle.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-gray-500 pb-6 border-b border-gray-100 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {selectedArticle.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {selectedArticle.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={13} />
              {selectedArticle.author}
            </span>
          </div>

          <div className="my-8 rounded-xl overflow-hidden bg-gray-100 shadow-sm max-h-[420px]">
            <img
              src={selectedArticle.thumbnail}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80';
              }}
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4 text-sm sm:text-base">
            <p className="text-base sm:text-lg font-medium text-gray-900 leading-relaxed">
              {selectedArticle.summary}
            </p>
            <div className="whitespace-pre-line">{selectedArticle.content}</div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
            <Button to="/updates" variant="gold-filled" size="sm" showArrow>
              More Stories
            </Button>
            <Button to="/join" variant="green-filled" size="sm">
              Join MUISA Today
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="bg-[#1B6B35] text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <span className="text-[#F5B83D] font-bold text-xs uppercase tracking-wider mb-2 block">
            News & Events
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            MUISA Updates & Happenings
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mt-3 font-normal">
            Stay informed on upcoming hackathons, tech talks, academic schedules, and association milestones.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search news & events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#1B6B35] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredUpdates.map((item: UpdateItem) => (
            <article
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition duration-200 flex flex-col group"
            >
              <div className="h-48 overflow-hidden bg-gray-100 relative">
                <img
                  src={item.thumbnail}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80';
                  }}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#1B6B35] text-white text-[11px] font-bold px-2.5 py-1 rounded-[2px] shadow-sm">
                  {item.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-gray-500">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#1B6B35] transition leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to={`/updates/${item.id}`}
                    className="text-xs font-bold text-[#1B6B35] flex items-center gap-1 hover:underline"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight size={13} />
                  </Link>
                  <span className="text-xs font-semibold text-gray-400">{item.relativeTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
