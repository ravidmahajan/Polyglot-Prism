import React, { useState, useRef, useEffect } from 'react';

const SpeechRecognition = typeof window !== 'undefined'
  ? window.SpeechRecognition || window.webkitSpeechRecognition
  : null;

export default function SearchBar({ onSearch, isLoading }) {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [interim, setInterim] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    return () => recognitionRef.current?.abort();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  const startRecording = () => {
    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let final = '', interimText = '';
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interimText += event.results[i][0].transcript;
        }
      }
      if (final) {
        setInput(final);
        setInterim('');
      } else {
        setInterim(interimText);
      }
    };

    recognition.onerror = (e) => {
      console.warn('Speech recognition error:', e.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setInterim('');
    };

    recognition.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    setInterim('');
    if (input.trim()) {
      setTimeout(() => onSearch(input.trim()), 200);
    }
  };

  const displayValue = isRecording && interim ? interim : input;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto px-4 mb-6">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl opacity-30 group-hover:opacity-50 blur transition-opacity" />
        <div className="relative flex items-center glass rounded-2xl overflow-hidden">
          <span className="pl-5 text-theme-4 text-lg">🔍</span>
          <input
            type="text"
            value={displayValue}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isRecording ? 'Listening... speak now' : 'Type a word or phrase...'}
            className={`flex-1 bg-transparent px-4 py-4 text-base md:text-lg focus:outline-none placeholder:text-theme-5 ${
              isRecording ? 'text-pink-400' : 'text-theme'
            }`}
          />

          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-3 py-2 flex items-center justify-center transition-all ${
              isRecording
                ? 'text-red-400 animate-pulse'
                : 'text-theme-4 hover:text-theme'
            }`}
            title={isRecording ? 'Stop recording' : 'Record voice — auto-detects language'}
          >
            {isRecording ? (
              <span className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-red-500/20 animate-ping" />
                <span className="text-xl">⏹</span>
              </span>
            ) : (
              <span className="text-xl">🎤</span>
            )}
          </button>

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Translate'
            )}
          </button>
        </div>
      </div>
      {isRecording && (
        <p className="text-center text-xs text-pink-400/70 mt-2 animate-pulse">
          🎤 Recording — auto-detecting language. Click ⏹ to stop.
        </p>
      )}
    </form>
  );
}
