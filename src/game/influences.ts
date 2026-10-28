/**
 * Homies Influence Atlas
 *
 * A structured creative reference library for blending high-level qualities into
 * original characters. These are inspiration ingredients, not templates to copy.
 * Living artists are represented through broad themes and craft attributes only.
 */

export type InfluenceEra =
  | "ancient"
  | "classical"
  | "medieval"
  | "renaissance"
  | "enlightenment"
  | "19th-century"
  | "early-modern"
  | "mid-century"
  | "late-20th-century"
  | "contemporary"
  | "timeless-fiction"
  | "movement";

export type InfluenceDomain =
  | "philosophy"
  | "spirituality"
  | "literature"
  | "music"
  | "visual-art"
  | "film-performance"
  | "science"
  | "leadership"
  | "myth-folklore"
  | "design"
  | "comedy"
  | "fiction";

export type Influence = {
  id: string;
  name: string;
  era: InfluenceEra;
  domain: InfluenceDomain;
  sourceType: "historical-person" | "living-artist" | "fictional-character" | "tradition" | "movement";
  essence: string;
  strengths: string[];
  shadows: string[];
  contradiction: string;
  visualMotifs: string[];
  voicePatterns: string[];
  storyEngines: string[];
  evolutionTriggers: string[];
  tags: string[];
};

