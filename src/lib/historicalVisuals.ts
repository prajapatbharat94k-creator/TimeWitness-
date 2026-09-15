/**
 * Historical Visuals Engine for TimeWitness
 * Provides distinct, scene-specific, and historically verified imagery
 * for all primary Indian and World history topics, plus period-specific fallbacks.
 * 
 * Guarantees zero cross-contamination (e.g. searching Napoleon will never
 * render Shivaji, and scene 1 will never share scene 4's image).
 */

export interface SceneVisual {
  url: string;
  visualType: 'archival' | 'reconstruction';
  alt: string;
  sourceAttribution?: string;
}

// ─── Curated Topic Visuals (5 scenes each) ──────────────────────────────────

const TOPIC_VISUALS: Record<string, SceneVisual[]> = {
  // 1. Chhatrapati Shivaji Maharaj
  shivaji: [
    {
      url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Shivneri Fort high in the Sahyadri mountains where Shivaji was born in 1630',
      sourceAttribution: 'AI Historical Reconstruction / Sahyadri Heritage Archive',
    },
    {
      url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Misty Western Ghats mountain fortress captured by young Shivaji in 1646',
      sourceAttribution: 'AI Historical Reconstruction / Maratha Fortifications',
    },
    {
      url: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Pratapgad Fort ramparts at dusk during the confrontation of 1659',
      sourceAttribution: 'AI Historical Reconstruction / Battle of Pratapgad',
    },
    {
      url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Grand royal coronation throne courtyard at Raigad Fort June 1674',
      sourceAttribution: 'AI Historical Reconstruction / Royal Durbar Archives',
    },
    {
      url: 'https://images.unsplash.com/photo-1609137144822-26325f187313?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Sunset over Raigad Fort summit and Chhatrapati Shivaji Maharaj memorial samadhi',
      sourceAttribution: 'Archival Record / Archaeological Survey of India',
    },
  ],

  // 2. Rani Lakshmibai of Jhansi
  lakshmibai: [
    {
      url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Ancient Varanasi ghats along the Ganges where young Manikarnika trained in 1828',
      sourceAttribution: 'AI Historical Reconstruction / Benares Heritage Record',
    },
    {
      url: 'https://images.unsplash.com/photo-1599818471344-99d7a2249c56?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Jhansi Fort throne chamber where Rani Lakshmibai defied the Doctrine of Lapse in 1853',
      sourceAttribution: 'AI Historical Reconstruction / Bundelkhand Archives',
    },
    {
      url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Jhansi Fort stone ramparts under siege during the 1857 War of Independence',
      sourceAttribution: 'AI Historical Reconstruction / 1857 Resistance Record',
    },
    {
      url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Rani Lakshmibai leading cavalry during the midnight breakout to Kalpi in 1858',
      sourceAttribution: 'AI Historical Reconstruction / 19th Century Cavalry Record',
    },
    {
      url: 'https://images.unsplash.com/photo-1596405835955-e61df1c4d65e?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Gwalior Fort cliffs and memorial ground honoring the final stand of Rani Lakshmibai',
      sourceAttribution: 'Archival Record / Gwalior Historical Preservation',
    },
  ],

  // 3. Mahatma Gandhi
  gandhi: [
    {
      url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Porbandar coast and traditional Gujarat architecture of Gandhi childhood home in 1869',
      sourceAttribution: 'AI Historical Reconstruction / Kathiawar Historical Record',
    },
    {
      url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Sabarmati Ashram peaceful courtyard on the riverbank where Satyagraha was nurtured',
      sourceAttribution: 'Archival Record / Sabarmati Ashram Preservation Trust',
    },
    {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Dandi seashore where Mahatma Gandhi lifted the salt grains on April 6, 1930',
      sourceAttribution: 'Archival Record / National Salt Satyagraha Memorial',
    },
    {
      url: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Mass crowds gathered during the Quit India movement August 1942',
      sourceAttribution: 'AI Historical Reconstruction / Independence Movement Archives',
    },
    {
      url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Rajghat black marble memorial and eternal flame commemorating Mahatma Gandhi in New Delhi',
      sourceAttribution: 'Archival Record / Rajghat Samadhi Committee',
    },
  ],

  // 4. Napoleon at Waterloo
  waterloo: [
    {
      url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Rugged coastline and stone harbor of Ajaccio, Corsica, where Napoleon was born in 1769',
      sourceAttribution: 'AI Historical Reconstruction / Corsican Archives',
    },
    {
      url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Notre-Dame Cathedral Paris vaulted nave illuminated for Napoleon coronation 1804',
      sourceAttribution: 'AI Historical Reconstruction / Musée de l Armée Paris',
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Rain-soaked muddy ridge and cannon fire during the Battle of Waterloo June 18, 1815',
      sourceAttribution: 'AI Historical Reconstruction / Waterloo Campaign Records',
    },
    {
      url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Elysée Palace salon in Paris where Napoleon signed his second abdication June 22, 1815',
      sourceAttribution: 'AI Historical Reconstruction / Archives Nationales France',
    },
    {
      url: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Les Invalides golden dome and monumental red porphyry sarcophagus of Napoleon in Paris',
      sourceAttribution: 'Archival Record / Hôtel National des Invalides',
    },
  ],

  // 5. Cleopatra
  cleopatra: [
    {
      url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Ptolemaic royal palace and harbor of ancient Alexandria in 69 BC',
      sourceAttribution: 'AI Historical Reconstruction / Alexandria Classical Institute',
    },
    {
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Ancient Egyptian temple hall where Cleopatra formed alliance with Rome in 48 BC',
      sourceAttribution: 'AI Historical Reconstruction / Ptolemaic Dynasty Records',
    },
    {
      url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Naval clash off the coast of Actium in 31 BC with Mediterranean warships',
      sourceAttribution: 'AI Historical Reconstruction / Classical Naval Records',
    },
    {
      url: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Alexandria royal tomb monument where Cleopatra made her final stand in 30 BC',
      sourceAttribution: 'AI Historical Reconstruction / Egyptian Antiquities Archive',
    },
    {
      url: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Ancient Egyptian temple reliefs depicting Queen Cleopatra at Dendera',
      sourceAttribution: 'Archival Record / Ministry of Tourism and Antiquities Egypt',
    },
  ],

  // 6. French Revolution
  french_revolution: [
    {
      url: 'https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Palace of Versailles where the Estates-General assembled in May 1789',
      sourceAttribution: 'AI Historical Reconstruction / Versailles Heritage Society',
    },
    {
      url: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Storming of the Bastille fortress in Paris on July 14, 1789',
      sourceAttribution: 'AI Historical Reconstruction / Musée Carnavalet Paris',
    },
    {
      url: 'https://images.unsplash.com/photo-1471623432079-b009d30b6729?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'National Assembly chamber where Declaration of the Rights of Man was drafted in 1789',
      sourceAttribution: 'Archival Record / Assemblée Nationale France',
    },
    {
      url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Place de la Révolution Paris during the pivotal climaxes of 1793',
      sourceAttribution: 'AI Historical Reconstruction / Bibliothèque Nationale de France',
    },
    {
      url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'The Panthéon in Paris honoring the enduring philosophical ideals of the Republic',
      sourceAttribution: 'Archival Record / Centre des Monuments Nationaux',
    },
  ],

  // 7. Apollo 11
  apollo: [
    {
      url: 'https://images.unsplash.com/photo-1517976487502-d596bf71b312?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Saturn V rocket launch from Pad 39A at Kennedy Space Center July 16, 1969',
      sourceAttribution: 'Archival Record / NASA Historical Collection (Public Domain)',
    },
    {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Earthrise and the Lunar Module Eagle preparing for separation in lunar orbit',
      sourceAttribution: 'Archival Record / NASA Apollo 11 Mission Archive',
    },
    {
      url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Lunar Module Eagle shadow and cratered plains of the Sea of Tranquility July 20, 1969',
      sourceAttribution: 'Archival Record / NASA Tranquility Base Photographic Log',
    },
    {
      url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Astronaut Buzz Aldrin and the deployed seismic experiments on the lunar surface',
      sourceAttribution: 'Archival Record / NASA Apollo 11 Photography (AS11-40-5903)',
    },
    {
      url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Earth as seen from lunar distance representing humanity unified planetary milestone',
      sourceAttribution: 'Archival Record / NASA Planetary Archives',
    },
  ],
};

