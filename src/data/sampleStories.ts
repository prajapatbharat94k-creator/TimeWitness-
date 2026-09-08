import { HistoricalScene } from '@/types/story';

export interface DemoStory {
  id: string;
  title: string;
  searchKeywords: string[];
  scenes: HistoricalScene[];
}

export const SAMPLE_STORIES: DemoStory[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // STORY 1: Coronation of Chhatrapati Shivaji Maharaj
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'shivaji-coronation',
    title: 'Coronation of Chhatrapati Shivaji Maharaj',
    searchKeywords: ['shivaji', 'coronation', 'raigad', 'maratha', 'chhatrapati', 'swarajya'],
    scenes: [
      {
        sceneNumber: 1,
        era: '1630 AD · Junnar, Deccan Plateau',
        title: 'Birth of a Warrior Prince',
        narration:
          'You stand in the stone corridors of Shivneri Fort, high above the monsoon mists of the Deccan, as dawn light falls across the face of a newborn infant. The year is 1630. Jijabai, warrior-poet and mother, holds her son — Shivaji — and whispers the tales of Ram and Arjuna into his tiny ears. Around you, the fort walls hum with the weight of prophecy. You sense it too: this child shall not merely witness history — he shall forge it.',
        imagePrompt:
          'Cinematic oil painting of Shivneri Fort at dawn, 1630 AD Deccan plateau, Jijabai cradling infant Shivaji, warm amber candlelight, dramatic fog over Sahyadri mountains, Mughal-era Indian architecture, 8K hyperrealistic concept art.',
        ambientTag: 'temple_bells_wind',
      },
      {
        sceneNumber: 2,
        era: '1646 AD · Torna Fort, Western Ghats',
        title: 'The First Fort — Rise of Swarajya',
        narration:
          'You crouch behind a boulder as Shivaji and his Mavala warriors — barely older than boys — scale the rain-slicked walls of Torna Fort under a moonless sky. The air crackles with whispered oaths and the smell of gunpowder. At sixteen, Shivaji seizes his first fortress. When the Swarajya banner unfurls against the grey monsoon sky, the crowd around you — peasants, soldiers, farmers — erupts. You feel the tremor of a revolution beginning beneath your feet.',
        imagePrompt:
          'Epic historical painting of teenage Shivaji leading Mavala warriors storming Torna Fort at night, torchlight glinting on spear tips, Sahyadri mountains in silhouette, monsoon rain, 17th century Maratha military attire, dramatic cinematographic composition.',
        ambientTag: 'marching_drums',
      },
      {
        sceneNumber: 3,
        era: '1659 AD · Pratapgad Fort, Battle of Pratapgad',
        title: 'The Wagh Nakh — Defining Climax',
        narration:
          'The hillside is thick with the screams of war elephants and clashing steel. You watch from a rocky ledge as Shivaji meets Afzal Khan — Bijapur\'s most feared general — for a supposed peace parley. Suddenly, everything changes. The wagh nakh — tiger claw — flashes in Shivaji\'s palm. In seconds, the tide turns. Maratha forces pour down from the forest. Afzal Khan\'s vast army dissolves into chaos. The hills of Pratapgad have witnessed the moment Shivaji proved he was not just brave — he was brilliant.',
        imagePrompt:
          'Dramatic historical oil painting of Shivaji wielding wagh nakh against Afzal Khan at Pratapgad, explosive battle scene below, Maratha and Bijapur armies clashing, misty Sahyadri valley, epic cinematic scale, hyperdetailed period-accurate attire.',
        ambientTag: 'battle_horns_cannons',
      },
      {
        sceneNumber: 4,
        era: '1674 AD · Raigad Fort, June 6',
        title: 'The Grand Coronation — Chhatrapati Shivaji',
        narration:
          'You stand in the vast stone courtyard of Raigad Fort. Fifty thousand spectators have climbed this mountain. The air is thick with marigold petals, sandalwood incense, and the peal of conches. Pandit Gaga Bhatt, summoned from Varanasi, pours the sacred waters of coronation. Shivaji, draped in royal white and gold, is declared Chhatrapati — Supreme Sovereign — of the Maratha Empire. A new chapter of Indian history begins. You feel tears on your face from the weight of what you are witnessing.',
        imagePrompt:
          'Majestic historical painting of the coronation of Chhatrapati Shivaji Maharaj at Raigad Fort, June 1674 AD, golden throne, 50000 spectators, priests performing Vedic rituals, flowers raining from sky, grand Indian royal architecture, warm golden sunlight, 8K epic composition.',
        ambientTag: 'royal_fanfare',
      },
      {
        sceneNumber: 5,
        era: '17th Century – Present · Maharashtra, India',
        title: 'The Immortal Legacy of Swarajya',
        narration:
          'Centuries dissolve around you. The Maratha Empire Shivaji founded expanded to cover 4.1 million square kilometres under his successors. Today, across Maharashtra, his name is invoked in schools, battlefields, and songs. The hill forts — 360 of them — still stand as stone witnesses. You look out from Raigad\'s summit, where his samadhi rests, and understand: Shivaji did not just build a kingdom. He proved that oppressed people, united by justice and courage, can carve their own destiny.',
        imagePrompt:
          'Majestic sunset silhouette of Raigad Fort with Shivaji\'s samadhi monument, Maharashtra landscape, golden hour rays, Maratha flags waving, epic cinematic wide shot, commemorative monument in foreground, clouds parting dramatically.',
        ambientTag: 'palace_ambience',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STORY 2: Rani Lakshmibai — 1857 War of Independence
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'lakshmibai-1857',
    title: 'Rani Lakshmibai — First War of Independence 1857',
    searchKeywords: ['lakshmibai', 'jhansi', '1857', 'rani', 'revolution', 'independence', 'war', 'sepoy', 'mutiny'],
    scenes: [
      {
        sceneNumber: 1,
        era: '1828 AD · Varanasi — Childhood of Manikarnika',
        title: 'The Girl Who Would Not Be Tamed',
        narration:
          'You are in the narrow lanes of Varanasi, 1828. A small girl named Manikarnika practices archery beside the ghats, impressing the Peshwa\'s court officials. She learns sword-fighting, horse-riding, and elephant-mounting — skills no girl of her era is supposed to possess. The Ganges flows beside you as you watch her — unaware that this child will one day make the entire British Empire tremble.',
        imagePrompt:
          'Cinematic historical painting of young Manikarnika (future Rani Lakshmibai) practicing archery near the Varanasi ghats in 1828, warm golden light on the Ganges, traditional Indian architecture, early 19th century attire, determined expression, atmospheric mist.',
        ambientTag: 'temple_bells_wind',
      },
      {
        sceneNumber: 2,
        era: '1853 AD · Jhansi Fort — The Doctrine of Lapse',
        title: 'The Kingdom Stolen — A Queen Defies',
        narration:
          'The British East India Company has invoked the "Doctrine of Lapse." Jhansi — your kingdom — is to be annexed because your husband, Maharaja Gangadhar Rao, has died without a biological heir. You stand beside Rani Lakshmibai in the marble halls of Jhansi Fort as she grips her adopted son Damodar Rao and declares: "Main apni Jhansi nahin dungi." — I will not surrender my Jhansi. Her words ring off stone walls like a battle cry three years before the war even begins.',
        imagePrompt:
          'Dramatic historical painting of Rani Lakshmibai in the throne room of Jhansi Fort refusing British officers, royal Indian court attire, 1853 AD, defiant posture, infant Damodar Rao in arms, British East India Company officers in background, atmospheric torchlight.',
        ambientTag: 'marching_drums',
      },
      {
        sceneNumber: 3,
        era: '1857 AD · The Siege of Jhansi',
        title: 'The Queen on the Ramparts',
        narration:
          'You crouch behind the parapet of Jhansi Fort as British artillery shells burst against the outer walls. Rani Lakshmibai has tied her infant son to her back with a cloth and is commanding her artillery herself. Below you, the city burns. The British forces of Sir Hugh Rose surround all sides. But the Rani refuses surrender for two weeks, personally directing the defence from the battlements — sword in one hand, reins in another. You are witnessing the most ferocious stand of the 1857 uprising.',
        imagePrompt:
          'Epic battle scene painting of Rani Lakshmibai on the ramparts of Jhansi Fort during the 1857 siege, sword raised, smoke and artillery fire, British cannons in background, infant tied to back, Jhansi defenders fighting on walls, dramatic dusk sky.',
        ambientTag: 'battle_horns_cannons',
      },
      {
        sceneNumber: 4,
        era: '1858 AD · The Midnight Escape & Battle of Gwalior',
        title: 'The Last Charge — Sword & Courage',
        narration:
          'Jhansi has fallen, but Lakshmibai has not. You gallop beside her through the dark as she escapes on horseback — her infant strapped to her back — leaping the city walls in a desperate midnight breakout. She rides 102 miles to Kalpi, rallies allies, and joins the siege of Gwalior Fort. On June 17, 1858, on the plain of Kotah-ki-Serai, dressed in the garb of a male soldier, the Rani of Jhansi charges into her final battle. She is twenty-two years old.',
        imagePrompt:
          'Cinematic historical painting of Rani Lakshmibai charging on horseback in battle at Kotah-ki-Serai 1858, sword raised, dressed as a soldier, battle smoke and British cavalry in background, epic action composition, golden morning light.',
        ambientTag: 'royal_fanfare',
      },
      {
        sceneNumber: 5,
        era: '1858 – Present · India',
        title: 'The Immortal Flame — Mother of Revolution',
        narration:
          'She fell on the battlefield of Kotah-ki-Serai — but Lakshmibai never surrendered. British General Hugh Rose himself wrote: "She was the most dangerous of all the rebel leaders and the best." Today her statue stands in Parliament, at thousands of town squares, in the hearts of millions. You stand at the site of her samadhi in Gwalior and feel the weight of what she gave: not just a rebellion, but a template for every freedom fighter who came after.',
        imagePrompt:
          'Majestic commemorative statue of Rani Lakshmibai on horseback at sunset in Gwalior, flowers and offerings at the base, Indian tricolour flags, golden hour sky, wide cinematic shot with dramatic cloud formation.',
        ambientTag: 'palace_ambience',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STORY 3: Napoleon Bonaparte at Waterloo
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'napoleon-waterloo',
    title: 'Napoleon Bonaparte at the Battle of Waterloo',
    searchKeywords: ['napoleon', 'waterloo', 'france', 'wellington', 'battle', 'europe', 'coalition', 'empire'],
    scenes: [
      {
        sceneNumber: 1,
        era: '1769 AD · Ajaccio, Corsica — Birth of the Emperor',
        title: 'Born on an Island, Destined for Empires',
        narration:
          'You are in the sun-drenched streets of Ajaccio, Corsica, in 1769. A boy named Napoleone di Buonaparte plays in alleyways overlooking the sea. His father calls him a dreamer. His peers call him "the foreigner." But you already know what this thin, intense child will become: the man who will redraw the map of Europe fourteen times. In the small island schoolyard, young Napoleon already speaks of conquest, strategy, and glory with unsettling conviction.',
        imagePrompt:
          'Historical painting of young Napoleon as a boy in Ajaccio, Corsica, 1769 AD, Mediterranean coastal village, warm sunlight, child gazing toward the sea with fierce determination, traditional Corsican village architecture in background.',
        ambientTag: 'temple_bells_wind',
      },
      {
        sceneNumber: 2,
        era: '1804 AD · Notre-Dame Cathedral, Paris — Imperial Coronation',
        title: 'The Emperor Crowns Himself',
        narration:
          'You stand inside Notre-Dame Cathedral, Paris — December 2, 1804. Ten thousand candles illuminate the vaulted stone ceiling. Pope Pius VII sits in attendance, but as the moment of coronation arrives, Napoleon takes the crown from the Pope\'s hands and places it on his own head. Then he crowns Joséphine. The message is deliberate: No pope, no God, no power on earth granted him this throne. He took it. You feel the shockwave ripple across the watching courts of Europe.',
        imagePrompt:
          'Epic historical painting of Napoleon\'s self-coronation at Notre-Dame Cathedral Paris 1804, emperor placing crown on own head, Joséphine kneeling, Pope Pius VII in background, 10000 candles, grand Gothic architecture, Jacques-Louis David classical style, 8K.',
        ambientTag: 'royal_fanfare',
      },
      {
        sceneNumber: 3,
        era: '18 June 1815 · Waterloo, Belgium — The Decisive Day',
        title: 'The Mud of Waterloo — An Empire Undone',
        narration:
          'The battlefield reeks of gunpowder, blood, and rain-soaked mud. You stand in the French lines as Napoleon commits his Imperial Guard — his last reserve — to the final attack on Wellington\'s ridge. But Marshal Ney\'s cavalry has already been shattered. Blücher\'s Prussian forces have arrived from the east, crashing into the French flank. The Grand Army — veterans of Austerlitz, Jena, and Wagram — begins to fracture and break. You watch the legend crack. The Emperor himself rides among the retreating soldiers, his face ashen.',
        imagePrompt:
          'Dramatic battle painting of the Battle of Waterloo June 1815, Napoleon\'s Imperial Guard advancing through cannon smoke and rain, Wellington\'s British lines on the ridge, charging cavalry, Prussian forces arriving on the flank, epic cinematic wide shot, hyperrealistic.',
        ambientTag: 'battle_horns_cannons',
      },
      {
        sceneNumber: 4,
        era: '22 June 1815 · Paris — The Second Abdication',
        title: 'The Fall — An Emperor Surrenders His Crown',
        narration:
          'Four days after Waterloo, you watch Napoleon enter the Elysée Palace with hollow eyes. The Chamber of Deputies has demanded his abdication. The streets outside are silent — no more cheering crowds, no cannons saluting. He picks up the quill and signs. "Napoléon." A single word ends the Napoleonic Empire. He is exiled to the remote Atlantic island of Saint Helena, 4,700 miles from Paris, where he will spend the remaining six years of his life dictating his memoirs, rewriting his legend.',
        imagePrompt:
          'Melancholic historical painting of Napoleon signing his abdication at the Elysée Palace June 1815, empty throne room, rain streaking tall windows, quill in hand, defeated expression, a single candle illuminating the document, somber dark palette.',
        ambientTag: 'marching_drums',
      },
      {
        sceneNumber: 5,
        era: '1815 – Present · Europe & the World',
        title: 'The Napoleonic Legacy — Law, Nation, Memory',
        narration:
          'Napoleon Bonaparte died on Saint Helena in 1821, but his influence never did. The Napoleonic Code — his legal framework — still underpins the legal systems of France, Belgium, Louisiana, Quebec, and over fifty nations. His military campaigns are studied at West Point and Sandhurst to this day. Modern nationalism, meritocracy, and secular governance all carry his fingerprints. You stand at Les Invalides in Paris, where his sarcophagus rests beneath golden domes, and understand: even at his lowest, he changed the world.',
        imagePrompt:
          'Majestic view of Napoleon\'s sarcophagus at Les Invalides Paris, golden dome interior, warm reverential light, French imperial eagles carved in stone, visitors in silhouette, epic architectural scale, timeless contemplative atmosphere.',
        ambientTag: 'palace_ambience',
      },
    ],
  },
];

/**
 * Find a matching demo story for a given search query.
 * Returns the story if a keyword match is found, otherwise null.
 */
export function findDemoStory(query: string): DemoStory | null {
  const lowerQuery = query.toLowerCase();
  return (
    SAMPLE_STORIES.find((story) =>
      story.searchKeywords.some((kw) => lowerQuery.includes(kw.toLowerCase()))
    ) ?? null
  );
}
