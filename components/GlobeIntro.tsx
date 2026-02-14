
import React, { useEffect, useState } from 'react';

interface GlobeIntroProps {
  onComplete: () => void;
}

const GlobeIntro: React.FC<GlobeIntroProps> = ({ onComplete }) => {
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    // Sequence the animation
    const timer1 = setTimeout(() => setExpand(true), 2500);
    const timer2 = setTimeout(() => onComplete(), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${expand ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      <div className="relative flex items-center justify-center">
         {/* Circular Ripples */}
         <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
         <div className="absolute w-[400px] h-[400px] border border-white/10 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
         <div className="absolute w-[200px] h-[200px] border border-amber-500/20 rounded-full animate-[pulse_3s_ease-in-out_infinite]" />
         
         {/* Central Core */}
         <div className="relative z-10 text-center">
            <h1 className="font-rasa text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-br from-amber-100 via-white to-amber-900/50 italic opacity-0 animate-[fadeIn_1.5s_ease-out_forwards_0.5s] tracking-tighter leading-none scale-105">
              Seek<br />Thee<br />Rasa
            </h1>
            
            <div className="mt-8 flex justify-center opacity-0 animate-[fadeIn_1s_ease-out_forwards_1.5s]">
               <div className="h-[1px] w-12 bg-amber-500/50" />
            </div>
            
            <p className="mt-4 font-heritage text-[9px] uppercase tracking-[0.6em] text-white/30 opacity-0 animate-[fadeIn_1s_ease-out_forwards_1.8s]">
              Initiating Heritage Protocol
            </p>
         </div>
      </div>
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-900/10 to-black z-[-1]" />
    </div>
  );
};

export default GlobeIntro;