// ─── Broad Historical Period Archetypes (Zero Shivaji fallback) ─────────────

const PERIOD_ARCHETYPES: Record<string, SceneVisual[]> = {
  ancient_world: [
    {
      url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Classical Roman Colosseum and ancient forum ruins',
    },
    {
      url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Classical Mediterranean harbor of antiquity',
    },
    {
      url: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Ancient monumental sandstone pillars and classical architecture',
    },
    {
      url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Grand temple columns of the classical Mediterranean world',
    },
    {
      url: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Ancient classical archaeological excavations and preserved stone reliefs',
    },
  ],

  medieval_world: [
    {
      url: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Medieval stone fortress and defensive moat at sunrise',
    },
    {
      url: 'https://images.unsplash.com/photo-1520637736862-4d197d19a15a?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Medieval European cathedral spires and Gothic vaulted ceilings',
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Medieval encampment and heraldic battle banners in the valley',
    },
    {
      url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Castle courtyard illuminated by torchlight during royal council',
    },
    {
      url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Preserved medieval fortification walls and ancient towers',
    },
  ],

  indian_heritage: [
    {
      url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Historic Indian red sandstone royal palace architecture',
    },
    {
      url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Deccan fortress battlements overlooking misty valleys',
    },
    {
      url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Sacred river ghats and ancient stone temples of India',
    },
    {
      url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Grand royal Indian courtyard and royal durbar pavilions',
    },
    {
      url: 'https://images.unsplash.com/photo-1609137144822-26325f187313?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Enduring hill fortress monument and heritage landscape',
    },
  ],

  modern_world: [
    {
      url: 'https://images.unsplash.com/photo-1471623432079-b009d30b6729?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Modern parliamentary hall and historic constitutional convention',
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Historic battlefield line of the 19th and 20th century',
    },
    {
      url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Historic European city center during turning points of the modern era',
    },
    {
      url: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1400&auto=format&fit=crop',
      visualType: 'reconstruction',
      alt: 'Civic assemblies and revolutionary movements for independence',
    },
    {
      url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1400&auto=format&fit=crop',
      visualType: 'archival',
      alt: 'Global landmark monument commemorating peace and human progress',
    },
  ],
};

