'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, AlertTriangle, GitBranch, Compass, Sparkles, 
  ArrowRight, ShieldAlert, CheckCircle2, RefreshCw 
} from 'lucide-react';

interface BranchScenario {
  id: string;
  title: string;
  divergencePoint: string;
  consequence: string;
  historiographicalNote: string;
}

interface WhatIfModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  sceneTitle?: string;
  era?: string;
  onSimulateAlternative?: (altQuery: string) => void;
}

function getCounterfactuals(query: string): BranchScenario[] {
  const q = query.toLowerCase();

  if (q.includes('shivaji') || q.includes('maratha') || q.includes('raigad')) {
    return [
      {
        id: 'branch-1',
        title: 'Earlier Sovereignty Proclamation (1665)',
        divergencePoint: 'If the Treaty of Purandar was rejected and total fort defense was maintained rather than negotiated diplomacy.',
        consequence: 'Prolonged siege attrition in the Sahyadris, accelerating autonomous guerrilla doctrine earlier across the Deccan plateau.',
        historiographicalNote: 'Historians analyze this branch to understand Shivaji Maharaj’s deliberate strategic balance between calculated diplomacy and warfare.',
      },
      {
        id: 'branch-2',
        title: 'Maritime Expansion Dominance',
        divergencePoint: 'Immediate expansion of the Maratha Navy with deeper ocean-going shipwright treaties with European traders.',
        consequence: 'Complete sovereignty over Konkan coastal trade lanes, altering the mercantile footholds of western sea powers.',
        historiographicalNote: 'Reflects scholarly interest in the Maratha navy as one of the pioneer indigenous naval doctrines of 17th-century India.',
      },
      {
        id: 'branch-3',
        title: 'Northern Continental Alliance',
        divergencePoint: 'A formal sovereign confederacy formed directly with Rajput kingdoms prior to the Agra journey.',
        consequence: 'Simultaneous multi-front regional self-governance challenging centralized Mughal administrative grip a generation earlier.',
        historiographicalNote: 'A classic historiographical question regarding regional autonomy vs imperial centralization.',
      },
    ];
  }

  if (q.includes('waterloo') || q.includes('napoleon')) {
    return [
      {
        id: 'branch-1',
        title: 'Grouchy Intercepts Blücher at Wavre',
        divergencePoint: 'Marshal Emmanuel de Grouchy prevents the Prussian army from reinforcing Wellington at Mont-Saint-Jean on the afternoon of June 18.',
        consequence: 'The Anglo-Allied line is forced into retreat toward Brussels, extending the Waterloo campaign into protracted summer warfare.',
        historiographicalNote: 'Debated extensively by military historians as Napoleon’s most critical tactical operational divergence.',
      },
      {
        id: 'branch-2',
        title: 'Early Morning Dry-Ground Assault',
        divergencePoint: 'Absence of overnight torrential rains allowing French grand batteries to commence bombardment at dawn (08:00 vs 11:30).',
        consequence: 'French cavalry charges deploy before allied lines reinforce Hougoumont and La Haye Sainte.',
        historiographicalNote: 'Illustrates the profound role of micro-climatic and terrain conditions on 19th-century warfare.',
      },
      {
        id: 'branch-3',
        title: 'Diplomatic Settlement via Frankfurt Proposals',
        divergencePoint: 'Napoleon accepting constitutional borders to preserve dynastic peace rather than total military gamble.',
        consequence: 'A constitutional French empire co-existing with balance-of-power European coalitions.',
        historiographicalNote: 'Investigated by diplomatic historians studying European treaty architectures.',
      },
    ];
  }

  if (q.includes('lakshmibai') || q.includes('jhansi') || q.includes('1857')) {
    return [
      {
        id: 'branch-1',
        title: 'Coordinated Central Indian Alliance',
        divergencePoint: 'Unified strategic command established earlier between Jhansi, Gwalior, and Tatya Tope prior to the siege.',
        consequence: 'Prolonged defense of Bundelkhand fortresses preventing rapid colonial counter-offensives toward Kalpi.',
        historiographicalNote: 'Examines the strategic communication gaps that affected the 1857 resistance.',
      },
      {
        id: 'branch-2',
        title: 'Fortress Breaching Avoidance',
        divergencePoint: 'Timely discovery of the subverted southern rampart entry at Jhansi Fort.',
        consequence: 'Sustained defense of the fortress forcing a grueling multi-month siege on besieging forces.',
        historiographicalNote: 'Highlights the critical tactical intelligence dynamics of fortress sieges in 1858.',
      },
      {
        id: 'branch-3',
        title: 'Negotiated Restoration of Princely Rights',
        divergencePoint: 'Pre-1857 reversal of the Doctrine of Lapse honoring Damodar Rao’s rightful succession.',
        consequence: 'Jhansi maintains peaceful sovereign princely status without military devastation.',
        historiographicalNote: 'Reflects historians’ critique of Lord Dalhousie’s destabilizing annexation policies.',
      },
    ];
  }

  // Default universal counterfactual scenarios
  return [
    {
      id: 'branch-1',
      title: 'Alternative Tactical Turning Point',
      divergencePoint: `A critical strategic decision made in reverse during the pivotal climax of ${query}.`,
      consequence: 'A modified distribution of regional power, shifting the timeline of subsequent political treaties.',
      historiographicalNote: 'Counterfactual historical analysis helps identify which outcomes were inevitable versus contingent on single choices.',
    },
    {
      id: 'branch-2',
      title: 'Pre-Emptive Diplomatic Resolution',
      divergencePoint: `Diplomatic negotiations succeeding before armed or political confrontation began in ${query}.`,
      consequence: 'Preservation of local infrastructure, trade networks, and cultural centers for subsequent generations.',
      historiographicalNote: 'Explores the peace alternative frameworks analyzed in contemporary historiography.',
    },
    {
      id: 'branch-3',
      title: 'Technological & Logistical Variance',
      divergencePoint: 'Critical communication delays or advanced technological deployment altering the pace of events.',
      consequence: 'A prolonged stalemate transforming into a multi-party coalition pact.',
      historiographicalNote: 'Demonstrates how logistics and communications govern pivotal historical moments.',
    },
  ];
}

