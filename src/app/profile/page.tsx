'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  ShieldCheck, 
  Award, 
  Compass, 
  Globe, 
  Sparkles, 
  Volume2, 
  Save, 
  Check, 
  ArrowLeft 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ProfilePage() {
  const { currentLang, setLanguage, profile, updateProfile } = useApp();

  const [name, setName] = useState(profile.name);
  const [title, setTitle] = useState(profile.title);
  const [preferredEra, setPreferredEra] = useState(profile.preferredEra);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, title, preferredEra });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="min-h-screen pb-24">
      
      {/* Header */}
      <section className="relative py-12 sm:py-16 border-b border-[#242434] bg-[#0A0A0E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase mb-2">
            <User className="w-4 h-4" />
            <span>{currentLang === 'EN' ? 'Scholar Credentials' : 'विद्वान क्रेडेंशियल्स'}</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
            {currentLang === 'EN' ? 'SCHOLAR PROFILE' : 'विद्वान प्रोफ़ाइल'}
          </h1>
          <p className="mt-1 text-sm text-[#94A3B8]">
            {currentLang === 'EN'
              ? 'Manage your personal chronicler identity, scholar rank, and default research preferences.'
              : 'अपनी इतिहासकार पहचान, उपाधि और अनुसंधान प्राथमिकताओं को प्रबंधित करें।'}
          </p>
        </div>
      </section>

      {/* Main Profile Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <form onSubmit={handleSave} className="space-y-8">
          
          <div className="bg-[#14141C] rounded-3xl p-6 sm:p-8 border border-[#242434] space-y-6 shadow-2xl">
            
            {/* Avatar & Title Banner */}
            <div className="flex items-center gap-4 pb-6 border-b border-[#242434]">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#1B1B26] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] text-2xl font-cinzel font-bold shadow-gold-glow">
                {name.charAt(0) || 'W'}
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold text-[#F8FAFC]">{name}</h3>
                <span className="text-xs font-mono text-[#D4AF37] flex items-center gap-1.5 mt-0.5">
                  <Award className="w-3.5 h-3.5" />
                  {title}
                </span>
                <span className="text-[10px] text-[#64748B] block mt-1">
                  Member since {profile.joinedDate}
                </span>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase text-[#CBD5E1] mb-2">
                  {currentLang === 'EN' ? 'Chronicler Full Name' : 'इतिहासकार का नाम'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0D0D11] border border-[#242434] focus:border-[#D4AF37] text-[#F8FAFC] text-sm outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#CBD5E1] mb-2">
                  {currentLang === 'EN' ? 'Archival Rank / Scholar Title' : 'विद्वान उपाधि'}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0D0D11] border border-[#242434] focus:border-[#D4AF37] text-[#F8FAFC] text-sm outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#CBD5E1] mb-2">
                  {currentLang === 'EN' ? 'Preferred Historical Epoch' : 'पसंदीदा ऐतिहासिक युग'}
                </label>
                <select
                  value={preferredEra}
                  onChange={(e) => setPreferredEra(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0D0D11] border border-[#242434] focus:border-[#D4AF37] text-[#F8FAFC] text-sm outline-none"
                >
                  <option value="Ancient & Classical">Ancient & Classical (प्राचीन युग)</option>
                  <option value="Medieval Empires">Medieval Empires (मध्यकालीन साम्राज्य)</option>
                  <option value="Early Modern & Colonial">Early Modern & Colonial (प्रारंभिक आधुनिक)</option>
                  <option value="Modern Revolutions">Modern Revolutions (आधुनिक क्रांतियां)</option>
                  <option value="Contemporary & Space Age">Contemporary & Space Age (समकालीन एवं अंतरिक्ष)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#CBD5E1] mb-2">
                  {currentLang === 'EN' ? 'Default Primary Language' : 'प्राथमिक भाषा'}
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setLanguage('EN')}
                    className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all ${
                      currentLang === 'EN'
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                        : 'bg-[#0D0D11] text-[#94A3B8] border-[#242434]'
                    }`}
                  >
                    English (EN)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('HI')}
                    className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all ${
                      currentLang === 'HI'
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                        : 'bg-[#0D0D11] text-[#94A3B8] border-[#242434]'
                    }`}
                  >
                    हिन्दी (HI)
                  </button>
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-[#242434] flex items-center justify-between">
              <Link
                href="/settings"
                className="text-xs text-[#94A3B8] hover:text-[#D4AF37] transition-colors"
              >
                {currentLang === 'EN' ? 'Configure Audio & System Preferences →' : 'ध्वनि एवं सिस्टम सेटिंग्स →'}
              </Link>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-cinzel font-bold text-xs tracking-wide shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>{isSaved ? (currentLang === 'EN' ? 'Profile Saved!' : 'प्रोफ़ाइल सहेजी गई!') : (currentLang === 'EN' ? 'Save Changes' : 'बदलाव सहेजें')}</span>
              </button>
            </div>

          </div>

        </form>
      </main>

    </div>
  );
}
