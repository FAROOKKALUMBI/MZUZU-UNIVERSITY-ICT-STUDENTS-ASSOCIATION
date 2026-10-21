import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Download,
  Search,
  Book,
  BookOpen,
  FileCode,
  ChevronRight,
  Layers,
  CheckCircle2,
  X,
  FileCheck,
  Eye,
  ExternalLink,
  Copy,
  ChevronLeft,
  ArrowRight,
  GraduationCap,
  Inbox,
  Play,
  Video
} from 'lucide-react';
import {
  vaultLevels,
  getLevel,
  getCourse,
  normalizeTypeSlug,
  MATERIAL_TYPES,
  MaterialItem,
  MaterialTypeMeta,
  searchAllMaterials,
  SearchResultItem
} from '../data/vaultData';
import { Button } from '../components/common/Button';

const ITEMS_PER_PAGE = 24;

export const ResourcesPage: React.FC = () => {
  const { levelId, courseId, typeId } = useParams();
  const navigate = useNavigate();

  // Active step resolution
  const currentLevel = useMemo(() => getLevel(levelId), [levelId]);
  const currentCourse = useMemo(() => getCourse(levelId, courseId), [levelId, courseId]);
  const currentTypeMeta = useMemo(() => normalizeTypeSlug(typeId), [typeId]);

  // Check if levelId was passed as a direct category slug (e.g. /resources/past-papers)
  const directCategoryMeta = useMemo(() => {
    if (currentLevel) return undefined;
    return normalizeTypeSlug(levelId);
  }, [currentLevel, levelId]);

  // Determine current hierarchy step (1: Level, 2: Course, 3: Material Type, 4: Material List)
  const currentStep = useMemo(() => {
    if (!currentLevel) return 1;
    if (!currentCourse) return 2;
    if (!currentTypeMeta) return 3;
    return 4;
  }, [currentLevel, currentCourse, currentTypeMeta]);

  // Local filter states
  const [globalSearch, setGlobalSearch] = useState('');
  const [courseSearch, setCourseSearch] = useState('');
  const [materialSearch, setMaterialSearch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [downloadSuccessItem, setDownloadSuccessItem] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Direct category cross-level filter states
  const [directLevelFilter, setDirectLevelFilter] = useState<string>('all');
  const [directCategorySearch, setDirectCategorySearch] = useState<string>('');
  const [directPage, setDirectPage] = useState<number>(1);

  // Opened Document Modal state
  const [openedMaterial, setOpenedMaterial] = useState<{
    item: MaterialItem;
    levelName?: string;
    courseName?: string;
    categoryLabel?: string;
  } | null>(null);

  // Global search results across all materials in all levels
  const globalSearchResults = useMemo(() => {
    return searchAllMaterials(globalSearch, 25);
  }, [globalSearch]);

  // Courses filtered for Step 2
  const filteredCourses = useMemo(() => {
    if (!currentLevel) return [];
    return currentLevel.courses.filter((course) => {
      const matchSem =
        selectedSemester === 'all' ||
        course.semester.toLowerCase() === selectedSemester.toLowerCase();
      const q = courseSearch.trim().toLowerCase();
      const matchQuery =
        !q ||
        course.name.toLowerCase().includes(q) ||
        course.code.toLowerCase().includes(q) ||
        (course.displayName && course.displayName.toLowerCase().includes(q));
      return matchSem && matchQuery;
    });
  }, [currentLevel, selectedSemester, courseSearch]);

  // Materials list for Step 4
  const currentMaterials = useMemo(() => {
    if (!currentCourse || !currentTypeMeta) return [];
    const list = currentCourse.materials[currentTypeMeta.key] || [];
    const q = materialSearch.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.fileName.toLowerCase().includes(q) ||
        (m.subfolder && m.subfolder.toLowerCase().includes(q))
    );
  }, [currentCourse, currentTypeMeta, materialSearch]);

  // Paginated materials for Step 4
  const totalPages = Math.ceil(currentMaterials.length / ITEMS_PER_PAGE) || 1;
  const paginatedMaterials = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return currentMaterials.slice(start, start + ITEMS_PER_PAGE);
  }, [currentMaterials, currentPage]);

  // All materials matching direct category across levels
  const directCategoryMaterials = useMemo(() => {
    if (!directCategoryMeta) return [];
    const results: { material: MaterialItem; level: (typeof vaultLevels)[0]; course: (typeof vaultLevels)[0]['courses'][0] }[] = [];
    const q = directCategorySearch.trim().toLowerCase();

    for (const lvl of vaultLevels) {
      if (directLevelFilter !== 'all' && lvl.id !== directLevelFilter) continue;
      for (const course of lvl.courses) {
        const items = course.materials[directCategoryMeta.key] || [];
        for (const mat of items) {
          if (
            !q ||
            mat.title.toLowerCase().includes(q) ||
            mat.fileName.toLowerCase().includes(q) ||
            course.code.toLowerCase().includes(q)
          ) {
            results.push({ material: mat, level: lvl, course });
          }
        }
      }
    }
    return results;
  }, [directCategoryMeta, directLevelFilter, directCategorySearch]);

  const totalDirectPages = Math.ceil(directCategoryMaterials.length / ITEMS_PER_PAGE) || 1;
  const paginatedDirectMaterials = useMemo(() => {
    const start = (directPage - 1) * ITEMS_PER_PAGE;
    return directCategoryMaterials.slice(start, start + ITEMS_PER_PAGE);
  }, [directCategoryMaterials, directPage]);

  // Download handler
  const handleDownload = (item: MaterialItem) => {
    setDownloadSuccessItem(item.id);
    setTimeout(() => setDownloadSuccessItem(null), 4000);

    const link = document.createElement('a');
    link.href = item.downloadUrl;
    link.download = item.fileName || item.title || 'academic-resource';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy link handler
  const handleCopyLink = (item: MaterialItem) => {
    const url = `${window.location.origin}${item.downloadUrl}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  // Helper for Category icon & styling
  const getCategoryDetails = (key: string) => {
    switch (key) {
      case 'pastPapers':
      case 'past-papers':
        return {
          icon: <FileCheck size={24} />,
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
          iconBg: 'bg-amber-50 text-amber-600 border-amber-200/60',
          cardHover: 'hover:border-amber-400',
        };
      case 'books':
        return {
          icon: <Book size={24} />,
          badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
          iconBg: 'bg-purple-50 text-purple-600 border-purple-200/60',
          cardHover: 'hover:border-purple-400',
        };
      case 'tutorials':
        return {
          icon: <FileCode size={24} />,
          badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
          iconBg: 'bg-sky-50 text-sky-600 border-sky-200/60',
          cardHover: 'hover:border-sky-400',
        };
      case 'outlines':
      case 'course-outlines':
        return {
          icon: <Layers size={24} />,
          badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/60',
          cardHover: 'hover:border-indigo-400',
        };
      case 'notes':
      default:
        return {
          icon: <FileText size={24} />,
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          iconBg: 'bg-emerald-50 text-[#1B6B35] border-emerald-200/60',
          cardHover: 'hover:border-[#1B6B35]',
        };
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Top Banner */}
      <section className="bg-[#1B6B35] text-white py-8 md:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-white/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[#F5B83D] font-bold text-xs uppercase tracking-wider">
              Academic Vault
            </span>
            <span className="text-white/40">•</span>
            <span className="text-white/80 text-xs font-semibold">
              Step-by-Step Study Repository
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Academic Resources & Learning Materials
          </h1>
          <p className="text-white/85 text-xs sm:text-sm md:text-base max-w-2xl mt-1.5 font-normal leading-relaxed">
            Move through a clear hierarchy from your academic level, to your course, to the exact material type you need.
          </p>

          {/* Global Quick Search Bar */}
          <div className="mt-6 max-w-2xl relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Quick search: Type any paper title, course code, or topic across all levels..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm rounded-xl border-0 shadow-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5B83D] bg-white"
            />
            {globalSearch && (
              <button
                onClick={() => setGlobalSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
              >
                <X size={16} />
              </button>
            )}

            {/* Instant Search Results Dropdown */}
            {globalSearch.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden max-h-96 overflow-y-auto">
                <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 flex justify-between">
                  <span>Search Results ({globalSearchResults.length})</span>
                  <span>Press Esc to close</span>
                </div>
                {globalSearchResults.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gray-500">
                    No materials found matching "<strong className="text-gray-800">{globalSearch}</strong>"
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {globalSearchResults.map((res: SearchResultItem) => (
                      <div
                        key={res.material.id}
                        onClick={() => {
                          setOpenedMaterial({
                            item: res.material,
                            levelName: res.level.name,
                            courseName: res.course.name,
                            categoryLabel: res.typeMeta.shortName,
                          });
                        }}
                        className="p-3.5 hover:bg-green-50/50 cursor-pointer transition flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                              {res.level.name}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1B6B35]/10 text-[#1B6B35]">
                              {res.course.code}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700">
                              {res.typeMeta.shortName}
                            </span>
                          </div>
                          <h5 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug break-words">
                            {res.material.title}
                          </h5>
                          <span className="text-[11px] text-gray-400 mt-0.5 block">
                            {res.material.fileType} • {res.material.fileSize}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(res.material);
                          }}
                          className="shrink-0 p-2 text-[#1B6B35] hover:bg-green-100 rounded-lg transition"
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Step-by-Step Breadcrumbs & Back Navigation */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-xl border border-gray-200/80 shadow-2xs">
          {/* Breadcrumb Path */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 flex-wrap">
            <Link
              to="/resources"
              className={`font-semibold hover:text-[#1B6B35] flex items-center gap-1.5 ${
                currentStep === 1 ? 'text-[#1B6B35] font-bold' : ''
              }`}
            >
              <Layers size={14} className="text-[#1B6B35]" />
              <span>All Levels</span>
            </Link>

            {/* Level Breadcrumb */}
            {currentLevel && (
              <>
                <ChevronRight size={13} className="text-gray-400" />
                <Link
                  to={`/resources/${currentLevel.id}`}
                  className={`hover:text-[#1B6B35] font-semibold ${
                    currentStep === 2 ? 'text-[#1B6B35] font-bold' : ''
                  }`}
                >
                  {currentLevel.name}
                </Link>
              </>
            )}

            {/* Course Breadcrumb */}
            {currentCourse && currentLevel && (
              <>
                <ChevronRight size={13} className="text-gray-400" />
                <Link
                  to={`/resources/${currentLevel.id}/${currentCourse.id}`}
                  className={`hover:text-[#1B6B35] font-semibold ${
                    currentStep === 3 ? 'text-[#1B6B35] font-bold' : ''
                  }`}
                >
                  {currentCourse.displayName || (currentCourse.code !== 'General' ? `${currentCourse.name} (${currentCourse.code})` : currentCourse.name)}
                </Link>
              </>
            )}

            {/* Material Type Breadcrumb */}
            {currentTypeMeta && (
              <>
                <ChevronRight size={13} className="text-gray-400" />
                <span className="text-[#1B6B35] font-bold">
                  {currentTypeMeta.shortName}
                </span>
              </>
            )}

            {/* Direct Category Breadcrumb */}
            {!currentLevel && directCategoryMeta && (
              <>
                <ChevronRight size={13} className="text-gray-400" />
                <span className="text-[#1B6B35] font-bold">
                  All {directCategoryMeta.title}
                </span>
              </>
            )}
          </nav>

          {/* Contextual Back Button */}
          {(currentStep > 1 || directCategoryMeta) && (
            <button
              onClick={() => {
                if (directCategoryMeta || currentStep === 2) navigate('/resources');
                if (currentStep === 3) navigate(`/resources/${levelId}`);
                if (currentStep === 4) navigate(`/resources/${levelId}/${courseId}`);
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-[#1B6B35] self-start sm:self-auto px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
            >
              <ChevronLeft size={14} />
              <span>
                {directCategoryMeta && 'Browse by Academic Levels'}
                {!directCategoryMeta && currentStep === 2 && 'Back to Levels'}
                {!directCategoryMeta && currentStep === 3 && `Back to ${currentLevel?.name || 'Courses'}`}
                {!directCategoryMeta && currentStep === 4 && `Back to ${currentCourse?.displayName || currentCourse?.name || 'Categories'}`}
              </span>
            </button>
          )}
        </div>

        {/* DIRECT CATEGORY VIEW (Cross-level, e.g. /resources/past-papers) */}
        {!currentLevel && directCategoryMeta && (
          <section className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B6B35]">
                  Cross-Level Academic Vault
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
                  All {directCategoryMeta.title} ({directCategoryMaterials.length.toLocaleString()})
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Showing all {directCategoryMeta.shortName.toLowerCase()} across all academic levels. You can filter by year or search by course.
                </p>
              </div>

              {/* Level Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap self-start sm:self-auto">
                <button
                  onClick={() => {
                    setDirectLevelFilter('all');
                    setDirectPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    directLevelFilter === 'all'
                      ? 'bg-[#1B6B35] text-white shadow-2xs'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Levels
                </button>
                {vaultLevels.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => {
                      setDirectLevelFilter(lvl.id);
                      setDirectPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      directLevelFilter === lvl.id
                        ? 'bg-[#1B6B35] text-white shadow-2xs'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {lvl.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Search within this category */}
            <div className="relative max-w-md">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search in all ${directCategoryMeta.shortName}...`}
                value={directCategorySearch}
                onChange={(e) => {
                  setDirectCategorySearch(e.target.value);
                  setDirectPage(1);
                }}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B6B35] bg-white"
              />
              {directCategorySearch && (
                <button
                  onClick={() => setDirectCategorySearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Materials List */}
            {directCategoryMaterials.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto">
                <p className="text-xs text-gray-500">
                  No {directCategoryMeta.shortName} found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setDirectCategorySearch('');
                    setDirectLevelFilter('all');
                  }}
                  className="text-xs font-bold text-[#1B6B35] hover:underline mt-2 inline-block"
                >
                  Reset Category Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500 px-1">
                  <span>
                    Showing{' '}
                    <strong className="text-gray-900">
                      {((directPage - 1) * ITEMS_PER_PAGE + 1).toLocaleString()}
                    </strong>{' '}
                    to{' '}
                    <strong className="text-gray-900">
                      {Math.min(directPage * ITEMS_PER_PAGE, directCategoryMaterials.length).toLocaleString()}
                    </strong>{' '}
                    of{' '}
                    <strong className="text-gray-900">
                      {directCategoryMaterials.length.toLocaleString()}
                    </strong>{' '}
                    files
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Page {directPage} of {totalDirectPages}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {paginatedDirectMaterials.map(({ material: mat, level: lvl, course: crs }) => {
                    const theme = getCategoryDetails(directCategoryMeta.key);
                    return (
                      <div
                        key={mat.id}
                        className="bg-white rounded-xl border border-gray-200/90 hover:border-[#1B6B35] p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 group flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div
                            onClick={() =>
                              setOpenedMaterial({
                                item: mat,
                                levelName: lvl.name,
                                courseName: crs.name,
                                categoryLabel: directCategoryMeta.shortName,
                              })
                            }
                            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 cursor-pointer transition-transform group-hover:scale-105 border ${theme.iconBg}`}
                            title={`Preview ${mat.title}`}
                          >
                            {theme.icon}
                          </div>

                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap text-[10px]">
                              <span className="bg-gray-100 text-gray-700 font-bold px-2 py-0.5 rounded">
                                {lvl.name}
                              </span>
                              <span className="bg-[#1B6B35]/10 text-[#1B6B35] font-bold px-2 py-0.5 rounded">
                                {crs.code}
                              </span>
                              <span className="bg-gray-100 text-gray-800 font-bold px-2 py-0.5 rounded uppercase border border-gray-200">
                                {mat.fileType}
                              </span>
                              <span className="text-gray-500 font-medium">
                                {mat.fileSize}
                              </span>
                            </div>

                            <h4
                              onClick={() =>
                                setOpenedMaterial({
                                  item: mat,
                                  levelName: lvl.name,
                                  courseName: crs.name,
                                  categoryLabel: directCategoryMeta.shortName,
                                })
                              }
                              className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#1B6B35] leading-snug break-words cursor-pointer transition"
                              title={`Preview ${mat.title}`}
                            >
                              {mat.title}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                          <button
                            onClick={() =>
                              setOpenedMaterial({
                                item: mat,
                                levelName: lvl.name,
                                courseName: crs.name,
                                categoryLabel: directCategoryMeta.shortName,
                              })
                            }
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:text-[#1B6B35] bg-gray-50 hover:bg-green-50/70 border border-gray-200 hover:border-[#1B6B35]/40 rounded-lg transition"
                          >
                            <Eye size={14} className="text-[#1B6B35]" />
                            <span>View</span>
                          </button>

                          <button
                            onClick={() => handleDownload(mat)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#1B6B35] hover:bg-[#155429] rounded-lg transition shadow-xs"
                          >
                            <Download size={14} />
                            <span>Download {mat.fileType}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Direct Page Pagination */}
                {totalDirectPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 mt-6 shadow-2xs">
                    <div className="text-xs text-gray-600">
                      Page <strong className="text-gray-900">{directPage}</strong> of{' '}
                      <strong className="text-gray-900">{totalDirectPages}</strong>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setDirectPage((p) => Math.max(1, p - 1));
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        disabled={directPage === 1}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
                      >
                        <ChevronLeft size={14} />
                        <span>Previous</span>
                      </button>

                      <button
                        onClick={() => {
                          setDirectPage((p) => Math.min(totalDirectPages, p + 1));
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        disabled={directPage === totalDirectPages}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
                      >
                        <span>Next</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* STEP 1: LEVEL SELECTION SCREEN */}
        {currentStep === 1 && !directCategoryMeta && (
          <section className="space-y-6 animate-fade-in">
            <div className="border-b border-gray-200/80 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B6B35]">
                Step 1 of 4
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
                Choose Your Academic Level
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Select your academic year to view all available courses and learning materials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {vaultLevels.map((lvl) => {
                const hasMaterials = lvl.totalMaterials > 0;

                return (
                  <div
                    key={lvl.id}
                    onClick={() => navigate(`/resources/${lvl.id}`)}
                    className={`bg-white rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg cursor-pointer group relative overflow-hidden ${
                      hasMaterials
                        ? 'border-gray-200 hover:border-[#1B6B35]'
                        : 'border-dashed border-gray-300 bg-gray-50/50 hover:border-gray-400'
                    }`}
                  >
                    {/* Level Number Watermark */}
                    <span className="absolute right-3 top-2 text-6xl sm:text-7xl font-black text-gray-100 group-hover:text-green-50 transition pointer-events-none select-none">
                      {lvl.number}
                    </span>

                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-green-50 text-[#1B6B35] flex items-center justify-center font-bold text-lg group-hover:bg-[#1B6B35] group-hover:text-white transition">
                          <GraduationCap size={24} />
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            hasMaterials
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {hasMaterials ? `${lvl.totalMaterials.toLocaleString()} Files` : 'Uploads Soon'}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-black text-gray-900 group-hover:text-[#1B6B35] transition">
                          {lvl.name}
                        </h3>
                        <div className="text-xs font-semibold text-[#F5B83D]">
                          {lvl.yearTitle}
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed min-h-[40px]">
                        {lvl.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-gray-100 relative z-10 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-500">
                        {lvl.totalCourses} {lvl.totalCourses === 1 ? 'Course' : 'Courses'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1B6B35] group-hover:translate-x-1 transition">
                        <span>Select</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* STEP 2: COURSE SELECTION SCREEN */}
        {currentStep === 2 && currentLevel && (
          <section className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B6B35]">
                  Step 2 of 4 — {currentLevel.name} ({currentLevel.yearTitle})
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
                  Select a Course
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Choose your course to view lecture notes, past examination papers, books, and tutorials.
                </p>
              </div>

              {/* Semester Filter Pills */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => setSelectedSemester('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedSemester === 'all'
                      ? 'bg-[#1B6B35] text-white shadow-2xs'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Semesters
                </button>
                <button
                  onClick={() => setSelectedSemester('Semester 1')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedSemester === 'Semester 1'
                      ? 'bg-[#1B6B35] text-white shadow-2xs'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Semester 1
                </button>
                <button
                  onClick={() => setSelectedSemester('Semester 2')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedSemester === 'Semester 2'
                      ? 'bg-[#1B6B35] text-white shadow-2xs'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Semester 2
                </button>
              </div>
            </div>

            {/* Course Search Filter */}
            {currentLevel.courses.length > 0 && (
              <div className="relative max-w-md">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${currentLevel.name} courses...`}
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B6B35] bg-white"
                />
                {courseSearch && (
                  <button
                    onClick={() => setCourseSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            )}

            {/* Courses List */}
            {currentLevel.courses.length === 0 ? (
              /* Friendly Empty State (Level 2) */
              <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center max-w-xl mx-auto my-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                  <Inbox size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {currentLevel.name} Materials Coming Soon
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  The MUISA Academic Committee is currently compiling and sorting study packs, lecture notes, and past examination papers for {currentLevel.name}.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Button onClick={() => navigate('/resources')} variant="gold-filled" size="sm">
                    Browse Other Levels
                  </Button>
                  <Button onClick={() => navigate('/contact')} variant="gold-outlined" size="sm">
                    Contribute Materials
                  </Button>
                </div>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                <p className="text-xs sm:text-sm text-gray-500">
                  No courses found matching your filter criteria.
                </p>
                <button
                  onClick={() => {
                    setCourseSearch('');
                    setSelectedSemester('all');
                  }}
                  className="text-xs font-bold text-[#1B6B35] hover:underline mt-2 inline-block"
                >
                  Reset Course Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCourses.map((c) => {
                  return (
                    <div
                      key={c.id}
                      onClick={() => navigate(`/resources/${currentLevel.id}/${c.id}`)}
                      className="bg-white rounded-xl border border-gray-200/90 hover:border-[#1B6B35] p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="bg-[#1B6B35] text-white text-[11px] font-bold px-2.5 py-0.5 rounded tracking-wide">
                            {c.code}
                          </span>
                          <span className="text-[11px] font-medium text-gray-500">
                            {c.semester}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-gray-900 group-hover:text-[#1B6B35] transition leading-snug">
                          {c.name}
                          {c.code && c.code !== 'General' && !c.name.toLowerCase().includes(c.code.toLowerCase()) && (
                            <span className="text-gray-500 font-semibold text-sm ml-1.5">
                              ({c.code})
                            </span>
                          )}
                        </h4>

                        {/* Breakdown pills */}
                        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[10px]">
                          {c.materialCounts.notes > 0 && (
                            <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 font-semibold px-2 py-0.5 rounded">
                              {c.materialCounts.notes} Notes
                            </span>
                          )}
                          {c.materialCounts.pastPapers > 0 && (
                            <span className="bg-amber-50 text-amber-800 border border-amber-100 font-semibold px-2 py-0.5 rounded">
                              {c.materialCounts.pastPapers} Past Papers
                            </span>
                          )}
                          {c.materialCounts.tutorials > 0 && (
                            <span className="bg-sky-50 text-sky-800 border border-sky-100 font-semibold px-2 py-0.5 rounded">
                              {c.materialCounts.tutorials} Tutorials
                            </span>
                          )}
                          {c.materialCounts.books > 0 && (
                            <span className="bg-purple-50 text-purple-800 border border-purple-100 font-semibold px-2 py-0.5 rounded">
                              {c.materialCounts.books} Books
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                        <span className="font-semibold text-gray-500">
                          {c.materialCounts.total} total {c.materialCounts.total === 1 ? 'file' : 'files'}
                        </span>
                        <span className="inline-flex items-center gap-1 font-bold text-[#1B6B35] group-hover:translate-x-1 transition">
                          <span>View Categories</span>
                          <ChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* STEP 3: MATERIAL TYPE SELECTION SCREEN */}
        {currentStep === 3 && currentLevel && currentCourse && (
          <section className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B6B35]">
                  Step 3 of 4 — {currentCourse.displayName || `${currentCourse.name} (${currentCourse.code})`} ({currentLevel.name})
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
                  Select Material Category
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Choose the kind of study materials you would like to explore for <strong>{currentCourse.displayName || `${currentCourse.name} (${currentCourse.code})`}</strong>.
                </p>
              </div>

              {/* Upper Right Corner: Course Outline Button */}
              {(() => {
                const outlines = currentCourse.materials.outlines || [];
                if (outlines.length === 0) {
                  return (
                    <div className="self-start sm:self-auto shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 text-gray-400 font-medium text-xs border border-gray-200">
                        <FileText size={14} />
                        <span>Outline Coming Soon</span>
                      </span>
                    </div>
                  );
                }

                if (outlines.length === 1) {
                  const o = outlines[0];
                  return (
                    <div className="self-start sm:self-auto shrink-0">
                      <button
                        onClick={() =>
                          setOpenedMaterial({
                            item: o,
                            levelName: currentLevel.name,
                            courseName: currentCourse.displayName || currentCourse.name,
                            categoryLabel: 'Course Outline',
                          })
                        }
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1B6B35] hover:bg-[#14532D] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-95 group"
                        title={`Preview ${o.fileName} (${o.fileSize})`}
                      >
                        <FileText size={16} className="text-[#C5A059] group-hover:rotate-6 transition-transform" />
                        <span>View Course Outline</span>
                        <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                          {o.fileType}
                        </span>
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="self-start sm:self-auto shrink-0 flex items-center gap-2 flex-wrap">
                    {outlines.slice(0, 2).map((o, idx) => (
                      <button
                        key={o.id}
                        onClick={() =>
                          setOpenedMaterial({
                            item: o,
                            levelName: currentLevel.name,
                            courseName: currentCourse.displayName || currentCourse.name,
                            categoryLabel: 'Course Outline',
                          })
                        }
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 ${
                          idx === 0
                            ? 'bg-[#1B6B35] hover:bg-[#14532D] text-white hover:shadow-md'
                            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                        }`}
                        title={`Preview ${o.fileName}`}
                      >
                        <FileText size={15} className={idx === 0 ? 'text-[#C5A059]' : 'text-[#1B6B35]'} />
                        <span>{idx === 0 ? 'Course Outline' : `Outline ${idx + 1}`}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          idx === 0 ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {o.fileType}
                        </span>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {MATERIAL_TYPES.filter((t) => t.key !== 'outlines').map((typeMeta: MaterialTypeMeta) => {
                const count = currentCourse.materialCounts[typeMeta.key] || 0;
                const theme = getCategoryDetails(typeMeta.key);
                const hasFiles = count > 0;

                // Don't render empty outline categories if count is 0
                if (typeMeta.key === 'outlines' && count === 0) return null;

                return (
                  <div
                    key={typeMeta.key}
                    onClick={() => {
                      if (hasFiles) {
                        navigate(
                          `/resources/${currentLevel.id}/${currentCourse.id}/${typeMeta.urlSlug}`
                        );
                      }
                    }}
                    className={`bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 shadow-xs ${
                      hasFiles
                        ? `hover:shadow-lg cursor-pointer group ${theme.cardHover} border-gray-200`
                        : 'border-dashed border-gray-200 bg-gray-50/60 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform ${
                            hasFiles ? 'group-hover:scale-105' : ''
                          } ${theme.iconBg}`}
                        >
                          {theme.icon}
                        </div>
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                            hasFiles
                              ? theme.badgeBg
                              : 'bg-gray-100 text-gray-500 border-gray-200'
                          }`}
                        >
                          {count} {count === 1 ? 'File' : 'Files'}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-lg font-black text-gray-900 group-hover:text-[#1B6B35] transition">
                          {typeMeta.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                          {typeMeta.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-400">
                        {hasFiles ? 'Ready to open' : 'No files yet'}
                      </span>
                      {hasFiles ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1B6B35] group-hover:translate-x-1 transition">
                          <span>Browse Files</span>
                          <ArrowRight size={14} />
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-400">Empty</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* STEP 4: MATERIAL LIST SCREEN */}
        {currentStep === 4 && currentLevel && currentCourse && currentTypeMeta && (
          <section className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B6B35]">
                  Step 4 of 4 — {currentCourse.displayName || `${currentCourse.name} (${currentCourse.code})`} • {currentTypeMeta.title}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
                  Available {currentTypeMeta.title} ({currentMaterials.length})
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Click <strong>View</strong> to read in browser, or <strong>Download</strong> to save the original file.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Course Outline quick button in upper right */}
                {(() => {
                  const outlineFile = currentCourse.materials.outlines?.[0];
                  if (outlineFile) {
                    return (
                      <button
                        onClick={() =>
                          setOpenedMaterial({
                            item: outlineFile,
                            levelName: currentLevel.name,
                            courseName: currentCourse.displayName || currentCourse.name,
                            categoryLabel: 'Course Outline',
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#1B6B35] border border-emerald-200 font-bold text-xs shadow-2xs transition shrink-0"
                        title={`Preview course outline (${outlineFile.fileType})`}
                      >
                        <FileText size={13} className="text-[#1B6B35]" />
                        <span>Course Outline</span>
                      </button>
                    );
                  }
                  return null;
                })()}

                {/* Material Search within this category */}
                <div className="relative w-full sm:w-72">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search in ${currentTypeMeta.shortName}...`}
                  value={materialSearch}
                  onChange={(e) => {
                    setMaterialSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-7 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B6B35] bg-white"
                />
                {materialSearch && (
                  <button
                    onClick={() => setMaterialSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>
              </div>

            {/* List */}
            {currentMaterials.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
                  <FileText size={28} />
                </div>
                <h4 className="text-base font-bold text-gray-800">No materials found</h4>
                <p className="text-xs text-gray-500 mt-1">
                  {materialSearch
                    ? `No ${currentTypeMeta.shortName} match your search "${materialSearch}".`
                    : `No ${currentTypeMeta.shortName} uploaded for this course yet.`}
                </p>
                <div className="mt-4">
                  <Button
                    onClick={() =>
                      navigate(`/resources/${currentLevel.id}/${currentCourse.id}`)
                    }
                    variant="gold-outlined"
                    size="sm"
                  >
                    Choose Another Category
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Pagination Summary */}
                <div className="flex items-center justify-between text-xs text-gray-500 px-1">
                  <span>
                    Showing{' '}
                    <strong className="text-gray-900">
                      {((currentPage - 1) * ITEMS_PER_PAGE + 1).toLocaleString()}
                    </strong>{' '}
                    to{' '}
                    <strong className="text-gray-900">
                      {Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        currentMaterials.length
                      ).toLocaleString()}
                    </strong>{' '}
                    of{' '}
                    <strong className="text-gray-900">
                      {currentMaterials.length.toLocaleString()}
                    </strong>{' '}
                    files
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>

                {/* Responsive Materials Grid: YouTube Design for Videos, Certificate/Doc Design for Documents */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {paginatedMaterials.map((mat: MaterialItem) => {
                    const isVideo = mat.fileType === 'MP4' || mat.fileType === 'WEBM';

                    if (isVideo) {
                      return (
                        <div
                          key={mat.id}
                          className="bg-white rounded-2xl border border-gray-200/90 hover:border-red-500 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                        >
                          {/* 16:9 Video Thumbnail Header (YouTube style) */}
                          <div
                            onClick={() =>
                              setOpenedMaterial({
                                item: mat,
                                levelName: currentLevel.name,
                                courseName: currentCourse.name,
                                categoryLabel: currentTypeMeta.shortName,
                              })
                            }
                            className="relative aspect-video w-full bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-800 flex items-center justify-center cursor-pointer overflow-hidden"
                          >
                            {/* Subtle radial red glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.22),transparent_70%)]" />

                            {/* Center YouTube Red Play Button */}
                            <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#CC0000] transition-all duration-200 pl-1">
                              <Play size={24} fill="currentColor" className="text-white" />
                            </div>

                            {/* Top Badges: Video & Format */}
                            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                              <span className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase border border-white/10 flex items-center gap-1">
                                <Video size={11} className="text-red-400" />
                                <span>VIDEO</span>
                              </span>
                              <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded tracking-widest uppercase">
                                {mat.fileType}
                              </span>
                            </div>

                            {/* Bottom Right Duration / Size Badge (classic YouTube style) */}
                            <div className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm border border-white/10">
                              {mat.fileSize}
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                            <div className="space-y-1.5">
                              <h4
                                onClick={() =>
                                  setOpenedMaterial({
                                    item: mat,
                                    levelName: currentLevel.name,
                                    courseName: currentCourse.name,
                                    categoryLabel: currentTypeMeta.shortName,
                                  })
                                }
                                className="text-sm font-bold text-gray-900 group-hover:text-red-600 leading-snug break-words cursor-pointer transition line-clamp-2"
                                title={`Watch ${mat.title}`}
                              >
                                {mat.title}
                              </h4>

                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <span className="font-bold text-gray-700">{currentCourse.code}</span>
                                <span>•</span>
                                <span className="truncate">{currentCourse.name}</span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                              <button
                                onClick={() =>
                                  setOpenedMaterial({
                                    item: mat,
                                    levelName: currentLevel.name,
                                    courseName: currentCourse.name,
                                    categoryLabel: currentTypeMeta.shortName,
                                  })
                                }
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#FF0000] hover:bg-[#CC0000] rounded-xl transition shadow-2xs group-hover:shadow-md active:scale-95"
                              >
                                <Play size={13} fill="currentColor" />
                                <span>Watch Video</span>
                              </button>

                              <button
                                onClick={() => handleDownload(mat)}
                                className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition active:scale-95"
                                title={`Download ${mat.fileType} (${mat.fileSize})`}
                              >
                                <Download size={15} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Document Card (PDF, PPT, DOCX, etc.) Inspired by Image 4 Certificate/Academic Mockup
                    return (
                      <div
                        key={mat.id}
                        className="bg-white rounded-2xl border border-gray-200/90 hover:border-[#1B6B35] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                      >
                        {/* Document Preview Mockup Header */}
                        <div
                          onClick={() =>
                            setOpenedMaterial({
                              item: mat,
                              levelName: currentLevel.name,
                              courseName: currentCourse.name,
                              categoryLabel: currentTypeMeta.shortName,
                            })
                          }
                          className="relative h-36 w-full bg-linear-to-br from-emerald-50/60 via-gray-50 to-amber-50/40 border-b border-gray-100 flex items-center justify-center cursor-pointer overflow-hidden p-3"
                        >
                          {/* Inner Certificate/Document Sheet Card */}
                          <div className="relative w-44 h-28 bg-white rounded-lg shadow-xs border border-gray-200/80 p-2.5 flex flex-col justify-between group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
                            {/* Inner dashed accent border */}
                            <div className="absolute inset-1 border border-dashed border-[#1B6B35]/20 rounded pointer-events-none" />

                            {/* Top row: Crest & Mzuni ICT header */}
                            <div className="flex items-center justify-between relative z-10">
                              <div className="w-5 h-5 rounded-full bg-[#1B6B35]/10 text-[#1B6B35] flex items-center justify-center">
                                <GraduationCap size={12} className="text-[#1B6B35]" />
                              </div>
                              <span className="text-[8px] font-black tracking-widest text-[#C5A059] uppercase">
                                MZUNI ICT
                              </span>
                            </div>

                            {/* Simulated document lines */}
                            <div className="space-y-1 relative z-10 px-0.5">
                              <div className="h-1.5 bg-gray-200 rounded w-3/4" />
                              <div className="h-1 bg-gray-100 rounded w-full" />
                              <div className="h-1 bg-gray-100 rounded w-5/6" />
                            </div>

                            {/* Bottom row: Official archive & file format */}
                            <div className="flex items-center justify-between relative z-10">
                              <span className="text-[8px] font-bold text-gray-400">OFFICIAL REPO</span>
                              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-emerald-100/80 text-[#1B6B35] uppercase">
                                {mat.fileType}
                              </span>
                            </div>
                          </div>

                          {/* Top Right Floating Badge */}
                          <div className="absolute top-2.5 right-2.5 z-10">
                            <span className="bg-white/95 backdrop-blur-xs text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs border border-gray-200/80 uppercase">
                              {mat.fileType}
                            </span>
                          </div>

                          {/* Hover Overlay with Preview prompt */}
                          <div className="absolute inset-0 bg-[#1B6B35]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1.5 text-white font-bold text-xs backdrop-blur-2xs">
                            <Eye size={16} />
                            <span>Preview Document</span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                          <div className="space-y-2">
                            {/* Title */}
                            <h4
                              onClick={() =>
                                setOpenedMaterial({
                                  item: mat,
                                  levelName: currentLevel.name,
                                  courseName: currentCourse.name,
                                  categoryLabel: currentTypeMeta.shortName,
                                })
                              }
                              className="text-sm font-bold text-gray-900 group-hover:text-[#1B6B35] leading-snug break-words cursor-pointer transition line-clamp-2"
                              title={`Preview ${mat.title}`}
                            >
                              {mat.title}
                            </h4>

                            {/* Course Subtitle */}
                            <div className="text-xs text-gray-500 flex items-center gap-1.5">
                              <span className="font-bold text-[#1B6B35]">{currentCourse.code}</span>
                              <span>•</span>
                              <span className="truncate">{currentCourse.name}</span>
                            </div>

                            {/* Metadata Badges */}
                            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                              <span className="bg-emerald-50 text-[#1B6B35] font-bold text-[10px] px-2 py-0.5 rounded border border-emerald-200/60 uppercase">
                                {mat.fileType}
                              </span>
                              <span className="bg-amber-50 text-[#92400E] font-semibold text-[10px] px-2 py-0.5 rounded border border-amber-200/60">
                                {mat.fileSize}
                              </span>
                              <span className="bg-gray-100 text-gray-600 font-medium text-[10px] px-2 py-0.5 rounded">
                                {currentTypeMeta.shortName}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                            <button
                              onClick={() =>
                                setOpenedMaterial({
                                  item: mat,
                                  levelName: currentLevel.name,
                                  courseName: currentCourse.name,
                                  categoryLabel: currentTypeMeta.shortName,
                                })
                              }
                              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-700 hover:text-[#1B6B35] bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-[#1B6B35]/40 rounded-xl transition active:scale-95"
                            >
                              <Eye size={13} className="text-[#1B6B35]" />
                              <span>View</span>
                            </button>

                            <button
                              onClick={() => handleDownload(mat)}
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#1B6B35] hover:bg-[#155429] rounded-xl transition shadow-2xs group-hover:shadow-md active:scale-95"
                              title={`Download ${mat.fileType} (${mat.fileSize})`}
                            >
                              <Download size={13} />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 mt-6 shadow-2xs">
                    <div className="text-xs text-gray-600">
                      Page <strong className="text-gray-900">{currentPage}</strong> of{' '}
                      <strong className="text-gray-900">{totalPages}</strong>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
                      >
                        <ChevronLeft size={14} />
                        <span>Previous</span>
                      </button>

                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum = currentPage - 2 + i;
                        if (currentPage < 3) pageNum = i + 1;
                        if (currentPage > totalPages - 2) pageNum = totalPages - 4 + i;
                        if (pageNum < 1 || pageNum > totalPages) return null;

                        return (
                          <button
                            key={pageNum}
                            onClick={() => {
                              setCurrentPage(pageNum);
                              window.scrollTo({ top: 350, behavior: 'smooth' });
                            }}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                              currentPage === pageNum
                                ? 'bg-[#1B6B35] text-white shadow-2xs'
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
                      >
                        <span>Next</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Informative Guidance Banner */}
        <section className="mt-14 relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-emerald-50/40 p-6 sm:p-8 border border-gray-200/90 shadow-sm">
          {/* Subtle decorative background glow */}
          <div className="absolute -top-16 -right-16 w-52 h-52 bg-[#1B6B35]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-[#C5A059]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200/70">
            {/* Column 1: Missing an Examination Paper? */}
            <div className="flex items-start gap-4 sm:gap-5 pb-6 md:pb-0 md:pr-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 text-[#1B6B35] flex items-center justify-center shrink-0 border border-emerald-200/60 shadow-2xs">
                <FileCheck size={22} className="text-[#1B6B35]" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B6B35]">
                  Contribute Study Materials
                </span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Missing an Examination Paper?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  If you have past test papers or lecture slides from previous semesters that aren't listed, share them with the MUISA Academic Committee to help fellow students.
                </p>
                <div className="pt-1">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1B6B35] hover:text-[#14532D] hover:underline group"
                  >
                    <span>Submit Material to MUISA</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 2: Mzuzu University Virtual Library */}
            <div className="flex items-start gap-4 sm:gap-5 pt-6 md:pt-0 md:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/70 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200/60 shadow-2xs">
                <BookOpen size={22} className="text-[#C5A059]" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">
                    Institutional Repository
                  </span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                    Campus Network
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  MZUZU UNIVERSITY virtual LIBRARY
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Access official university e-library portals, IEEE Xplore, and research repositories through the main university network.
                </p>
                <div className="pt-1">
                  <a
                    href="http://192.168.1.21/handle/123456789/1680"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1B6B35] hover:text-[#14532D] hover:underline group"
                  >
                    <span>Visit Mzuni Virtual Library</span>
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      {openedMaterial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-fade-in"
          onClick={() => setOpenedMaterial(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  {openedMaterial.levelName && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-800">
                      {openedMaterial.levelName}
                    </span>
                  )}
                  {openedMaterial.courseName && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1B6B35] text-white">
                      {openedMaterial.courseName}
                    </span>
                  )}
                  {openedMaterial.categoryLabel && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      {openedMaterial.categoryLabel}
                    </span>
                  )}
                  <span className="text-[11px] font-semibold text-gray-500">
                    {openedMaterial.item.fileType} • {openedMaterial.item.fileSize}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug break-words">
                  {openedMaterial.item.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleCopyLink(openedMaterial.item)}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition"
                  title="Copy link"
                >
                  <Copy size={16} />
                </button>
                <button
                  onClick={() => window.open(openedMaterial.item.downloadUrl, '_blank')}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition"
                  title="Open in new window"
                >
                  <ExternalLink size={16} />
                </button>
                <button
                  onClick={() => setOpenedMaterial(null)}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition"
                  aria-label="Close viewer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body Preview */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-gray-100 flex flex-col items-center justify-center min-h-[350px]">
              {openedMaterial.item.fileType === 'PDF' ? (
                <div className="w-full h-[65vh] bg-white rounded-xl shadow-xs overflow-hidden border border-gray-200 flex flex-col">
                  <iframe
                    src={openedMaterial.item.downloadUrl}
                    className="w-full h-full border-0"
                    title={openedMaterial.item.title}
                  />
                </div>
              ) : openedMaterial.item.fileType === 'MP4' || openedMaterial.item.fileType === 'WEBM' ? (
                <div className="w-full max-w-3xl bg-black rounded-xl overflow-hidden shadow-lg">
                  <video
                    src={openedMaterial.item.downloadUrl}
                    controls
                    className="w-full max-h-[60vh]"
                    autoPlay={false}
                  >
                    Your browser does not support video playback.
                  </video>
                </div>
              ) : ['JPG', 'JPEG', 'PNG', 'WEBP', 'SVG'].includes(openedMaterial.item.fileType) ? (
                <div className="max-w-2xl bg-white p-2 rounded-xl shadow-xs border border-gray-200">
                  <img
                    src={openedMaterial.item.downloadUrl}
                    alt={openedMaterial.item.title}
                    className="max-h-[60vh] object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-green-50 text-[#1B6B35] flex items-center justify-center mx-auto">
                    <FileText size={32} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                      Original Document
                    </span>
                    <h4 className="text-sm font-bold font-mono text-gray-900 break-all mt-1">
                      {openedMaterial.item.fileName}
                    </h4>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      Native <strong>{openedMaterial.item.fileType}</strong> file ({openedMaterial.item.fileSize}). You can open it in your browser or download directly.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <button
                      onClick={() => window.open(openedMaterial.item.downloadUrl, '_blank')}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold border border-gray-300 hover:bg-gray-50 text-gray-700 transition"
                    >
                      <ExternalLink size={14} />
                      <span>Open in Browser</span>
                    </button>
                    <button
                      onClick={() => handleDownload(openedMaterial.item)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#1B6B35] hover:bg-[#155429] text-white transition shadow-xs"
                    >
                      <Download size={14} />
                      <span>Download File</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-gray-500 truncate max-w-xl">
                <span>Original File Name: </span>
                <code className="text-gray-800 bg-gray-100 px-2 py-0.5 rounded text-[11px] font-mono">
                  {openedMaterial.item.fileName}
                </code>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  onClick={() => window.open(openedMaterial.item.downloadUrl, '_blank')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition border border-gray-200"
                >
                  <ExternalLink size={13} />
                  <span>Open in Tab</span>
                </button>
                <button
                  onClick={() => handleDownload(openedMaterial.item)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#1B6B35] hover:bg-[#155429] text-white rounded-lg transition shadow-xs"
                >
                  <Download size={13} />
                  <span>Download ({openedMaterial.item.fileSize})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {downloadSuccessItem && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B6B35] text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 animate-slide-up border border-white/20">
          <CheckCircle2 size={20} className="text-[#F5B83D]" />
          <div>
            <div className="text-xs font-bold">Download Started!</div>
            <div className="text-[11px] text-white/80">Saving file to your device.</div>
          </div>
        </div>
      )}

      {/* Copied Link Toast */}
      {copiedLink && (
        <div className="fixed bottom-6 left-6 z-50 bg-gray-900 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 animate-slide-up border border-gray-700">
          <CheckCircle2 size={18} className="text-green-400" />
          <div className="text-xs font-semibold">Direct link copied to clipboard!</div>
        </div>
      )}
    </div>
  );
};
