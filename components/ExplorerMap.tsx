
import React, { useState } from 'react';
import { Monument } from '../types';
import { INITIAL_MONUMENTS } from '../constants';
import { MapPin, Navigation, Info } from 'lucide-react';

interface ExplorerMapProps {
  onSelect: (monument: Monument) => void;
}

const ExplorerMap: React.FC<ExplorerMapProps> = ({ onSelect }) => {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  // Stylized India Map SVG path (simplified for visual representation)
  // In a real app, this would be a proper GeoJSON or SVG component.
  // Using a background image for this "Insta-ready" visual prototype.
  const mapUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/India_outline_map_without_labels.svg/1666px-India_outline_map_without_labels.svg.png";

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[0.85] bg-[#111] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
      
      {/* Map Background */}
      <div className="absolute inset-0 p-8 md:p-16 flex items-center justify-center">
         <img 
            src={mapUrl} 
            className="h-full w-auto object-contain opacity-30 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] filter invert contrast-125" 
            alt="Map of India" 
         />
      </div>

      {/* Markers */}
      {INITIAL_MONUMENTS.map((m) => (
        m.mapPosition && (
          <div 
            key={m.id}
            className="absolute z-20 group"
            style={{ 
              left: `${m.mapPosition.x}%`, 
              top: `${m.mapPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="relative flex items-center justify-center">
               <button 
                  onClick={() => setActiveMarker(activeMarker === m.id ? null : m.id)}
                  className="w-4 h-4 md:w-6 md:h-6 bg-amber-500 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse hover:scale-125 transition-transform duration-300 z-10 border-2 border-black"
               />
               <div className="absolute w-12 h-12 bg-amber-500/20 rounded-full animate-ping pointer-events-none" />
               
               {/* Tooltip Card */}
               <div className={`
                 absolute left-1/2 bottom-full mb-4 -translate-x-1/2 w-64 
                 bg-zinc-900/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4
                 shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all duration-300 origin-bottom
                 ${activeMarker === m.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
               `}>
                 <div className="relative z-10">
                   <h4 className="font-rasa text-2xl italic text-white mb-1">{m.name}</h4>
                   <p className="font-heritage text-[9px] uppercase tracking-[0.2em] text-amber-500 mb-3">{m.location}</p>
                   <div className="flex gap-2">
                     <button 
                        onClick={(e) => { e.stopPropagation(); onSelect(m); }}
                        className="flex-1 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-colors"
                     >
                       <Info size={12} /> Details
                     </button>
                   </div>
                 </div>
                 {/* Arrow */}
                 <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 border-8 border-transparent border-t-zinc-900/95"></div>
               </div>
            </div>
          </div>
        )
      ))}

      <div className="absolute bottom-8 right-8 text-right pointer-events-none">
         <div className="flex items-center justify-end gap-2 text-white/40 mb-2">
            <Navigation size={14} className="animate-bounce" />
            <span className="font-heritage text-[9px] uppercase tracking-[0.3em]">Interactive Map</span>
         </div>
         <h3 className="font-rasa text-3xl italic text-white/20">The Subcontinent</h3>
      </div>
    </div>
  );
};

export default ExplorerMap;
