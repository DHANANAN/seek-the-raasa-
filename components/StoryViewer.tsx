import React, { useEffect, useRef, useState } from 'react';
import { Monument } from '../types';
import { 
  ArrowLeft, Instagram, Bookmark, Share2, Globe, Camera, History, 
  ShieldCheck, ExternalLink, Image as ImageIcon, ChevronLeft, 
  ChevronRight, Sparkles, Link as LinkIcon, Info, 
  Database, Shield, BookOpen, ClipboardList, ChevronDown, ChevronUp, Box, Loader2
} from 'lucide-react';

// Fix: Add type declaration for custom web component 'model-viewer'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        poster?: string;
        alt?: string;
        'shadow-intensity'?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        'touch-action'?: string;
        style?: React.CSSProperties;
        [key: string]: any;
      };
    }
  }
}

// Also augment React module for stricter environments
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        [key: string]: any;
      };
    }
  }
}

interface StoryViewerProps {
  monument: Monument;
  onBack: () => void;
}

/**
 * LazyImage Component
 */
const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  rootMargin?: string;
}> = ({ src, alt, className, onLoad, rootMargin = '200px' }) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => {
            setIsLoaded(true);
            if (onLoad) onLoad();
          }}
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-110'
          }`}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800";
          }}
        />
      )}
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-900/50 animate-pulse" />
      )}
    </div>
  );
};

const StoryViewer: React.FC<StoryViewerProps> = ({ monument, onBack }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        left: index * clientWidth,
        behavior: 'smooth'
      });
      // Immediate state update for responsiveness
      setActiveIndex(index); 
    }
  };

  if (!monument) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fbf9f4] pb-40 animate-in fade-in duration-1000 selection:bg-amber-500/30">
      
      {/* 
         --------------------------------------------------
         CINEMATIC HERO HEADER
         --------------------------------------------------
      */}
      <header className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <img 
          src={monument.imageUrl} 
          alt={monument.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105 animate-[pulse_60s_linear_infinite]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-[#0a0a0a]" />
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-10 left-10 p-4 rounded-full bg-black/40 hover:bg-amber-500 text-white hover:text-black transition-all z-20 backdrop-blur-2xl border border-white/10 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="relative z-10 text-center max-w-6xl px-8 mt-20">
          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="flex items-center gap-3 px-5 py-2 bg-amber-500/10 rounded-full border border-amber-500/20 backdrop-blur-md">
              <History size={14} className="text-amber-500" />
              <span className="font-heritage text-[11px] uppercase tracking-[0.3em] text-amber-200">{monument.era || 'Historic Era'}</span>
            </div>
            <h1 className="font-rasa text-[5rem] md:text-[9rem] leading-[0.9] italic text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 drop-shadow-2xl">
              {monument.name}
            </h1>
          </div>
          
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-10" />
          
          <p className="font-display text-2xl md:text-3xl font-light text-white/80 max-w-3xl mx-auto leading-relaxed">
            "{monument.emotionalHook}"
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
           <ChevronDown size={32} />
        </div>
      </header>

      {/* 
         --------------------------------------------------
         CONTENT BODY
         --------------------------------------------------
      */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 -mt-32 relative z-20">
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { label: "Dynasty", value: monument.dynasty || 'Unknown Dynasty', icon: Shield },
            { label: "Location", value: monument.location || 'India', icon: Globe },
            { label: "Significance", value: (monument.eraSignificance || "").split('.')[0] || 'Historical Landmark', icon: Sparkles }
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-900/60 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] hover:bg-zinc-800/60 transition-colors group">
               <stat.icon className="text-amber-500 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" size={24} />
               <p className="font-heritage text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">{stat.label}</p>
               <p className="font-rasa text-2xl text-white italic">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16 md:gap-24">
          
          {/* LEFT COLUMN: NARRATIVE */}
          <div className="space-y-16">
            <section>
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-[1px] bg-amber-500" />
                 <h3 className="font-heritage text-xs uppercase tracking-[0.4em] text-amber-500">The Rasa</h3>
              </div>
              <p className="font-display text-lg md:text-xl text-white/70 leading-relaxed whitespace-pre-line first-letter:text-5xl first-letter:font-rasa first-letter:text-white first-letter:mr-2 first-letter:float-left">
                {monument.coreStory}
              </p>
            </section>

            <section>
              <h3 className="font-rasa text-3xl italic text-white mb-6">Experiential Essence</h3>
              <div className="p-8 bg-gradient-to-br from-white/5 to-transparent rounded-[2rem] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Sparkles size={100} />
                </div>
                <p className="relative z-10 text-white/60 text-lg leading-relaxed italic">
                  {monument.experientialAppeal}
                </p>
              </div>
            </section>
            
            {/* INSTITUTIONAL DATA SECTION */}
            {(monument.institutionalStats || (monument.officialRecords && monument.officialRecords.length > 0)) && (
               <section className="pt-8 border-t border-white/5">
                 <h3 className="font-rasa text-3xl italic text-white mb-8 flex items-center gap-3">
                   <Database size={24} className="text-amber-500/50" />
                   Institutional Archives
                 </h3>
                 
                 <div className="bg-[#111] rounded-[2rem] p-8 border border-white/5 space-y-8">
                    {/* Protection Status */}
                    {monument.institutionalStats?.protectionStatus && (
                      <div className="flex items-start gap-4">
                        <div className="mt-1 p-2 bg-green-900/20 rounded-full">
                          <ShieldCheck size={16} className="text-green-500" />
                        </div>
                        <div>
                          <p className="font-heritage text-[9px] uppercase tracking-wider text-white/40">Preservation Status</p>
                          <p className="text-white/80 font-medium">{monument.institutionalStats.protectionStatus}</p>
                        </div>
                      </div>
                    )}

                    {/* Official Records List */}
                    {monument.officialRecords && monument.officialRecords.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {monument.officialRecords.map((rec, idx) => (
                           <div key={idx} className="p-4 bg-black/40 rounded-xl border border-white/5">
                              <p className="font-heritage text-[9px] uppercase tracking-wider text-amber-500/60 mb-1">{rec.label}</p>
                              <p className="text-white/80 text-sm">{rec.value}</p>
                           </div>
                        ))}
                      </div>
                    )}
                 </div>
               </section>
            )}
          </div>

          {/* RIGHT COLUMN: MEDIA & ACTIONS */}
          <div className="space-y-12">
            
            {/* 3D Model Viewer if available */}
            {monument.model3dUrl && (
              <div className="relative group animate-in slide-in-from-right duration-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-rasa text-3xl italic text-white flex items-center gap-3">
                      <Box size={24} className="text-amber-500" />
                      Digital Twin
                  </h3>
                  <div className="flex gap-2">
                      <span className="text-[9px] font-heritage uppercase tracking-wider text-amber-500 border border-amber-500/30 px-2 py-1 rounded-full bg-amber-500/5 animate-pulse">
                        Live Interactive
                      </span>
                  </div>
                </div>
                
                <div className="relative aspect-square bg-zinc-900 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                    <model-viewer
                      src={monument.model3dUrl}
                      poster={monument.imageUrl}
                      alt={`3D model of ${monument.name}`}
                      shadow-intensity="1"
                      camera-controls
                      auto-rotate
                      touch-action="pan-y"
                      style={{ width: '100%', height: '100%', backgroundColor: '#000' } as React.CSSProperties}
                    >
                      <div slot="poster" className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                          <div className="flex flex-col items-center gap-4">
                              <Loader2 className="animate-spin text-amber-500" size={32} />
                              <span className="text-xs text-white/50 font-heritage tracking-widest uppercase">Loading Asset</span>
                          </div>
                      </div>
                    </model-viewer>
                    
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/5 pointer-events-none">
                      <p className="text-[9px] font-heritage uppercase tracking-widest text-white/50">
                        Drag to Rotate • Scroll to Zoom
                      </p>
                    </div>
                </div>
              </div>
            )}

            {/* Visual Archives (Gallery) */}
            <div className="relative group">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="font-rasa text-3xl italic text-white">Visual Archives</h3>
                 <div className="flex gap-2">
                    {/* Pagination Dots */}
                    {monument.archiveGallery && monument.archiveGallery.length > 1 && (
                      <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-md">
                        {monument.archiveGallery.map((_, idx) => (
                          <div 
                            key={idx}
                            onClick={() => scrollToIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              idx === activeIndex ? 'w-6 bg-amber-500' : 'w-1.5 bg-white/20 hover:bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                 </div>
               </div>
               
               <div className="relative aspect-[4/5] md:aspect-square bg-zinc-900 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group/gallery">
                 
                 {/* Scroll Container */}
                 <div 
                   ref={scrollContainerRef}
                   onScroll={handleScroll}
                   className="flex w-full h-full overflow-x-auto snap-x snap-mandatory"
                   style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                 >
                   {monument.archiveGallery && monument.archiveGallery.length > 0 ? (
                     monument.archiveGallery.map((img, i) => (
                       <div key={i} className="min-w-full h-full relative snap-center">
                          <LazyImage src={img.url} alt={monument.name} className="w-full h-full object-cover" />
                          
                          {/* Caption Overlay */}
                          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/60 to-transparent opacity-100 transition-opacity duration-300">
                             <p className="text-[10px] font-heritage uppercase tracking-wider text-amber-500 mb-1">Figure {i + 1} of {monument.archiveGallery.length}</p>
                             {img.source && <p className="text-xs text-white/60 font-mono line-clamp-1">Source: {img.source}</p>}
                             {img.attribution && <p className="text-[10px] text-white/30 font-mono mt-0.5 line-clamp-1">© {img.attribution}</p>}
                          </div>
                       </div>
                     ))
                   ) : (
                     // Fallback if no images are present in the gallery
                     <div className="min-w-full h-full relative snap-center">
                        <LazyImage src={monument.imageUrl} alt={monument.name} className="w-full h-full object-cover" />
                     </div>
                   )}
                 </div>

                 {/* Hover Navigation Arrows */}
                 {monument.archiveGallery && monument.archiveGallery.length > 1 && (
                   <>
                     <button 
                       onClick={() => scrollToIndex(activeIndex - 1)}
                       disabled={activeIndex === 0}
                       className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-amber-500 text-white hover:text-black backdrop-blur-xl border border-white/10 transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 translate-x-4 group-hover/gallery:translate-x-0 disabled:opacity-0 disabled:pointer-events-none z-10"
                     >
                       <ChevronLeft size={24} />
                     </button>
                     <button 
                       onClick={() => scrollToIndex(activeIndex + 1)}
                       disabled={activeIndex === monument.archiveGallery.length - 1}
                       className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-amber-500 text-white hover:text-black backdrop-blur-xl border border-white/10 transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 -translate-x-4 group-hover/gallery:translate-x-0 disabled:opacity-0 disabled:pointer-events-none z-10"
                     >
                       <ChevronRight size={24} />
                     </button>
                   </>
                 )}
               </div>
            </div>

            {/* Social & Sharing */}
            <div className="bg-zinc-900/40 rounded-[2rem] p-8 border border-white/5">
               <h4 className="font-heritage text-xs uppercase tracking-[0.2em] text-white/50 mb-6">Digital Artifacts</h4>
               <div className="flex flex-col gap-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                     <div className="flex items-center gap-2 mb-2 text-amber-500">
                        <Instagram size={16} />
                        <span className="text-xs font-bold">Caption Idea</span>
                     </div>
                     <p className="font-display italic text-white/80 text-sm">"{monument.socialMedia.caption}"</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {monument.socialMedia.hashtags.map((tag, i) => (
                       <span key={i} className="text-[10px] text-white/40 border border-white/10 px-2 py-1 rounded-full">{tag}</span>
                     ))}
                  </div>
               </div>
            </div>

            {/* External Links */}
            {monument.institutionalLinks && monument.institutionalLinks.length > 0 && (
              <div className="space-y-4">
                 <h4 className="font-heritage text-xs uppercase tracking-[0.2em] text-white/50">Verified Sources</h4>
                 {monument.institutionalLinks.map((link, i) => (
                   <a 
                    key={i} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-amber-500/50 hover:bg-white/5 transition-all group"
                   >
                      <div className="flex items-center gap-3">
                         <LinkIcon size={14} className="text-white/30 group-hover:text-amber-500 transition-colors" />
                         <div>
                            <p className="text-sm text-white/90 font-medium">{link.title}</p>
                            {link.description && <p className="text-[10px] text-white/40">{link.description}</p>}
                         </div>
                      </div>
                      <ExternalLink size={14} className="text-white/20 group-hover:text-white transition-colors" />
                   </a>
                 ))}
              </div>
            )}
            
            {/* Grounding Sources */}
            {monument.groundingSources && monument.groundingSources.length > 0 && (
              <div className="space-y-4 mt-8">
                 <h4 className="font-heritage text-xs uppercase tracking-[0.2em] text-white/50">Search References</h4>
                 {monument.groundingSources.map((source, i) => (
                   <a 
                    key={`grounding-${i}`} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-amber-500/50 hover:bg-white/5 transition-all group"
                   >
                      <div className="flex items-center gap-3">
                         <Globe size={14} className="text-white/30 group-hover:text-amber-500 transition-colors" />
                         <div>
                            <p className="text-sm text-white/90 font-medium truncate max-w-[200px]">{source.title}</p>
                         </div>
                      </div>
                      <ExternalLink size={14} className="text-white/20 group-hover:text-white transition-colors" />
                   </a>
                 ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default StoryViewer;