export default function WhatIfModal({
  isOpen,
  onClose,
  searchQuery,
  sceneTitle,
  era,
  onSimulateAlternative,
}: WhatIfModalProps) {
  const scenarios = useMemo(() => getCounterfactuals(searchQuery), [searchQuery]);
  const [selectedBranch, setSelectedBranch] = useState<BranchScenario>(scenarios[0]);

  useEffect(() => {
    if (scenarios.length > 0) {
      setSelectedBranch(scenarios[0]);
    }
  }, [scenarios]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-4xl max-h-[90vh] rounded-3xl bg-[#0D0D11] border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden flex flex-col relative"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 bg-[#14141C] border-b border-[#242434] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-md">
                  <GitBranch className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
                      COUNTERFACTUAL ENGINE
                    </span>
                    <span className="text-xs font-mono text-[#64748B]">{era || 'Historical Timeline'}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-cinzel font-bold text-[#F8FAFC]">
                    What If? Divergent Timeline Simulation
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#0A0A0E] border border-[#242434] hover:border-purple-500/50 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* Disclosure Notice */}
              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <p className="text-xs text-purple-200 leading-relaxed">
                  <strong className="font-semibold text-purple-300">Methodological Disclosure:</strong> Counterfactual simulations represent speculative historiography to test causality. These diverging scenarios do not replace verified documentary facts.
                </p>
              </div>

              {/* Subject Title */}
              <div>
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Active Coordinate
                </span>
                <h3 className="font-cinzel text-xl font-bold text-[#F8FAFC]">
                  {searchQuery} {sceneTitle ? `— ${sceneTitle}` : ''}
                </h3>
              </div>

              {/* Branch Selection Pills */}
              <div>
                <span className="text-xs font-semibold text-[#94A3B8] block mb-3">
                  Select Divergence Branch:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {scenarios.map((branch, idx) => {
                    const isSelected = selectedBranch.id === branch.id;
                    return (
                      <button
                        key={branch.id}
                        onClick={() => setSelectedBranch(branch)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                          isSelected
                            ? 'bg-purple-900/20 border-purple-500 text-[#FFF3C4] shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                            : 'bg-[#14141C] border-[#242434] text-[#94A3B8] hover:border-purple-500/40 hover:text-[#F8FAFC]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[10px] font-mono text-purple-400 font-bold">
                            BRANCH 0{idx + 1}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                        </div>
                        <h4 className="font-cinzel font-bold text-xs sm:text-sm text-[#F8FAFC] line-clamp-2">
                          {branch.title}
                        </h4>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Branch Breakdown */}
              <div className="bg-[#14141C] border border-[#242434] rounded-2xl p-5 sm:p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block mb-1">
                    Divergence Point
                  </span>
                  <p className="text-sm text-[#F8FAFC] font-medium leading-relaxed">
                    {selectedBranch.divergencePoint}
                  </p>
                </div>

                <div className="border-t border-[#242434] pt-4">
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block mb-1">
                    Simulated Historical Consequence
                  </span>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                    {selectedBranch.consequence}
                  </p>
                </div>

                <div className="border-t border-[#242434] pt-4">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block mb-1">
                    Historiographical Insight
                  </span>
                  <p className="text-xs text-[#94A3B8] leading-relaxed italic">
                    &quot;{selectedBranch.historiographicalNote}&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-6 bg-[#14141C] border-t border-[#242434] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-[#64748B] font-mono text-center sm:text-left">
                Branch Analysis: 3 plausible branches evaluated
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#0A0A0E] border border-[#242434] text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                >
                  Close Analysis
                </button>
                {onSimulateAlternative && (
                  <button
                    onClick={() => {
                      onClose();
                      onSimulateAlternative(`${searchQuery}: ${selectedBranch.title}`);
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  >
                    <span>Simulate This Branch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
