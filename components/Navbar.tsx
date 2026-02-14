import React from 'react';
import { AppSection } from '../types';
import { Compass, Home, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentSection: AppSection;
  setSection: (s: AppSection) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentSection, setSection }) => {
  const navItems = [
    { id: AppSection.HOME, label: 'Home', icon: Home },
    { id: AppSection.EXPLORER, label: 'Explore', icon: Compass },
    { id: AppSection.AI_SEARCH, label: 'Oracle', icon: Sparkles },
  ];

  return (
    <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-full flex gap-10 items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setSection(item.id)}
          className={`flex flex-col items-center gap-1.5 transition-all duration-500 group ${
            currentSection === item.id ? 'text-amber-500 scale-110' : 'text-gray-500 hover:text-white'
          }`}
        >
          <div className={`p-1 rounded-full transition-colors ${currentSection === item.id ? 'bg-amber-500/10' : 'group-hover:bg-white/5'}`}>
            <item.icon size={20} strokeWidth={currentSection === item.id ? 2.5 : 1.5} />
          </div>
          <span className="text-[9px] uppercase tracking-[0.2em] font-heritage font-bold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navbar;