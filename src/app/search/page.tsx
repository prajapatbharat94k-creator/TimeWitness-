'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search as SearchIcon, 
  Sparkles, 
  Clock, 
  Flame, 
  ArrowUpRight, 
  Filter, 
  RefreshCw, 
  History, 
  X, 
  BookOpen, 
  ShieldAlert, 
  UserCheck 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { FEATURED_EXPERIENCES, INDIAN_CATEGORIES, WORLD_CATEGORIES } from '@/data/historicalCatalog';

const SEARCH_TYPES = [
  'All Types',
  'People',
  'Events',
  'Places',
  'Civilizations',
  'Wars',
  'Movements',
  'Historical Periods',
];

const POPULAR_SEARCHES = [
  'Coronation of Chhatrapati Shivaji Maharaj',
  'Rani Lakshmibai 1857',
  'Napoleon Bonaparte at Waterloo',
  'Cleopatra VII of Egypt',
  'Julius Caesar crossing the Rubicon',
  'Indus Valley Civilization',
  'Ashoka the Great Kalinga',
  'French Revolution Bastille',
  'Apollo 11 Moon Landing',
  'Mahatma Gandhi Dandi March',
  'Alexander the Great',
  'Leonardo da Vinci Florence',
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { currentLang, recentSearches, addRecentSearch, clearRecentSearches } = useApp();

  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [isLoading, setIsLoading] = useState(false);
  const [wikiResult, setWikiResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync with ?q= param
  useEffect(() => {
    const qParam = searchParams.get('q');
    if (qParam && qParam.trim()) {
      setQuery(qParam.trim());
      executeSearch(qParam.trim());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const executeSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    setErrorMessage(null);
    setWikiResult(null);

    // Track search in context
    addRecentSearch(searchTerm);

    try {
      // Connect to existing real backend Wikipedia/Supabase endpoint
      const res = await fetch(`/api/wiki-history?query=${encodeURIComponent(searchTerm)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.found && data.data) {
          setWikiResult(data.data);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error communicating with historical knowledge base');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    executeSearch(query.trim());
  };

  // Local catalog matches
  const catalogMatches = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return FEATURED_EXPERIENCES.filter(exp => {
      const matchesQuery = exp.title.toLowerCase().includes(q) ||
        exp.description.toLowerCase().includes(q) ||
        exp.tags.some(t => t.toLowerCase().includes(q));

      if (!matchesQuery) return false;

      if (selectedType === 'All Types') return true;
      if (selectedType === 'People') return exp.tags.includes('Warrior King') || exp.tags.includes('Pharaoh') || exp.tags.includes('Caesar') || exp.tags.includes('Emperor') || exp.tags.includes('Science') || exp.tags.includes('Freedom Movement');
      if (selectedType === 'Events') return exp.tags.includes('1857') || exp.tags.includes('Bastille') || exp.tags.includes('Waterloo') || exp.tags.includes('Moon');
      if (selectedType === 'Wars') return exp.tags.includes('War') || exp.tags.includes('Battle') || exp.tags.includes('Waterloo') || exp.tags.includes('WWII');
      if (selectedType === 'Civilizations') return exp.tags.includes('Civilization') || exp.tags.includes('Empire') || exp.tags.includes('Egypt') || exp.tags.includes('Rome');
      if (selectedType === 'Movements') return exp.tags.includes('Freedom Struggle') || exp.tags.includes('Civil Rights') || exp.tags.includes('Satyagraha');
      if (selectedType === 'Historical Periods') return exp.epoch === 'Ancient' || exp.epoch === 'Medieval' || exp.epoch === 'Early Modern';
      return true;
    });
  }, [query, selectedType]);

  // Suggested keywords based on input
  const suggestions = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    return POPULAR_SEARCHES.filter(item => item.toLowerCase().includes(q)).slice(0, 5);
  }, [query]);

  return (
    <div className="min-h-screen pb-24">
      
      {/* Search Header Banner */}
      <section className="relative py-12 sm:py-16 border-b border-[#242434] bg-[#0A0A0E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-3">
            <SearchIcon className="w-3.5 h-3.5" />
            <span>{currentLang === 'EN' ? 'Global Universal Search' : 'वैश्विक खोज केंद्र'}</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-[#F8FAFC]">
            {currentLang === 'EN' ? 'SEARCH THE ARCHIVES' : 'ऐतिहासिक अभिलेखागार खोजें'}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#94A3B8]">
            {currentLang === 'EN'
              ? 'Query millions of verified primary events, figures, places, and turning points.'
              : 'लाखों सत्यापित घटनाओं, ऐतिहासिक हस्तियों, सभ्यताओं और क्रांतियों को खोजें।'}
          </p>

          {/* Search Input Box */}
          <form onSubmit={handleFormSubmit} className="mt-8 relative max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <SearchIcon className="absolute left-4 w-5 h-5 text-[#D4AF37]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={currentLang === 'EN' ? 'Search by person, battle, movement, civilization, or year...' : 'व्यक्ति, युद्ध, आंदोलन, सभ्यता या वर्ष से खोजें...'}
                className="w-full pl-12 pr-28 py-4 rounded-2xl bg-[#14141C] border border-[#242434] focus:border-[#D4AF37] text-[#F8FAFC] placeholder-[#64748B] text-base outline-none shadow-2xl transition-all"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-24 text-[#64748B] hover:text-white text-xs px-2 py-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-cinzel font-bold text-xs tracking-wide shadow-gold-glow hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : (currentLang === 'EN' ? 'Search' : 'खोजें')}
              </button>
            </div>

            {/* Live Search Suggestions dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#14141C] border border-[#242434] rounded-2xl p-2 shadow-2xl z-40 text-left">
                <span className="text-[10px] font-mono text-[#64748B] uppercase px-3 py-1 block">
                  {currentLang === 'EN' ? 'Suggestions' : 'सुझाव'}
                </span>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setQuery(s);
                      executeSearch(s);
                    }}
                    className="w-full px-3 py-2 text-xs text-[#CBD5E1] hover:bg-[#1E1E2D] hover:text-[#FFF3C4] rounded-xl text-left flex items-center gap-2 transition-colors"
                  >
                    <SearchIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            )}
          </form>

          {/* Type Filter Pills */}
          <div className="mt-6 flex items-center justify-center gap-1.5 flex-wrap text-xs">
            {SEARCH_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-full transition-all ${
                  selectedType === type
                    ? 'bg-[#D4AF37] text-black font-semibold shadow-gold-glow'
                    : 'bg-[#14141C] border border-[#242434] text-[#94A3B8] hover:border-[#D4AF37]/40 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Main Results or Discovery Helper */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-center py-16">
            <RefreshCw className="w-10 h-10 text-[#D4AF37] animate-spin mx-auto mb-3" />
            <p className="text-sm font-mono text-[#FFF3C4]">
              {currentLang === 'EN' ? 'Querying archival index and primary sources...' : 'अभिलेखों और प्राथमिक स्रोतों की खोज जारी है...'}
            </p>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Real Backend Wikipedia / Knowledge Result */}
        {!isLoading && wikiResult && (
          <div className="bg-[#14141C] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {currentLang === 'EN' ? 'Verified Encyclopedic Archival Match' : 'सत्यापित प्राथमिक अभिलेख'}
              </span>
              {wikiResult.era && (
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#FFF3C4] border border-[#D4AF37]/30">
                  {wikiResult.era}
                </span>
              )}
            </div>

            <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] mb-1">
              {wikiResult.title}
            </h2>
            {wikiResult.description && (
              <p className="text-xs font-mono text-[#CBD5E1] mb-4">
                {wikiResult.description}
              </p>
            )}

            <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
              {wikiResult.extract}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#242434]">
              <Link
                href={`/witness?topic=${encodeURIComponent(wikiResult.title)}`}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-cinzel font-bold text-xs tracking-wide shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>{currentLang === 'EN' ? 'Witness This Chronicle in 5 Scenes' : '5 दृश्यों में साक्षी बनें'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              {wikiResult.page_url && (
                <a
                  href={wikiResult.page_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#64748B] hover:text-[#D4AF37] font-mono underline"
                >
                  {currentLang === 'EN' ? 'View Wikipedia Article ↗' : 'विकिपीडिया लेख देखें ↗'}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Local Catalog Matches */}
        {!isLoading && catalogMatches.length > 0 && (
          <div>
            <h3 className="font-cinzel text-xl font-bold text-[#F8FAFC] mb-4">
              {currentLang === 'EN' ? 'Matching Historical Experiences' : 'मेल खाते ऐतिहासिक अनुभव'} ({catalogMatches.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {catalogMatches.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] mb-2">
                      <span className="text-[#D4AF37]">{item.region}</span>
                      <span>{item.timeframe}</span>
                    </div>
                    <h4 className="font-cinzel text-lg font-bold text-[#F8FAFC] group-hover:text-[#FFF3C4] transition-colors">
                      {currentLang === 'EN' ? item.title : item.titleHi}
                    </h4>
                    <p className="text-xs text-[#94A3B8] mt-1 line-clamp-2">
                      {currentLang === 'EN' ? item.description : item.descriptionHi}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#1C1C28] flex items-center justify-between">
                    <Link
                      href={`/witness?topic=${encodeURIComponent(item.searchQuery)}`}
                      className="text-xs font-bold text-[#D4AF37] group-hover:underline flex items-center gap-1"
                    >
                      <span>Witness Story</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/experience/${item.id}`}
                      className="text-xs text-[#64748B] hover:text-white"
                    >
                      Dossier
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results State */}
        {!isLoading && hasSearched && !wikiResult && catalogMatches.length === 0 && (
          <div className="text-center py-16 bg-[#14141C] rounded-3xl border border-[#242434] p-8">
            <BookOpen className="w-12 h-12 text-[#64748B] mx-auto mb-3" />
            <h3 className="font-cinzel text-xl font-bold text-[#F8FAFC]">
              {currentLang === 'EN' ? 'No Direct Archival Matches Found' : 'कोई सीधा मेल नहीं मिला'}
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto mt-2">
              {currentLang === 'EN'
                ? `You can still command the AI Narrative Engine to reconstruct this topic directly.`
                : `आप सीधे एआई इंजन को इस विषय पर आख्यान तैयार करने का निर्देश दे सकते हैं।`}
            </p>
            <div className="mt-6">
              <Link
                href={`/witness?topic=${encodeURIComponent(query)}`}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-cinzel font-bold text-xs shadow-gold-glow inline-flex items-center gap-2"
              >
                <span>{currentLang === 'EN' ? `Generate "${query}" with Gemini 2.0` : `"${query}" पर कहानी बनाएं`}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Recent Searches Section */}
        {recentSearches.length > 0 && (
          <div className="pt-6 border-t border-[#242434]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase">
                <History className="w-4 h-4" />
                <span>{currentLang === 'EN' ? 'Your Recent Searches' : 'आपकी हालिया खोजें'}</span>
              </div>
              <button
                onClick={clearRecentSearches}
                className="text-xs text-[#64748B] hover:text-red-400 transition-colors"
              >
                {currentLang === 'EN' ? 'Clear History' : 'इतिहास हटाएं'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setQuery(item);
                    executeSearch(item);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#14141C] border border-[#242434] text-xs text-[#CBD5E1] hover:border-[#D4AF37]/40 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <Clock className="w-3 h-3 text-[#64748B]" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Searches Section */}
        <div className="pt-6 border-t border-[#242434]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase mb-4">
            <Flame className="w-4 h-4 text-[#D4AF37]" />
            <span>{currentLang === 'EN' ? 'Popular Historical Inquiries' : 'लोकप्रिय ऐतिहासिक विषय'}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  executeSearch(term);
                }}
                className="p-3 rounded-xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 text-left text-xs text-[#94A3B8] hover:text-[#FFF3C4] transition-all flex items-center justify-between group"
              >
                <span className="truncate">{term}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 text-[#D4AF37]" />
              </button>
            ))}
          </div>
        </div>

      </main>

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-[#D4AF37]">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