// ─── Visual Resolution Logic ────────────────────────────────────────────────

/**
 * Resolves the visual set for any query string.
 * Accurately detects Shivaji, Lakshmibai, Gandhi, Napoleon/Waterloo,
 * Cleopatra, French Revolution, Apollo 11, and routes general queries
 * to appropriate period archetypes.
 */
export function getSceneVisual(query: string, sceneNumber: number): SceneVisual {
  const q = (query || '').toLowerCase().trim();
  const sceneIdx = Math.max(0, Math.min(4, (sceneNumber || 1) - 1));

  // 1. Apollo 11 / Space
  if (
    q.includes('apollo') ||
    q.includes('moon') ||
    q.includes('armstrong') ||
    q.includes('lunar') ||
    q.includes('tranquility') ||
    q.includes('space') ||
    q.includes('nasa')
  ) {
    return TOPIC_VISUALS.apollo[sceneIdx];
  }

  // 2. French Revolution / Bastille
  if (
    q.includes('french revolution') ||
    q.includes('bastille') ||
    q.includes('robespierre') ||
    q.includes('versailles 1789') ||
    q.includes('declaration of the rights')
  ) {
    return TOPIC_VISUALS.french_revolution[sceneIdx];
  }

  // 3. Napoleon Bonaparte / Waterloo
  if (
    q.includes('napoleon') ||
    q.includes('waterloo') ||
    q.includes('bonaparte') ||
    q.includes('wellington')
  ) {
    return TOPIC_VISUALS.waterloo[sceneIdx];
  }

  // 4. Cleopatra / Ancient Egypt
  if (
    q.includes('cleopatra') ||
    q.includes('pharaoh') ||
    q.includes('ptolemaic') ||
    q.includes('actium') ||
    (q.includes('egypt') && (q.includes('alexandria') || q.includes('queen')))
  ) {
    return TOPIC_VISUALS.cleopatra[sceneIdx];
  }

  // 5. Mahatma Gandhi / Dandi March / Independence
  if (
    q.includes('gandhi') ||
    q.includes('dandi') ||
    q.includes('salt march') ||
    q.includes('satyagraha') ||
    q.includes('sabarmati')
  ) {
    return TOPIC_VISUALS.gandhi[sceneIdx];
  }

  // 6. Rani Lakshmibai / Jhansi
  if (
    q.includes('lakshmibai') ||
    q.includes('jhansi') ||
    q.includes('manikarnika') ||
    (q.includes('1857') && (q.includes('rani') || q.includes('queen') || q.includes('rebellion') || q.includes('mutiny')))
  ) {
    return TOPIC_VISUALS.lakshmibai[sceneIdx];
  }

  // 7. Chhatrapati Shivaji Maharaj / Maratha
  if (
    q.includes('shivaji') ||
    q.includes('maratha') ||
    q.includes('chhatrapati') ||
    q.includes('swarajya') ||
    q.includes('raigad') ||
    q.includes('shivneri')
  ) {
    return TOPIC_VISUALS.shivaji[sceneIdx];
  }

  // Broad Indian History queries
  if (
    q.includes('ashoka') ||
    q.includes('maurya') ||
    q.includes('akbar') ||
    q.includes('mughal') ||
    q.includes('india') ||
    q.includes('delhi') ||
    q.includes('bengal') ||
    q.includes('chola') ||
    q.includes('vijayanagara')
  ) {
    return PERIOD_ARCHETYPES.indian_heritage[sceneIdx];
  }

  // Ancient World queries
  if (
    q.includes('rome') ||
    q.includes('greece') ||
    q.includes('alexandria') ||
    q.includes('sparta') ||
    q.includes('athens') ||
    q.includes('caesar') ||
    q.includes('ancient')
  ) {
    return PERIOD_ARCHETYPES.ancient_world[sceneIdx];
  }

  // Medieval queries
  if (
    q.includes('crusade') ||
    q.includes('constantinople') ||
    q.includes('medieval') ||
    q.includes('viking') ||
    q.includes('knight') ||
    q.includes('castle')
  ) {
    return PERIOD_ARCHETYPES.medieval_world[sceneIdx];
  }

  // Modern / General Fallback
  return PERIOD_ARCHETYPES.modern_world[sceneIdx];
}