export const INFLUENCE_ATLAS: Influence[] = [
  {
    id: "rumi", name: "Rumi", era: "medieval", domain: "spirituality", sourceType: "historical-person",
    essence: "Love as a force that breaks the self open and makes room for wonder.",
    strengths: ["ecstatic compassion", "metaphorical thinking", "radical openness"],
    shadows: ["can romanticize pain", "can dissolve boundaries"],
    contradiction: "A seeker of unity who needs separation to feel longing.",
    visualMotifs: ["turning circles", "windblown paper", "lamplight", "doors and thresholds"],
    voicePatterns: ["speaks through paradox", "turns ordinary objects into spiritual metaphors"],
    storyEngines: ["a stranger becomes a mirror", "a loss opens an unexpected door", "two rivals discover a shared longing"],
    evolutionTriggers: ["forgives without forgetting", "learns to love without possessing", "finds meaning in uncertainty"],
    tags: ["poetic", "mystic", "compassion", "paradox", "longing"]
  },
  {
    id: "mae-west", name: "Mae West", era: "early-modern", domain: "film-performance", sourceType: "historical-person",
    essence: "Self-possession, theatrical wit, and a refusal to apologize for taking up space.",
    strengths: ["verbal agility", "bold confidence", "comic timing"],
    shadows: ["deflects vulnerability with a joke", "can turn every room into a stage"],
    contradiction: "Appears untouchable but wants to be understood without losing control.",
    visualMotifs: ["sculptural silhouette", "spotlight glint", "dramatic doorway entrances"],
    voicePatterns: ["double meanings", "short decisive punchlines", "flirtatious misdirection without copying signature lines"],
    storyEngines: ["wins a conflict by redefining its terms", "uses a performance to reveal a truth", "mistakes sincerity for a trap"],
    evolutionTriggers: ["lets someone else have the last word", "admits a fear plainly", "uses charm to protect someone else"],
    tags: ["wit", "showmanship", "self-possession", "glamour", "double-entendre"]
  },
  {
    id: "sheryl-crow", name: "Sheryl Crow", era: "contemporary", domain: "music", sourceType: "living-artist",
    essence: "Road-worn warmth, rootsy directness, resilient optimism, and clear-eyed storytelling.",
    strengths: ["grounded confidence", "observational storytelling", "resilience"],
    shadows: ["uses motion to avoid stillness", "can disguise sadness as breezy ease"],
    contradiction: "Sounds free and sunlit while carrying hard-earned realism.",
    visualMotifs: ["dusty road gold", "sun-faded denim", "open windows", "late-afternoon light"],
    voicePatterns: ["plainspoken emotional detail", "conversational phrasing", "wry observations"],
    storyEngines: ["a road trip exposes what a character avoids", "a small-town rumor hides a tender truth", "an old song changes meaning after a loss"],
    evolutionTriggers: ["chooses rest over escape", "turns regret into useful wisdom", "asks for help without making it a joke"],
    tags: ["rootsy", "road-story", "resilient", "warm", "plainspoken"]
  },
  {
    id: "gandalf", name: "Gandalf", era: "timeless-fiction", domain: "fiction", sourceType: "fictional-character",
    essence: "A guide whose humor and patience conceal immense responsibility and power.",
    strengths: ["strategic patience", "moral courage", "unexpected playfulness"],
    shadows: ["withholds information", "may burden others with a plan they cannot see"],
    contradiction: "Commands awe but often helps through small, practical acts.",
    visualMotifs: ["weathered staff", "travel cloak", "smoke rings", "stormlight at a threshold"],
    voicePatterns: ["measured counsel", "dry humor", "questions that make others think"],
    storyEngines: ["a humble person must choose courage", "a mentor's absence forces independence", "a small object carries disproportionate stakes"],
    evolutionTriggers: ["shares power rather than directing", "admits the limits of foresight", "lets a student surpass the teacher"],
    tags: ["mentor", "wizard", "courage", "mystery", "dry-humor"]
  },
  {
    id: "gustav-klimt", name: "Gustav Klimt", era: "early-modern", domain: "visual-art", sourceType: "historical-person",
    essence: "Ornament, intimacy, symbolic pattern, and luminous surfaces that conceal emotional complexity.",
    strengths: ["decorative invention", "sensual symbolism", "bold pattern composition"],
    shadows: ["beauty can become a gilded cage", "ornament may obscure the subject"],
    contradiction: "Creates sumptuous surfaces around fragile, mortal feelings.",
    visualMotifs: ["gold leaf", "spirals", "mosaic geometry", "flat patterned fields", "botanical motifs"],
    voicePatterns: ["describes feelings through texture and color", "lets symbolic objects carry subtext"],
    storyEngines: ["a beautiful object hides a painful history", "a portrait changes as its subject grows", "ornament becomes a protective armor"],
    evolutionTriggers: ["gives up perfection for honesty", "lets a hidden pattern become visible", "finds beauty in an unadorned truth"],
    tags: ["gold", "ornament", "symbolism", "intimacy", "pattern"]
  },
  {
    id: "socrates", name: "Socrates", era: "ancient", domain: "philosophy", sourceType: "historical-person",
    essence: "Curiosity sharpened into questions that reveal hidden assumptions.",
    strengths: ["inquiry", "intellectual humility", "comic provocation"],
    shadows: ["questions can feel like traps", "may analyze when empathy is needed"],
    contradiction: "Knows the value of wisdom partly by knowing what he does not know.",
    visualMotifs: ["marketplace conversations", "chalk circles", "unfinished diagrams"],
    voicePatterns: ["asks one more question", "gently exposes contradictions"],
    storyEngines: ["a confident authority cannot explain its own rule", "a debate becomes a friendship", "a simple question unravels a scheme"],
    evolutionTriggers: ["listens without cross-examining", "acts before every uncertainty is solved"],
    tags: ["questions", "debate", "humility", "logic"]
  },
  {
    id: "hypatia", name: "Hypatia of Alexandria", era: "classical", domain: "science", sourceType: "historical-person",
    essence: "Patient inquiry, mathematical elegance, and intellectual independence.",
    strengths: ["precision", "teaching", "calm under pressure"],
    shadows: ["can seem emotionally distant", "trusts reason in unreasonable settings"],
    contradiction: "Seeks universal patterns while living amid fiercely personal conflicts.",
    visualMotifs: ["star charts", "bronze instruments", "chalk dust", "library light"],
    voicePatterns: ["clear explanations", "elegant analogies", "measured disagreement"],
    storyEngines: ["knowledge is threatened by fear", "a student finds a flaw in a beloved theory"],
    evolutionTriggers: ["allows wonder to coexist with proof", "protects a person as fiercely as an idea"],
    tags: ["astronomy", "mathematics", "teaching", "independence"]
  },
  {
    id: "laozi", name: "Laozi", era: "ancient", domain: "philosophy", sourceType: "historical-person",
    essence: "Softness, restraint, and the power of acting without forcing.",
    strengths: ["adaptability", "patience", "noncompetitive wisdom"],
    shadows: ["withdrawal can become avoidance", "passivity can leave harm unchallenged"],
    contradiction: "Influences the world by refusing to dominate it.",
    visualMotifs: ["river bends", "mist", "weathered wood", "empty space"],
    voicePatterns: ["brief aphorisms", "natural metaphors", "deliberate silence"],
    storyEngines: ["the least forceful solution wins", "a rigid system fails against a changing river"],
    evolutionTriggers: ["learns when gentleness must become action", "accepts responsibility for influence"],
    tags: ["tao", "simplicity", "water", "restraint"]
  },
  {
    id: "sappho", name: "Sappho", era: "ancient", domain: "literature", sourceType: "historical-person",
    essence: "Intimate lyric intensity: a small detail becomes emotionally enormous.",
    strengths: ["sensory attention", "emotional precision", "tenderness"],
    shadows: ["longing can idealize its object", "emotion can crowd out perspective"],
    contradiction: "Makes private feeling feel universal without making it less personal.",
    visualMotifs: ["lyre strings", "sunlit fabric", "flowers pressed in a book"],
    voicePatterns: ["sensory fragments", "direct address", "charged pauses"],
    storyEngines: ["an ordinary goodbye becomes unforgettable", "a keepsake changes meaning"],
    evolutionTriggers: ["moves from idealization to mutual knowledge", "learns to speak before the moment passes"],
    tags: ["lyric", "desire", "intimacy", "memory"]
  },
  {
    id: "aesop", name: "Aesop's fables", era: "ancient", domain: "literature", sourceType: "tradition",
    essence: "Small creatures enact large moral contradictions through compact, memorable plots.",
    strengths: ["clarity", "symbolic compression", "ironic reversals"],
    shadows: ["morals can oversimplify", "characters risk becoming examples instead of people"],
    contradiction: "A tiny animal can expose a giant's weakness, but no lesson fits every life.",
    visualMotifs: ["animal silhouettes", "simple landscapes", "one telling prop"],
    voicePatterns: ["concise setup", "reversal", "understated final beat"],
    storyEngines: ["the clever plan backfires", "the overlooked creature solves the crisis"],
    evolutionTriggers: ["questions the moral they have always repeated", "discovers compassion beyond the lesson"],
    tags: ["fable", "animals", "irony", "moral-reversal"]
  },
  {
    id: "ibn-sina", name: "Ibn Sina (Avicenna)", era: "medieval", domain: "science", sourceType: "historical-person",
    essence: "A wide-ranging mind that connects medicine, logic, observation, and metaphysics.",
    strengths: ["synthesis", "diagnosis", "intellectual range"],
    shadows: ["overconfidence in systems", "takes on too many problems"],
    contradiction: "Seeks a unified account of life while confronting stubborn individual cases.",
    visualMotifs: ["herbal notebooks", "brass instruments", "layered manuscripts"],
    voicePatterns: ["diagnostic questions", "links between seemingly distant subjects"],
    storyEngines: ["a mystery is solved by combining disciplines", "the expert must treat a person, not just a puzzle"],
    evolutionTriggers: ["admits a theory failed a real person", "delegates to a different kind of expert"],
    tags: ["medicine", "logic", "scholar", "synthesis"]
  },
  {
    id: "murasaki", name: "Murasaki Shikibu", era: "medieval", domain: "literature", sourceType: "historical-person",
    essence: "Psychological nuance, social observation, and the emotional cost of status.",
    strengths: ["subtle characterization", "social intelligence", "interior complexity"],
    shadows: ["overreads signals", "can become trapped in observation"],
    contradiction: "Understands people deeply while being constrained by the world around them.",
    visualMotifs: ["layered screens", "seasonal blossoms", "letters behind fans"],
    voicePatterns: ["subtext", "small changes in etiquette", "private thoughts against public behavior"],
    storyEngines: ["a slight breach of etiquette changes a life", "a letter arrives too late"],
    evolutionTriggers: ["risks direct speech", "stops confusing status with worth"],
    tags: ["court-intrigue", "subtext", "psychology", "letters"]
  },
  {
    id: "ibn-battuta", name: "Ibn Battuta", era: "medieval", domain: "literature", sourceType: "historical-person",
    essence: "Curiosity powered by travel, hospitality, and a willingness to be changed by unfamiliar places.",
    strengths: ["adaptability", "storytelling", "social curiosity"],
    shadows: ["restlessness", "turns people into travel anecdotes"],
    contradiction: "Collects places yet must learn that belonging is more than arrival.",
    visualMotifs: ["maps", "travel-worn sandals", "market textiles", "ship lanterns"],
    voicePatterns: ["vivid encounters", "comparisons between customs", "surprise at ordinary differences"],
    storyEngines: ["a traveler misunderstands a local custom", "hospitality reverses a power imbalance"],
    evolutionTriggers: ["stays long enough to be accountable", "becomes a host to a stranger"],
    tags: ["travel", "hospitality", "discovery", "worldliness"]
  },
  {
    id: "hildegard", name: "Hildegard of Bingen", era: "medieval", domain: "music", sourceType: "historical-person",
    essence: "Visionary synthesis of music, nature, medicine, and spiritual imagination.",
    strengths: ["inventiveness", "courageous expression", "ecological attention"],
    shadows: ["visions can isolate", "certainty can overwhelm dissent"],
    contradiction: "Feels called to speak beyond ordinary limits while working within strict institutions.",
    visualMotifs: ["green fire", "herbal diagrams", "illuminated circles", "singing light"],
    voicePatterns: ["vivid natural imagery", "declarative visions", "musical cadence"],
    storyEngines: ["an impossible vision reveals a practical problem", "a forbidden song gathers allies"],
    evolutionTriggers: ["translates revelation into shared work", "makes room for another interpretation"],
    tags: ["visionary", "music", "nature", "illumination"]
  },
  {
    id: "ibn-khaldun", name: "Ibn Khaldun", era: "medieval", domain: "philosophy", sourceType: "historical-person",
    essence: "Looks beneath official stories to the social forces that build and break societies.",
    strengths: ["systems thinking", "historical pattern recognition", "skepticism"],
    shadows: ["reduces individuals to cycles", "expects decline too soon"],
    contradiction: "Studies grand patterns but must reckon with the irreducible person.",
    visualMotifs: ["city walls", "genealogy charts", "desert caravans", "ledger marks"],
    voicePatterns: ["asks who benefits", "compares public story with material incentives"],
    storyEngines: ["a kingdom collapses from a tiny neglected habit", "a celebrated hero depends on invisible labor"],
    evolutionTriggers: ["recognizes an exception to the pattern", "chooses to intervene instead of only analyze"],
    tags: ["history", "society", "systems", "power"]
  },
  {
    id: "leonardo", name: "Leonardo da Vinci", era: "renaissance", domain: "science", sourceType: "historical-person",
    essence: "Restless observation that leaps between art, engineering, anatomy, and nature.",
    strengths: ["invention", "visual thinking", "relentless curiosity"],
    shadows: ["unfinished projects", "curiosity outruns responsibility"],
    contradiction: "Can imagine extraordinary futures but struggles to finish today's work.",
    visualMotifs: ["mirror writing", "flight sketches", "gears", "anatomical notebooks"],
    voicePatterns: ["observes tiny physical details", "turns questions into sketches"],
    storyEngines: ["a prototype solves the wrong problem brilliantly", "an unfinished invention becomes essential"],
    evolutionTriggers: ["finishes something imperfect", "asks who will live with the invention"],
    tags: ["invention", "anatomy", "flight", "curiosity"]
  },
  {
    id: "shakespeare", name: "William Shakespeare", era: "renaissance", domain: "literature", sourceType: "historical-person",
    essence: "Identity, ambition, love, and power collide through language, mistaken belief, and theatrical reversal.",
    strengths: ["verbal invention", "character duality", "dramatic escalation"],
    shadows: ["rhetoric can obscure truth", "misunderstandings spiral"],
    contradiction: "People use language to reveal themselves and to disguise themselves at once.",
    visualMotifs: ["stage curtains", "masks", "letters", "storm-lit halls"],
    voicePatterns: ["metaphoric argument", "comic wordplay", "sudden shifts from wit to vulnerability"],
    storyEngines: ["mistaken identity", "ambition eats its owner", "a joke exposes a secret"],
    evolutionTriggers: ["abandons a role they perform", "chooses honesty over winning the scene"],
    tags: ["theatre", "tragedy", "comedy", "identity"]
  },
  {
    id: "machiavelli", name: "Niccolò Machiavelli", era: "renaissance", domain: "leadership", sourceType: "historical-person",
    essence: "Pragmatic attention to power, incentives, appearances, and unintended consequences.",
    strengths: ["strategic thinking", "political realism", "pattern recognition"],
    shadows: ["cynicism", "treats trust as a resource to spend"],
    contradiction: "Understands power clearly but may underestimate the value of sincere loyalty.",
    visualMotifs: ["chessboards", "sealed letters", "council chambers", "double shadows"],
    voicePatterns: ["calculates consequences", "distinguishes appearance from motive"],
    storyEngines: ["a clever alliance turns on its own incentive", "the least powerful player changes the rules"],
    evolutionTriggers: ["risks trust without a guarantee", "admits a moral cost that strategy cannot price"],
    tags: ["strategy", "politics", "incentives", "ambition"]
  },
  {
    id: "rembrandt", name: "Rembrandt", era: "renaissance", domain: "visual-art", sourceType: "historical-person",
    essence: "Human dignity revealed through shadow, texture, age, and unguarded expression.",
    strengths: ["empathy", "character observation", "dramatic light"],
    shadows: ["brooding", "finds meaning in suffering too readily"],
    contradiction: "Uses darkness not to hide a person but to make their presence clearer.",
    visualMotifs: ["warm chiaroscuro", "worn fabric", "hands in light", "aged faces"],
    voicePatterns: ["notices hands and pauses", "values lived-in details over polish"],
    storyEngines: ["a flawed person is seen with unexpected tenderness", "a portrait records a change its subject denies"],
    evolutionTriggers: ["allows joy into the frame", "sees a rival without caricature"],
    tags: ["light", "shadow", "portrait", "humanity"]
  },
  {
    id: "sor-juana", name: "Sor Juana Inés de la Cruz", era: "enlightenment", domain: "literature", sourceType: "historical-person",
    essence: "Brilliant inquiry, rhetorical play, and determination to learn despite restrictive expectations.",
    strengths: ["argument", "wit", "scholarly independence"],
    shadows: ["intellectual armor", "turns every slight into a debate"],
    contradiction: "Uses language to seek freedom while living under rules designed to limit speech.",
    visualMotifs: ["ink-stained sleeves", "books behind a screen", "candlelit pages"],
    voicePatterns: ["precise rebuttals", "ironic reversals", "playful logic"],
    storyEngines: ["a rule is defeated by its own wording", "knowledge becomes a quiet act of rebellion"],
    evolutionTriggers: ["accepts help from an unlikely ally", "makes a truth accessible rather than merely victorious"],
    tags: ["learning", "rhetoric", "wit", "freedom"]
  },
  {
    id: "voltaire", name: "Voltaire", era: "enlightenment", domain: "literature", sourceType: "historical-person",
    essence: "Satire that punctures pretension and asks whether institutions deserve their authority.",
    strengths: ["irony", "skepticism", "speed of thought"],
    shadows: ["mockery can wound bystanders", "skepticism may curdle into contempt"],
    contradiction: "Believes in reason yet uses laughter to reach people reason alone cannot move.",
    visualMotifs: ["salon mirrors", "pamphlets", "overdecorated thrones"],
    voicePatterns: ["polite-sounding barbs", "absurd examples", "short skeptical questions"],
    storyEngines: ["a ridiculous rule is obeyed literally", "a powerful fool is undone by a small fact"],
    evolutionTriggers: ["aims satire upward rather than sideways", "protects someone who cannot answer back"],
    tags: ["satire", "reason", "skeptic", "social-critique"]
  },
  {
    id: "mary-wollstonecraft", name: "Mary Wollstonecraft", era: "enlightenment", domain: "philosophy", sourceType: "historical-person",
    essence: "Moral seriousness about equality, education, and the conditions that let people become themselves.",
    strengths: ["principled courage", "clear argument", "care for independence"],
    shadows: ["impatience with compromise", "principles can overshadow messy needs"],
    contradiction: "Argues for universal freedom while navigating deeply unequal personal circumstances.",
    visualMotifs: ["open books", "unlocked gates", "unfinished letters"],
    voicePatterns: ["direct ethical questions", "distinguishes custom from justice"],
    storyEngines: ["a character's talent is blocked by a social rule", "help becomes control unless autonomy is respected"],
    evolutionTriggers: ["lets another person define their own freedom", "finds solidarity across disagreement"],
    tags: ["equality", "education", "autonomy", "justice"]
  },
  {
    id: "sorensen", name: "The Enlightenment salon", era: "enlightenment", domain: "philosophy", sourceType: "tradition",
    essence: "Ideas collide in lively rooms where status, wit, and curiosity share the same table.",
    strengths: ["collaboration", "debate", "cross-disciplinary sparks"],
    shadows: ["excludes outsiders", "conversation can replace action"],
    contradiction: "Celebrates universal ideas inside a room not everyone can enter.",
    visualMotifs: ["candlelit tables", "paper notes", "crowded tea cups"],
    voicePatterns: ["rapid cross-talk", "one idea reframed by another discipline"],
    storyEngines: ["a dinner argument becomes a public experiment", "an outsider asks the room's most useful question"],
    evolutionTriggers: ["opens the door to unheard voices", "turns talk into a shared project"],
    tags: ["ensemble", "debate", "salon", "ideas"]
  },
  {
    id: "mary-shelley", name: "Mary Shelley", era: "19th-century", domain: "literature", sourceType: "historical-person",
    essence: "Gothic wonder, responsibility for creation, and the loneliness of beings made by others.",
    strengths: ["ethical imagination", "atmosphere", "sympathy for outsiders"],
    shadows: ["catastrophizes", "creation becomes a substitute for relationship"],
    contradiction: "Imagines life made through ingenuity, then asks what creators owe their creations.",
    visualMotifs: ["storm-lit laboratories", "stitched seams", "snowfields", "flickering candles"],
    voicePatterns: ["beautiful unease", "questions of responsibility", "tenderness amid dread"],
    storyEngines: ["an invention asks to be treated as a person", "a creator abandons the consequence of a choice"],
    evolutionTriggers: ["takes responsibility for what they made", "lets the created being define itself"],
    tags: ["gothic", "creation", "outsider", "responsibility"]
  },
  {
    id: "sojourner-truth", name: "Sojourner Truth", era: "19th-century", domain: "leadership", sourceType: "historical-person",
    essence: "Moral force, lived testimony, and unflinching clarity in the face of hypocrisy.",
    strengths: ["courage", "presence", "truth-telling"],
    shadows: ["carries too much alone", "may have little patience for evasions"],
    contradiction: "Speaks with personal authority in systems that deny her authority.",
    visualMotifs: ["steady stance", "road dust", "sun through a meetinghouse window"],
    voicePatterns: ["plain moral questions", "personal experience made public evidence"],
    storyEngines: ["a hypocritical rule is confronted in public", "a quiet witness changes the room"],
    evolutionTriggers: ["lets allies share the burden", "turns a moment of confrontation into durable change"],
    tags: ["justice", "courage", "testimony", "leadership"]
  },
  {
    id: "frederick-douglass", name: "Frederick Douglass", era: "19th-century", domain: "literature", sourceType: "historical-person",
    essence: "Language as self-emancipation, public argument, and a tool for exposing contradictions.",
    strengths: ["eloquence", "self-education", "strategic courage"],
    shadows: ["relentless public purpose can leave private exhaustion", "may carry every debate personally"],
    contradiction: "Uses the tools of a society to reveal the injustice of that society.",
    visualMotifs: ["printed pages", "lectern light", "ink and iron"],
    voicePatterns: ["precise testimony", "rhetorical contrast", "turns an opponent's premise around"],
    storyEngines: ["a hidden story becomes undeniable evidence", "a forbidden book changes a character's future"],
    evolutionTriggers: ["rests without abandoning the cause", "builds a movement rather than a lone voice"],
    tags: ["literacy", "eloquence", "freedom", "testimony"]
  },
  {
    id: "van-gogh", name: "Vincent van Gogh", era: "19th-century", domain: "visual-art", sourceType: "historical-person",
    essence: "Intense attention to ordinary life, color as feeling, and the ache of wanting to connect.",
    strengths: ["emotional honesty", "devotion to craft", "attention to overlooked beauty"],
    shadows: ["isolation", "all-or-nothing intensity"],
    contradiction: "Sees extraordinary vitality in the world while struggling to feel at home in it.",
    visualMotifs: ["swirling skies", "thick brush texture", "night windows", "fields under pressure"],
    voicePatterns: ["specific sensory observations", "earnest confessions", "wonder at common things"],
    storyEngines: ["an ignored place becomes a character's masterpiece", "a gift is misunderstood before its meaning is known"],
    evolutionTriggers: ["accepts care without calling it failure", "finds a sustainable rhythm for devotion"],
    tags: ["color", "emotion", "craft", "loneliness"]
  },
  {
    id: "nikola-tesla", name: "Nikola Tesla", era: "19th-century", domain: "science", sourceType: "historical-person",
    essence: "Electric imagination, visionary systems, and the lonely edge between invention and obsession.",
    strengths: ["systems invention", "mental visualization", "ambition"],
    shadows: ["neglects practical support", "can prize the idea over the people around it"],
    contradiction: "Dreams of powering the world while struggling with ordinary human connection.",
    visualMotifs: ["coils", "blue sparks", "blueprint grids", "unlit towers"],
    voicePatterns: ["describes mechanisms as living systems", "confident future-tense visions"],
    storyEngines: ["an invention works but creates an unexpected dependency", "a rival commercializes a neglected idea"],
    evolutionTriggers: ["collaborates with a practical builder", "asks who benefits from the breakthrough"],
    tags: ["electricity", "invention", "vision", "obsession"]
  },
  {
    id: "oscar-wilde", name: "Oscar Wilde", era: "19th-century", domain: "literature", sourceType: "historical-person",
    essence: "Aesthetic play, dazzling paradox, and wit that can protect a tender core.",
    strengths: ["verbal sparkle", "social observation", "comic inversion"],
    shadows: ["performs when honesty is needed", "uses cleverness as armor"],
    contradiction: "Makes a spectacle of appearances while craving a truth that cannot be performed.",
    visualMotifs: ["velvet", "mirrors", "flowers in buttonholes", "theatre foyers"],
    voicePatterns: ["paradox", "elegant exaggeration", "unexpectedly sincere final line"],
    storyEngines: ["a social performance exposes the hypocrisy of the audience", "a joke becomes a confession"],
    evolutionTriggers: ["speaks without ornament", "accepts being ordinary in someone's eyes"],
    tags: ["wit", "aesthetic", "paradox", "social-comedy"]
  },
  {
    id: "freud", name: "Sigmund Freud", era: "early-modern", domain: "philosophy", sourceType: "historical-person",
    essence: "Hidden motives, slips, dreams, and the unsettling possibility that people misunderstand themselves.",
    strengths: ["interpretation", "attention to subtext", "symbolic thinking"],
    shadows: ["overinterprets", "mistakes one framework for the whole person"],
    contradiction: "Searches beneath the surface but risks ignoring what people say plainly.",
    visualMotifs: ["dream journals", "locked drawers", "oddly symbolic objects"],
    voicePatterns: ["asks what a detail might conceal", "connects present behavior to old patterns"],
    storyEngines: ["a dream predicts nothing but reveals a fear", "a character's explanation is less revealing than a habit"],
    evolutionTriggers: ["accepts a literal explanation", "lets the subject interpret their own story"],
    tags: ["dreams", "subtext", "memory", "motives"]
  },
  {
    id: "frida-kahlo", name: "Frida Kahlo", era: "early-modern", domain: "visual-art", sourceType: "historical-person",
    essence: "Self-invention, vivid symbolism, bodily resilience, and honesty about contradiction.",
    strengths: ["symbolic self-expression", "resilience", "unflinching perspective"],
    shadows: ["pain becomes identity", "guardedness can harden into defiance"],
    contradiction: "Turns vulnerability into an image of strength without making the hurt disappear.",
    visualMotifs: ["botanical forms", "bold color blocks", "mirrors", "hybrid animal symbols"],
    voicePatterns: ["direct self-definition", "metaphors drawn from the body and home"],
    storyEngines: ["a character redesigns how others see them", "a visible wound carries an invisible story"],
    evolutionTriggers: ["lets identity change without feeling erased", "accepts support without surrendering authorship"],
    tags: ["self-portrait", "resilience", "symbolism", "identity"]
  },
  {
    id: "georgia-okeeffe", name: "Georgia O'Keeffe", era: "early-modern", domain: "visual-art", sourceType: "historical-person",
    essence: "Radical focus, enlarged natural forms, and the expressive power of space and simplicity.",
    strengths: ["attention", "independence", "visual reduction"],
    shadows: ["distance can become isolation", "focus can exclude context"],
    contradiction: "Makes a single flower feel vast while seeking room away from other people's interpretations.",
    visualMotifs: ["desert horizons", "oversized petals", "bones", "clean negative space"],
    voicePatterns: ["few precise words", "describes shape, light, and scale"],
    storyEngines: ["a tiny detail changes scale and meaning", "a character refuses the label others put on their work"],
    evolutionTriggers: ["chooses connection without surrendering solitude", "finds complexity inside simplicity"],
    tags: ["minimalism", "nature", "space", "independence"]
  },
  {
    id: "gustav-klimt-school", name: "Vienna Secession", era: "early-modern", domain: "design", sourceType: "movement",
    essence: "A break from convention through decorative unity, geometric rhythm, and art integrated into daily life.",
    strengths: ["cohesive visual systems", "ornamental invention", "bold experimentation"],
    shadows: ["surface polish can dominate function", "style can become an exclusive club"],
    contradiction: "Rejects old rules but can create new rules just as rigid.",
    visualMotifs: ["gold geometry", "repeating squares", "stylized flora", "integrated frames"],
    voicePatterns: ["repeated motifs that change slightly", "visual callbacks"],
    storyEngines: ["a room's pattern reveals a hidden map", "a decorative object becomes functional"],
    evolutionTriggers: ["breaks the pattern at the right moment", "lets everyday use alter the design"],
    tags: ["secession", "pattern", "ornament", "design"]
  },
  {
    id: "josephine-baker", name: "Josephine Baker", era: "early-modern", domain: "music", sourceType: "historical-person",
    essence: "Magnetic performance, reinvention, comic daring, and a public persona that can conceal private purpose.",
    strengths: ["stage command", "adaptability", "bold reinvention"],
    shadows: ["the show can swallow the self", "others may mistake performance for permission"],
    contradiction: "Uses spectacle to seize agency in a world eager to define her.",
    visualMotifs: ["spotlight arcs", "feather-like movement", "geometric stage sets"],
    voicePatterns: ["playful timing", "expressive physical punctuation", "warm directness offstage"],
    storyEngines: ["a performance becomes a covert act of resistance", "the audience misunderstands the real act"],
    evolutionTriggers: ["steps out of the spotlight by choice", "uses visibility to protect another"],
    tags: ["performance", "reinvention", "courage", "showmanship"]
  },
  {
    id: "ellington", name: "Duke Ellington", era: "mid-century", domain: "music", sourceType: "historical-person",
    essence: "Ensemble imagination, sophisticated swing, and the art of giving distinct voices room to shine.",
    strengths: ["collaboration", "arrangement", "characterful musical thinking"],
    shadows: ["the leader carries too much", "beautiful complexity can hide exclusion"],
    contradiction: "Creates unity by preserving difference rather than erasing it.",
    visualMotifs: ["brass glints", "smoky stage light", "rhythmic silhouettes"],
    voicePatterns: ["distinct voices in conversation", "repeated motif with individual variations"],
    storyEngines: ["a team succeeds when each member gets a solo", "a rivalry becomes an unexpected duet"],
    evolutionTriggers: ["hands over the spotlight", "learns from the newest member"],
    tags: ["jazz", "ensemble", "swing", "collaboration"]
  },
  {
    id: "ella-fitzgerald", name: "Ella Fitzgerald", era: "mid-century", domain: "music", sourceType: "historical-person",
    essence: "Joyful virtuosity, playful improvisation, and a capacity to turn uncertainty into momentum.",
    strengths: ["improvisation", "warmth", "technical agility"],
    shadows: ["cheer can mask exhaustion", "makes difficult work look effortless"],
    contradiction: "Appears effortless because of deep discipline others rarely see.",
    visualMotifs: ["microphone shine", "swinging spotlights", "bright stage colors"],
    voicePatterns: ["playful rhythmic turns", "joyful surprises", "grace under pressure"],
    storyEngines: ["a mistake becomes the best part of the performance", "a nervous newcomer finds their rhythm"],
    evolutionTriggers: ["lets the audience see the work", "accepts a quiet moment after applause"],
    tags: ["improvisation", "joy", "craft", "swing"]
  },
  {
    id: "james-baldwin", name: "James Baldwin", era: "mid-century", domain: "literature", sourceType: "historical-person",
    essence: "Moral clarity, emotional candor, and a demand to face truths that polite society avoids.",
    strengths: ["psychological insight", "moral courage", "lyrical argument"],
    shadows: ["truth-telling can exhaust the speaker", "intensity may leave little room for retreat"],
    contradiction: "Speaks hard truths from a deep belief in human possibility.",
    visualMotifs: ["window light", "city streets", "smoke and paper", "faces in conversation"],
    voicePatterns: ["intimate direct address", "precise moral distinction", "compassion without evasion"],
    storyEngines: ["a family secret reveals a public pattern", "a character must choose between comfort and honesty"],
    evolutionTriggers: ["allows tenderness to share space with anger", "lets another person carry the conversation"],
    tags: ["truth", "identity", "justice", "intimacy"]
  },
  {
    id: "maya-angelou", name: "Maya Angelou", era: "mid-century", domain: "literature", sourceType: "historical-person",
    essence: "Dignity, memory, rhythm, and the transformation of lived experience into generous strength.",
    strengths: ["resilience", "storytelling", "presence"],
    shadows: ["strength can become an obligation", "may feel responsible for inspiring everyone"],
    contradiction: "Offers hope without denying what it costs to survive.",
    visualMotifs: ["open hands", "warm textiles", "porch light", "spoken-word rhythm"],
    voicePatterns: ["rhythmic declarations", "sensory memory", "dignity without sentimentality"],
    storyEngines: ["a family story restores a forgotten name", "a character reclaims a narrative told about them"],
    evolutionTriggers: ["accepts being cared for", "moves from survival to chosen joy"],
    tags: ["memory", "dignity", "resilience", "voice"]
  },
  {
    id: "hayao-miyazaki", name: "Hayao Miyazaki", era: "contemporary", domain: "film-performance", sourceType: "living-artist",
    essence: "Wonder rooted in everyday labor, ecological ambiguity, and children treated as capable people.",
    strengths: ["environmental storytelling", "empathy", "quiet wonder"],
    shadows: ["beauty may coexist with unresolved danger", "adult systems feel impossible to repair"],
    contradiction: "Creates magical worlds that feel real because someone must sweep, cook, repair, and care.",
    visualMotifs: ["wind in grass", "busy kitchens", "weathered machines", "vast skies"],
    voicePatterns: ["quiet observation", "small practical details beside the fantastic"],
    storyEngines: ["a magical place depends on ordinary maintenance", "an apparent monster has a human need", "a child solves what adults cannot see"],
    evolutionTriggers: ["learns care through work", "chooses coexistence over conquest"],
    tags: ["wonder", "ecology", "labor", "ambiguity"]
  },
  {
    id: "octavia-butler", name: "Octavia E. Butler", era: "contemporary", domain: "literature", sourceType: "historical-person",
    essence: "Power, adaptation, survival, and the unsettling costs of change.",
    strengths: ["systems imagination", "moral complexity", "adaptive thinking"],
    shadows: ["survival logic can justify control", "change can become coercion"],
    contradiction: "Adaptation is necessary for survival, but not every transformation is freedom.",
    visualMotifs: ["thresholds", "living networks", "scarred landscapes", "unexpected hybrids"],
    voicePatterns: ["clear pragmatic choices", "consequences stated without melodrama"],
    storyEngines: ["alliance requires uncomfortable change", "the survivor becomes responsible for the system they hated"],
    evolutionTriggers: ["chooses mutual adaptation over domination", "refuses a survival strategy that erases others"],
    tags: ["speculative", "power", "adaptation", "survival"]
  },
  {
    id: "ursula-le-guin", name: "Ursula K. Le Guin", era: "contemporary", domain: "literature", sourceType: "historical-person",
    essence: "Worlds built from anthropology, moral imagination, balance, and the limits of power.",
    strengths: ["worldbuilding", "cultural empathy", "philosophical clarity"],
    shadows: ["balance can become an excuse for inaction", "outsiders may romanticize a culture"],
    contradiction: "Builds strange worlds to make familiar assumptions look strange.",
    visualMotifs: ["archipelagos", "simple tools", "ritual spaces", "wind-shaped landscapes"],
    voicePatterns: ["patient explanation", "thoughtful questions about custom and power"],
    storyEngines: ["a visitor misunderstands a society's core value", "a victory destabilizes the balance it was meant to restore"],
    evolutionTriggers: ["gives up control to restore reciprocity", "learns to observe before judging"],
    tags: ["worldbuilding", "anthropology", "balance", "ethics"]
  },
  {
    id: "toni-morrison", name: "Toni Morrison", era: "contemporary", domain: "literature", sourceType: "historical-person",
    essence: "Layered memory, communal voice, haunting history, and language that holds beauty beside harm.",
    strengths: ["polyphonic storytelling", "symbolic depth", "historical empathy"],
    shadows: ["the past can occupy the present completely", "silence can protect and imprison"],
    contradiction: "Memory preserves identity while sometimes making freedom difficult.",
    visualMotifs: ["old houses", "waterlines", "family objects", "echoing rooms"],
    voicePatterns: ["multiple perspectives", "mythic undertones in everyday speech", "memory that changes as it is retold"],
    storyEngines: ["a house remembers what its residents deny", "a community's competing memories reshape an event"],
    evolutionTriggers: ["names a buried truth", "makes space for a future not defined by inheritance"],
    tags: ["memory", "community", "history", "haunting"]
  },
  {
    id: "sheryl-crow-roots", name: "Roots-rock road storytelling", era: "contemporary", domain: "music", sourceType: "movement",
    essence: "A lived-in blend of rock, folk, country, and pop with human-scale stories and resilient momentum.",
    strengths: ["genre blending", "direct hooks", "road-worn emotional realism"],
    shadows: ["motion can substitute for resolution", "irony can blunt grief"],
    contradiction: "Keeps moving while asking what is worth coming home to.",
    visualMotifs: ["highway signs", "cheap motel neon", "sunset amber", "scuffed instruments"],
    voicePatterns: ["plainspoken detail", "wry chorus-like repetition", "hope with a rough edge"],
    storyEngines: ["a trip forces a reckoning", "a catchy public story hides a private truth"],
    evolutionTriggers: ["chooses to stay", "turns a personal lesson into a shared song"],
    tags: ["roots-rock", "folk", "road", "resilience"]
  },
  {
    id: "afrofuturism", name: "Afrofuturism", era: "movement", domain: "design", sourceType: "movement",
    essence: "Futures that center Black imagination, ancestral continuity, technological possibility, and self-authored worlds.",
    strengths: ["future-making", "symbolic synthesis", "cultural reclamation"],
    shadows: ["visual symbols can be used without context", "technology can overshadow lived community"],
    contradiction: "Looks forward by carrying memory rather than discarding it.",
    visualMotifs: ["ancestral patterns reimagined as interfaces", "cosmic textiles", "community-built machines"],
    voicePatterns: ["future and ancestry in one metaphor", "collective rather than lone-hero framing"],
    storyEngines: ["an old practice solves a future crisis", "a community redesigns a technology that excluded it"],
    evolutionTriggers: ["shares authorship", "builds a future that remembers its makers"],
    tags: ["future", "ancestry", "technology", "self-determination"]
  },
  {
    id: "surrealism", name: "Surrealism", era: "movement", domain: "visual-art", sourceType: "movement",
    essence: "Dream logic makes hidden emotional truths visible by breaking ordinary rules.",
    strengths: ["unexpected association", "visual metaphor", "liberated possibility"],
    shadows: ["randomness without emotional logic", "symbols can become opaque"],
    contradiction: "Rejects literal sense while aiming at a deeper kind of truth.",
    visualMotifs: ["oversized everyday objects", "impossible shadows", "floating rooms", "scale shifts"],
    voicePatterns: ["matter-of-fact delivery of impossible events", "dream associations"],
    storyEngines: ["a metaphor becomes physically real", "a room changes to match a character's denial"],
    evolutionTriggers: ["recognizes the feeling inside the impossible image", "chooses one dream rule to keep and one to break"],
    tags: ["dream", "absurd", "metaphor", "impossible"]
  },
  {
    id: "dada", name: "Dada", era: "movement", domain: "visual-art", sourceType: "movement",
    essence: "Anti-authoritarian nonsense, collage, chance, and a refusal to pretend broken systems are sensible.",
    strengths: ["subversion", "collage thinking", "comic disruption"],
    shadows: ["irony can become empty", "refusal can avoid building anything"],
    contradiction: "Uses nonsense to expose a world that has stopped making moral sense.",
    visualMotifs: ["collaged labels", "misused tools", "paper cutouts", "bureaucratic stamps"],
    voicePatterns: ["deadpan absurdity", "unexpected juxtapositions", "deliberately wrong categories"],
    storyEngines: ["a form is completed so literally the system breaks", "a nonsense protest accidentally solves a real problem"],
    evolutionTriggers: ["moves from refusal to invention", "takes responsibility for the alternative"],
    tags: ["anti-art", "collage", "absurdity", "rebellion"]
  },
  {
    id: "bauhaus", name: "Bauhaus", era: "movement", domain: "design", sourceType: "movement",
    essence: "Form, function, craft, and accessible design working as one coherent system.",
    strengths: ["clarity", "modularity", "craft discipline"],
    shadows: ["efficiency can flatten individuality", "function can be defined too narrowly"],
    contradiction: "Seeks universal design while people have wonderfully different needs.",
    visualMotifs: ["primary geometry", "clean grids", "visible mechanisms", "modular furniture"],
    voicePatterns: ["plain language", "explains what each part is for"],
    storyEngines: ["a simple tool changes daily life", "a standardized design fails one unusual user"],
    evolutionTriggers: ["redesigns around an overlooked person", "lets ornament return with purpose"],
    tags: ["function", "geometry", "craft", "accessibility"]
  },
  {
    id: "film-noir", name: "Film noir", era: "movement", domain: "film-performance", sourceType: "movement",
    essence: "Moral ambiguity, shadowy spaces, compromised loyalties, and narrators who know less than they claim.",
    strengths: ["suspense", "subtext", "atmosphere"],
    shadows: ["cynicism", "women or outsiders reduced to plot devices if handled lazily"],
    contradiction: "The detective seeks truth while being personally invested in the lie.",
    visualMotifs: ["venetian-blind shadows", "wet pavement", "neon reflections", "crooked frames"],
    voicePatterns: ["dry internal commentary", "strategic omissions", "double meanings"],
    storyEngines: ["every witness tells a partly true story", "the investigator is implicated in the mystery"],
    evolutionTriggers: ["chooses truth over self-protection", "sees a suspect as a full person"],
    tags: ["mystery", "noir", "ambiguity", "shadows"]
  },
  {
    id: "magic-realism", name: "Magical realism", era: "movement", domain: "literature", sourceType: "movement",
    essence: "The extraordinary is woven into daily life and accepted with the same practical seriousness as weather.",
    strengths: ["grounded wonder", "family-scale myth", "quiet strangeness"],
    shadows: ["magic can be treated as decorative exoticism", "mystery may obscure agency"],
    contradiction: "The impossible feels ordinary, while ordinary life becomes uncanny.",
    visualMotifs: ["floating household objects", "weather indoors", "ancestral portraits", "overgrown courtyards"],
    voicePatterns: ["matter-of-fact impossibility", "family anecdotes with mythic weight"],
    storyEngines: ["a household accepts a strange rule until it changes", "a family myth proves emotionally true but literally false"],
    evolutionTriggers: ["asks who maintains the miracle", "decides whether an inherited wonder should continue"],
    tags: ["everyday-magic", "family", "wonder", "quiet-surreal"]
  },
  {
    id: "punk", name: "Punk", era: "movement", domain: "music", sourceType: "movement",
    essence: "DIY energy, anti-pretension, short-form urgency, and the belief that participation beats permission.",
    strengths: ["initiative", "directness", "collective energy"],
    shadows: ["burnout", "confuses hostility with honesty"],
    contradiction: "Rejects gatekeepers but can create its own gatekeeping.",
    visualMotifs: ["handmade flyers", "patched fabric", "repaired instruments", "rough photocopies"],
    voicePatterns: ["short direct statements", "wry defiance", "no-polish honesty"],
    storyEngines: ["a crew builds a solution from scraps", "the rebel becomes the rule-maker"],
    evolutionTriggers: ["learns to sustain the community", "lets newcomers change the sound"],
    tags: ["DIY", "rebellion", "urgency", "community"]
  },
  {
    id: "solarpunk", name: "Solarpunk", era: "movement", domain: "design", sourceType: "movement",
    essence: "Hopeful ecological futures built through repair, mutual aid, and beautiful practical systems.",
    strengths: ["collective problem-solving", "repair culture", "constructive optimism"],
    shadows: ["underestimates conflict", "beauty can conceal unequal labor"],
    contradiction: "Believes a better world is buildable while knowing maintenance never ends.",
    visualMotifs: ["living roofs", "reused materials", "sunlit workshops", "shared gardens"],
    voicePatterns: ["specific hopeful plans", "practical kindness", "community-minded language"],
    storyEngines: ["a neighborhood solves scarcity together", "a green invention fails until care work is shared"],
    evolutionTriggers: ["shares maintenance fairly", "accepts imperfect progress over a perfect blueprint"],
    tags: ["ecology", "hope", "repair", "mutual-aid"]
  },
  {
    id: "gothic", name: "Gothic fiction", era: "movement", domain: "literature", sourceType: "movement",
    essence: "Architecture, inheritance, dread, and secrets turn inner conflict into a place you can enter.",
    strengths: ["atmosphere", "symbolic setting", "slow revelation"],
    shadows: ["fear can become melodrama", "the past can overshadow living characters"],
    contradiction: "The haunted house is both a threat and a record of what was hidden.",
    visualMotifs: ["staircases", "locked rooms", "overgrown stone", "candle shadows"],
    voicePatterns: ["uneasy sensory details", "delayed answers", "repeated phrases that change meaning"],
    storyEngines: ["a room is sealed for a reason", "an inheritance comes with a memory"],
    evolutionTriggers: ["opens the room", "stops confusing secrecy with protection"],
    tags: ["haunting", "secrets", "architecture", "dread"]
  },
  {
    id: "vaudeville", name: "Vaudeville and variety performance", era: "early-modern", domain: "comedy", sourceType: "tradition",
    essence: "Rapid character entrances, physical gags, precise timing, and a succession of surprising acts.",
    strengths: ["comic pacing", "physical storytelling", "ensemble variety"],
    shadows: ["characters can become one-note gags", "speed can prevent emotional payoff"],
    contradiction: "Each act is brief, but the audience remembers the performer who breaks the pattern.",
    visualMotifs: ["stage flats", "props with hidden functions", "curtain reveals", "spotlight circles"],
    voicePatterns: ["setup and snap payoff", "repeated gag with escalation", "physical punchline"],
    storyEngines: ["a prop passes through several hands, changing purpose", "a failed act becomes the finale"],
    evolutionTriggers: ["the clown gets a sincere moment", "a supporting act takes center stage"],
    tags: ["variety", "slapstick", "timing", "stagecraft"]
  },
  {
    id: "silent-comedy", name: "Silent-film physical comedy", era: "early-modern", domain: "comedy", sourceType: "movement",
    essence: "Readable physical intention, escalating obstacles, expressive faces, and visual jokes that travel without words.",
    strengths: ["visual clarity", "timing", "physical invention"],
    shadows: ["physical gags can become cruel", "characters may be reduced to humiliation"],
    contradiction: "A tiny physical inconvenience becomes epic while the character's dignity remains real.",
    visualMotifs: ["oversized props", "precise silhouettes", "unexpected mechanical motion"],
    voicePatterns: ["gesture-first communication", "visual callbacks instead of explanation"],
    storyEngines: ["one small mishap compounds into a chain reaction", "a character outsmarts a machine through movement"],
    evolutionTriggers: ["uses physical comedy to help rather than humiliate", "learns when not to chase the gag"],
    tags: ["slapstick", "mime", "visual-comedy", "timing"]
  },
  {
    id: "cosmic-horror", name: "Cosmic horror", era: "movement", domain: "fiction", sourceType: "movement",
    essence: "The universe is vast and indifferent; dread comes from the limits of human understanding.",
    strengths: ["scale", "mystery", "existential tension"],
    shadows: ["nihilism", "characters lose agency if the unknown is absolute"],
    contradiction: "The universe may not care, yet small acts of care still matter.",
    visualMotifs: ["impossible constellations", "vast empty rooms", "repeating geometry", "distant silhouettes"],
    voicePatterns: ["understatement before revelation", "precise details around an incomprehensible whole"],
    storyEngines: ["a harmless pattern reveals an impossible scale", "a group chooses how to respond to an unknowable truth"],
    evolutionTriggers: ["finds meaning without certainty", "protects one life despite cosmic indifference"],
    tags: ["cosmic", "dread", "mystery", "scale"]
  },
  {
    id: "mythic-trickster", name: "Trickster archetype", era: "timeless-fiction", domain: "myth-folklore", sourceType: "tradition",
    essence: "Boundary-breaking mischief exposes hypocrisy and creates change through unintended consequences.",
    strengths: ["improvisation", "adaptability", "social insight"],
    shadows: ["harm is dismissed as a joke", "cannot stop performing"],
    contradiction: "Breaks rules to reveal their absurdity, then discovers some boundaries protect people.",
    visualMotifs: ["reversible masks", "borrowed keys", "crooked paths", "mirrors"],
    voicePatterns: ["feigned innocence", "questions with hidden exits", "truth disguised as a joke"],
    storyEngines: ["a prank reveals a genuine injustice", "the trickster is caught by their own loophole"],
    evolutionTriggers: ["repairs harm they caused", "uses cleverness for a shared goal"],
    tags: ["trickster", "mischief", "change", "loopholes"]
  },
  {
    id: "griot", name: "Griot storytelling tradition", era: "timeless-fiction", domain: "literature", sourceType: "tradition",
    essence: "Memory carried through performance, genealogy, music, and stories that keep communities connected.",
    strengths: ["oral history", "communal memory", "responsive performance"],
    shadows: ["a storyteller can shape memory too strongly", "the past can be curated to protect status"],
    contradiction: "Preserves a community's memory while choosing how that memory is told.",
    visualMotifs: ["instruments", "family tokens", "gathering circles", "call-and-response patterns"],
    voicePatterns: ["refrains", "audience participation", "stories nested inside stories"],
    storyEngines: ["a missing verse changes a family history", "a young listener challenges the accepted version"],
    evolutionTriggers: ["shares authorship with the next generation", "admits a story was incomplete"],
    tags: ["oral-history", "community", "music", "memory"]
  },
  {
    id: "zen-garden", name: "Zen garden aesthetics", era: "timeless-fiction", domain: "design", sourceType: "tradition",
    essence: "Attention, asymmetry, restraint, and meaning created by what is left open.",
    strengths: ["focus", "calm", "economy"],
    shadows: ["stillness can become avoidance", "minimalism can be mistaken for emotional distance"],
    contradiction: "A carefully arranged space invites the viewer to complete it in their mind.",
    visualMotifs: ["raked gravel", "weathered stone", "moss", "asymmetric balance"],
    voicePatterns: ["few words", "notices what changed", "lets silence carry meaning"],
    storyEngines: ["one altered stone reveals a hidden conflict", "a character learns by observing rather than intervening"],
    evolutionTriggers: ["acts when stillness is no longer enough", "allows mess into a protected space"],
    tags: ["attention", "minimalism", "silence", "balance"]
  },
  {
    id: "folk-horror", name: "Folk horror", era: "movement", domain: "fiction", sourceType: "movement",
    essence: "Local customs, landscape, and communal belonging turn familiar places strange.",
    strengths: ["place-based atmosphere", "ritual storytelling", "slow unease"],
    shadows: ["outsiders become simplistic", "tradition can be romanticized or demonized"],
    contradiction: "A community's traditions offer belonging and can also demand a terrible price.",
    visualMotifs: ["harvest circles", "old paths", "woven symbols", "misty fields"],
    voicePatterns: ["casual mention of unsettling customs", "locals avoid direct explanations"],
    storyEngines: ["a festival's rules are not what visitors think", "a tradition survives after its original purpose is forgotten"],
    evolutionTriggers: ["community revises a harmful custom", "outsider learns to listen before intervening"],
    tags: ["ritual", "landscape", "community", "unease"]
  },
  {
    id: "jazz-improv", name: "Jazz improvisation", era: "movement", domain: "music", sourceType: "movement",
    essence: "Listening, risk, rhythmic conversation, and making a mistake useful in real time.",
    strengths: ["adaptability", "collaboration", "responsive creativity"],
    shadows: ["novelty can crowd out coherence", "the loudest soloist can dominate"],
    contradiction: "Freedom works best when everyone listens closely to the structure and to each other.",
    visualMotifs: ["rhythmic lines", "warm stage lights", "overlapping patterns"],
    voicePatterns: ["call and response", "motifs that mutate", "space for silence"],
    storyEngines: ["a plan changes when someone listens", "a mistake becomes a new shared direction"],
    evolutionTriggers: ["makes room for another voice", "learns to return to the theme"],
    tags: ["improv", "rhythm", "ensemble", "listening"]
  },
  {
    id: "comic-romantic", name: "Romantic comedy of manners", era: "movement", domain: "comedy", sourceType: "movement",
    essence: "Desire, pride, social misreading, and wit gradually reveal emotional honesty.",
    strengths: ["banter", "social observation", "relationship reversals"],
    shadows: ["miscommunication can be prolonged artificially", "charm can excuse bad behavior"],
    contradiction: "Characters say the clever thing because saying the true thing is frightening.",
    visualMotifs: ["doorway interruptions", "missed trains", "letters", "awkward shared objects"],
    voicePatterns: ["quick repartee", "deflection followed by accidental honesty"],
    storyEngines: ["a fake arrangement becomes emotionally real", "two rivals share one inconvenient responsibility"],
    evolutionTriggers: ["makes a clear apology", "asks a direct question instead of staging a test"],
    tags: ["banter", "romance", "pride", "misunderstanding"]
  },
  {
    id: "gandalf-mentor", name: "Mythic mentor archetype", era: "timeless-fiction", domain: "myth-folklore", sourceType: "tradition",
    essence: "Guidance that gives the hero tools and choices rather than doing the whole journey for them.",
    strengths: ["perspective", "encouragement", "long-view thinking"],
    shadows: ["withholds too much", "confuses testing with teaching"],
    contradiction: "Must prepare others for a future they cannot control.",
    visualMotifs: ["walking staff", "maps with blank spaces", "small fire in a large dark"],
    voicePatterns: ["questions rather than commands", "small jokes at tense moments"],
    storyEngines: ["the guide must step aside", "a lesson is understood only after the mentor is absent"],
    evolutionTriggers: ["trusts the learner's choice", "shares uncertainty honestly"],
    tags: ["mentor", "quest", "wisdom", "agency"]
  },
  {
    id: "golden-age-islamic-scholarship", name: "Islamic Golden Age scholarship", era: "medieval", domain: "science", sourceType: "tradition",
    essence: "Translation, experimentation, mathematics, medicine, philosophy, and knowledge advanced through exchange across languages and cultures.",
    strengths: ["synthesis", "curiosity", "collaborative scholarship"],
    shadows: ["institutions can restrict inquiry", "translation can lose context"],
    contradiction: "Knowledge grows by honoring prior work while questioning it.",
    visualMotifs: ["astrolabes", "geometric diagrams", "paper manuscripts", "observatory domes"],
    voicePatterns: ["compare sources", "test an elegant idea against observation"],
    storyEngines: ["a translation error changes an invention", "a discovery depends on several cultures' contributions"],
    evolutionTriggers: ["credits forgotten collaborators", "updates a cherished theory when evidence changes"],
    tags: ["science", "translation", "mathematics", "exchange"]
  },
  {
    id: "african-diaspora-blues", name: "Blues storytelling tradition", era: "movement", domain: "music", sourceType: "tradition",
    essence: "Repetition that changes with feeling, resilience without denial, and stories carried through sound.",
    strengths: ["emotional honesty", "refrain", "transforming hardship into expression"],
    shadows: ["pain may become expected performance", "repetition can trap a story in one frame"],
    contradiction: "The song returns to the same line, but the singer is no longer the same.",
    visualMotifs: ["porch at dusk", "worn instruments", "roadside lights", "repeated visual motifs"],
    voicePatterns: ["refrains with changed meaning", "understatement", "wry endurance"],
    storyEngines: ["a repeated event reveals a changed response", "a shared song bridges strangers"],
    evolutionTriggers: ["writes a new verse", "lets joy sit beside grief"],
    tags: ["blues", "refrain", "resilience", "story-song"]
  },
  {
    id: "shakespearean-fool", name: "The wise fool", era: "timeless-fiction", domain: "comedy", sourceType: "tradition",
    essence: "A comic outsider tells truths that powerful characters cannot safely say.",
    strengths: ["fearless observation", "timing", "perspective"],
    shadows: ["hides behind jokes", "may confuse honesty with cruelty"],
    contradiction: "Appears least serious while seeing what everyone else avoids.",
    visualMotifs: ["bells without a jester costume requirement", "mirrors", "a prop used the wrong way"],
    voicePatterns: ["jokes with a second meaning", "simple questions that puncture grand speeches"],
    storyEngines: ["the joke becomes the only honest testimony", "the fool is asked to govern and discovers the cost"],
    evolutionTriggers: ["speaks sincerely without a punchline", "protects someone with truth rather than ridicule"],
    tags: ["wise-fool", "satire", "truth", "comedy"]
  },
  {
    id: "ibn-al-haytham", name: "Ibn al-Haytham (Alhazen)", era: "medieval", domain: "science", sourceType: "historical-person",
    essence: "Treats perception as a problem to investigate, combining mathematical models with experiments designed to test them.",
    strengths: ["careful observation", "experimental design", "intellectual independence"],
    shadows: ["skepticism can delay action", "may trust a test more than a person's lived experience"],
    contradiction: "Searches for reliable truth while knowing that confident perception can mislead.",
    visualMotifs: ["light through apertures", "mirrors", "darkened rooms", "geometric ray diagrams"],
    voicePatterns: ["separates observation from inference", "proposes a test before declaring a conclusion"],
    storyEngines: ["an optical illusion conceals a danger", "a trusted map fails a controlled test", "a theory survives a rival's independent experiment"],
    evolutionTriggers: ["accepts evidence against a favored theory", "admits a flawed experiment", "teaches another character how to verify a claim"],
    tags: ["optics", "experimentation", "evidence", "scientific-method", "perception"]
  },
  {
    id: "wangari-maathai", name: "Wangari Maathai", era: "contemporary", domain: "leadership", sourceType: "historical-person",
    essence: "Turns ecological care into collective action, connecting healthy land with community dignity and long-term civic power.",
    strengths: ["grassroots organizing", "patient stewardship", "courage under pressure"],
    shadows: ["may carry a movement's burden alone", "urgent causes can crowd out rest"],
    contradiction: "Plants patiently for a future she may never see while confronting powerful opponents in the present.",
    visualMotifs: ["seedlings", "red earth", "hands passing saplings", "community nurseries"],
    voicePatterns: ["connects large systems to local actions", "turns abstract concerns into practical shared work"],
    storyEngines: ["a neglected public space becomes a community's future", "a small nursery challenges a powerful developer", "neighbors disagree about who owns the future of a damaged landscape"],
    evolutionTriggers: ["delegates leadership to younger organizers", "shares responsibility for maintenance", "learns to protect rest as part of sustained service"],
    tags: ["ecology", "community", "stewardship", "civic-courage", "regeneration"]
  },
  {
    id: "amrita-sher-gil", name: "Amrita Sher-Gil", era: "early-modern", domain: "visual-art", sourceType: "historical-person",
    essence: "Uses cross-cultural artistic synthesis, strong color, and attentive portrayals of everyday people to explore identity and belonging.",
    strengths: ["bold color relationships", "empathetic observation", "cross-cultural synthesis"],
    shadows: ["restlessness between worlds", "a powerful inner vision can become isolating"],
    contradiction: "Searches for belonging through art without fitting neatly into one inherited identity.",
    visualMotifs: ["earthy reds and ochres", "compressed interiors", "simplified forms", "quiet everyday figures"],
    voicePatterns: ["describes people through posture and color", "lets an image hold conflicting emotions without explaining them away"],
    storyEngines: ["an outsider discovers that observation is not the same as belonging", "a portrait exposes the gap between public role and private life", "two artistic traditions reshape each other without becoming interchangeable"],
    evolutionTriggers: ["allows ambiguity to remain in a portrait", "recognizes the person behind an aesthetic subject", "creates a work that belongs to neither expected category"],
    tags: ["modernist", "painting", "color", "identity", "cross-cultural", "portraiture"]
  },
  {
    id: "umm-kulthum", name: "Umm Kulthum", era: "mid-century", domain: "music", sourceType: "historical-person",
    essence: "Builds emotional scale through patient phrasing, melodic variation, repetition, and a live conversation with listeners.",
    strengths: ["emotional pacing", "vocal endurance", "responsive performance"],
    shadows: ["perfectionism can become a burden", "audience expectations can harden into a role"],
    contradiction: "Commands a vast public stage while making a repeated phrase feel intimate and newly discovered.",
    visualMotifs: ["a single microphone", "formal concert dress", "warm radio glow", "an audience leaning into a refrain"],
    voicePatterns: ["returns to a phrase with altered emphasis", "builds intensity gradually", "responds to the room without abandoning structure"],
    storyEngines: ["a familiar refrain changes after a revelation", "an audience's response redirects a performance", "a communal song carries different meanings across generations"],
    evolutionTriggers: ["makes room for another performer", "accepts an imperfect moment that carries genuine feeling", "learns when repetition deepens truth and when it avoids change"],
    tags: ["Egyptian-music", "Arabic-music", "vocal-performance", "repetition", "improvisation", "audience-connection"]
  },
  {
    id: "zheng-yi-sao", name: "Zheng Yi Sao (Ching Shih)", era: "19th-century", domain: "leadership", sourceType: "historical-person",
    essence: "Builds leverage across a fractured maritime coalition through rules, intelligence, strategic timing, and negotiation.",
    strengths: ["coalition-building", "operational discipline", "negotiation under pressure"],
    shadows: ["order can depend on coercion", "survival logic can normalize harm"],
    contradiction: "Builds power outside imperial authority, then considers negotiation rather than endless combat as a route to survival.",
    visualMotifs: ["red-sailed junks", "coded flags", "ledger books", "coastal fog"],
    voicePatterns: ["states rules plainly", "asks what each faction gains or risks", "treats reputation as a resource with a cost"],
    storyEngines: ["rival crews must share a scarce route", "a strict code prevents one crisis but creates another", "a feared leader must choose between defiance and a negotiated exit"],
    evolutionTriggers: ["replaces arbitrary punishment with accountable rules", "recognizes when a coalition costs too much to maintain", "secures an exit without pretending the conflict caused no harm"],
    tags: ["maritime", "strategy", "coalition", "negotiation", "rules", "power"]
  },
  {
    id: "wang-zhenyi", name: "Wang Zhenyi", era: "enlightenment", domain: "science", sourceType: "historical-person",
    essence: "Connects astronomy, mathematics, poetry, and clear teaching, using physical models to make celestial motion understandable.",
    strengths: ["self-directed learning", "mathematical clarity", "interdisciplinary thinking"],
    shadows: ["limited access can force solitary work", "short time and scarce opportunity can make every project feel urgent"],
    contradiction: "Studies immense celestial patterns while confronting social restrictions on who is permitted to study them.",
    visualMotifs: ["a lamp and suspended spheres modeling an eclipse", "ink diagrams", "star charts", "poetry beside calculations"],
    voicePatterns: ["explains large systems through small physical models", "connects observation to everyday experience"],
    storyEngines: ["a misunderstood natural event becomes clear through demonstration", "a lost notebook threatens knowledge that was never fully archived", "a beginner's question reveals that a respected explanation is needlessly obscure"],
    evolutionTriggers: ["shares methods so others can continue the work", "questions who is excluded from the classroom", "preserves evidence while making it accessible to newcomers"],
    tags: ["astronomy", "mathematics", "education", "poetry", "eclipses", "access-to-knowledge"]
  },
  {
    id: "wayang-kulit", name: "Wayang Kulit Shadow-Puppet Theatre", era: "movement", domain: "film-performance", sourceType: "tradition",
    essence: "A live puppeteer animates silhouettes behind a lit screen, combining inherited epics, music, improvisation, humor, and social commentary.",
    strengths: ["layered storytelling", "expressive silhouettes", "ensemble timing"],
    shadows: ["a familiar repertoire can become rigid", "comic spectacle can overwhelm moral complexity"],
    contradiction: "Preserves inherited narratives while allowing performers to make them speak to present-day tensions.",
    visualMotifs: ["perforated leather silhouettes", "lamplight behind a screen", "articulated limbs", "gamelan instruments"],
    voicePatterns: ["distinct voices for different roles", "comic interruptions within serious events", "recurring motifs that change meaning"],
    storyEngines: ["a shadow reveals what a visible hero refuses to see", "a comic character speaks truth to authority", "an old epic is reinterpreted for a new communal problem"],
    evolutionTriggers: ["restores depth after a performance becomes mere spectacle", "lets younger performers reinterpret familiar roles", "balances improvisation with care for the inherited story"],
    tags: ["puppetry", "shadow-play", "Indonesia", "Java", "music", "oral-tradition", "animation"]
  },
  {
    id: "marshallese-stick-chart-navigation", name: "Marshallese Stick-Chart Navigation", era: "movement", domain: "science", sourceType: "tradition",
    essence: "Encodes relationships among swells, currents, wind, and islands in abstract models that teach navigational understanding rather than ordinary map-reading.",
    strengths: ["environmental pattern recognition", "embodied expertise", "teaching through models"],
    shadows: ["knowledge can be lost when apprenticeships break", "outsiders may mistake a teaching model for a literal map"],
    contradiction: "Uses a physical chart to teach knowledge that ultimately must be understood through experience away from the chart.",
    visualMotifs: ["interwoven palm strips", "curved swell lines", "small shell markers", "open ocean"],
    voicePatterns: ["describes relationships and forces rather than isolated coordinates", "tests learners through practical scenarios"],
    storyEngines: ["a navigator reads a changing sea without the chart", "an apprentice notices a pattern an expert overlooked", "a community rebuilds a broken chain of knowledge"],
    evolutionTriggers: ["adapts inherited knowledge to a changed environment", "trains a successor instead of guarding expertise", "explains the limits of a model before someone relies on it"],
    tags: ["navigation", "Micronesia", "Marshall-Islands", "ocean-knowledge", "pattern-recognition", "embodied-learning"]
  },
  // Research: https://www.nationalgeographic.com/history/history-magazine/article/ismail-al-jazari-muslim-inventor-called-father-robotics
  {
    id: "al-jazari",
    name: "Al-Jazari",
    era: "medieval",
    domain: "science",
    sourceType: "historical-person",
    essence: "Mechanical imagination made legible: builds playful, practical automata and explains how hidden mechanisms produce visible wonder.",
    strengths: ["systematic prototyping","mechanical empathy","clear technical illustration"],
    shadows: ["can overengineer a simple need","may mistake spectacle for accessibility"],
    contradiction: "Delights audiences with mystery while documenting the machinery so others can reproduce it.",
    visualMotifs: ["water-powered elephant clock","floating bowls and brass gears","illustrated machine diagrams","mechanical birds"],
    voicePatterns: ["explains an effect by tracing its mechanism","uses tangible analogies for timing and motion"],
    storyEngines: ["a public clock stops before a crucial ceremony","a novice repairs an automaton by reading its diagrams","a clever machine reveals a hidden social dependency"],
    evolutionTriggers: ["shares plans with an apprentice","replaces a fragile marvel with a maintainable tool","accepts a simpler design that serves more people"],
    tags: ["engineering","automata","water-clocks","mechanical-design","teaching","Anatolia"],
  },
  // Research: https://ich.unesco.org/en/RL/oral-tradition-of-the-gelede-00002
  {
    id: "gelede-oral-performance",
    name: "Gelede Oral and Masked Performance",
    era: "movement",
    domain: "film-performance",
    sourceType: "tradition",
    essence: "Community performance joins carved masks, dance, music, and satirical storytelling to honor women's social importance and sustain shared memory.",
    strengths: ["ensemble coordination","public satire","intergenerational craft"],
    shadows: ["spectacle can flatten community meaning","outsiders may misread ceremonial roles as costumes alone"],
    contradiction: "A dazzling public performance protects social knowledge that cannot be reduced to a show.",
    visualMotifs: ["carved headdresses","nighttime gathering square","drummers and masked dancers","animal-symbol masks"],
    voicePatterns: ["alternates praise and gentle social critique","weaves chorus and call-and-response into communal narration"],
    storyEngines: ["a masked performance addresses a conflict nobody dares name","an apprentice must earn trust before joining the troupe","a celebration risks becoming entertainment without its community purpose"],
    evolutionTriggers: ["invites elders to guide reinterpretation","uses humor without humiliating a vulnerable neighbor","puts community consent ahead of applause"],
    tags: ["Yoruba-Nago","Benin","Nigeria","Togo","masquerade","oral-heritage","community-performance"],
  },
  // Research: https://ich.unesco.org/en/RL/baul-songs-00107
  {
    id: "baul-songs",
    name: "Baul Songs of Bengal",
    era: "movement",
    domain: "music",
    sourceType: "tradition",
    essence: "Wandering song and lived philosophy place human connection, spiritual searching, and musical simplicity above rigid social boundaries.",
    strengths: ["improvised intimacy","portable storytelling","hospitality across difference"],
    shadows: ["restlessness can undermine commitments","idealism may overlook material obligations"],
    contradiction: "Seeks freedom from attachment while relying on the bonds created by singing together.",
    visualMotifs: ["ektara one-string instrument","dusty village road","small circle of listeners","handheld drum"],
    voicePatterns: ["asks searching questions through everyday images","uses repeated refrains to invite participation"],
    storyEngines: ["a traveler trades a song for shelter and discovers a family secret","two rivals find a shared refrain","a performer chooses between fame and a local promise"],
    evolutionTriggers: ["stays to help after the music ends","learns from a listener rather than performing certainty","finds belonging without abandoning the road"],
    tags: ["Bengal","Bangladesh","West-Bengal","mystic-song","ektara","itinerant-performance","humanism"],
  },
  // Research: https://www.unesco.org/en/articles/nushu-tears-sunshine-0
  {
    id: "nushu-womens-writing",
    name: "Nüshu Women's Writing Tradition",
    era: "19th-century",
    domain: "literature",
    sourceType: "tradition",
    essence: "A writing culture among women in Jiangyong transforms friendship, memory, and everyday hardship into letters, poems, songs, and mutual recognition.",
    strengths: ["intimate documentation","peer solidarity","inventive literary expression"],
    shadows: ["private knowledge can be lost when transmission breaks","secrecy may unintentionally exclude new learners"],
    contradiction: "A script shaped by restricted access to education becomes a means of self-expression and community strength.",
    visualMotifs: ["slender rhomboid characters","embroidered handkerchief","third-day wedding letter","folded fan"],
    voicePatterns: ["addresses an absent friend directly","lets domestic detail carry emotional weight"],
    storyEngines: ["a recovered letter repairs a misunderstood friendship","an elder teaches a nearly forgotten script","a poem survives after its author is erased from official records"],
    evolutionTriggers: ["preserves writing with its owner's consent","teaches a younger reader without controlling interpretation","speaks openly when privacy no longer protects anyone"],
    tags: ["China","Jiangyong","Hunan","women-writing","letters","poetry","cultural-preservation"],
  },
  // Research: https://hokkaido-digital-museum.jp/en/facility/kussharo-kotan/
  {
    id: "ainu-yukar",
    name: "Ainu Yukar Oral Epics",
    era: "movement",
    domain: "myth-folklore",
    sourceType: "tradition",
    essence: "Sung oral narratives keep heroic stories, place-based memory, and the relationship between performer and listeners alive through transmission.",
    strengths: ["narrative endurance","attentive listening","oral memory"],
    shadows: ["outsiders can turn living knowledge into exotic spectacle","broken mentorship threatens continuity"],
    contradiction: "Each performance changes in a living voice while carrying a story across generations.",
    visualMotifs: ["hearthside listeners","rhythmic recitation","snow-lit village exterior","wooden rhythm stick"],
    voicePatterns: ["builds episodes through recurring cadences","shifts between the narrator and a hero's perspective"],
    storyEngines: ["a young storyteller must earn permission to carry a tale","a forgotten episode changes the community's understanding of a hero","a traveler learns to listen before retelling"],
    evolutionTriggers: ["credits knowledge holders","accepts correction from elders","helps a new generation tell stories in its own voice"],
    tags: ["Ainu","Hokkaido","Japan","oral-epic","sung-recitation","indigenous-knowledge","storytelling"],
  },
  // Research: https://www.si.edu/object/mans-wrapper%3Anmafa_70-20-78
  {
    id: "asante-ewe-kente",
    name: "Asante and Ewe Kente Weaving",
    era: "movement",
    domain: "visual-art",
    sourceType: "tradition",
    essence: "Narrow-strip weaving builds meaningful textiles from labor, pattern, material, and social context, with distinct Asante and Ewe practices.",
    strengths: ["patient pattern planning","collaborative making","material literacy"],
    shadows: ["prestige can eclipse the maker's labor","motifs may lose context when treated as decoration"],
    contradiction: "A cloth can signal public standing while preserving countless intimate decisions made at the loom.",
    visualMotifs: ["joined woven strips","geometric weft patterns","loom shuttle","named color-and-shape motifs"],
    voicePatterns: ["describes choices as interlocking patterns","recognizes the hands and histories behind an object"],
    storyEngines: ["a ceremonial cloth's missing strip exposes a broken alliance","an apprentice challenges an inherited pattern","a maker must choose between a prestigious commission and a community need"],
    evolutionTriggers: ["acknowledges different weaving lineages","credits the maker rather than the wearer","adapts a motif with the community's guidance"],
    tags: ["Ghana","Togo","Asante","Ewe","kente","weaving","textile-art","craft-lineage"],
  },
  // Research: https://ich.unesco.org/en/RL/sona-drawings-and-geometric-figures-on-sand-01994?RL=01994
  {
    id: "lunda-cokwe-sona",
    name: "Lunda Cokwe Sona Sand Drawings",
    era: "movement",
    domain: "design",
    sourceType: "tradition",
    essence: "Geometric sand drawings carry stories, relationships, and collective memory through practiced gestures and patterned paths.",
    strengths: ["spatial reasoning","embodied teaching","visual storytelling"],
    shadows: ["a beautiful diagram may be mistaken for context-free ornament","some knowledge requires careful community boundaries"],
    contradiction: "An ephemeral drawing can preserve knowledge more durably than an object when people keep teaching it.",
    visualMotifs: ["dotted reference grids","continuous traced curves","damp sand","finger-drawn geometric paths"],
    voicePatterns: ["explains relationships by tracing a path","asks the listener to complete a pattern before revealing its story"],
    storyEngines: ["a sand diagram encodes the route through a conflict","a learner draws a flawless figure but misses its meaning","an erased design survives in the memories of witnesses"],
    evolutionTriggers: ["asks permission before sharing restricted knowledge","teaches meaning alongside technique","allows a learner to reinterpret without erasing origin"],
    tags: ["Angola","Lunda-Cokwe","sona","sand-drawing","geometry","ethnomathematics","oral-knowledge"],
  },
  // Research: https://ucp.manifoldapp.org/read/the-land-has-changed-history-society-and-gender-in-colonial-eastern-nigeria/section/a4469113-1eff-46a6-87f6-6709feece7bd
  {
    id: "nwanyeruwa",
    name: "Nwanyeruwa",
    era: "early-modern",
    domain: "leadership",
    sourceType: "historical-person",
    essence: "An everyday challenge to colonial authority helps catalyze collective women's political action rather than a lone-hero legend.",
    strengths: ["moral clarity","civic courage","community mobilization"],
    shadows: ["urgent resistance can carry severe personal risk","public narratives may erase the many other organizers"],
    contradiction: "A single refusal becomes historically visible only through the sustained agency of thousands of women.",
    visualMotifs: ["market gathering","palm fronds carried as signals","communal assembly","administrative ledger challenged in public"],
    voicePatterns: ["frames a personal injustice as a shared question","uses concise challenges that invite collective response"],
    storyEngines: ["an unfair count sparks a region-wide debate","local networks outmaneuver distant officials","a movement struggles to protect its many unsung leaders"],
    evolutionTriggers: ["shares the platform with other organizers","protects participants from avoidable risk","transforms a moment of protest into durable representation"],
    tags: ["Nigeria","Igbo","Womens-War-1929","Oloko","anticolonial","collective-action","women-leadership"],
  },
  // Research: https://ich.unesco.org/en/RL/community-of-palenque-de-san-basio-00001
  {
    id: "garifuna-language-music-dance",
    name: "Garifuna Language, Music and Dance",
    era: "movement",
    domain: "music",
    sourceType: "tradition",
    essence: "Afro-Indigenous Garifuna communities sustain language, memory, humor, and shared identity through songs, drums, dance, and oral storytelling.",
    strengths: ["community-led memory keeping","participatory rhythm","satirical social observation"],
    shadows: ["migration can interrupt transmission between generations","outsiders may flatten diverse practices into a single spectacle"],
    contradiction: "A living performance can keep a community connected across distance while changing as people migrate.",
    visualMotifs: ["hand drums beside a gathering","coastal meeting place","call-and-response circles","shared dance space"],
    voicePatterns: ["invites listeners to answer a refrain","weaves local knowledge and gentle satire into a story"],
    storyEngines: ["a diaspora reunion becomes an unexpected language lesson","a playful song exposes a community dispute","a younger performer seeks elders' consent to reinterpret a tradition"],
    evolutionTriggers: ["credits the community rather than claiming ownership","learns a threatened phrase from an elder","creates room for younger voices without erasing older ones"],
    tags: ["Garifuna","Belize","Guatemala","Honduras","Nicaragua","Afro-Indigenous","oral-history","community-music"],
  },
  // Research: https://ich.unesco.org/en/RL/kutiyattam-sanskrit-theatre-00010
  {
    id: "kutiyattam-theatre",
    name: "Kutiyattam Sanskrit Theatre",
    era: "movement",
    domain: "film-performance",
    sourceType: "tradition",
    essence: "Kerala's living Sanskrit theatre expands a single dramatic moment through trained eye expression, hand gesture, breath, and layered emotional interpretation.",
    strengths: ["microscopic emotional control","patient rehearsal","embodied storytelling"],
    shadows: ["specialized training demands long commitments","a codified language can be misunderstood without context"],
    contradiction: "A fleeting glance may take years to master and an entire performance to explain.",
    visualMotifs: ["single oil lamp on a stage","precise eye movements","articulated hand gestures","temple theatre architecture"],
    voicePatterns: ["slows the telling to reveal a hidden motive","lets a pause or gesture carry the reply"],
    storyEngines: ["an apprentice discovers a gesture changes the meaning of a scene","a single look reveals an unreliable narrator","a threatened theatre tradition must find new audiences respectfully"],
    evolutionTriggers: ["learns to distinguish patience from stagnation","asks permission before adapting sacred elements","makes room for another interpretation of a familiar role"],
    tags: ["Kerala","India","Kutiyattam","Koodiyattam","Sanskrit-theatre","gesture","eye-expression","performance-training"],
  },
  // Research: https://ich.unesco.org/en/RL/batik-00170
  {
    id: "indonesian-batik",
    name: "Indonesian Batik",
    era: "movement",
    domain: "visual-art",
    sourceType: "tradition",
    essence: "Layered wax-resist dyeing turns cloth into a patient record of decisions, regional patterns, personal milestones, and social meaning.",
    strengths: ["careful sequencing","symbolic design","generational craft transmission"],
    shadows: ["symbolic patterns can be stripped of their meaning in mass reproduction","a single mistake may be difficult to reverse after dyeing"],
    contradiction: "A pattern looks effortless when finished but depends on many irreversible choices.",
    visualMotifs: ["canting tool and warm wax","repeated dots and lines","cloth entering a dye bath","revealed layers after wax removal"],
    voicePatterns: ["explains plans as successive layers","notices what a design conceals until the last step"],
    storyEngines: ["a cloth records the stages of a character's life","an apprentice must repair a flawed dye sequence","a family debates how a meaningful pattern can evolve"],
    evolutionTriggers: ["recognizes regional variation instead of claiming one universal pattern","credits craft workers","accepts an imperfect layer as part of the story"],
    tags: ["Indonesia","batik","wax-resist","textiles","layering","craft","symbolism","regional-patterns"],
  },
  // Research: https://ich.unesco.org/en/RL/pansori-epic-chant-00070
  {
    id: "korean-pansori",
    name: "Korean Pansori Epic Chant",
    era: "movement",
    domain: "music",
    sourceType: "tradition",
    essence: "A vocalist and drummer sustain long-form Korean storytelling through expressive song, speech, gesture, and responsive pacing.",
    strengths: ["dramatic endurance","character switching","audience-aware improvisation"],
    shadows: ["extensive training can create rigid expectations","formal preservation may squeeze out spontaneous invention"],
    contradiction: "A deeply inherited repertoire stays alive through the singular choices of each performer.",
    visualMotifs: ["singer and barrel drummer","open performance floor","folded fan","audience leaning toward a turning point"],
    voicePatterns: ["moves between sung intensity and spoken aside","uses contrasting timbres to distinguish roles"],
    storyEngines: ["a performer changes a familiar episode to reveal a neglected character","a drummer helps rescue a faltering performance","a celebrated student must rediscover improvisation"],
    evolutionTriggers: ["balances discipline with responsiveness","invites the audience into the story without losing its shape","learns a neglected perspective within an old tale"],
    tags: ["Korea","pansori","epic-chant","storytelling","drum","vocal-theatre","improvisation","oral-tradition"],
  },
  // Research: https://ich.unesco.org/en/RL/ebru-turkish-art-of-marbling-00644
  {
    id: "turkish-ebru-marbling",
    name: "Turkish Ebru Marbling",
    era: "movement",
    domain: "visual-art",
    sourceType: "tradition",
    essence: "Floating pigments on prepared liquid become swirling patterns transferred to paper through careful technique and acceptance of fluid change.",
    strengths: ["material sensitivity","creative adaptation","patient apprenticeship"],
    shadows: ["a beautiful result can tempt the maker to hide the collaborative learning behind it","attempts at total control can ruin an organic pattern"],
    contradiction: "The artist guides a design by responding to a surface that never holds still.",
    visualMotifs: ["pigments floating in a shallow tray","fine comb trails","marbled paper drying","bookbinding workshop"],
    voicePatterns: ["describes emotions as currents and swirls","leaves space for uncertainty before naming the result"],
    storyEngines: ["a marbled page contains a clue visible only after transfer","two apprentices discover incompatible methods can coexist","a maker must release control to finish a commission"],
    evolutionTriggers: ["treats a surprise as information","passes a technique on rather than guarding it","credits the lineage of a shared craft"],
    tags: ["Türkiye","Turkey","ebru","marbling","paper-art","fluid-patterns","bookbinding","apprenticeship"],
  },
  // Research: https://mathshistory.st-andrews.ac.uk/Biographies/Brahmagupta/
  {
    id: "brahmagupta",
    name: "Brahmagupta",
    era: "medieval",
    domain: "science",
    sourceType: "historical-person",
    essence: "An Indian mathematician and astronomer who formalized useful arithmetic rules for zero, debts, and fortunes while testing mathematical descriptions of the heavens.",
    strengths: ["rule-based abstraction","mathematical persistence","connecting arithmetic to practical analogies"],
    shadows: ["an elegant rule can be extended beyond where it works","technical certainty can conceal unresolved edge cases"],
    contradiction: "Works with the concept of nothing as a number, yet encounters limits that resist simple rules.",
    visualMotifs: ["astronomical calculation tables","palm-leaf manuscript","paired marks for debt and fortune","circles on a teaching board"],
    voicePatterns: ["explains signs through balances and debts","tests a general rule against an awkward exception"],
    storyEngines: ["an impossible calculation exposes a hidden assumption","a student's counterexample improves a celebrated method","a practical problem changes an abstract theory"],
    evolutionTriggers: ["admits a rule's boundary","lets a student improve a model","chooses correction over reputation"],
    tags: ["India","mathematics","astronomy","zero","negative-numbers","calculation","models"],
  },
  // Research: https://www.britishmuseum.org/collection/term/AUTH227870
  {
    id: "yaa-asantewaa",
    name: "Yaa Asantewaa",
    era: "early-modern",
    domain: "leadership",
    sourceType: "historical-person",
    essence: "The queen mother of Ejisu became a leading figure in Asante resistance to British colonial demands, embodying political courage and defense of communal sovereignty.",
    strengths: ["decisive public leadership","mobilizing collective resolve","symbolic clarity under pressure"],
    shadows: ["confrontation can exact severe costs on communities","a single famous leader can overshadow the contributions of others"],
    contradiction: "Defends a sacred collective symbol while making pragmatic choices amid overwhelming military power.",
    visualMotifs: ["community council gathering","golden stool kept beyond reach","messengers crossing forest paths","public assembly under tension"],
    voicePatterns: ["names the shared stakes before calling for action","speaks as a steward of collective responsibility rather than a lone savior"],
    storyEngines: ["an occupying authority misreads the meaning of an object","a council disputes whether resistance is possible","a leader must protect ordinary families as well as a symbol"],
    evolutionTriggers: ["listens to dissenting community members","honors those who shared the risk","chooses stewardship over personal glory"],
    tags: ["Ghana","Asante","Ejisu","Yaa-Asantewaa","anti-colonial","sovereignty","women-leadership","community-resistance"],
  },
  // Research: https://www.metmuseum.org/art/collection/search/308537
  {
    id: "moche-sculptural-ceramics",
    name: "Moche Sculptural Ceramics",
    era: "classical",
    domain: "visual-art",
    sourceType: "tradition",
    essence: "Artists of ancient Peru's North Coast shaped vessels into vivid people, animals, and narrative scenes whose meanings still demand careful interpretation.",
    strengths: ["sculptural observation","material storytelling","attention to social detail"],
    shadows: ["modern viewers can project unwarranted certainty onto ambiguous imagery","prestige objects can conceal the hands that made them"],
    contradiction: "An everyday vessel may portray a complex human role without leaving a written explanation.",
    visualMotifs: ["stirrup-spout vessel silhouette","modeled seated figure","painted ceremonial dress","clay surface catching side light"],
    voicePatterns: ["describes what can be observed before guessing its meaning","lets a small object hold multiple possible stories"],
    storyEngines: ["an excavated vessel changes a town's accepted history","a potter hides a personal story inside a public commission","two scholars disagree about an ambiguous gesture"],
    evolutionTriggers: ["separates evidence from speculation","credits anonymous makers","accepts that some stories remain uncertain"],
    tags: ["Moche","Mochica","Peru","Andes","ceramics","stirrup-spout","sculpture","material-culture"],
  },
  // Research: https://plato.stanford.edu/archives/spr2022/entries/nagarjuna/
  {
    id: "nagarjuna-madhyamaka",
    name: "Nāgārjuna and Madhyamaka Inquiry",
    era: "classical",
    domain: "philosophy",
    sourceType: "historical-person",
    essence: "Examines dependent arising and the limits of fixed, self-existing categories, encouraging attention to relationships rather than rigid essences.",
    strengths: ["dialectical precision","perspective shifting","awareness of interdependence"],
    shadows: ["abstract argument can lose sight of immediate human needs","critique without care may feel like denying lived experience"],
    contradiction: "Challenges the idea of permanent independent identities while still taking ordinary consequences seriously.",
    visualMotifs: ["intersecting circles","a bridge supported by many beams","ink diagrams with no central node","two perspectives of the same landscape"],
    voicePatterns: ["tests a claim by asking what it depends on","refuses both simplistic absolutes and easy nihilism"],
    storyEngines: ["a rival learns their conflict depends on shared assumptions","a rigid classification fails a changing person","a community repairs a problem by tracing its many causes"],
    evolutionTriggers: ["uses insight to reduce suffering rather than win a debate","learns when not to argue","recognizes responsibility within interdependence"],
    tags: ["India","Nagarjuna","Nāgārjuna","Madhyamaka","Buddhist-philosophy","dependent-origination","dialectic","interdependence"],
  },
  // Research: https://ich.unesco.org/en/RL/ifa-divination-system-00146
  {
    "id": "ifa-yoruba-divination",
    "name": "Ifa Yoruba Divination and Oral Knowledge",
    "era": "movement",
    "domain": "spirituality",
    "sourceType": "tradition",
    "essence": "A Yoruba system of interpreted signs and extensive poetic verses linking consequential decisions with memory, ethical reflection, and trained interpretation.",
    "strengths": [
      "pattern interpretation within inherited knowledge",
      "ethical deliberation",
      "intergenerational mentorship"
    ],
    "shadows": [
      "interpreters may confuse authority with infallibility",
      "outsiders may flatten sacred knowledge into a game mechanic"
    ],
    "contradiction": "Formal signs help confront situations that resist simple answers.",
    "visualMotifs": [
      "divination-chain silhouette",
      "carefully arranged symbolic marks",
      "a listening circle"
    ],
    "voicePatterns": [
      "offers an interpretive story rather than an absolute command",
      "asks about consequences for the community"
    ],
    "storyEngines": [
      "an adviser admits the limits of an interpretation",
      "two readings expose a hidden disagreement",
      "an apprentice protects knowledge without claiming ownership"
    ],
    "evolutionTriggers": [
      "consults people affected by a decision",
      "respects boundaries around sacred knowledge",
      "admits uncertainty"
    ],
    "tags": [
      "Yoruba",
      "Nigeria",
      "Ifa",
      "Orunmila",
      "odu",
      "divination",
      "ethics",
      "living-tradition"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/gastronomic-meals-of-the-french-inclusion-00133
  {
    "id": "chopi-timbila-orchestras",
    "name": "Chopi Timbila Orchestras",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "Mozambican community orchestras of tuned wooden xylophones weave cross-rhythms, social commentary, and collective performance.",
    "strengths": [
      "ensemble listening",
      "acoustic craftsmanship",
      "rhythmic coordination across generations"
    ],
    "shadows": [
      "a soloist may drown out the group",
      "scarcity of instrument materials threatens continuity"
    ],
    "contradiction": "Complex shared rhythm depends on each player hearing the spaces left by others.",
    "visualMotifs": [
      "wooden timbila keys",
      "calabash resonators",
      "interlocking hands in motion",
      "dancers before an orchestra"
    ],
    "voicePatterns": [
      "answers with a counter-rhythm",
      "uses gentle satire to reveal a communal problem"
    ],
    "storyEngines": [
      "a broken instrument forces a new arrangement",
      "an apprentice joins an elder's ensemble",
      "a festival song reveals a town secret"
    ],
    "evolutionTriggers": [
      "welcomes younger and female players",
      "protects instrument-making materials",
      "favors collective trust over virtuosity"
    ],
    "tags": [
      "Mozambique",
      "Chopi",
      "timbila",
      "mbila",
      "xylophone",
      "polyrhythm",
      "social-satire",
      "craft"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/urtiin-duu-traditional-folk-long-song-00115
  {
    "id": "urtiin-duu-long-song",
    "name": "Urtiin Duu Mongolian Long Song",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "Mongolian long-form singing stretches melodic thoughts through ornament, wide vocal range, and patient breath at pastoral celebrations.",
    "strengths": [
      "emotional patience",
      "breath and vocal control",
      "free-form melodic adaptation"
    ],
    "shadows": [
      "virtuosity may eclipse connection",
      "displacement can sever songs from their setting"
    ],
    "contradiction": "An unhurried phrase carries the energy of a vast landscape and changing community.",
    "visualMotifs": [
      "grassland horizon",
      "lone singer against open sky",
      "long arcs traced in air",
      "celebration tents"
    ],
    "voicePatterns": [
      "lets a thought expand before resolving it",
      "revisits a theme with altered feeling"
    ],
    "storyEngines": [
      "a young singer reinterprets a celebration in a city",
      "a sustained note bridges two families",
      "a song changes after the grassland changes"
    ],
    "evolutionTriggers": [
      "learns a regional variant respectfully",
      "honors elders while adapting",
      "chooses clarity over display"
    ],
    "tags": [
      "Mongolia",
      "Inner-Mongolia",
      "Urtiin-Duu",
      "long-song",
      "vocal-ornament",
      "pastoral",
      "oral-transmission"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/mapoyo-oral-tradition-and-its-symbolic-reference-points-within-their-ancestral-territory-00983
  {
    "id": "mapoyo-place-memory",
    "name": "Mapoyo Place-Based Oral Memory",
    "era": "movement",
    "domain": "myth-folklore",
    "sourceType": "tradition",
    "essence": "Mapoyo oral narratives along Venezuela's Orinoco link community memory and historical belonging to specific ancestral places.",
    "strengths": [
      "place-based memory",
      "listening to elders",
      "stewardship of intergenerational stories"
    ],
    "shadows": [
      "knowledge may depend on too few keepers",
      "documentation without context can misrepresent belonging"
    ],
    "contradiction": "A story stays rooted in place even as younger listeners may need to leave it.",
    "visualMotifs": [
      "river bends as memory cues",
      "remembered footpaths",
      "storyteller beside a landmark"
    ],
    "voicePatterns": [
      "anchors an account to a location and relationship",
      "welcomes questions without erasing elders"
    ],
    "storyEngines": [
      "a threatened landmark holds an overlooked history",
      "a returning student asks who may share a recording",
      "a community protects a route of memories"
    ],
    "evolutionTriggers": [
      "seeks community consent before retelling",
      "distinguishes documentation from transmission",
      "supports language continuity"
    ],
    "tags": [
      "Mapoyo",
      "Venezuela",
      "Orinoco",
      "Indigenous-heritage",
      "place-memory",
      "oral-history",
      "territory",
      "safeguarding"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/kalbelia-folk-songs-and-dances-of-rajasthan-00340
  {
    "id": "kalbelia-rajasthan-dance",
    "name": "Kalbelia Songs and Dance of Rajasthan",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "Kalbelia community songs, improvised lyrics, and swirling dance preserve mythic knowledge while adapting to changing livelihoods.",
    "strengths": [
      "improvised poetic response",
      "expressive timing",
      "cultural adaptation"
    ],
    "shadows": [
      "spectacle can obscure the community",
      "external demand can freeze a living practice into a stereotype"
    ],
    "contradiction": "An inherited dance becomes a means of reinvention when associated livelihoods change.",
    "visualMotifs": [
      "black swirling skirts with mirror embroidery",
      "percussion and wind instruments",
      "spiraling footwork"
    ],
    "voicePatterns": [
      "improvises lyrics in response to the moment",
      "alternates playful performance with serious memory"
    ],
    "storyEngines": [
      "a dancer negotiates fair terms for a performance",
      "an improvised verse resolves a feud",
      "a young artist reinterprets a movement vocabulary"
    ],
    "evolutionTriggers": [
      "credits community teachers",
      "rejects exoticized caricature",
      "insists on fair participation"
    ],
    "tags": [
      "India",
      "Rajasthan",
      "Kalbelia",
      "folk-dance",
      "improvised-song",
      "poetry",
      "movement",
      "living-heritage"
    ]
  },
  // Research: https://ich.unesco.org/en/decisions/5.COM/6.24
  {
    "id": "kumiodori-okinawan-theatre",
    "name": "Kumiodori Okinawan Musical Theatre",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "Okinawan musical drama combines Ryukyuan language, poetic rhythm, dance, and neighboring theatre influences to retell local history and legend.",
    "strengths": [
      "precise ensemble staging",
      "expressive restraint",
      "cross-cultural synthesis"
    ],
    "shadows": [
      "preservation can become resistance to reinterpretation",
      "formal roles can narrow participation"
    ],
    "contradiction": "A codified stage tradition stays alive when new stories inhabit its forms.",
    "visualMotifs": [
      "three-stringed sanshin",
      "formal stage entrances",
      "layered costumes",
      "measured hand gestures"
    ],
    "voicePatterns": [
      "speaks in deliberate rhythmic phrases",
      "lets movement complete an unfinished thought"
    ],
    "storyEngines": [
      "a forgotten play returns with contested meaning",
      "an apprentice translates an old line",
      "family duty conflicts with public promise"
    ],
    "evolutionTriggers": [
      "preserves vocabulary through collaboration",
      "learns beyond familiar roles",
      "welcomes contemporary themes responsibly"
    ],
    "tags": [
      "Okinawa",
      "Ryukyu",
      "Japan",
      "Kumiodori",
      "musical-theatre",
      "sanshin",
      "poetic-drama",
      "cultural-transmission"
    ]
  },
  // Research: https://www.si.edu/collections/snapshot/quipu
  {
    "id": "andean-khipu-records",
    "name": "Andean Khipu Knot Records",
    "era": "early-modern",
    "domain": "science",
    "sourceType": "tradition",
    "essence": "Inka and wider Andean knotted-cord record systems encode quantities and administrative knowledge through tactile relations among cords, colors, and knots.",
    "strengths": [
      "structured memory",
      "material pattern recognition",
      "stewardship of records"
    ],
    "shadows": [
      "records can become opaque without interpreters",
      "a count cannot tell a complete human story"
    ],
    "contradiction": "A compact object can preserve large systems of information while losing its original context.",
    "visualMotifs": [
      "colored hanging cords",
      "different knot clusters",
      "hands comparing bundles",
      "messenger with a wrapped record"
    ],
    "voicePatterns": [
      "distinguishes what records show from what they cannot prove",
      "asks who counted and who was counted"
    ],
    "storyEngines": [
      "two records disagree over resources",
      "an apprentice reconstructs an inventory",
      "a community debates a knot reading"
    ],
    "evolutionTriggers": [
      "acknowledges uncertainty about nonnumeric meaning",
      "checks records against testimony",
      "teaches successors"
    ],
    "tags": [
      "Andes",
      "Inka",
      "Inca",
      "khipu",
      "quipu",
      "knotted-cords",
      "records",
      "numeracy",
      "tactile-information"
    ]
  },
  // Research: https://whc.unesco.org/en/list/1624/
  {
    "id": "chankillo-solar-calendar",
    "name": "Chankillo Solar Calendar Architecture",
    "era": "ancient",
    "domain": "science",
    "sourceType": "tradition",
    "essence": "Ancient builders in Peru's Casma Valley used thirteen towers and observation points as an architectural horizon for tracking the Sun through the year.",
    "strengths": [
      "long-term observation",
      "spatial reasoning",
      "collective precision"
    ],
    "shadows": [
      "precise systems may be mistaken for control over nature",
      "fragile structures require continued care"
    ],
    "contradiction": "A monumental calendar measures change by keeping its landmarks still.",
    "visualMotifs": [
      "thirteen towers against a desert ridge",
      "shifting sunrise",
      "paired observation points",
      "long shadows on stone"
    ],
    "voicePatterns": [
      "thinks in seasons and intervals",
      "asks where an observer stands before interpreting what they see"
    ],
    "storyEngines": [
      "a damaged tower throws a calendar into doubt",
      "rivals discover viewpoint differences",
      "a ceremony depends on a disputed observation"
    ],
    "evolutionTriggers": [
      "invites independent measurement",
      "acknowledges damaged instruments",
      "protects shared knowledge over prestige"
    ],
    "tags": [
      "Peru",
      "Chankillo",
      "Casma-Valley",
      "archaeoastronomy",
      "solar-calendar",
      "thirteen-towers",
      "observation",
      "architecture"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/georgian-polyphonic-singing-00008
  {
    "id": "georgian-polyphonic-singing",
    "name": "Georgian Polyphonic Singing",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "Georgian multipart singing combines independent vocal lines, dialogue, and regional practices across work, ceremony, and communal life.",
    "strengths": [
      "harmonic cooperation",
      "improvised listening",
      "resilience of shared language and memory"
    ],
    "shadows": [
      "a dominant voice can overwhelm subtler lines",
      "traditions weaken when community learning disappears"
    ],
    "contradiction": "Each singer keeps an independent line but the meaning emerges together.",
    "visualMotifs": [
      "three overlapping wave lines",
      "a field-work chorus",
      "a circle of singers",
      "low drone beneath a melody"
    ],
    "voicePatterns": [
      "answers a voice with a contrasting idea",
      "allows simultaneous perspectives instead of a single narrator"
    ],
    "storyEngines": [
      "a missing singer leaves a gap",
      "three witnesses overlap their accounts",
      "an urban choir learns from elders"
    ],
    "evolutionTriggers": [
      "listens for the least-heard part",
      "respects regional variations",
      "welcomes a new voice"
    ],
    "tags": [
      "Georgia",
      "Caucasus",
      "polyphony",
      "multipart-singing",
      "harmonic-dialogue",
      "work-songs",
      "community",
      "oral-transmission"
    ]
  },
  // Research: https://www.rhs.org.uk/education-learning/libraries-at-rhs/articles/janaki-ammal
  {
    "id": "janaki-ammal-cytogenetics",
    "name": "E. K. Janaki Ammal",
    "era": "mid-century",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "A pioneering Indian plant cytogeneticist who joined rigorous chromosome research with crop improvement and a commitment to conserving living diversity.",
    "strengths": [
      "careful cross-disciplinary observation",
      "persistence through institutional barriers",
      "practical plant-breeding imagination"
    ],
    "shadows": [
      "can distrust institutions after exclusion",
      "may shoulder conservation battles alone"
    ],
    "contradiction": "Improves cultivated crops through deliberate selection while defending the complexity of wild ecosystems.",
    "visualMotifs": [
      "chromosome sketches beside pressed leaves",
      "sugarcane rows at dawn",
      "herbarium cabinets and orchid specimens"
    ],
    "voicePatterns": [
      "asks what the specimen actually shows",
      "moves from laboratory detail to ecological consequence"
    ],
    "storyEngines": [
      "a promising hybrid threatens a rare habitat",
      "a disputed notebook contains the missing evidence",
      "a botanist must persuade an institution to protect an overlooked valley"
    ],
    "evolutionTriggers": [
      "invites a junior researcher to challenge a conclusion",
      "builds a local collection rather than extracting specimens",
      "shares credit despite past exclusion"
    ],
    "tags": [
      "India",
      "Kerala",
      "botany",
      "cytogenetics",
      "plant-breeding",
      "biodiversity",
      "conservation",
      "scientific-resilience"
    ]
  },
  // Research: https://www.moma.org/artists/27445-lygia-clark
  {
    "id": "lygia-clark-participatory-art",
    "name": "Lygia Clark",
    "era": "mid-century",
    "domain": "visual-art",
    "sourceType": "historical-person",
    "essence": "Brazilian artist who shifted geometric abstraction toward movable objects, sensory experiments, and art completed through participation.",
    "strengths": [
      "inventive material thinking",
      "empathetic attention to the participant",
      "comfort with unfinished forms"
    ],
    "shadows": [
      "may mistake invitation for consent",
      "can resist stable definitions so strongly that collaborators lose direction"
    ],
    "contradiction": "Designs precise structures whose meaning cannot be controlled once another person handles them.",
    "visualMotifs": [
      "hinged metal planes changing shape",
      "folded paper loops",
      "hands negotiating an object together"
    ],
    "voicePatterns": [
      "asks what changes when you touch the work",
      "offers an experiment instead of an explanation"
    ],
    "storyEngines": [
      "a gallery object only works when strangers cooperate",
      "a rigid sculpture becomes a living negotiation",
      "a maker must let go of authorship"
    ],
    "evolutionTriggers": [
      "sets clearer boundaries for participation",
      "welcomes an interpretation unlike her own",
      "learns when not to intervene"
    ],
    "tags": [
      "Brazil",
      "Neoconcretism",
      "participatory-art",
      "kinetic-sculpture",
      "sensation",
      "interaction",
      "co-creation"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/ahellil-of-gourara-00121
  {
    "id": "ahellil-gourara",
    "name": "Ahellil of Gourara",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "Zenete poetic song, chorus, clapping, and slow circular movement in Algerian oases, sustaining community memory through an all-night sequence.",
    "strengths": [
      "patient ensemble coordination",
      "oral memory",
      "collective endurance across generations"
    ],
    "shadows": [
      "reduced opportunities can weaken transmission",
      "experienced performers may unintentionally exclude newcomers"
    ],
    "contradiction": "A shared celebration depends on both a welcoming chorus and progressively more specialized performance.",
    "visualMotifs": [
      "oasis palms against night sky",
      "shoulder-to-shoulder circle",
      "flute player before a dawn horizon"
    ],
    "voicePatterns": [
      "repeats a line until a chorus transforms its meaning",
      "builds a whisper into a collective answer"
    ],
    "storyEngines": [
      "a village celebration loses its final singer",
      "an urban returnee learns the dawn sequence",
      "two generations debate how to keep a threatened language audible"
    ],
    "evolutionTriggers": [
      "makes space for apprentices in the circle",
      "documents without replacing live participation",
      "reconnects a displaced neighbor with community"
    ],
    "tags": [
      "Algeria",
      "Gourara",
      "Zenete",
      "Amazigh",
      "oasis",
      "choral-poetry",
      "communal-music",
      "oral-heritage"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/traditional-knowledge-and-skills-in-making-kyrgyz-kazakh-and-karakalpak-yurts-turkic-nomadic-dwellings-02284
  {
    "id": "central-asian-yurt-craft",
    "name": "Kyrgyz, Kazakh and Karakalpak Yurt-Making",
    "era": "movement",
    "domain": "design",
    "sourceType": "tradition",
    "essence": "Collaborative construction of portable circular dwellings from wooden frames, felt, rope, and decorated coverings, combining craft with hospitality and continuity.",
    "strengths": [
      "modular design",
      "cooperative craftsmanship",
      "resource-conscious material choices"
    ],
    "shadows": [
      "complex apprenticeship can be disrupted by migration",
      "ceremonial expectations can make experimentation difficult"
    ],
    "contradiction": "A home built to travel becomes a stable anchor for family memory.",
    "visualMotifs": [
      "collapsible lattice opening like a flower",
      "felt roof against steppe wind",
      "braided ropes and patterned interior textiles"
    ],
    "voicePatterns": [
      "explains a structure by how it comes apart",
      "asks who will gather and be sheltered within it"
    ],
    "storyEngines": [
      "a damaged frame must be repaired before a journey",
      "two artisans disagree about a new material",
      "a family heirloom dwelling shelters unexpected guests"
    ],
    "evolutionTriggers": [
      "teaches assembly to someone outside the usual workshop",
      "adapts responsibly to new conditions",
      "shares credit among specialized makers"
    ],
    "tags": [
      "Kyrgyzstan",
      "Kazakhstan",
      "Karakalpak",
      "Central-Asia",
      "yurt",
      "portable-architecture",
      "felt",
      "craft",
      "hospitality"
    ]
  },
  // Research: https://ich.unesco.org/en/Decisions/4.COM/13.59
  {
    "id": "manden-charter-oral-governance",
    "name": "Manden Charter Oral Governance",
    "era": "medieval",
    "domain": "philosophy",
    "sourceType": "tradition",
    "essence": "The Malinke oral charter tradition associated with Kurukan Fuga, remembered through community ceremonies and ideas of social peace, dignity, education, and mutual obligation.",
    "strengths": [
      "public deliberation",
      "community accountability",
      "intergenerational transmission"
    ],
    "shadows": [
      "appeals to ancestral authority can silence dissent",
      "oral versions can be contested or simplified"
    ],
    "contradiction": "A remembered foundation for collective order must still be interpreted by people facing new injustices.",
    "visualMotifs": [
      "assembly beneath an open sky",
      "speakers gathered at a clearing",
      "woven paths joining villages"
    ],
    "voicePatterns": [
      "frames a dispute as a shared responsibility",
      "asks whose dignity a rule protects and whose voice is missing"
    ],
    "storyEngines": [
      "two elders remember a rule differently",
      "a young mediator challenges an exclusionary custom",
      "a council must choose between precedent and urgent care"
    ],
    "evolutionTriggers": [
      "welcomes a marginalized witness",
      "admits that versions differ",
      "updates practice without claiming to rewrite history"
    ],
    "tags": [
      "Mali",
      "Manden",
      "Malinke",
      "Kurukan-Fuga",
      "oral-charter",
      "customary-law",
      "mediation",
      "collective-ethics"
    ]
  },
  // Research: https://www.usgs.gov/publications/first-direct-evidence-pre-columbian-sources-palygorskite-maya-blue
  {
    "id": "maya-blue-pigment-knowledge",
    "name": "Maya Blue Pigment Knowledge",
    "era": "classical",
    "domain": "visual-art",
    "sourceType": "tradition",
    "essence": "Mesoamerican makers developed a remarkably durable blue-green pigment by combining indigo dye with mineral clay, uniting material knowledge and visual meaning.",
    "strengths": [
      "experimental materials literacy",
      "patient craft refinement",
      "durability across generations"
    ],
    "shadows": [
      "a treasured formula may become inaccessible when knowledge networks break",
      "technical admiration can obscure the people who sustained the practice"
    ],
    "contradiction": "A color associated with living cycles survives on objects long after their makers are gone.",
    "visualMotifs": [
      "indigo-stained fingers and pale clay",
      "blue-green glyphs on plaster",
      "pigment jars beside a rain-soaked mural"
    ],
    "voicePatterns": [
      "explains color as a material relationship",
      "asks what survives weather and what stories survive neglect"
    ],
    "storyEngines": [
      "an old wall retains color while its meaning is disputed",
      "an apprentice traces the source of a rare clay",
      "a conservation team must decide how much to restore"
    ],
    "evolutionTriggers": [
      "credits Indigenous material knowledge",
      "tests a substitute before using it",
      "shares preservation methods with local stewards"
    ],
    "tags": [
      "Mesoamerica",
      "Maya",
      "pigment",
      "indigo",
      "palygorskite",
      "material-science",
      "conservation",
      "color"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/tsiattista-poetic-duelling-00536
  {
    "id": "tsiattista-cypriot-poetic-duels",
    "name": "Tsiattista Poetic Duelling",
    "era": "movement",
    "domain": "literature",
    "sourceType": "tradition",
    "essence": "Cypriot improvised rhyming-couplet contests reward quick wit, strict meter, listening, and playful rivalry in public celebrations.",
    "strengths": [
      "verbal improvisation",
      "rhythmic precision",
      "graceful public sparring"
    ],
    "shadows": [
      "competitive cleverness can humiliate the vulnerable",
      "a narrow circle of experts may discourage new performers"
    ],
    "contradiction": "A duel seeks a winner but flourishes only when opponents keep giving each other something worth answering.",
    "visualMotifs": [
      "paired poets facing a cheering crowd",
      "lute and violin beside a festival stage",
      "verses scribbled then crossed out"
    ],
    "voicePatterns": [
      "responds to the previous speaker's image",
      "turns a boast into a teasing question without copying historic verses"
    ],
    "storyEngines": [
      "a contest reveals an unexpected alliance",
      "an outsider wins respect by listening before replying",
      "a rival chooses kindness over the perfect insult"
    ],
    "evolutionTriggers": [
      "recognizes a talented newcomer",
      "ends a duel without cruelty",
      "learns to improvise under unfamiliar rules"
    ],
    "tags": [
      "Cyprus",
      "Tsiattista",
      "oral-poetry",
      "rhyming-couplets",
      "improvisation",
      "wit",
      "performance",
      "friendly-competition"
    ]
  },
  // Research: https://ich.unesco.org/en/USL/coaxing-ritual-for-camels-01061
  {
    "id": "mongolian-camel-coaxing",
    "name": "Mongolian Camel Coaxing Ritual",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "Mongolian herders use attentive singing, gesture, and sometimes fiddle or flute to encourage a mother camel to accept a newborn or orphaned calf.",
    "strengths": [
      "close behavioral observation",
      "gentle persistence",
      "coordination of music and animal care"
    ],
    "shadows": [
      "skill can fade when apprenticeships disappear",
      "romanticizing a ritual can obscure the practical work and uncertainty"
    ],
    "contradiction": "The coaxer offers carefully shaped sound while knowing the animal's response cannot be commanded.",
    "visualMotifs": [
      "twilight over a camel enclosure",
      "horse-head fiddle near a calf",
      "a singer watching the mother's smallest movement"
    ],
    "voicePatterns": [
      "softens or changes a phrase in response to behavior",
      "speaks of care as patience rather than conquest"
    ],
    "storyEngines": [
      "a newborn needs acceptance before a storm",
      "an apprentice notices a subtle sign the elder missed",
      "a displaced herding family passes on a rare skill"
    ],
    "evolutionTriggers": [
      "accepts that not every attempt succeeds",
      "combines elder guidance with careful observation",
      "teaches a new generation without spectacle"
    ],
    "tags": [
      "Mongolia",
      "camel",
      "pastoralism",
      "coaxing-ritual",
      "animal-care",
      "music",
      "empathy",
      "intergenerational-knowledge"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/darangen-epic-of-the-maranao-people-of-lake-lanao-00159
  {
    "id": "maranao-darangen-epic",
    "name": "Maranao Darangen Epic",
    "era": "movement",
    "domain": "literature",
    "sourceType": "tradition",
    "essence": "A sung Maranao epic of Lake Lanao weaving kinship, love, political duty, customary law, and heroic choices into layered cycles of narrative.",
    "strengths": [
      "long-form narrative memory",
      "symbolic and ethical storytelling",
      "intergenerational interpretation"
    ],
    "shadows": [
      "an inherited duty can silence personal wishes",
      "specialized vocabulary can narrow access between generations"
    ],
    "contradiction": "A hero must honor a community's code while recognizing when loyalty demands a different choice.",
    "visualMotifs": [
      "lake water catching torchlight",
      "genealogical threads across a carved panel",
      "a wedding gathering listening through the night"
    ],
    "voicePatterns": [
      "builds an argument through remembered episodes",
      "moves between ceremonial gravity and ironic understatement"
    ],
    "storyEngines": [
      "two families interpret an old vow differently",
      "a sung genealogy reveals a hidden alliance",
      "a young performer must decide how to explain an ancient metaphor"
    ],
    "evolutionTriggers": [
      "reconciles duty with individual compassion",
      "invites a new generation into the story",
      "allows a rival's account to change the accepted version"
    ],
    "tags": [
      "Philippines",
      "Maranao",
      "Lake Lanao",
      "Darangen",
      "oral-epic",
      "kinship",
      "customary-law",
      "narrative-memory"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/vimbuza-healing-dance-00158
  {
    "id": "tumbuka-vimbuza-dance",
    "name": "Tumbuka Vimbuza Healing Dance",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "A northern Malawian Tumbuka communal ritual joining drumming, song, and dance in a culturally specific practice of healing and social support.",
    "strengths": [
      "attentive communal coordination",
      "rhythmic responsiveness",
      "care across generations"
    ],
    "shadows": [
      "outsiders may misread a living ritual as spectacle",
      "a caregiver can overlook their own limits"
    ],
    "contradiction": "A circle gathers to support one person's experience, but no one in the circle can decide that person's inner outcome.",
    "visualMotifs": [
      "drummers at the edge of a circle",
      "dust rising with measured footsteps",
      "a shifting pattern of singers and dancers"
    ],
    "voicePatterns": [
      "checks whether others feel included before leading",
      "uses rhythm and repetition to make room for response"
    ],
    "storyEngines": [
      "a village disagrees about how to support someone in distress",
      "a young drummer learns that listening matters more than volume",
      "a festival organizer must protect ritual meaning from commercial demands"
    ],
    "evolutionTriggers": [
      "learns to ask rather than presume what help is wanted",
      "shares leadership with experienced community members",
      "protects cultural context while welcoming respectful learners"
    ],
    "tags": [
      "Malawi",
      "Tumbuka",
      "Vimbuza",
      "healing-dance",
      "communal-care",
      "drumming",
      "ritual",
      "performance"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/woodcrafting-knowledge-of-the-zafimaniry-00080
  {
    "id": "zafimaniry-woodcraft",
    "name": "Zafimaniry Woodcraft Knowledge",
    "era": "movement",
    "domain": "design",
    "sourceType": "tradition",
    "essence": "Madagascar's Zafimaniry woodcraft unites joinery, practical architecture, and symbolic carved patterns tied to family and community life.",
    "strengths": [
      "material literacy",
      "patient geometric craftsmanship",
      "design that carries social memory"
    ],
    "shadows": [
      "commercial demand can displace the meaning of craft",
      "resource scarcity can put mastery in conflict with stewardship"
    ],
    "contradiction": "The maker creates a lasting home from a living forest that also needs time to recover.",
    "visualMotifs": [
      "interlocking mortise-and-tenon joints",
      "spiderweb and honeycomb carvings",
      "highland wooden granaries"
    ],
    "voicePatterns": [
      "explains relationships through how pieces fit together",
      "uses the grain and age of materials as metaphors"
    ],
    "storyEngines": [
      "a builder must repair a house without losing its family symbols",
      "a new market values speed over careful work",
      "two apprentices disagree on adapting a traditional motif"
    ],
    "evolutionTriggers": [
      "finds a sustainable source for materials",
      "teaches the meaning behind a pattern",
      "accepts innovation that protects the craft's purpose"
    ],
    "tags": [
      "Madagascar",
      "Zafimaniry",
      "woodcraft",
      "joinery",
      "architecture",
      "geometric-patterns",
      "stewardship",
      "craft"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/textile-art-of-taquile-00166
  {
    "id": "taquile-textile-art",
    "name": "Taquile Textile Art",
    "era": "movement",
    "domain": "visual-art",
    "sourceType": "tradition",
    "essence": "On Peru's Lake Titicaca, Taquile textile practices carry calendars, communal knowledge, identity, and everyday skill through knitting and weaving.",
    "strengths": [
      "pattern-based memory",
      "shared craftsmanship",
      "collaborative decision-making"
    ],
    "shadows": [
      "tourist demand can flatten complex symbols into souvenirs",
      "tradition may become harder to sustain when materials grow scarce"
    ],
    "contradiction": "A woven calendar holds a community's long memory even as each new year demands a new response.",
    "visualMotifs": [
      "a woven calendar belt",
      "a chullo with earflaps",
      "loom stakes beside high-altitude lake light"
    ],
    "voicePatterns": [
      "describes time through recurring seasons and patterns",
      "notices tiny changes in familiar designs"
    ],
    "storyEngines": [
      "a misplaced belt hides a record of a family promise",
      "an apprentice designs a new symbol for an unfamiliar season",
      "a community debates whether a popular design has lost its meaning"
    ],
    "evolutionTriggers": [
      "balances craft income with cultural context",
      "invites young makers to contribute symbols",
      "explains the history behind a textile before selling it"
    ],
    "tags": [
      "Peru",
      "Taquile",
      "Lake Titicaca",
      "textiles",
      "weaving",
      "knitting",
      "calendar",
      "communal-memory"
    ]
  },
  // Research: https://ich.unesco.org/en/bsp/safeguarding-programme-for-hezhen-yimakan-storytelling-02474
  {
    "id": "hezhen-yimakan-storytelling",
    "name": "Hezhen Yimakan Storytelling",
    "era": "movement",
    "domain": "myth-folklore",
    "sourceType": "tradition",
    "essence": "A Hezhen oral narrative tradition in northeast China preserving language, cultural knowledge, and stories through skilled vocal storytelling.",
    "strengths": [
      "oral improvisation",
      "language stewardship",
      "intergenerational teaching"
    ],
    "shadows": [
      "a fragile transmission chain can place too much pressure on a few storytellers",
      "formal teaching may lose the intimacy of a lived gathering"
    ],
    "contradiction": "To keep a story alive, its guardian must let new voices speak without treating change as erasure.",
    "visualMotifs": [
      "a riverside gathering in winter",
      "a storyteller framed by firelight",
      "a classroom notebook beside an elder's memory"
    ],
    "voicePatterns": [
      "shifts cadence to mark different speakers",
      "returns to key images to anchor a long tale"
    ],
    "storyEngines": [
      "an apprentice records a story but misses its intended audience",
      "a nearly forgotten word unlocks a family history",
      "a storyteller must choose how to welcome a new interpretation"
    ],
    "evolutionTriggers": [
      "partners with younger speakers",
      "distinguishes a translation from the full lived context",
      "learns that preservation includes participation"
    ],
    "tags": [
      "China",
      "Hezhen",
      "Yimakan",
      "oral-storytelling",
      "language",
      "memory",
      "intergenerational-learning",
      "safeguarding"
    ]
  },
  // Research: https://ich.unesco.org/en/d%C3%A9cisions/5.COM/6.29
  {
    "id": "purepecha-pirekua-song",
    "name": "P'urhépecha Pirekua Song",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "A P'urhépecha musical tradition of Michoacán in which songs of love, history, and civic life also mediate communication among families and communities.",
    "strengths": [
      "musical mediation",
      "gentle emotional clarity",
      "adaptability across ensembles"
    ],
    "shadows": [
      "a beautiful song can postpone a difficult direct conversation",
      "outsiders may mistake a living social practice for a generic folk style"
    ],
    "contradiction": "A singer can give everyone a voice in public while still struggling to speak plainly in private.",
    "visualMotifs": [
      "a small string ensemble in a courtyard",
      "handwritten verses passed between relatives",
      "a twilight community gathering"
    ],
    "voicePatterns": [
      "frames disputes through shared images instead of accusations",
      "leaves room for another singer's reply"
    ],
    "storyEngines": [
      "a song carries a reconciliation message across a divided town",
      "a young musician questions the meaning of an inherited verse",
      "a performance reunites relatives with different memories"
    ],
    "evolutionTriggers": [
      "learns when to speak without melody",
      "invites contrasting voices into an arrangement",
      "keeps community meaning ahead of applause"
    ],
    "tags": [
      "Mexico",
      "Michoacan",
      "P'urhepecha",
      "Pirekua",
      "music",
      "social-mediation",
      "oral-transmission",
      "song"
    ]
  },
  // Research: https://mathshistory.st-andrews.ac.uk/Biographies/Madhava/
  {
    "id": "madhava-sangamagrama",
    "name": "Madhava of Sangamagrama",
    "era": "medieval",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "Kerala mathematician and astronomer associated with advances in infinite series and trigonometric calculation, known substantially through later scholars.",
    "strengths": [
      "patient approximation",
      "mathematical invention",
      "teaching across generations"
    ],
    "shadows": [
      "can chase ever-finer precision past practical need",
      "a discovery may be forgotten if its reasoning is not transmitted"
    ],
    "contradiction": "Seeks exact knowledge of a world that must often be approached through better and better approximations.",
    "visualMotifs": [
      "concentric circles on palm-leaf notes",
      "alternating marks along a number series",
      "a night sky beside calculation tables"
    ],
    "voicePatterns": [
      "offers a closer estimate rather than an absolute claim",
      "explains progress through repeated corrections"
    ],
    "storyEngines": [
      "an astronomical prediction depends on one more term",
      "a student's proof challenges a trusted shortcut",
      "a lost manuscript survives through another person's notes"
    ],
    "evolutionTriggers": [
      "explains a method instead of only a result",
      "accepts the useful limit of precision",
      "credits the chain of people who preserve a discovery"
    ],
    "tags": [
      "India",
      "Kerala",
      "Madhava",
      "mathematics",
      "infinite-series",
      "astronomy",
      "approximation",
      "scientific-lineage"
    ]
  },
  // Research: https://plato.stanford.edu/entries/18thGerman-preKant/
  {
    "id": "anton-wilhelm-amo",
    "name": "Anton Wilhelm Amo",
    "era": "enlightenment",
    "domain": "philosophy",
    "sourceType": "historical-person",
    "essence": "An African-born philosopher teaching in eighteenth-century German universities who investigated mind, body, reasoning, and the practice of rigorous philosophy.",
    "strengths": [
      "careful conceptual distinctions",
      "intellectual persistence",
      "cross-context scholarship"
    ],
    "shadows": [
      "an insistence on precision can distance an audience",
      "institutional exclusion can tempt a thinker to work in isolation"
    ],
    "contradiction": "Explores the boundary between mind and embodied sensation while navigating institutions that question his own belonging.",
    "visualMotifs": [
      "a Latin dissertation beside a map of the Gold Coast",
      "two overlapping diagrams marked mind and body",
      "a university lecture hall with an empty chair"
    ],
    "voicePatterns": [
      "defines terms before debating them",
      "tests claims for internal consistency rather than status"
    ],
    "storyEngines": [
      "a scholar must defend a thesis to a hostile audience",
      "a missing manuscript leaves only contested summaries",
      "a teacher reframes a dispute by distinguishing two senses of a word"
    ],
    "evolutionTriggers": [
      "makes difficult reasoning accessible",
      "separates disagreement from personal contempt",
      "builds intellectual allies beyond one institution"
    ],
    "tags": [
      "Ghana",
      "Nzema",
      "Amo",
      "philosophy-of-mind",
      "enlightenment",
      "reasoning",
      "education",
      "intellectual-history"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/olonkho-yakut-heroic-epos-00145
  {
    "id": "sakha-olonkho-heroic-epos",
    "name": "Sakha (Yakut) Olonkho Heroic Epos",
    "era": "movement",
    "domain": "literature",
    "sourceType": "tradition",
    "essence": "A Sakha oral epic tradition in which a skilled narrator sustains immense journeys through sung passages, spoken narrative, character shifts, and poetic improvisation.",
    "strengths": [
      "long-form narrative memory",
      "flexible vocal characterization",
      "patient worldbuilding"
    ],
    "shadows": [
      "an epic-scale perspective may overlook small immediate needs",
      "a gifted narrator may become protective of their version of a tale"
    ],
    "contradiction": "Carries an inherited cosmic story yet must remake it in the living moment for each audience.",
    "visualMotifs": [
      "a winter gathering around a storyteller",
      "layered worlds suggested by branching paths",
      "a long ribbon of spoken and sung verses"
    ],
    "voicePatterns": [
      "shifts between narrated action and performed character voices",
      "returns to rhythmic formulas while improvising transitions"
    ],
    "storyEngines": [
      "an apprentice must complete an interrupted heroic tale",
      "a journey across symbolic worlds exposes an ordinary family's dispute",
      "two narrators remember different versions of a decisive event"
    ],
    "evolutionTriggers": [
      "shares the story's authority with an apprentice",
      "makes space for a minor character's perspective",
      "preserves a tradition by allowing careful adaptation"
    ],
    "tags": [
      "Sakha",
      "Yakut",
      "Siberia",
      "Olonkho",
      "oral-epic",
      "heroic-narrative",
      "performance",
      "intergenerational-memory"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/rabinal-achi-dance-drama-tradition-00144
  {
    "id": "maya-rabinal-achi-dance-drama",
    "name": "Maya Rabinal Achí Dance-Drama",
    "era": "medieval",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "A K'iche' and Rabinal-region Maya dramatic tradition weaving political conflict, masked dance, music, community memory, and ritual continuity.",
    "strengths": [
      "ensemble discipline",
      "ethical conflict expressed through performance",
      "historical and communal memory"
    ],
    "shadows": [
      "ritual obligations may clash with a performer's personal ambitions",
      "public spectacle can flatten a morally complex conflict"
    ],
    "contradiction": "Re-enacts a political confrontation to keep memory alive while inviting the present community to reckon with its meaning.",
    "visualMotifs": [
      "carved masks beside a rehearsal space",
      "eagle and jaguar emblems",
      "a ceremonial circle opening into a contested court"
    ],
    "voicePatterns": [
      "formal exchanges that expose competing obligations",
      "measured declarations punctuated by music and movement"
    ],
    "storyEngines": [
      "a performer questions an inherited interpretation of a trial",
      "two communities disagree about how to stage a shared history",
      "a damaged mask forces an ensemble to recover forgotten knowledge"
    ],
    "evolutionTriggers": [
      "listens to the opposing side without erasing accountability",
      "protects a living practice from becoming empty spectacle",
      "reconciles personal conviction with communal duty"
    ],
    "tags": [
      "Guatemala",
      "Maya",
      "Rabinal-Achi",
      "masked-theatre",
      "dance-drama",
      "ancestral-memory",
      "political-conflict",
      "ritual-performance"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/shashmaqom-music-00089
  {
    "id": "central-asian-shashmaqom",
    "name": "Central Asian Shashmaqom Music",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "A Tajik and Uzbek classical music tradition joining six maqom cycles, instrumental and vocal forms, poetry, and master-to-student transmission.",
    "strengths": [
      "patient melodic architecture",
      "collaborative listening",
      "poetic and technical fluency"
    ],
    "shadows": [
      "strict training can discourage unexpected interpretations",
      "an elaborate form may distance a new audience"
    ],
    "contradiction": "Works within a demanding inherited framework that depends on living performers to give it fresh emotional force.",
    "visualMotifs": [
      "a circle of lutes and frame drums",
      "a handwritten poem beside a melodic outline",
      "a quiet instrumental opening before voices enter"
    ],
    "voicePatterns": [
      "builds an argument through recurring melodic ideas",
      "lets poetry and measured pauses guide emotional emphasis"
    ],
    "storyEngines": [
      "a conservatory student seeks an elder's unnotated variation",
      "a scattered ensemble rebuilds a repertoire across borders",
      "two musicians disagree over fidelity and renewal"
    ],
    "evolutionTriggers": [
      "learns directly from an elder before changing the form",
      "makes room for a less confident ensemble member",
      "discovers that technical precision alone cannot create trust"
    ],
    "tags": [
      "Tajikistan",
      "Uzbekistan",
      "Bukhara",
      "Shashmaqom",
      "maqom",
      "classical-music",
      "poetry",
      "oral-transmission"
    ]
  },
  // Research: https://ich.unesco.org/en/USL/noken-multifunctional-knotted-or-woven-bag-handcraft-of-the-people-of-papua-00619
  {
    "id": "papuan-noken-fibre-craft",
    "name": "Papuan Noken Fibre Craft",
    "era": "movement",
    "domain": "design",
    "sourceType": "tradition",
    "essence": "A diverse set of Papuan knotted and woven bag-making practices that connect plant fibres, everyday carrying, exchange, and skilled intergenerational craft.",
    "strengths": [
      "resourceful material knowledge",
      "patient handwork",
      "practical design with social meaning"
    ],
    "shadows": [
      "craft knowledge may be vulnerable when raw materials or apprentices disappear",
      "a maker may resist useful adaptation out of fear of loss"
    ],
    "contradiction": "An object made for ordinary carrying can also hold extraordinary meaning in relationships and cultural continuity.",
    "visualMotifs": [
      "loops of plant-fibre cord",
      "a partly finished net bag suspended by hand",
      "natural dyes beside forest materials"
    ],
    "voicePatterns": [
      "teaches through repeated hand movements and concrete examples",
      "describes value through use, care, and who receives an object"
    ],
    "storyEngines": [
      "a peace offering must be crafted before two groups will meet",
      "an apprentice searches for a threatened fibre source",
      "a damaged everyday object reveals a family connection"
    ],
    "evolutionTriggers": [
      "teaches a novice without demanding perfect imitation",
      "experiments with sustainable material substitutions",
      "learns when to preserve a technique and when to adapt its use"
    ],
    "tags": [
      "Papua",
      "Indonesia",
      "Noken",
      "fibre-craft",
      "weaving",
      "knotted-bags",
      "material-knowledge",
      "sustainability"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/sbek-thom-khmer-shadow-theatre-00108
  {
    "id": "khmer-sbek-thom-shadow-theatre",
    "name": "Khmer Sbek Thom Shadow Theatre",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "A Cambodian performance tradition using large non-articulated leather silhouettes, coordinated dancers, narration, and music to stage epic scenes.",
    "strengths": [
      "ensemble movement precision",
      "monumental silhouette design",
      "ceremonial storytelling"
    ],
    "shadows": [
      "complex staging can depend on fragile chains of skilled collaboration",
      "spectacle may overpower the human stakes of a scene"
    ],
    "contradiction": "A motionless leather figure becomes vividly alive only through a whole moving ensemble.",
    "visualMotifs": [
      "towering cut-leather silhouettes",
      "firelight behind a white screen",
      "paired bamboo supports and dancers' synchronized steps"
    ],
    "voicePatterns": [
      "narrators alternate exposition with dramatic emphasis",
      "allows percussion and shadow movement to carry unspoken meaning"
    ],
    "storyEngines": [
      "a troupe rebuilds lost figures from incomplete memories",
      "a dancer must replace a missing narrator mid-performance",
      "an apprentice learns that the largest shadow requires collective timing"
    ],
    "evolutionTriggers": [
      "credits artisans as well as performers",
      "reconstructs a lost sequence through shared testimony",
      "chooses narrative clarity over visual grandeur"
    ],
    "tags": [
      "Cambodia",
      "Khmer",
      "Sbek-Thom",
      "shadow-theatre",
      "leather-puppets",
      "ensemble",
      "silhouette",
      "Reamker"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/traditional-li-textile-techniques-spinning-dyeing-weaving-and-embroidering-02153
  {
    "id": "hainan-li-textile-knowledge",
    "name": "Hainan Li Textile Knowledge",
    "era": "movement",
    "domain": "design",
    "sourceType": "tradition",
    "essence": "Li community spinning, dyeing, weaving, and embroidery practices in Hainan that preserve historical memory through textile patterns and teaching.",
    "strengths": [
      "pattern-based memory",
      "complex fibre craftsmanship",
      "collaborative knowledge transfer"
    ],
    "shadows": [
      "a maker can mistake one family's pattern for a universal account",
      "time-intensive apprenticeship may be hard to sustain under economic pressure"
    ],
    "contradiction": "Cloth made for everyday life can also carry histories that are not written down.",
    "visualMotifs": [
      "double-face embroidery showing two coherent sides",
      "naturally dyed cotton threads",
      "a loom where repeating patterns become a family record"
    ],
    "voicePatterns": [
      "explains a motif by tracing its making step by step",
      "uses tactile comparisons to describe history and belonging"
    ],
    "storyEngines": [
      "a missing pattern leaves a family history incomplete",
      "an apprentice translates a remembered motif into a new textile",
      "a market demand threatens the time needed for careful work"
    ],
    "evolutionTriggers": [
      "invites younger makers to learn and reinterpret responsibly",
      "asks whose memories a design represents",
      "balances livelihood with patient transmission"
    ],
    "tags": [
      "Hainan",
      "China",
      "Li-people",
      "textiles",
      "embroidery",
      "weaving",
      "natural-dyes",
      "cultural-memory"
    ]
  },
  // Research: https://www.ascleiden.nl/content/library-weekly/nana-asmau
  {
    "id": "nana-asmau-educator-poet",
    "name": "Nana Asma'u",
    "era": "19th-century",
    "domain": "literature",
    "sourceType": "historical-person",
    "essence": "A nineteenth-century Sokoto scholar and multilingual poet whose teaching networks made knowledge more accessible, especially to women.",
    "strengths": [
      "multilingual communication",
      "education through poetry",
      "building distributed teaching networks"
    ],
    "shadows": [
      "a dedicated organizer can carry too much responsibility",
      "an urgent mission may leave little room for uncertainty"
    ],
    "contradiction": "Works within an established scholarly world while widening who can participate in its learning.",
    "visualMotifs": [
      "handwritten verses shared between teachers",
      "a traveling study circle",
      "a notebook moving from village to village"
    ],
    "voicePatterns": [
      "uses memorable poetic structures to teach complex ideas",
      "adapts explanations to the learner without diluting the question"
    ],
    "storyEngines": [
      "a traveling teacher must rebuild trust after a misunderstanding",
      "a poem carries a lesson across a language boundary",
      "an apprentice discovers that teaching changes the teacher"
    ],
    "evolutionTriggers": [
      "delegates authority to a new educator",
      "revises a lesson after hearing a student's objection",
      "makes a learning network resilient without her presence"
    ],
    "tags": [
      "Nigeria",
      "Sokoto",
      "Nana-Asmau",
      "Fulani",
      "Hausa",
      "education",
      "poetry",
      "women-scholars",
      "yan-taru"
    ]
  },
  // Research: https://www.aps.org/apsnews/2005/10/this-month-in-physics-history
  {
    "id": "satyendra-nath-bose",
    "name": "Satyendra Nath Bose",
    "era": "early-modern",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "An Indian theoretical physicist whose unconventional counting of indistinguishable light quanta helped open a new framework for quantum statistics.",
    "strengths": [
      "conceptual reframing",
      "mathematical persistence",
      "willingness to seek cross-border critique"
    ],
    "shadows": [
      "an elegant model can be difficult to communicate without shared assumptions",
      "a breakthrough may depend on gatekeepers to be heard"
    ],
    "contradiction": "Changes what can be counted by recognizing that some things cannot be distinguished in the usual way.",
    "visualMotifs": [
      "identical points arranged in shared cells",
      "a handwritten derivation crossing a desk",
      "a blackboard with two competing counting methods"
    ],
    "voicePatterns": [
      "questions a hidden assumption before doing more calculation",
      "explains a surprising result through a simpler counting example"
    ],
    "storyEngines": [
      "a rejected paper reaches an unexpected collaborator",
      "a tiny mathematical discrepancy exposes a new physical rule",
      "a team argues whether two apparently identical objects can be tracked separately"
    ],
    "evolutionTriggers": [
      "credits collaborators without surrendering independent judgment",
      "turns an abstract result into a teachable analogy",
      "accepts criticism that improves the original derivation"
    ],
    "tags": [
      "India",
      "Bengal",
      "Dhaka",
      "Satyendra-Nath-Bose",
      "quantum-statistics",
      "physics",
      "mathematics",
      "conceptual-breakthrough"
    ]
  },
];

export const INFLUENCE_BY_ID = Object.fromEntries(
  INFLUENCE_ATLAS.map((influence) => [influence.id, influence]),
) as Record<string, Influence>;

export function influencesForTags(tags: string[]) {
  const wanted = new Set(tags.map((tag) => tag.toLowerCase()));
  return INFLUENCE_ATLAS.filter((influence) =>
    influence.tags.some((tag) => wanted.has(tag.toLowerCase())),
  );
}

/** Pick two complementary influences and a third that creates productive friction. */
export function blendInfluences<T extends () => number>(rng: T, count = 3): Influence[] {
  const pool = [...INFLUENCE_ATLAS];
  const chosen: Influence[] = [];
  const take = () => {
    const index = Math.floor(rng() * pool.length);
    const [item] = pool.splice(index, 1);
    if (item) chosen.push(item);
  };
  while (chosen.length < Math.min(count, pool.length)) take();
  return chosen;
}

export function influenceBlendPrompt(influences: Influence[]) {
  if (!influences.length) return "";
  const lines = influences.map((item) =>
    `- ${item.name}: ${item.essence} Strengths: ${item.strengths.join(", ")}. Shadow: ${item.shadows.join(", ")}. Productive contradiction: ${item.contradiction}`,
  );
  return [
    "Blend these references into a wholly original character; never copy a real person's exact voice, signature phrases, or a living artist's style.",
    ...lines,
    "Keep at least one contradiction unresolved. Translate influences into motives, behavior, visual motifs, and story choices rather than impersonation.",
  ].join("\n");
}
