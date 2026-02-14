import React, { useState } from 'react';
import { AppSection, Monument } from './types';
import { INITIAL_MONUMENTS, AGENTS } from './constants';
import GlobeIntro from './components/GlobeIntro';
import StoryViewer from './components/StoryViewer';
import ExplorerMap from './components/ExplorerMap';
import Navbar from './components/Navbar';
import { searchMonumentInfo } from './services/geminiService';
import { Search, Loader2, Sparkles, MapPin, ArrowRight, AlertCircle, X, Users, ShieldCheck, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [section, setSection] = useState<AppSection>(AppSection.INTRO);
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [showCredits, setShowCredits] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    
    setSearchError(null);
    setIsSearching(true);
    
    try {
      const result = await searchMonumentInfo(query);
      if (result) {
        setSelectedMonument(result);
        setSection(AppSection.STORY);
        setSearchQuery(''); // Clear for next time
      } else {
        setSearchError("The Gateway could not establish an institutional link for this query. Try a more verified site name.");
      }
    } catch (err) {
      setSearchError("Protocol interrupted. Re-authenticating Gateway link...");
    } finally {
      setIsSearching(false);
    }
  };

  const handleMonumentSelect = (m: Monument) => {
    setSelectedMonument(m);
    setSection(AppSection.STORY);
  };

  if (section === AppSection.INTRO) {
    return <GlobeIntro onComplete={() => setSection(AppSection.HOME)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fbf9f4] transition-all duration-1000 relative font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
      
      {/* Inline styles for globe animation */}
      <style>{`
        @keyframes earthRotate {
          0% { background-position: 0 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* 
        ---------------------------------------------------------
        EARTH GLOBE LOADING SCREEN
        ---------------------------------------------------------
      */}
      {isSearching && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center animate-in fade-in duration-700">
           
           <div className="relative w-64 h-64 md:w-80 md:h-80">
             {/* Atmosphere Glow */}
             <div className="absolute inset-0 rounded-full shadow-[0_0_80px_rgba(59,130,246,0.3)] z-0"></div>
             
             {/* Earth Sphere */}
             <div 
               className="w-full h-full rounded-full relative z-10 shadow-[inset_10px_10px_50px_rgba(0,0,0,0.8)]"
               style={{
                 backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/1024px-Blue_Marble_2002.png')",
                 backgroundSize: 'auto 100%',
                 animation: 'earthRotate 25s linear infinite',
                 boxShadow: 'inset 20px 0 50px 10px rgba(0,0,0,0.8), 0 0 20px rgba(100,149,237,0.2)'
               }}
             />

             {/* Orbital Ring (Optional Cosmetic) */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full z-0 animate-spin duration-[20s]" />
           </div>
           
           <div className="mt-12 text-center space-y-4 relative z-20">
               <h3 className="font-rasa text-4xl italic text-white animate-pulse">"{searchQuery}"</h3>
               <div className="flex flex-col items-center gap-2">
                 <p className="text-[10px] font-heritage uppercase tracking-[0.4em] text-amber-500/60">
                  Scanning Global Archives
                </p>
               </div>
           </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 md:p-14 flex justify-between items-center z-50 pointer-events-none">
        <div className="flex items-center gap-6 group cursor-pointer pointer-events-auto" onClick={() => setSection(AppSection.HOME)}>
           <div className="w-12 h-[2px] bg-gradient-to-r from-amber-500 to-transparent transition-all group-hover:w-20" />
           <span className="font-heritage text-amber-100 tracking-[0.5em] text-[11px] uppercase font-bold drop-shadow-sm">Seek Thee Rasa</span>
        </div>
        <div className="pointer-events-auto flex items-center gap-10">
           <div className="hidden md:flex gap-12">
              <button onClick={() => setSection(AppSection.HOME)} className={`text-[10px] font-heritage uppercase tracking-[0.4em] transition-all font-bold ${section === AppSection.HOME ? 'text-amber-500' : 'text-white/40 hover:text-white'}`}>Archive</button>
              <button onClick={() => setSection(AppSection.EXPLORER)} className={`text-[10px] font-heritage uppercase tracking-[0.4em] transition-all font-bold ${section === AppSection.EXPLORER ? 'text-amber-500' : 'text-white/40 hover:text-white'}`}>Map</button>
           </div>
           <div className="p-4 hover:bg-white/5 rounded-full transition-all cursor-pointer border border-transparent hover:border-white/10" onClick={() => setShowCredits(true)}>
             <Users size={20} className="text-white/60 hover:text-white transition-all" />
           </div>
        </div>
      </nav>

      {/* Error Context Toast */}
      {searchError && (
        <div className="fixed top-32 left-1/2 -translate-x-1/2 z-[150] w-full max-w-lg animate-in slide-in-from-top-6 duration-700 px-8">
          <div className="bg-red-950/40 backdrop-blur-2xl border border-red-500/20 p-8 rounded-[2rem] flex items-center gap-8 shadow-4xl">
            <div className="bg-red-500/10 p-4 rounded-full">
              <AlertCircle className="text-red-500" size={24} />
            </div>
            <div className="flex-1">
              <p className="text-red-100 text-sm italic font-medium leading-relaxed">{searchError}</p>
            </div>
            <button onClick={() => setSearchError(null)} className="p-2 text-red-500/30 hover:text-red-500 transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Credits Modal */}
      {showCredits && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-8 animate-in fade-in duration-300" onClick={() => setShowCredits(false)}>
           <div className="bg-zinc-900 border border-white/10 rounded-[2rem] p-12 max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowCredits(false)} className="absolute top-8 right-8 text-white/40 hover:text-white"><X size={24} /></button>
              <h2 className="font-rasa text-5xl italic text-white mb-2">The Agents</h2>
              <p className="font-heritage text-[10px] uppercase tracking-[0.4em] text-amber-500 mb-10">Digital Curators of the Studio</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {AGENTS.map((agent, i) => (
                  <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <h3 className="font-heritage text-[11px] uppercase tracking-[0.2em] font-bold text-white mb-1">{agent.name}</h3>
                    <p className="text-amber-500/80 text-xs mb-3 font-mono">{agent.role}</p>
                    <p className="font-display text-white/50 text-sm leading-relaxed">{agent.contribution}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="relative pt-32 pb-56 px-6 md:px-10 max-w-8xl mx-auto">
        
        {/* Section: HOME */}
        {section === AppSection.HOME && (
          <div className="fade-in-up space-y-40">
            {/* Redesigned Modern Hero Title */}
            <div className="text-center relative py-32 md:py-40">
               <h1 className="font-rasa text-[6rem] md:text-[12rem] leading-[0.85] text-white italic tracking-tight relative z-10 mix-blend-overlay opacity-90">
                 Seek Thee Rasa
               </h1>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg text-center z-20">
                  <p className="font-heritage text-[10px] md:text-[12px] tracking-[0.8em] uppercase text-amber-500 font-bold mb-6 bg-black/20 backdrop-blur-sm py-2 px-4 rounded-full inline-block border border-white/10">
                    The Heartbeat of Heritage
                  </p>
                  <p className="font-display text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-md mx-auto">
                    A digital pilgrimage through stone and spirit.
                  </p>
               </div>
               {/* Ambient Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
            </div>

            {/* 3D TILT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-4 md:px-12">
              {INITIAL_MONUMENTS.map((m) => (
                <div 
                  key={m.id} 
                  onClick={() => handleMonumentSelect(m as Monument)}
                  className="group cursor-pointer relative perspective-1000"
                >
                  <div className="relative overflow-hidden rounded-[2rem] aspect-[3/4] transition-all duration-700 ease-out transform-style-3d bg-zinc-900 border border-white/5 group-hover:rotate-x-12 group-hover:scale-105 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    
                    {/* Image */}
                    <img src={m.imageUrl} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80 group-hover:opacity-100" alt={m.name} />
                    
                    {/* Glass Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />
                    
                    {/* Shadow Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-10 w-full translate-z-10 transition-transform duration-700 group-hover:translate-y-[-10px]">
                      <div className="w-10 h-[1px] bg-amber-500 mb-6 group-hover:w-20 transition-all" />
                      <p className="text-[9px] font-heritage tracking-[0.4em] text-amber-500 mb-3 uppercase font-bold">{m.dynasty}</p>
                      <h3 className="font-rasa text-4xl italic text-white mb-6 drop-shadow-lg leading-none">{m.name}</h3>
                      <div className="flex items-center gap-3 text-white/50 text-[9px] font-heritage uppercase tracking-[0.3em]">
                        <MapPin size={12} className="text-white" /> {m.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: EXPLORER with Map */}
        {section === AppSection.EXPLORER && (
          <div className="fade-in-up">
            <div className="mb-16 text-center">
              <h2 className="font-rasa text-7xl md:text-9xl italic mb-6 text-white/90">The Cartography</h2>
              <p className="font-heritage text-[10px] tracking-[0.6em] text-white/30 uppercase">Navigating the geometric heart of India.</p>
            </div>
            
            {/* Interactive Map Component */}
            <div className="mb-24">
               <ExplorerMap onSelect={handleMonumentSelect} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
              {[...INITIAL_MONUMENTS, ...INITIAL_MONUMENTS].map((m, i) => (
                <div 
                  key={`${m.id}-${i}`}
                  onClick={() => handleMonumentSelect(m as Monument)}
                  className="relative aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer group border border-white/5 bg-zinc-900 hover:border-amber-500/30 transition-all duration-700 perspective-1000"
                >
                  <div className="absolute inset-0 bg-black/20 z-10" />
                  <img 
                    src={m.imageUrl} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                    loading="lazy"
                    alt={m.name}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-all duration-500 z-20" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-8 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <MapPin size={10} className="text-amber-500" />
                      <span className="text-[9px] font-heritage uppercase tracking-wider text-amber-200">{m.location}</span>
                    </div>
                    <h4 className="font-rasa text-2xl italic text-white leading-none mb-2">{m.name}</h4>
                    <div className="w-8 h-[1px] bg-white/30 group-hover:w-full group-hover:bg-amber-500 transition-all duration-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: AI_SEARCH */}
        {section === AppSection.AI_SEARCH && (
          <div className="fade-in-up max-w-5xl mx-auto pt-20">
            <div className="text-center mb-24">
              <div className="relative inline-block mb-12">
                <Sparkles className="text-amber-500" size={50} />
                <div className="absolute inset-0 blur-[50px] bg-amber-500/20 animate-pulse" />
              </div>
              <h2 className="font-rasa text-[7rem] md:text-[9rem] italic mb-8 leading-none">Oracle Gateway</h2>
              <p className="text-white/40 font-display text-2xl italic max-w-2xl mx-auto leading-relaxed">
                Interrogate the system for institutional records and the spiritual Rasa of any Indian site.
              </p>
            </div>
            <form onSubmit={handleSearch} className="relative group max-w-3xl mx-auto">
              <div className="absolute -inset-10 bg-amber-500/5 blur-[100px] opacity-0 group-focus-within:opacity-100 transition duration-1000"></div>
              <div className="relative bg-[#111] border border-white/10 rounded-full p-4 pl-10 flex items-center backdrop-blur-xl transition-all group-focus-within:border-amber-500/30 shadow-2xl overflow-hidden">
                <Search size={24} className="text-white/20 mr-6" />
                <input 
                  type="text"
                  placeholder="Enter site name..."
                  className="flex-1 bg-transparent border-none py-6 text-2xl focus:outline-none placeholder:text-white/10 font-rasa italic text-amber-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isSearching}
                />
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="p-8 bg-amber-500 text-black rounded-full hover:bg-amber-400 transition-all disabled:opacity-50 flex items-center justify-center shadow-lg"
                >
                  {isSearching ? <Loader2 size={24} className="animate-spin" /> : <ArrowRight size={24} />}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Section: STORY */}
        {section === AppSection.STORY && selectedMonument && (
          <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#0a0a0a]">
            <StoryViewer monument={selectedMonument} onBack={() => setSection(AppSection.HOME)} />
          </div>
        )}

      </main>

      {/* Persistent Bottom Navbar */}
      {section !== AppSection.STORY && (
        <Navbar currentSection={section} setSection={setSection} />
      )}

      {/* Footer with Agents Credit */}
      <footer className="max-w-7xl mx-auto px-10 py-20 border-t border-white/5 flex flex-col items-center text-center gap-8 text-white/30">
        <div className="flex flex-col gap-2">
           <ShieldCheck size={24} className="text-amber-800 mx-auto" />
           <p className="font-heritage text-[10px] uppercase tracking-[0.4em]">Verified Heritage Archive</p>
        </div>
        
        {/* Simple Agents Line */}
        <div className="flex flex-wrap justify-center gap-6 mt-4">
           {AGENTS.map((agent, i) => (
             <span key={i} className="text-[9px] font-heritage uppercase tracking-[0.2em] hover:text-white transition-colors cursor-default" title={agent.role}>
               {agent.name}
             </span>
           ))}
        </div>
        
        <div className="text-[9px] font-mono opacity-50">Seek Thee Rasa • v8.2</div>
      </footer>

      {/* Global Grain/Noise Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[100] grain" />
      
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[120vw] h-[120vw] bg-amber-900/[0.03] blur-[300px] rounded-full pointer-events-none" />
    </div>
  );
};

export default App;