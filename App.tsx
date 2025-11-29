import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import { Language, TranslationState } from './types';
import { SUPPORTED_LANGUAGES, TARGET_LANGUAGES } from './constants';
import { translateText } from './services/geminiService';
import { CopyIcon, MicIcon, SpeakerIcon, CloseIcon, HistoryIcon, StarIcon, ImageIcon, DocumentIcon, GlobeIcon } from './components/Icons';

const App: React.FC = () => {
  const [sourceLang, setSourceLang] = useState<Language>(SUPPORTED_LANGUAGES[0]); // Auto / Detect Problem
  const [targetLang, setTargetLang] = useState<Language>(TARGET_LANGUAGES[0]); // Concise Solution
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [translationState, setTranslationState] = useState<TranslationState>('idle');
  const [charCount, setCharCount] = useState(0);

  const outputTextAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCharCount(inputText.length);
  }, [inputText]);

  // Adjust output textarea height automatically (simple implementation)
  useEffect(() => {
    if (outputTextAreaRef.current) {
        outputTextAreaRef.current.style.height = 'auto';
        outputTextAreaRef.current.style.height = outputTextAreaRef.current.scrollHeight + 'px';
    }
  }, [outputText]);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setTranslationState('loading');
    try {
      const result = await translateText(inputText, sourceLang.name, targetLang.name);
      setOutputText(result);
      setTranslationState('success');
    } catch (error) {
      console.error(error);
      setTranslationState('error');
    }
  };

  const handleSwapLanguages = () => {
     // Swapping doesn't make sense for Problem -> Solution context, but to preserve UI behavior we can just do nothing or swap the selection if valid.
     // For this specialized app, we'll just ignore it to avoid confusion.
     return;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setTranslationState('idle');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-google-gray-bg text-google-dark-gray">
      <Header />

      {/* Secondary Nav (Text, Images, etc) */}
      <div className="bg-white border-b border-google-gray-border px-4 sm:px-8 py-2 flex space-x-4 overflow-x-auto">
        <button className="flex items-center px-4 py-2 rounded text-google-blue bg-blue-50 border border-blue-100 font-medium text-sm">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>
            Problem
        </button>
        <button className="flex items-center px-4 py-2 rounded text-google-text-gray hover:bg-gray-100 font-medium text-sm">
            <ImageIcon />
            Images
        </button>
        <button className="flex items-center px-4 py-2 rounded text-google-text-gray hover:bg-gray-100 font-medium text-sm">
            <DocumentIcon />
            Documents
        </button>
      </div>

      <LanguageSelector
        sourceLang={sourceLang}
        targetLang={targetLang}
        onSourceChange={setSourceLang}
        onTargetChange={setTargetLang}
        onSwap={handleSwapLanguages}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* Translation Cards Container */}
        <div className="flex flex-col md:flex-row gap-2 sm:gap-4 relative">
          
          {/* Input Card */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-google-gray-border focus-within:shadow-md focus-within:border-gray-300 transition-all flex flex-col min-h-[200px] md:min-h-[300px]">
            <div className="flex-1 relative">
                <textarea
                    className="w-full h-full p-4 sm:p-5 text-lg sm:text-2xl bg-transparent resize-none focus:outline-none text-google-dark-gray"
                    placeholder=""
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    spellCheck="false"
                />
                {inputText && (
                    <button 
                        onClick={handleClear}
                        className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                        <CloseIcon />
                    </button>
                )}
            </div>
            
            <div className="h-12 sm:h-14 px-4 flex items-center justify-between border-t border-transparent">
                <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Speak">
                        <MicIcon />
                    </button>
                </div>
                <div className="text-xs text-gray-400 font-medium">
                    {charCount} / 5000
                </div>
            </div>
          </div>

          {/* Mobile Translate Button */}
           <div className="md:hidden flex justify-center py-2">
                 <button 
                    onClick={handleTranslate}
                    disabled={!inputText.trim() || translationState === 'loading'}
                    className={`
                        flex items-center justify-center px-6 py-3 rounded-full font-bold text-white shadow-md
                        ${!inputText.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-google-blue hover:bg-google-blue-hover'}
                        transition-colors
                    `}
                >
                    {translationState === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <span>Translate</span>
                    )}
                </button>
           </div>


          {/* Output Card */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-google-gray-border flex flex-col min-h-[200px] md:min-h-[300px] bg-gray-50 relative">
             <div className="flex-1 p-4 sm:p-5">
                {translationState === 'loading' ? (
                    <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                ) : (
                    <div className="text-lg sm:text-2xl text-google-dark-gray leading-relaxed break-words whitespace-pre-wrap">
                        {outputText || <span className="text-gray-400">Translated text</span>}
                    </div>
                )}
             </div>

             <div className="h-12 sm:h-14 px-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    {outputText && (
                        <>
                            <button className="p-2 rounded-full hover:bg-gray-200 transition-colors" title="Read Aloud">
                                <SpeakerIcon />
                            </button>
                            <button onClick={handleCopy} className="p-2 rounded-full hover:bg-gray-200 transition-colors" title="Copy result">
                                <CopyIcon />
                            </button>
                        </>
                    )}
                </div>
                 {/* Desktop Solve Button */}
                 <div className="hidden md:block">
                     <button 
                        onClick={handleTranslate}
                        disabled={!inputText.trim() || translationState === 'loading'}
                        className={`
                            flex items-center px-6 py-2 rounded shadow text-white font-medium
                             ${!inputText.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-google-blue hover:bg-google-blue-hover'}
                        `}
                    >
                         {translationState === 'loading' ? 'Translating...' : 'Translate'}
                    </button>
                 </div>
             </div>
          </div>
          
        </div>

        {/* History / Saved */}
        <div className="mt-8 flex justify-center space-x-4">
            <button className="flex flex-col items-center justify-center w-24 h-24 rounded-full border border-google-gray-border bg-white hover:bg-gray-50 transition-colors">
                <div className="p-2 rounded-full bg-blue-50 text-google-blue mb-1">
                    <HistoryIcon />
                </div>
                <span className="text-xs font-medium text-google-text-gray">History</span>
            </button>
            <button className="flex flex-col items-center justify-center w-24 h-24 rounded-full border border-google-gray-border bg-white hover:bg-gray-50 transition-colors">
                 <div className="p-2 rounded-full bg-gray-100 text-gray-500 mb-1">
                    <StarIcon />
                </div>
                <span className="text-xs font-medium text-google-text-gray">Saved</span>
            </button>
        </div>

      </main>
    </div>
  );
};

export default App;