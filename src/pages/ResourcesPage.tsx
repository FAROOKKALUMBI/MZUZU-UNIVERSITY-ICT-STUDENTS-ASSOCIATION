import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Download,
  Search,
  Book,
  FileCode,
  GraduationCap,
  ChevronRight,
  Layers,
  CheckCircle2,
  Filter,
  X,
  FileCheck
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { ResourceItem } from '../types';
import { RESOURCE_CATEGORIES, PROGRAMMES } from '../data/resources';
import { Button } from '../components/common/Button';

// Category slug normalizer
const normalizeCatSlug = (slug?: string | null): string => {
  if (!slug) return 'all';
  const clean = slug.toLowerCase();
  if (clean === 'notes' || clean === 'lecture-notes') return 'lecture-notes';
  if (clean === 'course-outlines' || clean === 'outlines') return 'course-outlines';
  if (clean === 'past-papers') return 'past-papers';
  if (clean === 'books') return 'books';
  if (clean === 'tutorials') return 'tutorials';
  return clean;
};

export const ResourcesPage: React.FC = () => {
  const { category: routeCategory, programme: routeProgramme, course: routeCourse, resourceSlug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Selected state: prefer route params, fallback to searchParams
  const selectedCat = normalizeCatSlug(routeCategory || searchParams.get('cat'));
  const selectedProg = routeProgramme || searchParams.get('prog') || 'all';
  const selectedCourse = routeCourse || searchParams.get('course') || 'all';

  // Local filter states
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [downloadSuccessItem, setDownloadSuccessItem] = useState<string | null>(null);

  const { resources } = useContent();

  // Find category & programme details
  const currentCategoryInfo = useMemo(() => {
    return RESOURCE_CATEGORIES.find((c) => c.id === selectedCat);
  }, [selectedCat]);

  const currentProgrammeInfo = useMemo(() => {
    return PROGRAMMES.find((p) => p.id === selectedProg);
  }, [selectedProg]);

  // Distinct courses available under current selection
  const availableCourses = useMemo(() => {
    const list: { code: string; name: string }[] = [];
    const seen = new Set<string>();

    resources.forEach((r) => {
      const catMatch = selectedCat === 'all' || normalizeCatSlug(r.category) === selectedCat;
      const progMatch = selectedProg === 'all' || r.programme === selectedProg;
      if (catMatch && progMatch && r.courseCode) {
        if (!seen.has(r.courseCode)) {
          seen.add(r.courseCode);
          list.push({
            code: r.courseCode,
            name: r.courseName || r.courseCode,
          });
        }
      }
    });

    return list;
  }, [resources, selectedCat, selectedProg]);

  // Filter resources based on all 4 levels + search + year/sem
  const filteredResources = useMemo(() => {
    return resources.filter((item: ResourceItem) => {
      // Level 2: Category
      const itemCat = normalizeCatSlug(item.category);
      const matchesCat = selectedCat === 'all' || itemCat === selectedCat;

      // Level 3: Programme
      const matchesProg = selectedProg === 'all' || item.programme === selectedProg;

      // Level 3: Specific Course
      const matchesCourse =
        selectedCourse === 'all' ||
        item.courseCode.toLowerCase() === selectedCourse.toLowerCase() ||
        (item.courseName && item.courseName.toLowerCase() === selectedCourse.toLowerCase());

      // Level 4: Individual Resource Slug
      const matchesSlug = !resourceSlug || item.slug === resourceSlug || item.id === resourceSlug;

      // Year & Semester filters
      const matchesYear = selectedYear === 'all' || item.year.includes(selectedYear);
      const matchesSemester = selectedSemester === 'all' || item.semester.includes(selectedSemester);

      // Search keyword
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.courseCode.toLowerCase().includes(query) ||
        (item.courseName && item.courseName.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query));

      return (
        matchesCat &&
        matchesProg &&
        matchesCourse &&
        matchesSlug &&
        matchesYear &&
        matchesSemester &&
        matchesSearch
      );
    });
  }, [
    resources,
    selectedCat,
    selectedProg,
    selectedCourse,
    resourceSlug,
    selectedYear,
    selectedSemester,
    search,
  ]);

  // Handle category change navigation
  const handleSelectCategory = (catId: string) => {
    if (catId === 'all') {
      navigate('/resources');
    } else {
      if (selectedProg !== 'all') {
        navigate(`/resources/${catId}/${selectedProg}`);
      } else {
        navigate(`/resources/${catId}`);
      }
    }
  };

  // Handle programme change navigation
  const handleSelectProgramme = (progId: string) => {
    const targetCat = selectedCat === 'all' ? 'past-papers' : selectedCat;
    if (progId === 'all') {
      navigate(`/resources/${targetCat}`);
    } else {
      navigate(`/resources/${targetCat}/${progId}`);
    }
  };

  // Handle course change navigation
  const handleSelectCourse = (courseCode: string) => {
    const targetCat = selectedCat === 'all' ? 'past-papers' : selectedCat;
    const targetProg = selectedProg === 'all' ? 'computer-science' : selectedProg;
    if (courseCode === 'all') {
      navigate(`/resources/${targetCat}/${targetProg}`);
    } else {
      navigate(`/resources/${targetCat}/${targetProg}/${courseCode.toLowerCase()}`);
    }
  };

  // Direct download simulation or trigger
  const handleDownload = (item: ResourceItem) => {
    setDownloadSuccessItem(item.id);
    setTimeout(() => {
      setDownloadSuccessItem(null);
    }, 4000);

    // If item has a real link, open it
    if (item.downloadUrl && item.downloadUrl !== '#') {
      window.open(item.downloadUrl, '_blank');
    } else {
      // Default fallback mock download alert or trigger
      const dummyContent = `Mzuzu University ICT Students Association (MUISA)\n\nResource: ${item.title}\nCourse: ${item.courseCode} - ${item.courseName || ''}\nCategory: ${item.category}\nProgramme: ${item.programmeName || item.programme || 'ICT'}\n\nThis is an official MUISA study vault asset.`;
      const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${item.courseCode}_${item.slug || item.id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Banner / Header */}
      <section className="bg-[#1B6B35] text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-white/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[#F5B83D] font-bold text-xs uppercase tracking-wider">
              Level 1 — Resources Vault
            </span>
            <span className="text-white/40">•</span>
            <span className="text-white/80 text-xs font-semibold">
              Mzuzu University Faculty of Science, Technology & Innovation
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Academic Resources & Learning Materials
          </h1>
          <p className="text-white/85 text-sm md:text-base max-w-2xl mt-3 font-normal leading-relaxed">
            Browse examination papers, curated lecture slide modules, recommended e-books, course syllabi, and hands-on coding tutorials organized across your academic programmes.
          </p>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/15">
            <div>
              <div className="text-2xl font-black text-[#F5B83D]">5</div>
              <div className="text-[11px] text-white/75 font-medium uppercase tracking-wider">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#F5B83D]">3+</div>
              <div className="text-[11px] text-white/75 font-medium uppercase tracking-wider">Degree Programmes</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#F5B83D]">4</div>
              <div className="text-[11px] text-white/75 font-medium uppercase tracking-wider">Academic Levels</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#F5B83D]">{resources.length}</div>
              <div className="text-[11px] text-white/75 font-medium uppercase tracking-wider">Curated Files</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Breadcrumb Navigation (Levels 1 → 2 → 3 → 4) */}
        <nav
          aria-label="Academic Breadcrumb"
          className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200/80 shadow-2xs mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600"
        >
          {/* Level 1: Home / Resources */}
          <Link
            to="/resources"
            className={`font-semibold transition hover:text-[#1B6B35] flex items-center gap-1.5 ${
              selectedCat === 'all' ? 'text-[#1B6B35] font-bold' : ''
            }`}
          >
            <Layers size={15} className="text-[#1B6B35]" />
            <span>Resources</span>
          </Link>

          {/* Level 2: Category */}
          {selectedCat !== 'all' && (
            <>
              <ChevronRight size={14} className="text-gray-400" />
              <Link
                to={`/resources/${selectedCat}`}
                className={`transition hover:text-[#1B6B35] ${
                  selectedProg === 'all' ? 'text-[#1B6B35] font-bold' : 'text-gray-600'
                }`}
              >
                {currentCategoryInfo?.name || selectedCat}
              </Link>
            </>
          )}

          {/* Level 3: Programme */}
          {selectedProg !== 'all' && (
            <>
              <ChevronRight size={14} className="text-gray-400" />
              <Link
                to={`/resources/${selectedCat === 'all' ? 'past-papers' : selectedCat}/${selectedProg}`}
                className={`transition hover:text-[#1B6B35] ${
                  selectedCourse === 'all' ? 'text-[#1B6B35] font-bold' : 'text-gray-600'
                }`}
              >
                {currentProgrammeInfo?.name || selectedProg}
              </Link>
            </>
          )}

          {/* Level 3 Course */}
          {selectedCourse !== 'all' && (
            <>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-[#1B6B35] font-bold uppercase">
                {selectedCourse}
              </span>
            </>
          )}

          {/* Level 4 Slug (Single Resource) */}
          {resourceSlug && (
            <>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-900 font-extrabold truncate max-w-xs">
                {filteredResources[0]?.title || resourceSlug}
              </span>
            </>
          )}
        </nav>

        {/* LEVEL 2: Resource Categories Bar */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Level 2 — Resource Categories
            </h2>
            {selectedCat !== 'all' && (
              <button
                onClick={() => handleSelectCategory('all')}
                className="text-xs text-[#1B6B35] font-semibold hover:underline flex items-center gap-1"
              >
                <span>View All Categories</span>
                <X size={12} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {/* All Resources Tab */}
            <button
              onClick={() => handleSelectCategory('all')}
              className={`p-3.5 rounded-xl text-left border transition duration-150 flex flex-col justify-between ${
                selectedCat === 'all'
                  ? 'bg-[#1B6B35] text-white border-[#1B6B35] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#1B6B35] hover:bg-green-50/40'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                  All
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    selectedCat === 'all' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {resources.length}
                </span>
              </div>
              <div className="font-bold text-xs sm:text-sm">All Resources</div>
            </button>

            {/* Individual Categories */}
            {RESOURCE_CATEGORIES.map((cat) => {
              const isActive = selectedCat === cat.id;
              const count = resources.filter(
                (r) => normalizeCatSlug(r.category) === cat.id
              ).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`p-3.5 rounded-xl text-left border transition duration-150 flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#1B6B35] text-white border-[#1B6B35] shadow-xs'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#1B6B35] hover:bg-green-50/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                      {cat.badge}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                  <div className="font-bold text-xs sm:text-sm leading-tight">{cat.name}</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* LEVEL 3: Programme / Course Selector */}
        <section className="mb-8 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-gray-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B6B35]">
                Level 3 — Programmes & Degrees
              </span>
              <h3 className="text-base font-extrabold text-gray-900 mt-0.5">
                Select Your Programme at Mzuzu University
              </h3>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search course code, topic, or title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6B35] bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Programmes Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            {/* All Programmes Option */}
            <button
              onClick={() => handleSelectProgramme('all')}
              className={`p-3 rounded-xl border text-left transition flex items-start gap-3 ${
                selectedProg === 'all'
                  ? 'border-[#1B6B35] bg-green-50/70 text-[#1B6B35] font-bold shadow-2xs'
                  : 'border-gray-200 bg-gray-50 hover:bg-white text-gray-700'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  selectedProg === 'all'
                    ? 'bg-[#1B6B35] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                <Layers size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold">All Programmes</div>
                <div className="text-[11px] text-gray-500 font-normal">Cross-faculty vault</div>
              </div>
            </button>

            {PROGRAMMES.map((prog) => {
              const isSelected = selectedProg === prog.id;
              return (
                <button
                  key={prog.id}
                  onClick={() => handleSelectProgramme(prog.id)}
                  className={`p-3 rounded-xl border text-left transition flex items-start gap-3 ${
                    isSelected
                      ? 'border-[#1B6B35] bg-green-50/70 text-[#1B6B35] font-bold shadow-2xs'
                      : 'border-gray-200 bg-gray-50 hover:bg-white text-gray-700'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#1B6B35] text-white'
                        : 'bg-white border border-gray-200 text-[#1B6B35]'
                    }`}
                  >
                    <GraduationCap size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">{prog.name}</div>
                    <div className="text-[11px] text-gray-500 font-normal truncate">
                      {prog.shortCode} • Mzuzu Uni
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sub-Filters: Course selector, Year level, and Semester */}
          <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-gray-100 text-xs">
            {/* Specific Courses Dropdown/Pills */}
            {availableCourses.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-gray-600 flex items-center gap-1">
                  <Filter size={13} className="text-[#1B6B35]" /> Courses:
                </span>
                <button
                  onClick={() => handleSelectCourse('all')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    selectedCourse === 'all'
                      ? 'bg-[#1B6B35] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All Courses
                </button>
                {availableCourses.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => handleSelectCourse(c.code)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold ${
                      selectedCourse.toLowerCase() === c.code.toLowerCase()
                        ? 'bg-[#1B6B35] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            )}

            <div className="ml-auto flex items-center gap-2">
              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-2.5 py-1 border border-gray-200 rounded text-xs bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1B6B35]"
              >
                <option value="all">All Academic Years</option>
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
                <option value="Year 3">Year 3</option>
                <option value="Year 4">Year 4</option>
              </select>

              {/* Semester Filter */}
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-2.5 py-1 border border-gray-200 rounded text-xs bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1B6B35]"
              >
                <option value="all">All Semesters</option>
                <option value="Semester 1">Semester 1</option>
                <option value="Semester 2">Semester 2</option>
              </select>
            </div>
          </div>
        </section>

        {/* Toast notification when simulated download occurs */}
        {downloadSuccessItem && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1B6B35] text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 animate-slide-up border border-white/20">
            <CheckCircle2 size={20} className="text-[#F5B83D]" />
            <div>
              <div className="text-xs font-bold">Document Download Initiated!</div>
              <div className="text-[11px] text-white/80">Saving study material to your device.</div>
            </div>
          </div>
        )}

        {/* LEVEL 4: Individual Resources Listing */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Level 4 — Individual Learning Resources
              </span>
              <h3 className="text-base font-extrabold text-gray-900">
                Available Resources ({filteredResources.length})
              </h3>
            </div>

            {(selectedCat !== 'all' || selectedProg !== 'all' || selectedCourse !== 'all' || search) && (
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedYear('all');
                  setSelectedSemester('all');
                  navigate('/resources');
                }}
                className="text-xs font-bold text-[#1B6B35] hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {filteredResources.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-3">
                <FileText size={28} />
              </div>
              <h4 className="text-base font-bold text-gray-800">No resources found</h4>
              <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto mt-1 mb-5">
                We couldn't find any documents matching your active filter criteria. Try choosing a different programme or clearing your search.
              </p>
              <Button onClick={() => navigate('/resources')} variant="gold-filled" size="sm">
                View All Resources
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {filteredResources.map((res: ResourceItem) => {
                const itemCat = normalizeCatSlug(res.category);
                const isSingleSelected = resourceSlug === res.slug || resourceSlug === res.id;

                return (
                  <div
                    key={res.id}
                    className={`bg-white rounded-xl border p-4 sm:p-5 transition duration-200 shadow-2xs hover:shadow-md ${
                      isSingleSelected
                        ? 'border-[#1B6B35] ring-2 ring-[#1B6B35]/20 bg-green-50/20'
                        : 'border-gray-200 hover:border-[#1B6B35]'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Document Details */}
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                            itemCat === 'past-papers'
                              ? 'bg-amber-50 text-[#F5B83D]'
                              : itemCat === 'books'
                              ? 'bg-purple-50 text-purple-600'
                              : itemCat === 'course-outlines'
                              ? 'bg-blue-50 text-blue-600'
                              : itemCat === 'tutorials'
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-green-50 text-[#1B6B35]'
                          }`}
                        >
                          {itemCat === 'past-papers' ? (
                            <FileCheck size={24} />
                          ) : itemCat === 'books' ? (
                            <Book size={24} />
                          ) : itemCat === 'tutorials' ? (
                            <FileCode size={24} />
                          ) : (
                            <FileText size={24} />
                          )}
                        </div>

                        <div className="space-y-1.5 min-w-0">
                          {/* Badges / Hierarchy tags */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="bg-[#1B6B35] text-white font-bold text-[10px] px-2.5 py-0.5 rounded tracking-wide">
                              {res.courseCode}
                            </span>
                            {res.programmeName && (
                              <span className="bg-gray-100 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                                {res.programmeName}
                              </span>
                            )}
                            <span className="text-[11px] text-gray-500 font-medium">
                              {res.year} • {res.semester}
                            </span>
                          </div>

                          {/* Resource Title */}
                          <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                            {res.title}
                          </h4>

                          {/* Description snippet */}
                          {res.description && (
                            <p className="text-xs text-gray-600 leading-relaxed max-w-3xl">
                              {res.description}
                            </p>
                          )}

                          {/* Metadata row */}
                          <div className="flex items-center gap-4 text-[11px] text-gray-400 pt-1 flex-wrap">
                            <span>Format: <strong className="text-gray-600">{res.fileType}</strong></span>
                            <span>Size: <strong className="text-gray-600">{res.fileSize}</strong></span>
                            {res.authorOrLecturer && (
                              <span>Provider: <strong className="text-gray-600">{res.authorOrLecturer}</strong></span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                        {/* Direct View / Permalink */}
                        {res.slug && res.programme && (
                          <Link
                            to={`/resources/${itemCat}/${res.programme}/${res.courseCode.toLowerCase()}/${res.slug}`}
                            className="text-xs font-semibold text-gray-600 hover:text-[#1B6B35] px-3 py-2 border border-gray-200 rounded hover:bg-gray-50 transition"
                          >
                            Details
                          </Link>
                        )}

                        {/* Download CTA */}
                        <button
                          onClick={() => handleDownload(res)}
                          className="inline-flex items-center gap-1.5 bg-[#1B6B35] hover:bg-[#155429] text-white text-xs font-bold px-4 py-2.5 rounded-[2px] transition shadow-xs"
                        >
                          <Download size={14} />
                          <span>Download {res.fileType}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Informative Guidance Footer for Students */}
        <section className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1B6B35]">
                Missing an Examination Paper?
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                If you have past test papers or lecture slides from previous semesters that aren't listed, share them with the MUISA Academic Committee to help fellow students.
              </p>
              <Link to="/contact" className="text-xs font-bold text-[#1B6B35] hover:underline inline-block pt-1">
                Submit Material to MUISA →
              </Link>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1B6B35]">
                Peer-Led Tutorial Sessions
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Join weekly physical & virtual coding sessions hosted in the ICT labs every Wednesday and Saturday afternoon.
              </p>
              <Link to="/updates" className="text-xs font-bold text-[#1B6B35] hover:underline inline-block pt-1">
                Check Session Schedule →
              </Link>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1B6B35]">
                Mzuzu University Library
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Access official university e-library portals, IEEE Xplore, and research repositories through the main university network.
              </p>
              <a
                href="https://mzuni.ac.mw"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#1B6B35] hover:underline inline-block pt-1"
              >
                Visit Mzuni Portal →
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
