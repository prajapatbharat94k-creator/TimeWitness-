import { HistoricalScene } from '@/types/story';
import { getSceneVisual } from '@/lib/historicalVisuals';

export interface DemoStory {
  id: string;
  title: string;
  searchKeywords: string[];
  scenes: HistoricalScene[];
}

export const SAMPLE_STORIES: DemoStory[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 1. Chhatrapati Shivaji Maharaj
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'shivaji-coronation',
    title: 'Coronation of Chhatrapati Shivaji Maharaj',
    searchKeywords: ['shivaji', 'coronation', 'raigad', 'maratha', 'chhatrapati', 'swarajya', 'shivneri'],
    scenes: [
      {
        sceneNumber: 1,
        era: '1630 AD · Junnar, Deccan Plateau',
        title: 'Birth of a Sovereign Prince',
        narration:
          'You stand in the stone corridors of Shivneri Fort, high above the monsoon mists of the Deccan, as dawn light falls across the face of a newborn infant. The year is 1630. Jijabai, warrior-poet and mother, holds her son — Shivaji — and instills the ideals of justice and Swarajya. Around you, the fort walls hum with the weight of prophecy: this child shall forge a sovereign empire.',
        imagePrompt:
          'Cinematic historical oil painting of Shivneri Fort at dawn in 1630 AD Deccan plateau, Jijabai cradling infant Shivaji, warm amber candlelight, dramatic fog over Sahyadri mountains, 17th century Maratha architecture.',
        ambientTag: 'temple_bells_wind',
        imageUrl: getSceneVisual('shivaji', 1).url,
        visualType: getSceneVisual('shivaji', 1).visualType,
        historicalFact: 'Shivaji was born on February 19, 1630, at the hill fortress of Shivneri to Shahaji Bhonsle and Jijabai.',
        reconstructionNote: 'AI Historical Reconstruction based on contemporary bakhars and regional architectural survey.',
        evidenceLevel: 'verified',
        date: 'February 19, 1630',
        location: 'Shivneri Fort, Maharashtra',
      },
      {
        sceneNumber: 2,
        era: '1646 AD · Torna Fort, Western Ghats',
        title: 'Scaling the Fortress — Rise of Swarajya',
        narration:
          'You crouch behind a boulder as Shivaji and his Mavala warriors scale the rain-slicked walls of Torna Fort under a moonless sky. The air crackles with whispered oaths. At sixteen years old, Shivaji seizes his first stronghold without bloodshed. When the saffron banner unfurls against the Sahyadri peaks, the foundation of Hindavi Swarajya is born.',
        imagePrompt:
          'Epic historical painting of sixteen-year-old Shivaji leading Mavala warriors storming Torna Fort at night, torchlight glinting on spear tips, monsoon mist over Western Ghats.',
        ambientTag: 'marching_drums',
        imageUrl: getSceneVisual('shivaji', 2).url,
        visualType: getSceneVisual('shivaji', 2).visualType,
        historicalFact: 'At age 16, Shivaji captured Torna Fort from the Adilshahi sultanate, capturing significant arms and treasure to fortify Rajgad.',
        reconstructionNote: 'AI Historical Reconstruction of 17th-century nocturnal guerrilla siege techniques.',
        evidenceLevel: 'verified',
        date: '1646 AD',
        location: 'Torna Fort, Western Ghats',
      },
      {
        sceneNumber: 3,
        era: '1659 AD · Pratapgad Fort, Sahyadris',
        title: 'The Wagh Nakh — Tactical Climax',
        narration:
          'The forested ravine of Pratapgad is wrapped in morning fog. You watch from a rocky ledge as Shivaji meets Afzal Khan for a supposed peace parley. When Khan attempts betrayal, the hidden wagh nakh flashes in Shivaji’s grasp. In moments, the Bijapur offensive crumbles, proving Shivaji’s unmatched military foresight against overwhelming imperial numbers.',
        imagePrompt:
          'Dramatic historical painting of Shivaji meeting Afzal Khan at the base of Pratapgad Fort, hidden steel tiger claws, dense tropical mountain jungle, period-accurate armor and attire.',
        ambientTag: 'battle_horns_cannons',
        imageUrl: getSceneVisual('shivaji', 3).url,
        visualType: getSceneVisual('shivaji', 3).visualType,
        historicalFact: 'The Battle of Pratapgad was fought on November 10, 1659. Shivaji’s forces routed a much larger Adilshahi army through tactical encirclement.',
        reconstructionNote: 'AI Historical Reconstruction based on the Sabhasad Bakhar and Portuguese diplomatic letters.',
        evidenceLevel: 'verified',
        date: 'November 10, 1659',
        location: 'Pratapgad, Maharashtra',
      },
      {
        sceneNumber: 4,
        era: '1674 AD · Raigad Fort, June 6',
        title: 'The Grand Coronation — Chhatrapati',
        narration:
          'You stand in the vast stone courtyard of Raigad Fort. Over fifty thousand observers have ascended the mountain. The air carries scents of sandalwood, camphor, and conch shells. Pandit Gaga Bhatt pours the sacred waters from golden pitchers. Draped in royal gold, Shivaji is crowned Chhatrapati — Sovereign Monarch of the Maratha Kingdom.',
        imagePrompt:
          'Majestic royal court painting of the coronation of Chhatrapati Shivaji Maharaj at Raigad Fort June 1674, golden throne, assembly of ministers and foreign envoys, warm royal sunlight.',
        ambientTag: 'royal_fanfare',
        imageUrl: getSceneVisual('shivaji', 4).url,
        visualType: getSceneVisual('shivaji', 4).visualType,
        historicalFact: 'Shivaji was formally enthroned on June 6, 1674 (Jyeshtha Shuddha 13), establishing an independent Hindu sovereign state.',
        reconstructionNote: 'AI Historical Reconstruction synthesizing Henry Oxinden’s eyewitness English records and court accounts.',
        evidenceLevel: 'verified',
        date: 'June 6, 1674',
        location: 'Raigad Fort, Maharashtra',
      },
      {
        sceneNumber: 5,
        era: '17th Century – Present · Maharashtra',
        title: 'The Immortal Legacy of Swarajya',
        narration:
          'Centuries dissolve around you. The progressive governance, naval doctrine, and administrative ethics Shivaji established transformed the subcontinent’s geopolitical map. Standing by his samadhi atop Raigad as golden hour light gilds the Western Ghats, you understand: he proved that self-determination and ethical rule could conquer mighty empires.',
        imagePrompt:
          'Majestic sunset panorama of Raigad Fort summit with Shivaji memorial samadhi, Sahyadri mountain ridges stretching into distance, golden hour radiance.',
        ambientTag: 'palace_ambience',
        imageUrl: getSceneVisual('shivaji', 5).url,
        visualType: getSceneVisual('shivaji', 5).visualType,
        historicalFact: 'Shivaji established an Ashta Pradhan (eight-minister council), pioneered maritime fort warfare, and strictly prohibited mistreatment of civilians.',
        reconstructionNote: 'Archival photographic record of the preserved archaeological monument at Raigad.',
        evidenceLevel: 'verified',
        date: '1680 – Present',
        location: 'Raigad Hill Fortress',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. Rani Lakshmibai of Jhansi
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'lakshmibai-1857',
    title: 'Rani Lakshmibai — First War of Independence 1857',
    searchKeywords: ['lakshmibai', 'jhansi', '1857', 'rani', 'revolution', 'independence', 'manikarnika'],
    scenes: [
      {
        sceneNumber: 1,
        era: '1828 AD · Varanasi, River Ganges',
        title: 'Manikarnika — Youth by the Ghats',
        narration:
          'You are on the stone river steps of Varanasi in 1828. A young girl named Manikarnika practices archery and horsemanship along the riverbank, defying conventional boundaries of her era. The sacred river reflects the sunrise as court officials observe her extraordinary resolve — unaware that this child will shake the foundations of British colonial rule.',
        imagePrompt:
          'Cinematic historical painting of young Manikarnika practicing archery on the Varanasi ghats along the Ganges in 1828, traditional 19th-century attire, golden river mist.',
        ambientTag: 'temple_bells_wind',
        imageUrl: getSceneVisual('lakshmibai', 1).url,
        visualType: getSceneVisual('lakshmibai', 1).visualType,
        historicalFact: 'Born in Varanasi as Manikarnika Tambe, she received unconventional education including martial arts, swordplay, and horsemanship at Bithoor.',
        reconstructionNote: 'AI Historical Reconstruction based on 19th-century Marathi biographies and Peshwa court records.',
        evidenceLevel: 'verified',
        date: 'November 19, 1828',
        location: 'Varanasi, India',
      },
      {
        sceneNumber: 2,
        era: '1853 AD · Jhansi Fort Throne Chamber',
        title: 'The Kingdom Annexed — "I Will Not Surrender Jhansi"',
        narration:
          'Lord Dalhousie’s East India Company applies the ruthless Doctrine of Lapse to annex Jhansi following Maharaja Gangadhar Rao’s demise. You stand beside twenty-five-year-old Rani Lakshmibai in the marble halls of Jhansi Fort as British envoys enter. With unwavering dignity, her historic vow echoes through the stone corridors: "Main apni Jhansi nahi doongi."',
        imagePrompt:
          'Dramatic historical painting of Rani Lakshmibai in Jhansi Fort court confronting British colonial agents, defiant posture, holding royal decrees, atmospheric torchlight.',
        ambientTag: 'marching_drums',
        imageUrl: getSceneVisual('lakshmibai', 2).url,
        visualType: getSceneVisual('lakshmibai', 2).visualType,
        historicalFact: 'In March 1854, the British East India Company rejected the adoption of Damodar Rao and ordered the annexation of Jhansi under the Doctrine of Lapse.',
        reconstructionNote: 'AI Historical Reconstruction of the Jhansi court durbar based on colonial dispatch logs.',
        evidenceLevel: 'verified',
        date: 'March 1854',
        location: 'Jhansi Fort, Bundelkhand',
      },
      {
        sceneNumber: 3,
        era: 'March 1858 AD · Ramparts of Jhansi Fort',
        title: 'The Queen on the Battlements',
        narration:
          'You crouch behind stone merlons as British artillery salvos blast against the outer walls. Rani Lakshmibai has secured her infant adopted son to her back and personally directs the artillery battery on the ramparts. For two weeks against overwhelming siege engines, she inspires women and men alike in fierce defense of their city.',
        imagePrompt:
          'Epic battle scene of Rani Lakshmibai on the ramparts of Jhansi Fort during the 1858 siege, sword drawn, child tied securely, smoke and cannon flashes, dramatic dusk sky.',
        ambientTag: 'battle_horns_cannons',
        imageUrl: getSceneVisual('lakshmibai', 3).url,
        visualType: getSceneVisual('lakshmibai', 3).visualType,
        historicalFact: 'General Hugh Rose began the siege of Jhansi on March 22, 1858. Lakshmibai mobilized an army of 14,000 volunteers including female artillery units.',
        reconstructionNote: 'AI Historical Reconstruction integrating British military reports and Indian oral histories.',
        evidenceLevel: 'verified',
        date: 'March – April 1858',
        location: 'Jhansi Fort Ramparts',
      },
      {
        sceneNumber: 4,
        era: 'April 1858 AD · Midnight Breakout to Kalpi',
        title: 'The Midnight Ride to Kalpi',
        narration:
          'When the outer defenses are breached by deception, the Rani refuses surrender. You gallop beside her through the pitch blackness as she leaps her warhorse Badal over fortress parapets, infant still tied to her back. Riding over one hundred miles across ravine territory to Kalpi, she joins forces with Tatya Tope to strike back.',
        imagePrompt:
          'Cinematic historical painting of Rani Lakshmibai leaping her horse over fort battlements at midnight, dark starry sky, silhouetted fortress, intense action motion.',
        ambientTag: 'royal_fanfare',
        imageUrl: getSceneVisual('lakshmibai', 4).url,
        visualType: getSceneVisual('lakshmibai', 4).visualType,
        historicalFact: 'Lakshmibai successfully broke through the British siege perimeter with a small escort on April 4, 1858, riding 102 miles to Kalpi.',
        reconstructionNote: 'AI Historical Reconstruction based on cavalry records and Bundelkhand chronicles.',
        evidenceLevel: 'verified',
        date: 'April 4, 1858',
        location: 'Bundelkhand Plains',
      },
      {
        sceneNumber: 5,
        era: 'June 18, 1858 – Present · Gwalior',
        title: 'The Eternal Flame of Freedom',
        narration:
          'On the battlefield of Kotah-ki-Serai near Gwalior, clad in warrior attire, the Queen charges into her final conflict. Even General Hugh Rose praised her as "the bravest and best military leader of the rebels." Standing today at her memorial in Gwalior, you witness how her courage ignited the flame that carried India to ultimate independence.',
        imagePrompt:
          'Majestic sunset view of the Rani Lakshmibai memorial and Gwalior cliffs, flowers at the base, Indian tricolor waving against golden evening clouds.',
        ambientTag: 'palace_ambience',
        imageUrl: getSceneVisual('lakshmibai', 5).url,
        visualType: getSceneVisual('lakshmibai', 5).visualType,
        historicalFact: 'Rani Lakshmibai died fighting on June 18, 1858, at Kotah-ki-Serai near Gwalior at the age of 29.',
        reconstructionNote: 'Archival monument record from the Archaeological Survey of India at Gwalior.',
        evidenceLevel: 'verified',
        date: 'June 18, 1858',
        location: 'Gwalior, Madhya Pradesh',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. Mahatma Gandhi
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'gandhi-dandi',
    title: 'Mahatma Gandhi — The Dandi March & Satyagraha',
    searchKeywords: ['gandhi', 'dandi', 'salt march', 'satyagraha', 'sabarmati', 'independence'],
    scenes: [
      {
        sceneNumber: 1,
        era: '1869 AD · Porbandar, Gujarat Coast',
        title: 'Coastal Roots of Satyagraha',
        narration:
          'You walk the sun-warmed courtyards of a three-story stone townhouse in coastal Porbandar in 1869. Here, Mohandas Karamchand Gandhi is born into a devout family steeped in Jain and Vaishnava values of Ahimsa (non-injury) and truth. The Arabian Sea murmurs outside, hinting at the oceanic moral force this quiet youth will one day unleash.',
        imagePrompt:
          'Historical painting of Porbandar traditional stone house in 1869, coastal Gujarat architecture, peaceful morning light, delicate oil painting atmosphere.',
        ambientTag: 'temple_bells_wind',
        imageUrl: getSceneVisual('gandhi', 1).url,
        visualType: getSceneVisual('gandhi', 1).visualType,
        historicalFact: 'Mohandas Gandhi was born on October 2, 1869, in Porbandar, where his father Karamchand was dewan (chief minister).',
        reconstructionNote: 'AI Historical Reconstruction based on Gandhi’s autobiography "The Story of My Experiments with Truth".',
        evidenceLevel: 'verified',
        date: 'October 2, 1869',
        location: 'Porbandar, Gujarat',
      },
      {
        sceneNumber: 2,
        era: '1917 AD · Sabarmati Ashram, Ahmedabad',
        title: 'The Ashram by the Sabarmati',
        narration:
          'The rhythmic click of the wooden spinning charkha fills the shaded verandah of Hriday Kunj. You sit among weavers, farmers, and scholars as Gandhi outlines the doctrine of Sarvodaya and self-reliance. Here on the banks of the Sabarmati River, he transforms ancient philosophical non-violence into a revolutionary mass civil rights weapon.',
        imagePrompt:
          'Peaceful courtyard of Sabarmati Ashram in 1917, wooden charkha spinning wheels, sunlight filtering through neem trees, simple white khadi textiles.',
        ambientTag: 'palace_ambience',
        imageUrl: getSceneVisual('gandhi', 2).url,
        visualType: getSceneVisual('gandhi', 2).visualType,
        historicalFact: 'Gandhi founded the Sabarmati Ashram in 1917, making it the epicentre of national campaigns for village self-reliance and untouchability eradication.',
        reconstructionNote: 'Archival photographic preservation records of Sabarmati Ashram.',
        evidenceLevel: 'verified',
        date: '1917 AD',
        location: 'Ahmedabad, Gujarat',
      },
      {
        sceneNumber: 3,
        era: 'April 6, 1930 · Dandi Seashore, Gujarat',
        title: 'A Pinch of Salt Shakes an Empire',
        narration:
          'After marching 240 miles on foot across Gujarat with 78 volunteers, you stand on the mudflats of Dandi at dawn on April 6, 1930. Thousands gather in solemn silence. Gandhi bends down, scoops up a handful of dried sea salt, and declares his defiance of the British Salt Laws. Across the nation, millions replicate the act, shattering the illusion of colonial compliance.',
        imagePrompt:
          'Historic cinematic painting of Gandhi bending on the Dandi seashore lifting natural salt, vast crowd of white-clad satyagrahis, morning sea spray and golden sunrise.',
        ambientTag: 'battle_horns_cannons',
        imageUrl: getSceneVisual('gandhi', 3).url,
        visualType: getSceneVisual('gandhi', 3).visualType,
        historicalFact: 'The Salt Satyagraha began on March 12, 1930, from Sabarmati and culminated on April 6 at Dandi, leading to over 60,000 arrests nationwide.',
        reconstructionNote: 'Archival record cross-referenced with the Salt March documentary archives and Indian news dispatches.',
        evidenceLevel: 'verified',
        date: 'April 6, 1930',
        location: 'Dandi, Gujarat',
      },
      {
        sceneNumber: 4,
        era: 'August 1942 · Gowalia Tank Maidan, Mumbai',
        title: '"Do or Die" — The Quit India Call',
        narration:
          'A sea of one hundred thousand citizens surges across Gowalia Tank Maidan on a rain-drenched August evening in 1942. Gandhi steps to the microphone and delivers his historic mantra: "Do or Die. We shall either free India or die in the attempt." Within hours the entire Congress leadership is jailed, but the unstoppable national momentum is irreversible.',
        imagePrompt:
          'Dramatic mass rally at Gowalia Tank Mumbai August 1942, sea of umbrellas in monsoon rain, Gandhi at the microphone on wooden dais, passionate civic assembly.',
        ambientTag: 'marching_drums',
        imageUrl: getSceneVisual('gandhi', 4).url,
        visualType: getSceneVisual('gandhi', 4).visualType,
        historicalFact: 'The Quit India Resolution was passed on August 8, 1942, at Gowalia Tank (now August Kranti Maidan) in Bombay.',
        reconstructionNote: 'AI Historical Reconstruction based on All India Congress Committee archival records.',
        evidenceLevel: 'verified',
        date: 'August 8, 1942',
        location: 'Mumbai, Maharashtra',
      },
      {
        sceneNumber: 5,
        era: '1948 – Present · New Delhi & the World',
        title: 'Eternal Flame of Satyagraha',
        narration:
          'Centuries will reckon with what one slender man in homespun cotton achieved without firing a single weapon. At Rajghat in New Delhi, the eternal flame burns atop black polished marble bearing his final words "He Ram." His principles inspired Martin Luther King Jr., Nelson Mandela, and peace movements across the globe.',
        imagePrompt:
          'Rajghat black marble samadhi in New Delhi at dusk, eternal flame flickering gently, marigold garlands, serene quiet garden lawns.',
        ambientTag: 'temple_bells_wind',
        imageUrl: getSceneVisual('gandhi', 5).url,
        visualType: getSceneVisual('gandhi', 5).visualType,
        historicalFact: 'Gandhi was assassinated on January 30, 1948, in New Delhi. The United Nations observes his birthday, October 2, as the International Day of Non-Violence.',
        reconstructionNote: 'Archival photographic preservation records of the National Gandhi Museum.',
        evidenceLevel: 'verified',
        date: 'January 30, 1948 – Present',
        location: 'Rajghat, New Delhi',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. Napoleon Bonaparte at Waterloo
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'napoleon-waterloo',
    title: 'Napoleon Bonaparte at the Battle of Waterloo',
    searchKeywords: ['napoleon', 'waterloo', 'bonaparte', 'france', 'wellington', 'battle'],
    scenes: [
      {
        sceneNumber: 1,
        era: '1769 AD · Ajaccio, Corsica',
        title: 'Boyhood on a Mediterranean Isle',
        narration:
          'You stand on the sun-baked granite quays of Ajaccio, Corsica, in 1769. A lean, intensely focused boy named Napoleone Buonaparte gazes out across the turquoise Mediterranean. Speaking Italian as his native tongue and dreaming of liberation, you see in this quiet schoolboy the tactical mind that will soon redraw the map of Europe fourteen times.',
        imagePrompt:
          'Historical oil painting of young Napoleon overlooking the Mediterranean harbor of Ajaccio Corsica in 1769, 18th-century stone village architecture, golden sea glow.',
        ambientTag: 'temple_bells_wind',
        imageUrl: getSceneVisual('napoleon', 1).url,
        visualType: getSceneVisual('napoleon', 1).visualType,
        historicalFact: 'Napoleon was born on August 15, 1769, in Ajaccio, Corsica, only months after the island was purchased by France from Genoa.',
        reconstructionNote: 'AI Historical Reconstruction based on Napoleon’s early childhood letters and Corsican archives.',
        evidenceLevel: 'verified',
        date: 'August 15, 1769',
        location: 'Ajaccio, Corsica',
      },
      {
        sceneNumber: 2,
        era: 'December 2, 1804 · Notre-Dame Cathedral, Paris',
        title: 'The Emperor Crowns Himself',
        narration:
          'Inside Notre-Dame Cathedral, thousands of candles illuminate the Gothic vaulted nave. Pope Pius VII presides in golden robes. But as the supreme moment of consecration arrives, Napoleon deliberately takes the laurel crown with his own hands and places it upon his head before crowning Empress Joséphine — declaring that no earthly or papal power gave him this throne.',
        imagePrompt:
          'Epic classical painting of Napoleon coronation at Notre-Dame Cathedral Paris 1804, emperor crowning himself, grand red and gold velvet robes, Jacques-Louis David style.',
        ambientTag: 'royal_fanfare',
        imageUrl: getSceneVisual('napoleon', 2).url,
        visualType: getSceneVisual('napoleon', 2).visualType,
        historicalFact: 'On December 2, 1804, Napoleon was consecrated Emperor of the French at Notre-Dame Cathedral in Paris.',
        reconstructionNote: 'AI Historical Reconstruction synthesizing official imperial paintings and French state archives.',
        evidenceLevel: 'verified',
        date: 'December 2, 1804',
        location: 'Notre-Dame, Paris',
      },
      {
        sceneNumber: 3,
        era: 'June 18, 1815 · Waterloo, Belgium',
        title: 'The Mud of Mont-Saint-Jean — Tactical Climax',
        narration:
          'The battlefield reeks of black powder, cold rain, and churned mud. You watch from the French command post as Napoleon orders his undefeated Imperial Guard up the slope of Mont-Saint-Jean toward Wellington’s concealed British squares. But as Blücher’s Prussian corps arrives on the eastern flank, the veteran French line falters. The legend of invincibility fractures.',
        imagePrompt:
          'Dramatic battle scene of the Battle of Waterloo June 18 1815, Imperial Guard advancing through thick cannon smoke, sodden ground, charging cavalry, epic wide shot.',
        ambientTag: 'battle_horns_cannons',
        imageUrl: getSceneVisual('napoleon', 3).url,
        visualType: getSceneVisual('napoleon', 3).visualType,
        historicalFact: 'The Battle of Waterloo was fought on Sunday, June 18, 1815, involving approximately 73,000 French troops against 118,000 Anglo-Allied and Prussian soldiers.',
        reconstructionNote: 'AI Historical Reconstruction based on British, French, and Prussian battle dispatches.',
        evidenceLevel: 'verified',
        date: 'June 18, 1815',
        location: 'Waterloo, Belgium',
      },
      {
        sceneNumber: 4,
        era: 'June 22, 1815 · Elysée Palace, Paris',
        title: 'The Second Abdication',
        narration:
          'Four days after Waterloo, you watch Napoleon enter the quiet salon of the Elysée Palace. The cheering crowds of Paris are gone; the parliament demands his resignation. Taking quill to parchment, he writes the simple decree that ends the Napoleonic Empire: "I offer myself in sacrifice to the hatred of the enemies of France." Six years of remote exile on Saint Helena await.',
        imagePrompt:
          'Melancholic historical painting of Napoleon signing his abdication at the Elysée Palace Paris June 1815, somber chamber, quill in hand, rain streaks on window.',
        ambientTag: 'marching_drums',
        imageUrl: getSceneVisual('napoleon', 4).url,
        visualType: getSceneVisual('napoleon', 4).visualType,
        historicalFact: 'Napoleon signed his second and final abdication on June 22, 1815, and surrendered to the British Royal Navy aboard HMS Bellerophon.',
        reconstructionNote: 'AI Historical Reconstruction based on French national assembly records.',
        evidenceLevel: 'verified',
        date: 'June 22, 1815',
        location: 'Elysée Palace, Paris',
      },
      {
        sceneNumber: 5,
        era: '1821 – Present · Les Invalides, Paris',
        title: 'The Napoleonic Code & Global Memory',
        narration:
          'Napoleon died in exile in 1821, but his legacy reshaped modern civilization. The Napoleonic Code remains the foundational legal system in over fifty nations worldwide. Standing beneath the golden dome of Les Invalides before his red quartzite tomb, you witness how one man’s ambition transformed European law, meritocracy, and statecraft forever.',
        imagePrompt:
          'Majestic interior view of Napoleon red porphyry tomb beneath the soaring golden dome of Les Invalides in Paris, reverent lighting and architectural grandeur.',
        ambientTag: 'palace_ambience',
        imageUrl: getSceneVisual('napoleon', 5).url,
        visualType: getSceneVisual('napoleon', 5).visualType,
        historicalFact: 'Napoleon’s remains were returned to Paris from Saint Helena in 1840 ("Retour des cendres") and interred at Les Invalides in 1861.',
        reconstructionNote: 'Archival photographic record of the national historical monument at Les Invalides.',
        evidenceLevel: 'verified',
        date: '1840 – Present',
        location: 'Les Invalides, Paris',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. Cleopatra VII Philopator
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'cleopatra-alexandria',
    title: 'Cleopatra VII — Last Pharaoh of Egypt',
    searchKeywords: ['cleopatra', 'egypt', 'pharaoh', 'alexandria', 'actium', 'ptolemaic'],
    scenes: [
      {
        sceneNumber: 1,
        era: '69 BC · Royal Palace, Alexandria',
        title: 'Childhood in the Ptolemaic Court',
        narration:
          'You walk the marble colonnades of the royal palace of Alexandria overlooking the Mediterranean in 69 BC. Young Cleopatra studies geometry, astronomy, and nine foreign languages in the shadow of the Great Library. While her dynasty is in decline, this brilliant princess prepares herself to be the first Ptolemaic ruler in three centuries to speak the native Egyptian tongue.',
        imagePrompt:
          'Ancient Mediterranean coastal palace of Alexandria in 69 BC, papyrus scrolls, Greek and Egyptian marble statues, royal blue waters of the harbor.',
        ambientTag: 'temple_bells_wind',
        imageUrl: getSceneVisual('cleopatra', 1).url,
        visualType: getSceneVisual('cleopatra', 1).visualType,
        historicalFact: 'Cleopatra VII was born in 69 BC and was famously polyglot, speaking Greek, Egyptian, Ethiopian, Hebrew, Aramaic, Arabic, and Parthian.',
        reconstructionNote: 'AI Historical Reconstruction based on Plutarch’s biographies and Hellenistic archaeological discoveries.',
        evidenceLevel: 'verified',
        date: '69 BC',
        location: 'Alexandria, Egypt',
      },
      {
        sceneNumber: 2,
        era: '48 BC · Alexandria Harbour & Palace',
        title: 'The Carpet of Destiny — Alliance with Caesar',
        narration:
          'Smuggled through the Roman blockade rolled inside a hemp linen bed-sack, eighteen-year-old Cleopatra is unrolled directly into the private chambers of Julius Caesar. In one audacious diplomatic gamble, she wins Rome’s paramount general to her cause and reclaims the dual crown of Upper and Lower Egypt.',
        imagePrompt:
          'Dramatic classical painting of Cleopatra presenting herself before Julius Caesar in the palace of Alexandria 48 BC, Roman legionary guards, Egyptian oil lamps.',
        ambientTag: 'palace_ambience',
        imageUrl: getSceneVisual('cleopatra', 2).url,
        visualType: getSceneVisual('cleopatra', 2).visualType,
        historicalFact: 'In late 48 BC, Cleopatra secretly entered Alexandria and allied with Julius Caesar, winning the Alexandrian War against her brother Ptolemy XIII.',
        reconstructionNote: 'AI Historical Reconstruction based on Roman historical accounts by Plutarch and Suetonius.',
        evidenceLevel: 'verified',
        date: '48 BC',
        location: 'Alexandria, Egypt',
      },
      {
        sceneNumber: 3,
        era: '31 BC · Gulf of Actium, Greece',
        title: 'The Naval Clash of Actium',
        narration:
          'You stand aboard Cleopatra’s royal flagship Antoniad amidst five hundred warships in the Gulf of Actium. Octavian’s fleet under Agrippa attacks with ferocious agility. As the tactical balance shifts toward Rome, Cleopatra executes a calculated naval retreat back toward Alexandria to preserve Egypt’s treasury, signaling the twilight of the Hellenistic era.',
        imagePrompt:
          'Epic naval battle scene of the Battle of Actium 31 BC, Roman and Ptolemaic war galleys with purple sails clashing on choppy Mediterranean waters.',
        ambientTag: 'battle_horns_cannons',
        imageUrl: getSceneVisual('cleopatra', 3).url,
        visualType: getSceneVisual('cleopatra', 3).visualType,
        historicalFact: 'The Battle of Actium on September 2, 31 BC, saw Octavian’s forces defeat the combined fleets of Antony and Cleopatra.',
        reconstructionNote: 'AI Historical Reconstruction based on archaeological survey of Roman shipwrecks and classical histories.',
        evidenceLevel: 'verified',
        date: 'September 2, 31 BC',
        location: 'Actium, Greece',
      },
      {
        sceneNumber: 4,
        era: 'August 30 BC · Royal Mausoleum, Alexandria',
        title: 'The Final Dignity — Death of a Pharaoh',
        narration:
          'Barricaded in her magnificent two-story royal mausoleum as Octavian’s legions march through Alexandria, Cleopatra dons her royal robes and golden diadem. Refusing to be paraded as a captive trophy in a Roman triumph, the thirty-nine-year-old Queen meets her end with legendary defiance, closing three thousand years of Egyptian pharaohs.',
        imagePrompt:
          'Melancholic classical painting of Cleopatra in royal gold and turquoise regalia in her Alexandria mausoleum 30 BC, dignity in defeat, classical Egyptian iconography.',
        ambientTag: 'marching_drums',
        imageUrl: getSceneVisual('cleopatra', 4).url,
        visualType: getSceneVisual('cleopatra', 4).visualType,
        historicalFact: 'Cleopatra died on August 10 or 12, 30 BC, ending the Ptolemaic Kingdom and causing Egypt to become a Roman province.',
        reconstructionNote: 'AI Historical Reconstruction based on Strabo and Plutarch accounts.',
        evidenceLevel: 'verified',
        date: 'August 30 BC',
        location: 'Alexandria, Egypt',
      },
      {
        sceneNumber: 5,
        era: '30 BC – Present · Temple of Dendera',
        title: 'The Immortal Queen of the Nile',
        narration:
          'Millennia after Alexandria’s royal palaces sank beneath the Mediterranean waves, Cleopatra’s image endures on the monumental stone relief walls of the Temple of Dendera. She remains the ultimate symbol of intellect, political acumen, and sovereign resistance against overwhelming imperial forces.',
        imagePrompt:
          'Ancient sandstone relief carvings of Queen Cleopatra on the temple wall at Dendera, warm Egyptian sunlight highlighting hieroglyphic inscriptions.',
        ambientTag: 'temple_bells_wind',
        imageUrl: getSceneVisual('cleopatra', 5).url,
        visualType: getSceneVisual('cleopatra', 5).visualType,
        historicalFact: 'A monumental relief of Cleopatra and her son Caesarion is preserved on the south exterior wall of the Hathor Temple at Dendera.',
        reconstructionNote: 'Archival photographic preservation record from the Ministry of Tourism and Antiquities of Egypt.',
        evidenceLevel: 'verified',
        date: 'Antiquity – Present',
        location: 'Dendera, Egypt',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. French Revolution
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'french-revolution-1789',
    title: 'French Revolution — Liberty, Equality, Fraternity',
    searchKeywords: ['french revolution', 'bastille', 'versailles', '1789', 'robespierre', 'republic'],
    scenes: [
      {
        sceneNumber: 1,
        era: 'May 1789 · Palace of Versailles',
        title: 'The Estates-General Assembles',
        narration:
          'You walk through the gilded Hall of Mirrors at Versailles where twelve hundred representatives of the Clergy, Nobility, and Commoners gather for the first time in 175 years. In the tense spring air, bread shortages and bankruptcy ignite revolt. When the Third Estate is locked out, they swear the historic Tennis Court Oath: never to separate until France has a constitution.',
        imagePrompt:
          'Historic oil painting of the Estates-General opening at Versailles May 1789, grand chandeliers, assembly of three orders, dramatic golden lighting.',
        ambientTag: 'temple_bells_wind',
        imageUrl: getSceneVisual('french revolution', 1).url,
        visualType: getSceneVisual('french revolution', 1).visualType,
        historicalFact: 'The Estates-General opened on May 5, 1789, and on June 20 the Third Estate took the Tennis Court Oath (Serment du Jeu de Paume).',
        reconstructionNote: 'AI Historical Reconstruction based on Jacques-Louis David sketches and Versailles archival registers.',
        evidenceLevel: 'verified',
        date: 'May – June 1789',
        location: 'Versailles, France',
      },
      {
        sceneNumber: 2,
        era: 'July 14, 1789 · Paris',
        title: 'The Storming of the Bastille',
        narration:
          'You stand among thousands of Parisian tradesmen, women, and defecting soldiers surrounding the eight-towered fortress of the Bastille. Smoke and musket fire fill the cobblestone square. When the drawbridges crash down, the crowd seizes the fortress prison, tearing down the supreme physical monument of royal despotism with their bare hands.',
        imagePrompt:
          'Dramatic battle painting of the Storming of the Bastille July 14 1789, drawbridge collapsing, smoke and revolutionary banners, Paris cobblestones.',
        ambientTag: 'marching_drums',
        imageUrl: getSceneVisual('french revolution', 2).url,
        visualType: getSceneVisual('french revolution', 2).visualType,
        historicalFact: 'The storming of the Bastille on July 14, 1789, claimed approximately 100 rebel lives and is celebrated as the French National Day (Bastille Day).',
        reconstructionNote: 'AI Historical Reconstruction cross-referenced with eyewitness records at Musée Carnavalet.',
        evidenceLevel: 'verified',
        date: 'July 14, 1789',
        location: 'Paris, France',
      },
      {
        sceneNumber: 3,
        era: 'August 1789 · National Assembly, Paris',
        title: 'Declaration of the Rights of Man',
        narration:
          'Candles burn late into the summer night in the National Assembly. You watch deputies vote unanimously to abolish feudalism and enact seventeen revolutionary articles: "Men are born and remain free and equal in rights." These words break the divine right of kings across Europe and lay the foundation for modern universal human rights.',
        imagePrompt:
          'Historical painting of the National Constituent Assembly in Paris August 1789 drafting the Declaration of the Rights of Man and of the Citizen.',
        ambientTag: 'palace_ambience',
        imageUrl: getSceneVisual('french revolution', 3).url,
        visualType: getSceneVisual('french revolution', 3).visualType,
        historicalFact: 'The Declaration of the Rights of Man and of the Citizen was adopted on August 26, 1789, influenced by Thomas Jefferson and General Lafayette.',
        reconstructionNote: 'Archival document record from the National Archives of France.',
        evidenceLevel: 'verified',
        date: 'August 26, 1789',
        location: 'Paris, France',
      },
      {
        sceneNumber: 4,
        era: '1793 AD · Place de la Révolution, Paris',
        title: 'The Climax & The Terror',
        narration:
          'You stand in the winter chill of the Place de la Révolution as drums roll relentlessly to drown out political cries. The revolutionary republic, besieged by foreign monarchies and internal counter-rebellion, turns inward. You witness the dramatic, tragic paradox of a revolution that promised liberty struggling with extreme terror.',
        imagePrompt:
          'Dramatic historical depiction of Place de la Révolution in Paris 1793, somber overcast sky, Revolutionary guards with tricolor cockades, tense historic atmosphere.',
        ambientTag: 'battle_horns_cannons',
        imageUrl: getSceneVisual('french revolution', 4).url,
        visualType: getSceneVisual('french revolution', 4).visualType,
        historicalFact: 'The Reign of Terror lasted from September 1793 to July 1794, ending with the fall of Maximilien Robespierre on 9 Thermidor.',
        reconstructionNote: 'AI Historical Reconstruction based on revolutionary tribunal logs.',
        evidenceLevel: 'verified',
        date: '1793 – 1794 AD',
        location: 'Place de la Concorde, Paris',
      },
      {
        sceneNumber: 5,
        era: '1799 – Present · The Panthéon, Paris',
        title: 'Birth of Modern Democratic Republics',
        narration:
          'Centuries later, standing beneath the neoclassical dome of the Panthéon in Paris, the enduring legacy is clear. The French Revolution dismantled the ancient feudal order, created the secular republic, established democratic constitutionalism, and gifted the world the motto: Liberté, Égalité, Fraternité.',
        imagePrompt:
          'Majestic classical view of the Panthéon in Paris at dusk, French tricolor flags, wide cinematic perspective, enduring architectural monument.',
        ambientTag: 'royal_fanfare',
        imageUrl: getSceneVisual('french revolution', 5).url,
        visualType: getSceneVisual('french revolution', 5).visualType,
        historicalFact: 'The French Revolution inspired constitutional transformations across Europe, Latin America, and democratic independence movements worldwide.',
        reconstructionNote: 'Archival photographic preservation record of the Panthéon.',
        evidenceLevel: 'verified',
        date: 'Modern Era',
        location: 'The Panthéon, Paris',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. Apollo 11 Lunar Landing
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'apollo-11-moon-landing',
    title: 'Apollo 11 — First Human Moon Landing',
    searchKeywords: ['apollo 11', 'apollo', 'moon', 'armstrong', 'lunar', 'aldrin', 'nasa', '1969'],
    scenes: [
      {
        sceneNumber: 1,
        era: 'July 16, 1969 · Pad 39A, Kennedy Space Center',
        title: 'Launch of the Saturn V Giant',
        narration:
          'The morning humid air of Cape Canaveral trembles. You stand three miles away as five massive F-1 rocket engines ignite beneath the 363-foot Saturn V rocket, unleashing 7.5 million pounds of thrust. A synthetic sun of flame illuminates Florida’s coastline as Neil Armstrong, Buzz Aldrin, and Michael Collins ride the inferno into the heavens.',
        imagePrompt:
          'Epic historical photograph of Saturn V rocket launching from Pad 39A Kennedy Space Center July 16 1969, massive plumes of fire and vapor, intense morning light.',
        ambientTag: 'battle_horns_cannons',
        imageUrl: getSceneVisual('apollo', 1).url,
        visualType: getSceneVisual('apollo', 1).visualType,
        historicalFact: 'Apollo 11 launched at 9:32 AM EDT on July 16, 1969, carrying Neil Armstrong, Buzz Aldrin, and Michael Collins on a 240,000-mile voyage to the Moon.',
        reconstructionNote: 'Archival public domain photographic record from NASA Kennedy Space Center.',
        evidenceLevel: 'verified',
        date: 'July 16, 1969',
        location: 'Cape Canaveral, Florida',
      },
      {
        sceneNumber: 2,
        era: 'July 20, 1969 · Lunar Orbit (60 Nautical Miles)',
        title: 'Separation of the Eagle',
        narration:
          'Floating in silence behind the far side of the Moon, you witness the fragile Lunar Module Eagle undock from the Command Module Columbia. Armstrong performs a slow pirouette so Collins can inspect the landing gear. Against the pitch-black abyss of space, the blue jewel of Earth hangs suspended — a lonely sanctuary for all of humanity.',
        imagePrompt:
          'Cinematic archival view of the Lunar Module Eagle separating in lunar orbit, cratered grey moonscape below, glowing Earth hanging in deep black space.',
        ambientTag: 'palace_ambience',
        imageUrl: getSceneVisual('apollo', 2).url,
        visualType: getSceneVisual('apollo', 2).visualType,
        historicalFact: 'The Lunar Module Eagle undocked from Columbia at 17:44 UTC on July 20, 1969, while in orbit around the Moon.',
        reconstructionNote: 'Archival photographic record by Michael Collins from Command Module Columbia (NASA).',
        evidenceLevel: 'verified',
        date: 'July 20, 1969',
        location: 'Lunar Orbit',
      },
      {
        sceneNumber: 3,
        era: 'July 20, 1969 · Sea of Tranquility',
        title: '"The Eagle Has Landed" — Climax',
        narration:
          'Computer overload alarms 1202 and 1201 blare inside the cabin. Down to barely thirty seconds of landing propellant, Neil Armstrong takes manual semi-automatic control, skimming over a boulder-strewn crater. Gently, the contact sensors touch the pristine dust. Armstrong’s calm radio transmission reaches Earth: "Houston, Tranquility Base here. The Eagle has landed."',
        imagePrompt:
          'Dramatic lunar surface photograph of the Lunar Module Eagle leg touching lunar soil, dust kicked up in vacuum, cratered plain of the Sea of Tranquility.',
        ambientTag: 'marching_drums',
        imageUrl: getSceneVisual('apollo', 3).url,
        visualType: getSceneVisual('apollo', 3).visualType,
        historicalFact: 'The Lunar Module touched down at 20:17:40 UTC on July 20, 1969, with only about 25 seconds of fuel remaining before mandatory abort.',
        reconstructionNote: 'Archival record cross-referenced with Apollo 11 voice transcripts and telemetry.',
        evidenceLevel: 'verified',
        date: 'July 20, 1969 (20:17 UTC)',
        location: 'Sea of Tranquility, Moon',
      },
      {
        sceneNumber: 4,
        era: 'July 20, 1969 · 10:56 PM EDT · Lunar Surface',
        title: '"One Small Step for Man"',
        narration:
          'You watch through the grainy black-and-white television feed transmitted live to 650 million viewers worldwide. Neil Armstrong steps off the lunar pad, pressing his boot into the fine lunar regolith: "That\'s one small step for man, one giant leap for mankind." Soon, Buzz Aldrin joins him, describing the vista as "magnificent desolation."',
        imagePrompt:
          'Historic NASA photograph of astronaut Buzz Aldrin on the moon beside the American flag, golden foil on lunar module leg, black sky, crisp lunar shadows.',
        ambientTag: 'royal_fanfare',
        imageUrl: getSceneVisual('apollo', 4).url,
        visualType: getSceneVisual('apollo', 4).visualType,
        historicalFact: 'Neil Armstrong stepped onto the lunar surface at 02:56 UTC on July 21 (10:56 PM EDT July 20). Armstrong and Aldrin spent 21 hours and 36 minutes on the Moon.',
        reconstructionNote: 'Archival photographic record by Neil Armstrong (NASA photo AS11-40-5903).',
        evidenceLevel: 'verified',
        date: 'July 20 – 21, 1969',
        location: 'Tranquility Base, Moon',
      },
      {
        sceneNumber: 5,
        era: 'July 24, 1969 – Present · Pacific Ocean & Earth',
        title: '"We Came in Peace for All Mankind"',
        narration:
          'Three orange parachutes blossom over the Pacific Ocean as Columbia splashes down safely. Left behind on the desolate lunar dust is a stainless steel plaque signed by three astronauts and a president: "Here men from the planet Earth first set foot upon the Moon. We came in peace for all mankind." A testament that humanity can transcend its horizons.',
        imagePrompt:
          'Earth seen from space during the Apollo 11 voyage, blue oceans, swirling white clouds, stark contrast against infinite black cosmos.',
        ambientTag: 'temple_bells_wind',
        imageUrl: getSceneVisual('apollo', 5).url,
        visualType: getSceneVisual('apollo', 5).visualType,
        historicalFact: 'Apollo 11 safely splashed down in the Pacific Ocean southwest of Hawaii on July 24, 1969, and was recovered by USS Hornet.',
        reconstructionNote: 'Archival NASA photographic records and National Air and Space Museum historical archives.',
        evidenceLevel: 'verified',
        date: 'July 24, 1969 – Present',
        location: 'Pacific Ocean / Earth',
      },
    ],
  },
];

/**
 * Find a matching curated demo story for a given search query.
 */
export function findDemoStory(query: string): DemoStory | null {
  const lowerQuery = query.toLowerCase().trim();
  return (
    SAMPLE_STORIES.find((story) =>
      story.searchKeywords.some((kw) => lowerQuery.includes(kw.toLowerCase()))
    ) ?? null
  );
}
