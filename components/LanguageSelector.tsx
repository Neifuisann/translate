import React from 'react';
import { Language } from '../types';
import { SUPPORTED_LANGUAGES, TARGET_LANGUAGES } from '../constants';
import { SwapIcon, DownArrowIcon } from './Icons';

interface LanguageSelectorProps {
  sourceLang: Language;
  targetLang: Language;
  onSourceChange: (lang: Language) => void;
  onTargetChange: (lang: Language) => void;
  onSwap: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  sourceLang,
  targetLang,
  onSourceChange,
  onTargetChange,
  onSwap,
}) => {
  // We'll show a few tabs and a "More" dropdown.
  // For this clone, we'll static slice the array for tabs to mimic the look.
  const sourceTabs = SUPPORTED_LANGUAGES.slice(0, 3); // Auto, English, Spanish
  const targetTabs = TARGET_LANGUAGES.slice(0, 3); // English, Spanish, French
  
  // Ensure selected language is visible if not in initial tabs
  const ensureSourceVisible = (tabs: Language[], current: Language) => {
    if (tabs.find(t => t.code === current.code)) return tabs;
    return [...tabs.slice(0, 2), current];
  }
  
  const ensureTargetVisible = (tabs: Language[], current: Language) => {
    if (tabs.find(t => t.code === current.code)) return tabs;
    return [...tabs.slice(0, 2), current];
  }

  const visibleSourceTabs = ensureSourceVisible(sourceTabs, sourceLang);
  const visibleTargetTabs = ensureTargetVisible(targetTabs, targetLang);

  return (
    <div className="bg-white border-b border-google-gray-border shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-12 px-4 sm:px-6 lg:px-8">
        
        {/* Source Languages */}
        <div className="flex items-center flex-1 min-w-0">
          <div className="flex space-x-1 sm:space-x-4 overflow-x-auto no-scrollbar mask-gradient">
            {visibleSourceTabs.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onSourceChange(lang)}
                className={`px-2 sm:px-3 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  sourceLang.code === lang.code
                    ? 'border-google-blue text-google-blue'
                    : 'border-transparent text-google-text-gray hover:bg-gray-50'
                }`}
              >
                {lang.name}
              </button>
            ))}
             <div className="relative group flex items-center">
                 <button className="px-2 py-3 text-sm font-medium text-google-text-gray hover:bg-gray-50 flex items-center">
                    <DownArrowIcon />
                 </button>
                 {/* Dropdown for demo purposes would be complex, omitting for clean code in this block but conceptually here */}
             </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex-shrink-0 px-2 sm:px-4">
          <button 
            onClick={onSwap}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Swap languages"
          >
            <SwapIcon />
          </button>
        </div>

        {/* Target Languages */}
        <div className="flex items-center flex-1 justify-end min-w-0">
           <div className="flex space-x-1 sm:space-x-4 overflow-x-auto no-scrollbar flex-row-reverse sm:flex-row">
            {visibleTargetTabs.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onTargetChange(lang)}
                className={`px-2 sm:px-3 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  targetLang.code === lang.code
                    ? 'border-google-blue text-google-blue'
                    : 'border-transparent text-google-text-gray hover:bg-gray-50'
                }`}
              >
                {lang.name}
              </button>
            ))}
            <div className="relative group flex items-center">
                 <button className="px-2 py-3 text-sm font-medium text-google-text-gray hover:bg-gray-50 flex items-center">
                    <DownArrowIcon />
                 </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LanguageSelector;
