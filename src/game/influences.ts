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
  // Research: https://ich.unesco.org/en/rl/hudhud-chants-of-the-ifugao-00015
  {
    "id": "ifugao-hudhud-chants",
    "name": "Ifugao Hudhud Narrative Chants",
    "era": "movement",
    "domain": "literature",
    "sourceType": "tradition",
    "essence": "An Ifugao narrative-chant tradition from the Philippine Cordilleras that joins rice cultivation, ancestral stories, customary law, and communal memory through a lead voice and chorus.",
    "strengths": [
      "long-form narrative recall",
      "call-and-response coordination",
      "linking stories to seasonal responsibilities"
    ],
    "shadows": [
      "knowledge can become fragile when few experienced narrators remain",
      "a story tied to one setting can be harder to transmit when livelihoods change"
    ],
    "contradiction": "A narrative repeated across generations stays alive only when each new generation finds a reason to sing it.",
    "visualMotifs": [
      "terraced rice fields under mist",
      "a lead chanter facing a listening chorus",
      "harvest baskets and remembered pathways"
    ],
    "voicePatterns": [
      "a refrain returns with a changed emotional meaning",
      "one narrator advances the story while the chorus anchors memory",
      "metaphor and rhythmic repetition carry difficult lessons"
    ],
    "storyEngines": [
      "a harvest gathering reveals a forgotten family obligation",
      "a young listener must reconstruct an interrupted chant",
      "a dispute is reframed by an ancestral episode"
    ],
    "evolutionTriggers": [
      "invites a younger voice to lead a verse",
      "adapts a story for a changing harvest without erasing its roots",
      "listens to a version that differs from the one first learned"
    ],
    "tags": [
      "Philippines",
      "Ifugao",
      "Cordillera",
      "Hudhud",
      "oral-epic",
      "rice-terraces",
      "choral-storytelling",
      "intergenerational-memory"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/andean-cosmovision-of-the-kallawaya-00048
  {
    "id": "kallawaya-andean-cosmovision",
    "name": "Kallawaya Andean Cosmovision",
    "era": "movement",
    "domain": "spirituality",
    "sourceType": "tradition",
    "essence": "A living Andean knowledge tradition in Bolivia connecting ecological observation, ritual practice, travel, apprenticeship, and community relationships with mountain landscapes.",
    "strengths": [
      "attentive ecological observation",
      "apprenticeship across varied environments",
      "careful stewardship of inherited knowledge"
    ],
    "shadows": [
      "specialized knowledge may become vulnerable when transmission breaks",
      "outsiders can mistake a complex cultural worldview for a simple collection of remedies"
    ],
    "contradiction": "Knowledge grows through journeys away from home while drawing meaning from belonging to a particular place.",
    "visualMotifs": [
      "mountain passes connecting distinct plant zones",
      "a travel satchel with carefully labeled specimens",
      "woven patterns echoing highland landscapes"
    ],
    "voicePatterns": [
      "describes a problem through relationships among place, season, and community",
      "asks what an elder or local observer has noticed",
      "distinguishes inherited practice from personal interpretation"
    ],
    "storyEngines": [
      "a traveler must choose whether to reveal knowledge entrusted to them",
      "an apprentice finds that two valleys require different approaches",
      "a community debates how to safeguard knowledge amid outside commercial pressure"
    ],
    "evolutionTriggers": [
      "credits the community behind an insight",
      "shares learning responsibly with the next apprentice",
      "recognizes the limits of personal knowledge and seeks appropriate expertise"
    ],
    "tags": [
      "Bolivia",
      "Andes",
      "Kallawaya",
      "ecological-knowledge",
      "apprenticeship",
      "cultural-stewardship",
      "mountain-travel",
      "ritual-tradition"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/saman-dance-00509
  {
    "id": "gayo-saman-dance",
    "name": "Gayo Saman Dance",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "A Gayo performance tradition from Aceh in which tightly coordinated seated movement, rhythmic body percussion, and sung verse build collective energy.",
    "strengths": [
      "ensemble synchronization",
      "precision through attentive listening",
      "turning small gestures into powerful visual rhythm"
    ],
    "shadows": [
      "group timing can leave little space for a hesitant member",
      "a performance may lose its social context when reduced to spectacle"
    ],
    "contradiction": "Individual performers disappear into unison while every participant remains essential to the whole.",
    "visualMotifs": [
      "a close row of kneeling performers",
      "embroidered black garments with Gayo motifs",
      "hands tracing alternating waves of movement"
    ],
    "voicePatterns": [
      "short sung lines answer one another",
      "rhythmic acceleration communicates urgency",
      "humor and counsel appear within a shared performance"
    ],
    "storyEngines": [
      "one missed beat threatens an important communal performance",
      "two rival groups find a shared tempo",
      "a young performer must earn trust without taking the spotlight"
    ],
    "evolutionTriggers": [
      "adjusts pace to include a struggling teammate",
      "learns to lead through listening",
      "protects the meaning of a performance while welcoming newcomers"
    ],
    "tags": [
      "Indonesia",
      "Aceh",
      "Gayo",
      "Saman",
      "body-percussion",
      "ensemble-dance",
      "synchronization",
      "movement-design"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/chhau-dance-00337
  {
    "id": "eastern-india-chhau-dance",
    "name": "Eastern Indian Chhau Dance",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "A family of eastern Indian dance traditions blending dramatic storytelling, martial-derived movement, regional folk themes, and expressive character embodiment.",
    "strengths": [
      "athletic physical storytelling",
      "translating animal movement into character",
      "regional variation within a shared dramatic vocabulary"
    ],
    "shadows": [
      "spectacle can overpower narrative clarity",
      "demanding movement may encourage performance beyond safe limits"
    ],
    "contradiction": "A stylized body can reveal an emotion that an ordinary face might conceal.",
    "visualMotifs": [
      "a festival ground lit after dark",
      "bold masks in Seraikella or Purulia styles",
      "leaping silhouettes against drum rhythms"
    ],
    "voicePatterns": [
      "character intent is expressed through posture before words",
      "short calls punctuate movement transitions",
      "rhythmic pauses carry emotional reversals"
    ],
    "storyEngines": [
      "a masked rival must communicate without revealing identity",
      "a dancer learns a new character through observing animals",
      "a festival performance stages a conflict the village cannot discuss openly"
    ],
    "evolutionTriggers": [
      "chooses expressive restraint over a showy leap",
      "learns a regional style without flattening its differences",
      "makes space for an understudy to interpret a role"
    ],
    "tags": [
      "India",
      "Chhau",
      "Seraikella",
      "Purulia",
      "Mayurbhanj",
      "dance-theatre",
      "martial-movement",
      "masked-performance",
      "animation-reference"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/moorish-epic-t-heydinn-00524
  {
    "id": "mauritanian-theydinn-epic",
    "name": "Mauritanian T’heydinn Epic",
    "era": "movement",
    "domain": "literature",
    "sourceType": "tradition",
    "essence": "A Hassaniya-language Mauritanian epic-poetry tradition performed by griots, connecting historical memory, family repertoires, musical skill, and social reconciliation.",
    "strengths": [
      "preserving many-voiced community history",
      "musical-poetic improvisation",
      "using shared stories to strengthen social ties"
    ],
    "shadows": [
      "family-held repertoires can become isolated when transmission falters",
      "praising past heroes can leave difficult historical perspectives unspoken"
    ],
    "contradiction": "An epic celebrates conflict and courage while its performance can help communities make peace.",
    "visualMotifs": [
      "a stringed instrument beside a storyteller",
      "families gathered at a reconciliation ceremony",
      "a remembered journey mapped through verses"
    ],
    "voicePatterns": [
      "a story unfolds through measured poetic praise",
      "musical phrases cue changes in narrator perspective",
      "a familiar heroic episode is reconsidered for a new audience"
    ],
    "storyEngines": [
      "two families know different portions of a shared epic",
      "a reconciliation gathering hinges on how an old conflict is retold",
      "an apprentice must decide whether to shorten a difficult inherited passage"
    ],
    "evolutionTriggers": [
      "makes room for competing memories without erasing them",
      "helps a younger performer learn an endangered passage",
      "uses an epic of rivalry to open a path toward cooperation"
    ],
    "tags": [
      "Mauritania",
      "Hassaniya",
      "T-heydinn",
      "griot",
      "epic-poetry",
      "oral-memory",
      "reconciliation",
      "musical-narrative"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/mak-yong-00167
  {
    "id": "malay-mak-yong-theatre",
    "name": "Malay Mak Yong Theatre",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "A Malay theatrical tradition combining dance, music, acting, improvised dialogue, and folk narratives, with women historically performing many central roles.",
    "strengths": [
      "layering song, dance, and dialogue",
      "improvising within an inherited story",
      "balancing courtly refinement with village performance"
    ],
    "shadows": [
      "complex training can make succession difficult",
      "ritual context can be flattened when adapted solely for entertainment"
    ],
    "contradiction": "A performance can feel spontaneous even after years of disciplined apprenticeship.",
    "visualMotifs": [
      "a temporary palm-and-wood stage",
      "a rebab beside drums and gongs",
      "royal and clown figures sharing a performance space"
    ],
    "voicePatterns": [
      "a comic aside interrupts solemn ceremony",
      "dialogue shifts between formal narrative and playful improvisation",
      "music signals a character's emotional entrance"
    ],
    "storyEngines": [
      "a comic performer uncovers a court secret",
      "a village troupe must reinterpret a neglected role",
      "an apprentice struggles to keep improvisation alive under strict expectations"
    ],
    "evolutionTriggers": [
      "honors a teacher while developing an original interpretation",
      "lets a supporting character redirect the plot",
      "finds a sustainable way to pass on a demanding craft"
    ],
    "tags": [
      "Malaysia",
      "Malay",
      "Mak-Yong",
      "theatre",
      "improvisation",
      "women-performers",
      "music-and-dance",
      "folk-narrative"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/chinese-zhusuan-knowledge-and-practices-of-mathematical-calculation-through-the-abacus-00853
  {
    "id": "chinese-zhusuan-abacus",
    "name": "Chinese Zhusuan Abacus Calculation",
    "era": "movement",
    "domain": "science",
    "sourceType": "tradition",
    "essence": "A Chinese mathematical practice using abacus beads, spoken formulas, and trained mental models to make arithmetic a tactile and teachable process.",
    "strengths": [
      "algorithmic precision",
      "spatial-number intuition",
      "teaching through rhythmic repetition"
    ],
    "shadows": [
      "fluency with a procedure can hide a misunderstood principle",
      "speed can become more valued than explaining why an answer works"
    ],
    "contradiction": "A visible set of moving beads teaches a calculation that experts eventually perform without the instrument.",
    "visualMotifs": [
      "wooden abacus rods and sliding beads",
      "fingertips pausing above a half-finished sum",
      "rhymed formulas written beside a ledger"
    ],
    "voicePatterns": [
      "breaks a problem into repeatable steps",
      "checks a result through a second representation",
      "uses a compact mnemonic before a complex calculation"
    ],
    "storyEngines": [
      "a merchant discovers a hidden error in a ledger",
      "an apprentice solves a problem after losing the physical abacus",
      "two experts disagree on whether speed or explanation proves mastery"
    ],
    "evolutionTriggers": [
      "slows down to teach the underlying principle",
      "checks an elegant shortcut against evidence",
      "welcomes a learner who invents a different valid method"
    ],
    "tags": [
      "China",
      "Zhusuan",
      "abacus",
      "mathematics",
      "mental-arithmetic",
      "mnemonics",
      "tactile-learning",
      "algorithmic-thinking"
    ]
  },
  // Research: https://news.stanford.edu/stories/2014/08/stanfords-maryam-mirzakhani-wins-fields-medal
  {
    "id": "maryam-mirzakhani-geometry",
    "name": "Maryam Mirzakhani",
    "era": "contemporary",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "An Iranian mathematician whose imaginative connections across geometry and dynamical systems opened new ways to understand curved surfaces.",
    "strengths": [
      "deep exploratory patience",
      "linking distant mathematical ideas",
      "visual and conceptual problem solving"
    ],
    "shadows": [
      "a difficult abstract question can consume attention for years",
      "a beautiful conjecture can require extensive revision before proof"
    ],
    "contradiction": "Searches for rigorous certainty by first allowing messy sketches and uncertain possibilities.",
    "visualMotifs": [
      "loops traced across a curved surface",
      "a desk covered in layered mathematical sketches",
      "a maze of paths converging on an unexpected pattern"
    ],
    "voicePatterns": [
      "frames a hard problem as a puzzle with hidden connections",
      "tries a visual analogy before formalizing an argument",
      "treats a failed approach as information"
    ],
    "storyEngines": [
      "a neglected sketch becomes the key to a long-standing problem",
      "two incompatible methods unexpectedly describe the same surface",
      "a mentor encourages a student whose first attempt fails"
    ],
    "evolutionTriggers": [
      "shares an unfinished idea with a collaborator",
      "revises a favored conjecture after new evidence",
      "mentors someone who approaches geometry differently"
    ],
    "tags": [
      "Iran",
      "Maryam-Mirzakhani",
      "mathematics",
      "geometry",
      "dynamical-systems",
      "curved-surfaces",
      "creative-inquiry",
      "mentorship"
    ]
  },
  // Research: https://artsandculture.google.com/story/0011/qgWhCdKgS8UJIw
  {
    "id": "asima-chatterjee-natural-products-chemistry",
    "name": "Asima Chatterjee",
    "era": "mid-century",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "A Kolkata chemist who traced the molecular possibilities of plants through painstaking natural-products research, joining patient laboratory craft to questions of human need.",
    "strengths": [
      "systematic chemical investigation",
      "persistence across long research cycles",
      "bridging botanical observation and molecular analysis"
    ],
    "shadows": [
      "can become absorbed in a single difficult compound",
      "institutional obstacles may make independence hard to relinquish"
    ],
    "contradiction": "Looks for practical remedies through years of slow, uncertain fundamental chemistry.",
    "visualMotifs": [
      "pressed leaves beside a laboratory notebook",
      "hand-drawn ring structures on a chalkboard",
      "amber sample vials arranged by experiment"
    ],
    "voicePatterns": [
      "distinguishes a promising extract from a proven result",
      "explains a complex structure one bond at a time"
    ],
    "storyEngines": [
      "a plant sample leads to an unexpected chemical structure",
      "a laboratory result must be replicated before anyone can trust it",
      "a mentor and student disagree about which experiment deserves scarce resources"
    ],
    "evolutionTriggers": [
      "shares credit for a difficult breakthrough",
      "abandons an attractive hypothesis after contradictory data",
      "makes research methods accessible to a new generation"
    ],
    "tags": [
      "India",
      "Bengal",
      "Asima-Chatterjee",
      "organic-chemistry",
      "natural-products",
      "medicinal-chemistry",
      "laboratory-research",
      "mentorship"
    ]
  },
  // Research: https://www.moma.org/collection/artists/49158
  {
    "id": "tarsila-do-amaral-brazilian-modernism",
    "name": "Tarsila do Amaral",
    "era": "early-modern",
    "domain": "visual-art",
    "sourceType": "historical-person",
    "essence": "A Brazilian modernist who transformed memories of landscape and everyday life into bold experiments in shape, scale and national artistic identity.",
    "strengths": [
      "inventive synthesis of artistic languages",
      "expressive simplification of forms",
      "confidence in local memories as artistic material"
    ],
    "shadows": [
      "spectacular imagery can obscure social realities",
      "a strong personal vision may resist collaborators"
    ],
    "contradiction": "Draws on international experiments while seeking a visual language rooted in Brazil rather than borrowed authority.",
    "visualMotifs": [
      "oversized tropical plant silhouettes",
      "rounded hills under improbable skies",
      "flat color fields and playful shifts of scale"
    ],
    "voicePatterns": [
      "describes a place through color and shape before plot",
      "uses vivid comparisons rather than elaborate explanations"
    ],
    "storyEngines": [
      "a painter returns home and sees familiar terrain as strange",
      "an exhibition forces a debate over whose vision represents a country",
      "a seemingly whimsical image conceals a sharp social question"
    ],
    "evolutionTriggers": [
      "listens to a subject who challenges the painting",
      "lets collaborators reshape a familiar visual symbol",
      "discovers that belonging can include internal contradiction"
    ],
    "tags": [
      "Brazil",
      "Tarsila-do-Amaral",
      "modernism",
      "painting",
      "color",
      "scale",
      "identity",
      "landscape"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/barkcloth-making-in-uganda-00139
  {
    "id": "uganda-baganda-barkcloth-making",
    "name": "Baganda Barkcloth Making",
    "era": "movement",
    "domain": "design",
    "sourceType": "tradition",
    "essence": "An Ugandan material craft that transforms the inner bark of the mutuba tree through repeated skilled beating into cloth with social and ceremonial meaning.",
    "strengths": [
      "patient material transformation",
      "tactile judgment and craftsmanship",
      "intergenerational stewardship of technique"
    ],
    "shadows": [
      "status markers can become barriers to participation",
      "craft knowledge can be endangered when apprentices disappear"
    ],
    "contradiction": "Creates a soft, flexible surface through demanding, repetitive physical work.",
    "visualMotifs": [
      "terracotta sheets drying in an open shed",
      "wooden mallets with varied striking surfaces",
      "a textured fabric folded for a ceremony"
    ],
    "voicePatterns": [
      "teaches through touch and demonstration",
      "notices subtle changes in grain, moisture and sound"
    ],
    "storyEngines": [
      "a damaged ceremonial cloth must be repaired without losing its history",
      "an apprentice discovers a neglected practical use for an old technique",
      "a maker chooses between quick production and preserving the tree"
    ],
    "evolutionTriggers": [
      "adapts a technique without severing its lineage",
      "passes expertise to a learner from outside the usual circle",
      "learns to balance conservation with communal demand"
    ],
    "tags": [
      "Uganda",
      "Buganda",
      "Baganda",
      "barkcloth",
      "mutuba",
      "textile",
      "material-craft",
      "apprenticeship"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/culture-of-jeju-haenyeo-women-divers-01068
  {
    "id": "jeju-haenyeo-women-divers",
    "name": "Jeju Haenyeo Women Divers",
    "era": "movement",
    "domain": "science",
    "sourceType": "tradition",
    "essence": "A Jeju Island community of women divers whose marine knowledge, breath-hold harvesting, mutual support and ecological restraint shape work at sea.",
    "strengths": [
      "fine-grained knowledge of marine conditions",
      "intergenerational mentoring",
      "collective risk awareness"
    ],
    "shadows": [
      "self-reliance can discourage admitting fatigue",
      "livelihood pressures can strain ecological restraint"
    ],
    "contradiction": "Makes a living from the sea while depending on the sea remaining abundant for those who follow.",
    "visualMotifs": [
      "divers surfacing beside floating markers",
      "wet stone walls and sorting baskets",
      "a horizon watched before a difficult dive"
    ],
    "voicePatterns": [
      "gives short practical instructions in uncertain conditions",
      "uses memories of seasons and currents to explain decisions"
    ],
    "storyEngines": [
      "a veteran diver must trust a younger partner's reading of the water",
      "a threatened harvesting ground divides the community",
      "a missing diver prompts a collective rescue and reckoning"
    ],
    "evolutionTriggers": [
      "chooses safety over pride",
      "teaches conservation alongside technique",
      "accepts a younger leader's better plan"
    ],
    "tags": [
      "Jeju",
      "Korea",
      "haenyeo",
      "marine-ecology",
      "women-divers",
      "breath-hold",
      "community",
      "sustainability"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/khorazm-dance-lazgi-01364
  {
    "id": "khorazm-lazgi-dance",
    "name": "Khorazm Lazgi Dance",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "An Uzbek dance tradition whose gestures respond to natural phenomena and everyday feeling, moving between recognizable scenes and accelerating improvisation.",
    "strengths": [
      "expressive control of hands and body",
      "responsive ensemble timing",
      "inventive movement variation"
    ],
    "shadows": [
      "virtuosity can overshadow the feeling behind a gesture",
      "an improvised performance can lose its shared rhythm"
    ],
    "contradiction": "Uses disciplined physical vocabulary to make spontaneity visible.",
    "visualMotifs": [
      "fingers tracing quick patterns in the air",
      "a dancer's silhouette gathering momentum",
      "musicians and dancers answering each other's tempo"
    ],
    "voicePatterns": [
      "expresses emotional changes through physical metaphors",
      "builds a description from a small motion to a larger one"
    ],
    "storyEngines": [
      "a performer must improvise when the music changes unexpectedly",
      "a family celebration exposes an old rivalry through dance",
      "a quiet apprentice finds a movement no teacher expected"
    ],
    "evolutionTriggers": [
      "replaces showmanship with genuine communication",
      "makes room for a less experienced dancer",
      "learns when to hold still instead of adding another flourish"
    ],
    "tags": [
      "Uzbekistan",
      "Khorazm",
      "Lazgi",
      "dance",
      "gesture",
      "improvisation",
      "movement",
      "ensemble"
    ]
  },
  // Research: https://ich.unesco.org/en/Decisions/4.COM/13.74
  {
    "id": "uruguay-candombe-drum-calls",
    "name": "Uruguayan Candombe Drum Calls",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "An Afro-Uruguayan neighborhood drum-call practice in which interlocking rhythms, street processions and communal memory express both distinct local identities and solidarity.",
    "strengths": [
      "layered call-and-response listening",
      "intergenerational rhythm transmission",
      "building belonging through shared public performance"
    ],
    "shadows": [
      "neighborhood rivalry can become exclusion",
      "spectacle can eclipse the community that sustains it"
    ],
    "contradiction": "Many independent drum parts make one procession without erasing the identity of each neighborhood.",
    "visualMotifs": [
      "drums warmed near a communal fire",
      "rows of drummers moving through a street",
      "neighbors listening from balconies at dusk"
    ],
    "voicePatterns": [
      "answers one rhythmic phrase with a complementary one",
      "names places and relationships before discussing performance"
    ],
    "storyEngines": [
      "two neighborhood groups must share a parade route",
      "a young drummer learns why a familiar pattern carries family history",
      "a public celebration must resist being reduced to a commercial show"
    ],
    "evolutionTriggers": [
      "invites a rival group into a shared rhythm",
      "learns the history behind a favored drum call",
      "protects community participation over personal acclaim"
    ],
    "tags": [
      "Uruguay",
      "Montevideo",
      "Afro-Uruguayan",
      "Candombe",
      "drumming",
      "call-and-response",
      "neighborhood",
      "community-memory"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/sankirtana-ritual-singing-drumming-and-dancing-of-manipur-00843
  {
    "id": "manipur-sankirtana-performance",
    "name": "Manipuri Sankirtana",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "A Vaishnava performance tradition of Manipur weaving drumming, sung narration and dance into communal observances and life-cycle ceremonies.",
    "strengths": [
      "integrating multiple performance disciplines",
      "devotional ensemble coordination",
      "mentor-to-disciple transmission"
    ],
    "shadows": [
      "ritual precision can become inflexible",
      "performers may confuse public devotion with private certainty"
    ],
    "contradiction": "Creates intense collective feeling through carefully coordinated individual responsibilities.",
    "visualMotifs": [
      "a circle of seated listeners around singer-dancers",
      "paired drummers marking a changing pulse",
      "courtyard light before a communal ceremony"
    ],
    "voicePatterns": [
      "narrates through measured repetition and shared response",
      "frames a personal event within a larger community story"
    ],
    "storyEngines": [
      "a ceremony brings estranged relatives into the same courtyard",
      "an apprentice must learn to listen before leading",
      "a performer discovers a new meaning in an inherited narrative"
    ],
    "evolutionTriggers": [
      "honors the community while admitting a personal doubt",
      "lets an apprentice lead a passage",
      "prioritizes participation over flawless execution"
    ],
    "tags": [
      "India",
      "Manipur",
      "Sankirtana",
      "Vaishnava",
      "drumming",
      "dance",
      "sung-narration",
      "ritual-performance"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/iraqi-maqam-00076
  {
    "id": "iraqi-maqam-classical-performance",
    "name": "Iraqi Maqam",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "An Iraqi classical vocal tradition where poetic repertoire, melodic modes and improvised singing unfold in dialogue with an instrumental ensemble.",
    "strengths": [
      "poetic musical interpretation",
      "sustained melodic attention",
      "responsive singer-ensemble interplay"
    ],
    "shadows": [
      "mastery of an inherited form can discourage experimentation",
      "a celebrated soloist can overlook the supporting musicians"
    ],
    "contradiction": "Finds new emotional turns inside a form held together by long-standing conventions.",
    "visualMotifs": [
      "a santur beside a bowed jawzah",
      "a singer framed by a small coffeehouse gathering",
      "a handwritten poem marked for a performance"
    ],
    "voicePatterns": [
      "returns to a poetic line with changed emotional emphasis",
      "allows pauses and accompaniment to complete a thought"
    ],
    "storyEngines": [
      "a singer must rebuild an ensemble after displacement",
      "a familiar poem becomes a message between generations",
      "an improvised phrase unexpectedly reveals a private grief"
    ],
    "evolutionTriggers": [
      "shares the spotlight with the ensemble",
      "learns from a younger interpreter without abandoning tradition",
      "chooses a quieter setting where the music can be heard"
    ],
    "tags": [
      "Iraq",
      "Iraqi-Maqam",
      "classical-music",
      "Arabic-poetry",
      "vocal-improvisation",
      "santur",
      "ensemble",
      "transmission"
    ]
  },
  // Research: https://ich.unesco.org/en/projects/safeguarding-of-vanuatu-sand-drawings-00022
  {
    "id": "vanuatu-sand-drawing-knowledge",
    "name": "Vanuatu Sand Drawing Knowledge",
    "era": "movement",
    "domain": "design",
    "sourceType": "tradition",
    "essence": "A Vanuatu practice of tracing continuous geometric paths in sand, ash or clay to carry stories, communication and shared knowledge across language communities.",
    "strengths": [
      "single-line spatial reasoning",
      "memory carried through gesture",
      "patient intergenerational teaching"
    ],
    "shadows": [
      "a beautiful pattern can be mistaken for decoration without its context",
      "a keeper of knowledge may struggle to explain what must be learned by doing"
    ],
    "contradiction": "Makes fleeting marks that can carry enduring cultural knowledge.",
    "visualMotifs": [
      "one unbroken finger path across fine sand",
      "interlocking symmetrical paths",
      "a drawing gently erased by wind"
    ],
    "voicePatterns": [
      "describes a route as a sequence of turns and returns",
      "teaches by asking a listener to retrace a pattern"
    ],
    "storyEngines": [
      "an apprentice discovers a missing turn changes a message",
      "a community chooses which drawings may be shared publicly",
      "a washed-away drawing survives through a student's memory"
    ],
    "evolutionTriggers": [
      "asks permission before adapting inherited symbols",
      "learns to explain the story behind a pattern",
      "passes a technique on without claiming ownership"
    ],
    "tags": [
      "Vanuatu",
      "Melanesia",
      "sand-drawing",
      "single-line-geometry",
      "oral-knowledge",
      "gesture",
      "transmission"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/gadaa-system-01164
  {
    "id": "oromo-gadaa-rotational-governance",
    "name": "Oromo Gadaa Rotational Governance",
    "era": "movement",
    "domain": "leadership",
    "sourceType": "tradition",
    "essence": "An Oromo system of age-grade civic responsibility, deliberation and rotating leadership that joins law, social cohesion and education.",
    "strengths": [
      "long-horizon civic planning",
      "conflict mediation",
      "preparing successors for responsibility"
    ],
    "shadows": [
      "formal grades can exclude voices from authority",
      "ritualized procedure can delay urgent action"
    ],
    "contradiction": "Protects continuity by regularly transferring power rather than keeping it.",
    "visualMotifs": [
      "a council gathered beneath a broad sycamore",
      "successive circles of learners and elders",
      "a staff handed between leaders"
    ],
    "voicePatterns": [
      "asks who must be consulted before a decision",
      "frames a dispute in terms of repair and future obligations"
    ],
    "storyEngines": [
      "a leader must relinquish office during a crisis",
      "a younger generation challenges an inherited rule",
      "a mediation restores trust without erasing harm"
    ],
    "evolutionTriggers": [
      "widens participation beyond established gatekeepers",
      "trains a successor who disagrees",
      "chooses repair over prestige"
    ],
    "tags": [
      "Ethiopia",
      "Oromo",
      "Gadaa",
      "Gada",
      "governance",
      "rotation",
      "mediation",
      "civic-education"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/ca-tru-singing-00309
  {
    "id": "vietnamese-ca-tru-sung-poetry",
    "name": "Vietnamese Ca Trù Sung Poetry",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "Northern Vietnamese sung poetry built around ornamented vocal lines, rhythmic clappers, lute accompaniment and a responsive praise drum.",
    "strengths": [
      "precise poetic timing",
      "attentive trio collaboration",
      "vocal ornament with expressive restraint"
    ],
    "shadows": [
      "technical perfection can overshadow the poem",
      "a fragile chain of teaching can narrow experimentation"
    ],
    "contradiction": "A highly disciplined form leaves room for subtle, individual emotional inflection.",
    "visualMotifs": [
      "wooden clappers resting beside a poem",
      "a three-stringed lute in a small chamber",
      "a drum marking an approving accent"
    ],
    "voicePatterns": [
      "places a long pause before a crucial word",
      "uses small rhythmic shifts rather than grand declarations"
    ],
    "storyEngines": [
      "a young singer restores a forgotten verse with an elder",
      "an accompanist's unexpected beat changes the room",
      "a contest tests whether virtuosity serves meaning"
    ],
    "evolutionTriggers": [
      "listens as closely as they sing",
      "learns an older melody before reshaping it",
      "values the ensemble over personal applause"
    ],
    "tags": [
      "Viet-Nam",
      "Vietnam",
      "ca-tru",
      "sung-poetry",
      "lute",
      "clappers",
      "ensemble",
      "oral-transmission"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/lakalaka-dances-and-sung-speeches-of-tonga-00072
  {
    "id": "tongan-lakalaka-sung-oratory",
    "name": "Tongan Lakalaka Sung Oratory",
    "era": "19th-century",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "A Tongan communal performance uniting choreographed gesture, sung speeches and polyphony under a poet-composer-choreographer.",
    "strengths": [
      "large-ensemble coordination",
      "poetry shaped for public memory",
      "renewing repertoire for communal occasions"
    ],
    "shadows": [
      "ceremonial expectations can limit experimentation",
      "a director may overlook quieter contributors"
    ],
    "contradiction": "Hundreds move together while every gesture must still communicate meaning.",
    "visualMotifs": [
      "long aligned rows of performers",
      "precise hands rising in parallel",
      "a chorus supporting measured steps"
    ],
    "voicePatterns": [
      "weaves public history into rhythmic address",
      "builds a phrase for a chorus rather than a solo"
    ],
    "storyEngines": [
      "a new punake must compose for a divided community",
      "a missed gesture reveals an unspoken disagreement",
      "a celebration becomes an opportunity to reinterpret history"
    ],
    "evolutionTriggers": [
      "invites younger performers to shape a verse",
      "makes room for dissent within ceremony",
      "chooses a meaningful new composition over a safe repeat"
    ],
    "tags": [
      "Tonga",
      "Pacific",
      "lakalaka",
      "punake",
      "polyphony",
      "choreography",
      "oratory",
      "community"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/kankurang-manding-initiatory-rite-00143
  {
    "id": "manding-kankurang-community-guardianship",
    "name": "Manding Kankurang Community Guardianship",
    "era": "movement",
    "domain": "myth-folklore",
    "sourceType": "tradition",
    "essence": "A Senegalese and Gambian Manding initiatory tradition in which communal procession, teaching and a masked guardian express responsibilities of order and protection.",
    "strengths": [
      "collective accountability",
      "intergenerational teaching",
      "careful stewardship of communal boundaries"
    ],
    "shadows": [
      "authority can harden into intimidation",
      "outsiders may reduce a living rite to spectacle"
    ],
    "contradiction": "A figure associated with fear and discipline also represents community protection and learning.",
    "visualMotifs": [
      "red plant fibres moving in procession",
      "a forest path leading toward a gathering",
      "drum rhythms heard beyond a village square"
    ],
    "voicePatterns": [
      "speaks about duty through communal rather than individual stakes",
      "lets silence and collective response carry authority"
    ],
    "storyEngines": [
      "a guardian must decide when tradition protects and when it excludes",
      "urban change threatens a teaching place",
      "an apprentice learns that power demands restraint"
    ],
    "evolutionTriggers": [
      "respects knowledge not meant for public retelling",
      "protects people without relying on fear",
      "finds a community-approved way to transmit values"
    ],
    "tags": [
      "Senegal",
      "Gambia",
      "Manding",
      "Kankurang",
      "initiation",
      "community-guardianship",
      "ritual",
      "intergenerational-learning"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/hiragasy-a-performing-art-of-the-central-highlands-of-madagascar-01740
  {
    "id": "malagasy-hiragasy-public-theatre",
    "name": "Malagasy Hiragasy Public Theatre",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "A Central Highland Malagasy public performance of speeches, songs, dance and storytelling in which troupes share civic lessons and social critique.",
    "strengths": [
      "public-facing storytelling",
      "collaborative improvisation",
      "turning social tensions into accessible theatre"
    ],
    "shadows": [
      "competition between troupes can overshadow shared purpose",
      "a moral message can become preachy"
    ],
    "contradiction": "Uses entertaining spectacle to invite serious reflection on everyday obligations.",
    "visualMotifs": [
      "two troupes facing a circle of listeners",
      "drummers opening an outdoor performance",
      "bright costumes crossing a village square"
    ],
    "voicePatterns": [
      "alternates greeting, story and direct civic address",
      "makes a difficult truth approachable through a staged example"
    ],
    "storyEngines": [
      "rival troupes must perform together after a disaster",
      "a comic scene exposes a local injustice",
      "a touring child must choose between inheritance and a new path"
    ],
    "evolutionTriggers": [
      "allows the audience to challenge the lesson",
      "reconciles competing performers",
      "reshapes a story around a community's actual needs"
    ],
    "tags": [
      "Madagascar",
      "Central-Highlands",
      "Hiragasy",
      "public-theatre",
      "civic-storytelling",
      "troupe",
      "song",
      "dance"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/tahtib-01189
  {
    "id": "egyptian-tahteeb-noncontact-duel",
    "name": "Egyptian Tahteeb Non-Contact Stick Game",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "An Upper Egyptian festive stick game descended from martial practice, emphasizing controlled non-contact exchange, respect and public composure.",
    "strengths": [
      "precise restraint under pressure",
      "reading an opponent's intention",
      "ritualized courage without harm"
    ],
    "shadows": [
      "public pride can turn play into rivalry",
      "a skilled performer may confuse dominance with respect"
    ],
    "contradiction": "Demonstrates fighting skill by choosing not to strike.",
    "visualMotifs": [
      "two long sticks crossing without contact",
      "a circle of attentive spectators",
      "measured footwork accompanied by folk music"
    ],
    "voicePatterns": [
      "invites a challenge without an insult",
      "praises a rival's control instead of boasting of victory"
    ],
    "storyEngines": [
      "a reckless challenger must learn to stop short",
      "a village contest repairs an old feud",
      "an elder teaches a young rival that restraint is strength"
    ],
    "evolutionTriggers": [
      "abandons a winning move to protect a partner",
      "accepts a graceful draw",
      "teaches safety before technique"
    ],
    "tags": [
      "Egypt",
      "Upper-Egypt",
      "Tahteeb",
      "Tahtib",
      "noncontact",
      "stick-game",
      "restraint",
      "folk-performance"
    ]
  },
  // Research: https://wmo.int/media/news/celebrating-pioneer-indian-meteorologist-anna-mani
  {
    "id": "anna-mani-weather-instrumentation",
    "name": "Anna Mani",
    "era": "mid-century",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "An Indian meteorologist whose careful instrument design, calibration and observation helped make weather measurements dependable and locally producible.",
    "strengths": [
      "meticulous calibration",
      "practical engineering leadership",
      "turning observations into public-useful data"
    ],
    "shadows": [
      "perfectionism can slow a team",
      "faith in measurement can overlook human communication needs"
    ],
    "contradiction": "Studies unpredictable skies by insisting on the reliability of the smallest instrument.",
    "visualMotifs": [
      "a row of calibrated rain gauges",
      "a weather balloon against morning clouds",
      "hand-annotated solar radiation charts"
    ],
    "voicePatterns": [
      "distinguishes a measurement from an assumption",
      "asks how an instrument was tested before trusting a result"
    ],
    "storyEngines": [
      "faulty instruments threaten a monsoon warning",
      "a remote station must improvise a reliable sensor",
      "a team argues over data until calibration reveals the truth"
    ],
    "evolutionTriggers": [
      "delegates responsibility without sacrificing rigor",
      "explains uncertainty to a vulnerable community",
      "recognizes when an imperfect but transparent warning saves lives"
    ],
    "tags": [
      "India",
      "Anna-Modayil-Mani",
      "meteorology",
      "instrumentation",
      "calibration",
      "solar-radiation",
      "ozone",
      "public-science"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/oral-and-graphic-expressions-of-the-wajapi-00049
  {
    "id": "wajapi-kusiwa-oral-graphic-expressions",
    "name": "Wajãpi Kusiwa Oral and Graphic Expressions",
    "era": "movement",
    "domain": "visual-art",
    "sourceType": "tradition",
    "essence": "An Amazonian Wajãpi system joining geometric body and object designs with oral knowledge, practiced through patient skill and community transmission.",
    "strengths": [
      "connects visible patterns to shared knowledge",
      "patient apprenticeship and material precision",
      "sees design as communication rather than ornament alone"
    ],
    "shadows": [
      "a fictional keeper may guard knowledge too tightly",
      "the pressure to preserve a form can make experimentation feel risky"
    ],
    "contradiction": "A mark can communicate across a community yet cannot carry its full meaning without the people who explain it.",
    "visualMotifs": [
      "red roucou pigment and prepared resin",
      "interlocking geometric lines on crafted surfaces",
      "a hand tracing a pattern before speaking"
    ],
    "voicePatterns": [
      "asks who taught a mark and what context gives it meaning",
      "pairs a short visual description with a longer oral explanation"
    ],
    "storyEngines": [
      "an apprentice must learn why a pattern cannot be detached from its story",
      "a commercial imitation forces a community to decide what to share",
      "an elder and a younger maker negotiate the terms of transmission"
    ],
    "evolutionTriggers": [
      "chooses consent and context over public acclaim",
      "learns to explain a boundary without closing every door",
      "recognizes a new apprentice as a responsible steward"
    ],
    "tags": [
      "Brazil",
      "Amapa",
      "Wajapi",
      "Wajãpi",
      "Kusiwa",
      "Amazonia",
      "graphic-oral-knowledge",
      "body-painting",
      "community-authorship"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/mask-dance-of-the-drums-from-drametse-00161
  {
    "id": "bhutan-drametse-ngacham-mask-drums",
    "name": "Drametse Ngacham Mask Dance and Drums",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "A Bhutanese monastery-rooted masked drum dance moving between contemplative and forceful energies in a collective sacred performance.",
    "strengths": [
      "precise ensemble timing",
      "embodied transitions between stillness and intensity",
      "disciplined preparation for a shared performance"
    ],
    "shadows": [
      "a fictional performer may mistake rigid perfection for devotion",
      "public acclaim may distract from communal purpose"
    ],
    "contradiction": "A powerful masked figure must cultivate quiet attentiveness before the drumbeat accelerates.",
    "visualMotifs": [
      "wooden animal and mythical masks",
      "bright layered dance costumes",
      "hand drums in a monastery courtyard"
    ],
    "voicePatterns": [
      "speaks in measured beats and deliberate pauses",
      "distinguishes spectacle from the meaning of a ritual"
    ],
    "storyEngines": [
      "a young drummer inherits a demanding role at short notice",
      "a troupe must preserve rehearsal time against competing demands",
      "an outsider learns to ask before treating a sacred dance as entertainment"
    ],
    "evolutionTriggers": [
      "relinquishes the need to be the most visible performer",
      "balances technique with responsibility to the community",
      "mentors someone who approaches the dance differently"
    ],
    "tags": [
      "Bhutan",
      "Drametse",
      "Ngacham",
      "mask-dance",
      "drums",
      "sacred-performance",
      "ensemble",
      "apprenticeship"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/polyphonic-singing-of-the-aka-pygmies-of-central-africa-00082
  {
    "id": "aka-central-african-polyphonic-singing",
    "name": "Aka Polyphonic Singing of Central Africa",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "A Central African Aka oral singing tradition of interlocking vocal lines and collective participation, entwined with community life and knowledge.",
    "strengths": [
      "hears several independent parts at once",
      "responsive collaboration without a single dominant voice",
      "transmits memory through participation"
    ],
    "shadows": [
      "a fictional ensemble leader may resist necessary change",
      "group harmony can mask unresolved individual needs"
    ],
    "contradiction": "Distinct voices become stronger through mutual listening rather than being made identical.",
    "visualMotifs": [
      "overlapping sound-wave ribbons",
      "clapping hands in a communal circle",
      "multiple paths converging without merging"
    ],
    "voicePatterns": [
      "answers a statement by adding a complementary line",
      "invites participation instead of giving a solo lecture"
    ],
    "storyEngines": [
      "a disrupted gathering must rebuild its interlocking parts",
      "a child hears a missing melody that changes an elder's memory",
      "an ensemble navigates pressure to perform out of context"
    ],
    "evolutionTriggers": [
      "protects communal consent in a public performance",
      "makes room for a new voice without erasing older knowledge",
      "learns when silence is as important as joining in"
    ],
    "tags": [
      "Central-African-Republic",
      "Aka",
      "BaAka",
      "polyphony",
      "oral-transmission",
      "ensemble-listening",
      "community-music"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/cultural-space-of-sosso-bala-00009
  {
    "id": "guinea-sosso-bala-cultural-space",
    "name": "Sosso-Bala Cultural Space of Niagassola",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "A Guinean Manding heritage centered on a guarded balafon, ceremonial performance, lineage memory, and intergenerational teaching.",
    "strengths": [
      "treats stewardship as a responsibility",
      "maintains precision in instrument craft and performance",
      "connects music with historical continuity"
    ],
    "shadows": [
      "a fictional custodian may confuse protection with ownership",
      "a succession dispute can turn reverence into suspicion"
    ],
    "contradiction": "A sound held in trust for generations must still find a path to the next learner.",
    "visualMotifs": [
      "wooden balafon keys over gourd resonators",
      "a shaded courtyard near an earthen building",
      "carefully wrapped instrument and ceremonial cloth"
    ],
    "voicePatterns": [
      "asks what obligations come with access",
      "speaks in remembered episodes rather than grand claims"
    ],
    "storyEngines": [
      "a custodian must choose how to teach when apprentices leave",
      "a disputed inheritance tests who can safeguard an instrument",
      "a ceremony requires reconciliation between generations"
    ],
    "evolutionTriggers": [
      "shares technique without surrendering community authority",
      "learns to separate personal pride from custodianship",
      "finds a successor through trust rather than status"
    ],
    "tags": [
      "Guinea",
      "Niagassola",
      "Nyagassola",
      "Sosso-Bala",
      "Sosso-Bala-balafon",
      "Manding",
      "Kouyate",
      "heritage-stewardship"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/chapei-dang-veng-01165
  {
    "id": "cambodia-chapei-dang-veng",
    "name": "Cambodian Chapei Dang Veng Story-Song",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "Cambodian lute-accompanied sung storytelling combining improvised wit, social commentary, moral reflection, and oral teaching.",
    "strengths": [
      "quick improvisation grounded in listening",
      "communicates criticism through playful storytelling",
      "bridges generations with memorable narratives"
    ],
    "shadows": [
      "a fictional satirist may hide a personal apology behind cleverness",
      "the urge to win an audience can overwhelm the lesson"
    ],
    "contradiction": "A light, witty performance can carry the weight of difficult collective memory.",
    "visualMotifs": [
      "long-necked chapei lute",
      "a single seated performer facing a circle",
      "handwritten story fragments beside instrument strings"
    ],
    "voicePatterns": [
      "sets up a moral dilemma before delivering a wry turn",
      "asks listeners to complete a story's implication"
    ],
    "storyEngines": [
      "a young apprentice must improvise when a teacher cannot perform",
      "a satirical verse sparks a dispute that demands tact",
      "an archive of songs becomes a bridge after interrupted transmission"
    ],
    "evolutionTriggers": [
      "uses wit to invite dialogue rather than humiliate",
      "passes a difficult repertoire to a younger performer",
      "admits that the audience knows something the singer missed"
    ],
    "tags": [
      "Cambodia",
      "Khmer",
      "Chapei-Dang-Veng",
      "Chapei",
      "Chapei-Dang-Veng-lute",
      "story-song",
      "improvisation",
      "social-commentary"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/moutya-01690
  {
    "id": "seychelles-moutya-dance",
    "name": "Seychellois Moutya Dance and Call-Response",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "A Seychellois dance and drumming tradition rooted in enslaved Africans' resistance and solidarity, sustained through social gathering and call-and-response.",
    "strengths": [
      "turns shared hardship into collective expression",
      "responds rapidly to changing group rhythms",
      "builds courage through social participation"
    ],
    "shadows": [
      "a fictional organizer may make every gathering carry a political burden",
      "performance energy may postpone necessary private grief"
    ],
    "contradiction": "A dance that brings people joy also holds a history of coercion and resistance.",
    "visualMotifs": [
      "drum warmed beside a bonfire",
      "shuffling steps across earth",
      "paired dancers approaching without touching"
    ],
    "voicePatterns": [
      "trades observations in short call-and-response phrases",
      "uses grounded humor to raise a difficult communal issue"
    ],
    "storyEngines": [
      "a community debates how to present a tradition to visitors",
      "a dance gathering surfaces a long-suppressed family history",
      "a younger drummer learns why the fire matters"
    ],
    "evolutionTriggers": [
      "honors historical context while welcoming new participants",
      "lets someone grieve without requiring performance",
      "builds a gathering shaped by community choice"
    ],
    "tags": [
      "Seychelles",
      "Seychellois",
      "Moutya",
      "Afro-Seychellois",
      "call-and-response",
      "dance",
      "drumming",
      "resistance-memory"
    ]
  },
  // Research: https://www.treccani.it/enciclopedia/abu-r-raihan-muhammad-ibn-ahmad-al-biruni_%28Enciclopedia-Italiana%29/
  {
    "id": "al-biruni-cross-cultural-science",
    "name": "Al-Biruni",
    "era": "medieval",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "A Khwarazmian polymath who combined mathematical observation, geography, astronomy, and sustained study of other intellectual traditions.",
    "strengths": [
      "tests claims against observation",
      "learns across linguistic and cultural boundaries",
      "joins mathematical precision to broad curiosity"
    ],
    "shadows": [
      "a fictional researcher may prize exhaustive comparison over urgent action",
      "intellectual distance can be mistaken for indifference"
    ],
    "contradiction": "Measures the world with exacting tools while recognizing that another culture cannot be reduced to numbers.",
    "visualMotifs": [
      "astronomical measuring rings",
      "geographic diagrams and annotated manuscripts",
      "a horizon traced against a star chart"
    ],
    "voicePatterns": [
      "distinguishes firsthand observation from received reports",
      "compares competing explanations before declaring a conclusion"
    ],
    "storyEngines": [
      "a disputed map reveals a flawed assumption",
      "a translator and astronomer challenge each other's categories",
      "a court patron demands certainty where the evidence remains incomplete"
    ],
    "evolutionTriggers": [
      "lets local expertise overturn a favored model",
      "publishes an uncertainty instead of a convenient answer",
      "chooses patient collaboration over solitary authority"
    ],
    "tags": [
      "Al-Biruni",
      "Abu-Rayhan-al-Biruni",
      "Khwarazm",
      "Central-Asia",
      "astronomy",
      "geography",
      "comparative-scholarship",
      "mathematics"
    ]
  },
  // Research: https://plato.stanford.edu/entries/han-dynasty/
  {
    "id": "ban-zhao-han-historian",
    "name": "Ban Zhao",
    "era": "classical",
    "domain": "literature",
    "sourceType": "historical-person",
    "essence": "A Han-dynasty Chinese historian, writer, and court educator who helped complete a dynastic history while navigating the expectations of her time.",
    "strengths": [
      "careful archival synthesis",
      "teaches difficult material with patience",
      "understands the consequences of how history is recorded"
    ],
    "shadows": [
      "a fictional chronicler may internalize restrictive social norms",
      "loyalty to an institution can limit candid critique"
    ],
    "contradiction": "A woman who gained unusual scholarly authority also articulated norms that constrained women's roles.",
    "visualMotifs": [
      "bamboo slips and carefully ordered records",
      "inked genealogical tables",
      "a lamp illuminating an unfinished chronicle"
    ],
    "voicePatterns": [
      "distinguishes a documented event from a courtly interpretation",
      "poses questions about whose account survives"
    ],
    "storyEngines": [
      "an unfinished history must be completed after a political purge",
      "a court pupil discovers conflicting archival accounts",
      "a teacher weighs candor against institutional risk"
    ],
    "evolutionTriggers": [
      "acknowledges whose testimony the official record omits",
      "teaches a student to question an inherited rule",
      "preserves evidence even when it complicates a patron's story"
    ],
    "tags": [
      "China",
      "Han-dynasty",
      "Ban-Zhao",
      "Pan-Chao",
      "Cao-Dagu",
      "Han-Shu",
      "historian",
      "court-education",
      "archival-memory"
    ]
  },
  // Research: https://ich.unesco.org/en/USL/naqqli-iranian-dramatic-story-telling-00535
  {
    "id": "iran-naqqali-dramatic-storytelling",
    "name": "Naqqāli Iranian Dramatic Storytelling",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "Iranian dramatic narration of epics and folk histories through remembered verse, gesture, improvisation, and sometimes painted scrolls.",
    "strengths": [
      "sustains a long narrative through memory and improvisation",
      "translates conflict into vivid gesture",
      "adapts a story to different audiences"
    ],
    "shadows": [
      "a fictional narrator may mistake theatrical certainty for historical truth",
      "fear of losing an audience can turn grief into spectacle"
    ],
    "contradiction": "A keeper of collective memory must reinvent each telling without claiming ownership of the past.",
    "visualMotifs": [
      "painted epic scroll beside a tea-house wall",
      "a plain robe with a single theatrical helmet",
      "an outstretched hand freezing a battle scene"
    ],
    "voicePatterns": [
      "shifts between narrator and character without impersonating real performers",
      "uses a measured pause before revealing the stakes"
    ],
    "storyEngines": [
      "a storyteller must reconcile rival accounts of an old battle",
      "an apprentice inherits a repertoire without its missing ending",
      "a performance exposes a local injustice while preserving audience trust"
    ],
    "evolutionTriggers": [
      "credits the people whose accounts were omitted",
      "teaches an apprentice to question the heroic version",
      "lets silence carry a loss instead of dramatizing it"
    ],
    "tags": [
      "Iran",
      "Persia",
      "Naqqali",
      "Naqqāl",
      "Naghali",
      "dramatic-storytelling",
      "epic-memory",
      "improvisation"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/al-taghrooda-traditional-bedouin-chanted-poetry-in-the-united-arab-emirates-and-the-sultanate-of-oman-00744
  {
    "id": "oman-uae-al-taghrooda-chanted-poetry",
    "name": "Al-Taghrooda Bedouin Chanted Poetry",
    "era": "movement",
    "domain": "literature",
    "sourceType": "tradition",
    "essence": "Short, often antiphonal Bedouin verses from Oman and the UAE, used for social connection, travel, remembrance, and dispute resolution.",
    "strengths": [
      "communicates meaning in compressed verse",
      "builds trust through responsive exchange",
      "finds common ground during a journey"
    ],
    "shadows": [
      "a fictional mediator may reduce a complex disagreement to a neat rhyme",
      "group loyalty may silence an unpopular voice"
    ],
    "contradiction": "Brief lines exchanged in motion can carry obligations that last for generations.",
    "visualMotifs": [
      "two travelling groups separated by desert light",
      "a circle beside a night campfire",
      "a rhythm marked by steady footsteps"
    ],
    "voicePatterns": [
      "offers a concise verse and waits for an answer",
      "frames a disagreement through a shared image rather than accusation"
    ],
    "storyEngines": [
      "two caravans trade verses to resolve a contested route",
      "a message to an absent relative changes meaning in transit",
      "a young poet must answer a verse that nobody expects"
    ],
    "evolutionTriggers": [
      "invites a rival to compose the response",
      "abandons a clever line to preserve a friendship",
      "learns when a conflict requires action beyond words"
    ],
    "tags": [
      "Oman",
      "United-Arab-Emirates",
      "Bedouin",
      "Al-Taghrooda",
      "Al-Taghruda",
      "antiphonal-poetry",
      "oral-diplomacy",
      "desert-travel"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/maloya-00249
  {
    "id": "reunion-maloya-music",
    "name": "Réunion Maloya Music and Dance",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "Réunion Island call-and-response music and dance with roots in enslaved Malagasy and African communities, carrying remembrance, protest, and evolving fusion.",
    "strengths": [
      "turns individual feeling into communal response",
      "integrates old and new instruments thoughtfully",
      "sustains belonging through participatory rhythm"
    ],
    "shadows": [
      "a fictional bandleader may market collective memory as novelty",
      "public defiance can conceal private exhaustion"
    ],
    "contradiction": "A form shaped by oppression now carries celebration and experimentation without losing its history.",
    "visualMotifs": [
      "hand percussion arranged before a gathering",
      "sugarcane shadows beside a performance space",
      "a chorus joining a lone singer"
    ],
    "voicePatterns": [
      "leaves room for a communal refrain",
      "alternates a personal observation with a collective reply"
    ],
    "storyEngines": [
      "a festival ensemble debates a new electronic arrangement",
      "a family archive complicates a celebratory performance",
      "a young singer must credit the elders who kept a repertoire alive"
    ],
    "evolutionTriggers": [
      "shares authorship with the chorus",
      "preserves context while embracing a new sound",
      "listens to a dissenting elder without abandoning experimentation"
    ],
    "tags": [
      "Reunion",
      "Réunion",
      "Indian-Ocean",
      "Maloya",
      "Malagasy-diaspora",
      "call-and-response",
      "percussion",
      "resistance-memory"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/bakhshi-art-01706
  {
    "id": "uzbek-karakalpak-bakhshi-epic-art",
    "name": "Uzbek and Karakalpak Bakhshi Epic Art",
    "era": "movement",
    "domain": "literature",
    "sourceType": "tradition",
    "essence": "Epic storytelling of Uzbek and Karakalpak dostons, performed from memory with instruments and inventive verbal play.",
    "strengths": [
      "holds elaborate story arcs in memory",
      "improvises language while respecting inherited narratives",
      "welcomes guests through shared performance"
    ],
    "shadows": [
      "a fictional virtuoso may prioritize applause over fidelity to context",
      "mastery can become gatekeeping of younger performers"
    ],
    "contradiction": "An inherited epic survives because each generation changes how it is heard.",
    "visualMotifs": [
      "dombra strings beside a folded story cloth",
      "a courtyard gathering of listeners",
      "an apprentice marking narrative turns on paper"
    ],
    "voicePatterns": [
      "layers proverb and playful word choice into a scene",
      "checks whether listeners follow before raising the stakes"
    ],
    "storyEngines": [
      "a singer must rebuild a missing section of a family epic",
      "two apprentices dispute the moral of a familiar hero",
      "a new audience asks for a story that the master refuses to change"
    ],
    "evolutionTriggers": [
      "lets an apprentice challenge an interpretation",
      "distinguishes creative improvisation from fabricated heritage",
      "uses a famous hero's failure to teach humility"
    ],
    "tags": [
      "Uzbekistan",
      "Karakalpak",
      "Uzbek",
      "Bakhshi",
      "Baxshi",
      "Doston",
      "Dastan",
      "epic-performance",
      "dombra",
      "kobuz"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/jultagi-tightrope-walking-00448
  {
    "id": "korea-jultagi-tightrope-dialogue",
    "name": "Korean Jultagi Tightrope Dialogue",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "Korean tightrope performance joining acrobatics, live music, mimicry, and humorous dialogue between a walker and ground-level partner.",
    "strengths": [
      "maintains balance while adapting to an audience",
      "turns tension into laughter without losing precision",
      "collaborates across very different roles"
    ],
    "shadows": [
      "a fictional performer may take dangerous risks for applause",
      "jokes can become a shield against admitting fear"
    ],
    "contradiction": "The star stands alone above the ground but cannot make the act work without those below.",
    "visualMotifs": [
      "taut rope above an outdoor crowd",
      "a clown looking upward mid-reply",
      "musicians cueing a difficult step"
    ],
    "voicePatterns": [
      "answers a risky claim with a grounded joke",
      "turns a physical misstep into a shared question"
    ],
    "storyEngines": [
      "a walker and partner must rebuild trust after a near fall",
      "a festival demands a harder finale than the troupe can safely perform",
      "an apprentice discovers the musicians control the pace"
    ],
    "evolutionTriggers": [
      "chooses safety over a spectacular trick",
      "publicly credits the ground partner",
      "asks for help before balance becomes impossible"
    ],
    "tags": [
      "Korea",
      "Republic-of-Korea",
      "Jultagi",
      "Jul-tagi",
      "tightrope",
      "acrobatics",
      "comic-dialogue",
      "ensemble-trust"
    ]
  },
  // Research: https://ich.unesco.org/en/USL/buklog-thanksgiving-ritual-system-of-the-subanen-01495
  {
    "id": "subanen-buklog-thanksgiving",
    "name": "Subanen Buklog Thanksgiving System",
    "era": "movement",
    "domain": "spirituality",
    "sourceType": "tradition",
    "essence": "A Subanen community thanksgiving system in the southern Philippines linking kinship, ecological respect, ritual leadership, and a resonant communal platform.",
    "strengths": [
      "organizes complex cooperation across households",
      "treats land and community relationships as reciprocal",
      "builds continuity through careful participation"
    ],
    "shadows": [
      "a fictional organizer may burden others with an ideal of perfect harmony",
      "public responsibility can overshadow personal consent"
    ],
    "contradiction": "A collective celebration can only endure when its custodians adapt without treating sacred knowledge as public property.",
    "visualMotifs": [
      "raised wooden platform above the gathering",
      "forest materials collected with care",
      "shared food before a communal dance"
    ],
    "voicePatterns": [
      "asks who has given permission before making plans",
      "speaks of responsibility in terms of relationships, not ownership"
    ],
    "storyEngines": [
      "a host must organize a gathering despite a damaged meeting place",
      "a family dispute threatens the cooperation needed for a ceremony",
      "an outsider offers funding with conditions the community must weigh"
    ],
    "evolutionTriggers": [
      "defers decisions to legitimate community custodians",
      "protects sacred boundaries while explaining public responsibilities",
      "finds a way for divided households to cooperate voluntarily"
    ],
    "tags": [
      "Philippines",
      "Mindanao",
      "Subanen",
      "Subanon",
      "Buklog",
      "thanksgiving-system",
      "ecological-reciprocity",
      "community-stewardship"
    ]
  },
  // Research: https://ich.unesco.org/en/USL/isukuti-dance-of-isukha-and-idakho-communities-of-western-kenya-00981
  {
    "id": "kenya-isukuti-dance",
    "name": "Isukha and Idakho Isukuti Dance",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "Fast, communal Kenyan drumming, singing, and dance marking life transitions and sustaining ties among Isukha and Idakho communities.",
    "strengths": [
      "coordinates layered rhythms across a group",
      "makes space for collective participation",
      "adapts a performance to occasions of joy or mourning"
    ],
    "shadows": [
      "a fictional leader may demand energy when people need quiet",
      "competition for attention can weaken ensemble listening"
    ],
    "contradiction": "An exhilarating public rhythm must be responsive to very different private emotions.",
    "visualMotifs": [
      "three differently sized drums",
      "a horn sounding above the drum pulse",
      "two rows of dancers meeting in a courtyard"
    ],
    "voicePatterns": [
      "calls a theme and listens for the rhythmic answer",
      "uses direct encouragement rather than ornate commands"
    ],
    "storyEngines": [
      "an aging drummer searches for a successor before a major gathering",
      "a community must improvise when instruments cannot be repaired",
      "a celebration is interrupted by news that changes the song's meaning"
    ],
    "evolutionTriggers": [
      "slows the rhythm for someone who needs care",
      "teaches a learner without humiliating mistakes",
      "prioritizes shared timing over solo virtuosity"
    ],
    "tags": [
      "Kenya",
      "Isukha",
      "Idakho",
      "Luhya",
      "Isukuti",
      "three-drums",
      "community-dance",
      "intergenerational-transmission"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/fichee-chambalaalla-new-year-festival-of-the-sidama-people-01054
  {
    "id": "sidama-fichee-chambalaalla-new-year",
    "name": "Sidama Fichee-Chambalaalla New Year",
    "era": "movement",
    "domain": "leadership",
    "sourceType": "tradition",
    "essence": "Sidama Ethiopian New Year observances emphasizing kinship visits, shared food, social reconciliation, ecological duties, and intergenerational teaching.",
    "strengths": [
      "organizes hospitality across generations",
      "turns annual renewal into concrete obligations",
      "links community ethics to environmental care"
    ],
    "shadows": [
      "a fictional elder may confuse consensus with unquestioning obedience",
      "ceremonial goodwill can conceal unresolved grievances"
    ],
    "contradiction": "A festival of renewal is meaningful only when relationships change after the songs end.",
    "visualMotifs": [
      "buurisame shared among neighbors",
      "children greeting doorways at the new year",
      "indigenous trees beyond a crowded gathering"
    ],
    "voicePatterns": [
      "begins a disagreement with a greeting and shared memory",
      "turns a moral principle into a practical promise"
    ],
    "storyEngines": [
      "a returned relative must make peace before the festival",
      "a village debate over tree cutting tests public commitments",
      "a younger organizer rethinks who receives the first invitation"
    ],
    "evolutionTriggers": [
      "makes restitution rather than offering only festive words",
      "welcomes a previously excluded neighbor",
      "keeps an ecological promise after the celebration"
    ],
    "tags": [
      "Ethiopia",
      "Sidama",
      "Fichee",
      "Chambalaalla",
      "Fichee-Chambalaalla",
      "new-year",
      "hospitality",
      "ecological-ethics"
    ]
  },
  // Research: https://www.nobelprize.org/prizes/physics/1979/salam/facts/
  {
    "id": "abdus-salam-electroweak-physics",
    "name": "Abdus Salam",
    "era": "mid-century",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "Pakistani theoretical physicist and 1979 Nobel laureate whose work helped unify the electromagnetic and weak interactions and who supported international scientific cooperation.",
    "strengths": [
      "seeks elegant connections between apparently separate phenomena",
      "builds institutions for scientific exchange",
      "persists through abstract problems with long horizons"
    ],
    "shadows": [
      "a fictional theorist may overvalue elegance before evidence",
      "ambition for unification may obscure a colleague's distinct contribution"
    ],
    "contradiction": "A search for universal laws unfolds amid unequal access to the institutions that study them.",
    "visualMotifs": [
      "intersecting particle-interaction diagrams",
      "chalk equations spanning two blackboards",
      "an international seminar table"
    ],
    "voicePatterns": [
      "asks whether two explanations can be tested under one model",
      "credits collaborators when describing a breakthrough"
    ],
    "storyEngines": [
      "a theory predicts an effect that the laboratory cannot yet detect",
      "a young scientist is denied access to a crucial research network",
      "two rivals must agree on an experiment that could disprove both"
    ],
    "evolutionTriggers": [
      "revises a beautiful model when evidence disagrees",
      "opens a lab's resources to an overlooked student",
      "publicly recognizes a collaborator's independent insight"
    ],
    "tags": [
      "Pakistan",
      "Abdus-Salam",
      "Mohammad-Abdus-Salam",
      "electroweak",
      "theoretical-physics",
      "Nobel-1979",
      "science-cooperation",
      "unification"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/ak-kalpak-craftsmanship-traditional-knowledge-and-skills-in-making-and-wearing-kyrgyz-men-s-headwear-01496
  {
    id: "ak-kalpak-craft", name: "Ak-kalpak Felt Headwear Craft", era: "movement", domain: "design", sourceType: "tradition",
    essence: "Kyrgyz felt hat-making unites skilled pattern work, apprenticeship, and symbols of lineage.",
    strengths: ["precise handwork","symbolic design","patient teaching"], shadows: ["protective traditionalism","mistakes ornament for belonging"],
    contradiction: "A maker preserves inherited forms while wanting each wearer to choose a new meaning.",
    visualMotifs: ["white felt peaks","dark stitched borders","four-part silhouette"], voicePatterns: ["explains patterns as stories","offers careful practical instruction"],
    storyEngines: ["a disputed pattern reveals a family secret","an apprentice invents a controversial variation"], evolutionTriggers: ["invites a newcomer to learn","accepts a motif with an unexpected meaning"], tags: ["Kyrgyzstan","felt","headwear","craft","lineage"]
  },
  // Research: https://ich.unesco.org/en/USL/ala-kiyiz-and-shyrdak-art-of-kyrgyz-traditional-felt-carpets-00693
  {
    id: "ala-kiyiz-shyrdak", name: "Ala-kiyiz and Shyrdak Felt Carpets", era: "movement", domain: "visual-art", sourceType: "tradition",
    essence: "Kyrgyz felt-carpet making turns collective labor and patterned wool into portable memory.",
    strengths: ["collaborative making","material ingenuity","pattern fluency"], shadows: ["fears losing expertise","can reject useful change"],
    contradiction: "A guardian of fragile knowledge must teach beyond familiar circles to keep it alive.",
    visualMotifs: ["contrasting felt spirals","layered wool","floor-wide geometric fields"], voicePatterns: ["thinks in paired shapes","speaks through process and texture"],
    storyEngines: ["a lost design must be reconstructed","a community divides over a modern commission"], evolutionTriggers: ["shares tools with an outsider","adapts a pattern without erasing its origin"], tags: ["Kyrgyzstan","felt","carpet","craft","heritage"]
  },
  // Research: https://ich.unesco.org/en/RL/askiya-the-art-of-wit-00971
  {
    id: "uzbek-askiya", name: "Uzbek Askiya Verbal Wit", era: "movement", domain: "comedy", sourceType: "tradition",
    essence: "Fast improvised verbal exchanges use humor to reveal daily contradictions and social tensions.",
    strengths: ["verbal agility","social observation","quick reasoning"], shadows: ["can embarrass the vulnerable","turns every concern into a contest"],
    contradiction: "A comic who exposes injustice must learn when listening matters more than winning.",
    visualMotifs: ["market gatherings","paired speakers","raised eyebrows"], voicePatterns: ["playful rebuttals","unexpected double meanings"],
    storyEngines: ["a public joke reveals a hidden abuse","rivals must collaborate on a shared performance"], evolutionTriggers: ["chooses kindness over the sharpest joke","lets a novice deliver the final line"], tags: ["Uzbekistan","wit","dialogue","improvisation","satire"]
  },
  // Research: https://ich.unesco.org/en/RL/aitysh-aitys-art-of-improvisation-00997
  {
    id: "aitysh-aitys", name: "Aitysh/Aitys Improvised Poetry Contest", era: "movement", domain: "music", sourceType: "tradition",
    essence: "Kazakh and Kyrgyz improvised verse duels combine instrumental rhythm, topical debate, and philosophical wit.",
    strengths: ["musical listening","instant composition","civic courage"], shadows: ["pride in victory","confuses applause with truth"],
    contradiction: "A rival poet can hear another person's pain clearly yet struggles to concede a point.",
    visualMotifs: ["dombra strings","komuz wood","facing performers"], voicePatterns: ["rhythmic retorts","questions shaped as sung verses"],
    storyEngines: ["an audience assigns a dangerous topic","a public contest becomes an unlikely alliance"], evolutionTriggers: ["praises an opponent sincerely","uses a verse to repair harm"], tags: ["Kazakhstan","Kyrgyzstan","poetry","music","debate"]
  },
  // Research: https://ich.unesco.org/en/RL/elechek-kyrgyz-female-headwear-traditional-knowledge-and-rituals-01985
  {
    id: "elechek-headwear", name: "Kyrgyz Elechek Wrapping Knowledge", era: "movement", domain: "design", sourceType: "tradition",
    essence: "Elechek wrapping and adornment connect women's intergenerational teaching, life transitions, and community belonging.",
    strengths: ["careful mentorship","ceremonial artistry","social memory"], shadows: ["may police belonging","fears unfamiliar rites"],
    contradiction: "A skilled elder honors continuity while a younger wearer asks to define her own transition.",
    visualMotifs: ["long white cloth folds","ribbons","embroidered details"], voicePatterns: ["offers blessings","teaches by demonstrating each fold"],
    storyEngines: ["a missing ceremonial cloth tests solidarity","a new wrapping workshop bridges generations"], evolutionTriggers: ["welcomes a different life path","shares knowledge outside the family"], tags: ["Kyrgyzstan","women","headwear","ceremony","mentorship"]
  },
  // Research: https://ich.unesco.org/en/RL/language-dance-and-music-of-the-garifuna-00001
  {
    id: "garifuna-language-dance-music", name: "Garifuna Language, Dance and Music", era: "movement", domain: "music", sourceType: "tradition",
    essence: "Across Central America's Caribbean coast, Garifuna song, dance, and oral narrative sustain shared memory through displacement and change.",
    strengths: ["cross-generational storytelling","rhythmic cooperation","linguistic resilience"], shadows: ["may overburden elders as custodians","can mistake preservation for immobility"],
    contradiction: "A guardian of communal memory must let a younger generation remake the gathering without losing its roots.",
    visualMotifs: ["coastal canoe silhouettes","hand drums","cassava gardens"], voicePatterns: ["call-and-response","stories that connect everyday work to history"],
    storyEngines: ["a lost family song reconnects distant communities","a festival organizer must reconcile tradition with migration"], evolutionTriggers: ["invites a new language learner to lead","accepts a changed performance as living heritage"],
    tags: ["Garifuna","Belize","Honduras","Guatemala","Nicaragua","language","dance","diaspora"]
  },
  // Research: https://ich.unesco.org/en/RL/xoan-singing-of-phu-tho-province-viet-nam-01260
  {
    id: "vietnamese-xoan-singing", name: "Xoan Singing of Phú Thọ", era: "movement", domain: "music", sourceType: "tradition",
    essence: "Vietnamese guild-based ceremonial singing weaves percussion, dance, ancestor remembrance, and community teaching into shared performance.",
    strengths: ["ensemble discipline","intergenerational teaching","ritual coordination"], shadows: ["can become rigid about repertoire","may confuse seniority with listening"],
    contradiction: "A guild leader safeguards old songs while discovering that their survival depends on new voices.",
    visualMotifs: ["wooden clappers","communal-house courtyards","paired dancers"], voicePatterns: ["measured alternation between singers","gentle instruction through repeated phrases"],
    storyEngines: ["a young singer restores a neglected guild","a ceremonial performance becomes a bridge between estranged neighbors"], evolutionTriggers: ["mentors someone outside the expected circle","learns a new arrangement from an apprentice"],
    tags: ["Vietnam","Phu Tho","Xoan","guild","ancestor-memory","singing"]
  },
  // Research: https://ich.unesco.org/en/RL/buddhist-chanting-of-ladakh-recitation-of-sacred-buddhist-texts-in-the-trans-himalayan-ladakh-region-jammu-and-kashmir-india-00839
  {
    id: "ladakh-buddhist-chanting", name: "Ladakh Buddhist Chanting Traditions", era: "movement", domain: "spirituality", sourceType: "tradition",
    essence: "Collective recitation, ritual gesture, and disciplined apprenticeship connect Himalayan monastic learning with communal reflection.",
    strengths: ["patient memorization","attentive group timing","contemplative focus"], shadows: ["can hide uncertainty behind ritual precision","may resist unfamiliar interpretations"],
    contradiction: "A meticulous chanter seeks inner stillness yet must remain responsive to a changing community.",
    visualMotifs: ["mountain monastery courtyards","hand bells","cymbals","ritual hand gestures"], voicePatterns: ["deliberate cadence","brief pauses before counsel"],
    storyEngines: ["an apprentice finds an error in a cherished recitation","a festival requires reconciliation between rival teachers"], evolutionTriggers: ["welcomes a difficult question","turns solitary discipline into practical care"],
    tags: ["Ladakh","India","Himalaya","chant","apprenticeship","contemplation"]
  },
  // Research: https://ich.unesco.org/en/state/india-IN
  {
    id: "thathera-metalcraft-punjab", name: "Thathera Brass and Copper Utensil Craft", era: "movement", domain: "design", sourceType: "tradition",
    essence: "Punjab's Thathera metalworkers shape functional brass and copper utensils through practiced handwork and inherited workshop knowledge.",
    strengths: ["material sensitivity","patient craftsmanship","functional design"], shadows: ["can prize inherited methods over usability","may measure worth by flawless objects"],
    contradiction: "A maker of durable everyday vessels must adapt when the community's daily needs change.",
    visualMotifs: ["hammered copper sheen","nested bowls","workshop anvils"], voicePatterns: ["explains ideas through weight and resonance","practical workshop comparisons"],
    storyEngines: ["a damaged heirloom vessel carries a hidden message","a craft workshop survives through an unexpected partnership"], evolutionTriggers: ["teaches an unconventional apprentice","redesigns an heirloom for a new use"],
    tags: ["Punjab","India","Thathera","metalwork","brass","copper","craft"]
  },
  // Research: https://ich.unesco.org/fr/RL/le-mugham-azerbaidjanais-00039
  {
    id: "azerbaijani-mugham", name: "Azerbaijani Mugham Improvisation", era: "movement", domain: "music", sourceType: "tradition",
    essence: "Azerbaijani modal performance combines learned structures with improvisatory dialogue among singer and instrumentalists.",
    strengths: ["responsive improvisation","nuanced listening","technical patience"], shadows: ["can become possessive of virtuosity","may mistake complexity for emotional depth"],
    contradiction: "A virtuoso masters demanding forms only to discover that the best moment cannot be planned.",
    visualMotifs: ["tar lute neck","kamancha bow","intimate performance circle"], voicePatterns: ["returns to a theme with subtle changes","lets silence answer a challenge"],
    storyEngines: ["a soloist must follow an unfamiliar ensemble","a forgotten melody becomes a path toward reconciliation"], evolutionTriggers: ["leaves room for a novice's phrase","chooses emotional honesty over display"],
    tags: ["Azerbaijan","mugham","modal-music","improvisation","ensemble","oral-transmission"]
  },
  // Research: https://ich.unesco.org/en/USL/suri-jagek-observing-the-sun-traditional-meteorological-and-astronomical-practice-based-on-the-observation-of-the-sun-moon-and-stars-in-reference-to-the-local-topography-01381
  {
    "id": "kalasha-suri-jagek",
    "name": "Kalasha Suri Jagek Sky Observation",
    "era": "movement",
    "domain": "science",
    "sourceType": "tradition",
    "essence": "Observation of sun, moon, stars and mountain shadows guides seasonal decisions and preserves locally grounded knowledge.",
    "strengths": [
      "patient field observation",
      "seasonal foresight",
      "teaching through stories"
    ],
    "shadows": [
      "may distrust unfamiliar instruments",
      "can hoard hard-won knowledge"
    ],
    "contradiction": "A careful observer must choose between a trusted ancestral signal and a new measurement.",
    "visualMotifs": [
      "mountain shadow lines",
      "horizon stones",
      "dawn notebooks"
    ],
    "voicePatterns": [
      "compares evidence to landscape",
      "teaches with seasonal proverbs"
    ],
    "storyEngines": [
      "a festival date depends on a disputed shadow",
      "an apprentice discovers a changing horizon"
    ],
    "evolutionTriggers": [
      "tests a new tool without abandoning fieldwork",
      "shares observations with a skeptical younger learner"
    ],
    "tags": [
      "Kalasha",
      "Pakistan",
      "Hindu Kush",
      "astronomy",
      "meteorology",
      "seasonal-knowledge"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/kok-boru-traditional-horse-game-01294
  {
    "id": "kyrgyz-kok-boru",
    "name": "Kyrgyz Kok Boru Equestrian Team Game",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "Competitive horseback teamwork combines practiced coordination, responsibility, and community rules.",
    "strengths": [
      "team coordination",
      "courage under pressure",
      "respect for horses"
    ],
    "shadows": [
      "can confuse winning with honor",
      "may overlook quieter teammates"
    ],
    "contradiction": "A daring rider learns that fair play requires restraint as well as speed.",
    "visualMotifs": [
      "hoofprints in dust",
      "team sashes",
      "goal circle"
    ],
    "voicePatterns": [
      "calls concise tactical cues",
      "praises the horse before the victory"
    ],
    "storyEngines": [
      "a disputed score threatens a village alliance",
      "a veteran referee mentors a reckless rider"
    ],
    "evolutionTriggers": [
      "accepts a fair loss",
      "protects a rival rider in a tense match"
    ],
    "tags": [
      "Kyrgyzstan",
      "kok-boru",
      "equestrian",
      "sport",
      "teamwork",
      "fair-play"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/raiho-shin-ritual-visits-of-deities-in-masks-and-costumes-01271
  {
    "id": "japanese-raiho-shin",
    "name": "Japanese Raiho-shin Visiting Deity Rituals",
    "era": "movement",
    "domain": "myth-folklore",
    "sourceType": "tradition",
    "essence": "Seasonal masked visits turn a community's anxieties, hopes, and shared responsibilities into dramatic encounters.",
    "strengths": [
      "communal preparation",
      "symbolic theatre",
      "intergenerational continuity"
    ],
    "shadows": [
      "can intimidate outsiders",
      "may mistake conformity for care"
    ],
    "contradiction": "A fearsome visitor performs a role meant to bring blessing and belonging.",
    "visualMotifs": [
      "straw cloaks",
      "carved masks",
      "winter doorways"
    ],
    "voicePatterns": [
      "uses ritual questions",
      "shifts from booming warning to gentle reassurance"
    ],
    "storyEngines": [
      "a newcomer must decide whether to join the preparations",
      "a child recognizes a masked visitor's kindness"
    ],
    "evolutionTriggers": [
      "welcomes a different family tradition",
      "learns to teach without frightening"
    ],
    "tags": [
      "Japan",
      "Raiho-shin",
      "masked-ritual",
      "seasonal",
      "folklore",
      "community"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/pinisi-art-of-boatbuilding-in-south-sulawesi-01197
  {
    "id": "south-sulawesi-pinisi",
    "name": "South Sulawesi Pinisi Boatbuilding",
    "era": "movement",
    "domain": "design",
    "sourceType": "tradition",
    "essence": "Shipwrights coordinate maritime craft, practical geometry, and intergenerational learning through shared labor.",
    "strengths": [
      "spatial reasoning",
      "craft mentorship",
      "collaborative planning"
    ],
    "shadows": [
      "can overvalue proven designs",
      "may resist an apprentice's improvement"
    ],
    "contradiction": "A master of reliable vessels must learn to trust an untested builder.",
    "visualMotifs": [
      "curved timber ribs",
      "rigging lines",
      "shoreline workshops"
    ],
    "voicePatterns": [
      "describes problems through balance and grain",
      "asks apprentices to demonstrate rather than boast"
    ],
    "storyEngines": [
      "a launch deadline exposes a hidden defect",
      "an outsider apprentice earns a place on the crew"
    ],
    "evolutionTriggers": [
      "adopts a safer joint after testing",
      "shares credit with the entire workshop"
    ],
    "tags": [
      "Indonesia",
      "Sulawesi",
      "pinisi",
      "shipbuilding",
      "maritime",
      "craft"
    ]
  },
  // Research: https://ich.unesco.org/en/decisions/16.COM/8.B.41
  {
    "id": "tajik-falak-music",
    "name": "Tajik Falak Mountain Song",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "Mountain singing channels longing, separation, and hope through expressive solo and ensemble performance.",
    "strengths": [
      "emotional courage",
      "melodic storytelling",
      "responsive accompaniment"
    ],
    "shadows": [
      "may dwell in nostalgia",
      "can turn vulnerability into a contest"
    ],
    "contradiction": "A singer of separation finds connection by letting another voice answer.",
    "visualMotifs": [
      "high valley paths",
      "string instruments",
      "distant ridgelines"
    ],
    "voicePatterns": [
      "uses expansive imagery",
      "lets a held phrase resolve into plain speech"
    ],
    "storyEngines": [
      "two singers dispute the meaning of a farewell song",
      "an apprentice carries a melody across a mountain pass"
    ],
    "evolutionTriggers": [
      "welcomes an unfamiliar harmony",
      "sings of reunion rather than only loss"
    ],
    "tags": [
      "Tajikistan",
      "falak",
      "mountain-music",
      "song",
      "oral-transmission",
      "longing"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/mwinoghe-joyous-dance-01293
  {
    "id": "malawi-mwinoghe",
    "name": "Mwinoghe Joyous Dance of Northern Malawi",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "Sukwa, Ndali and Bandya performers use intricate footwork, drums, whistle and leader cues to turn public celebration into shared belonging.",
    "strengths": [
      "rhythmic coordination",
      "joyful social inclusion",
      "learning through participation"
    ],
    "shadows": [
      "may hide disagreements behind festive unity",
      "can mistake synchronized movement for shared consent"
    ],
    "contradiction": "A celebration leader keeps everyone in step while learning that belonging also makes room for different rhythms.",
    "visualMotifs": [
      "facing dance lines",
      "three drums",
      "dust traced by quick feet"
    ],
    "voicePatterns": [
      "short rhythmic cues",
      "invites rather than commands when tensions rise"
    ],
    "storyEngines": [
      "a festival troupe must welcome an inexperienced newcomer",
      "two communities reconcile while preparing a shared performance"
    ],
    "evolutionTriggers": [
      "changes choreography to include an injured dancer",
      "lets an apprentice lead the final sequence"
    ],
    "tags": [
      "Malawi",
      "Sukwa",
      "Ndali",
      "Bandya",
      "Mwinoghe",
      "dance",
      "community"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/tsiattista-poetic-duelling-00536
  {
    "id": "cyprus-tsiattista",
    "name": "Cypriot Tsiattista Poetic Duelling",
    "era": "movement",
    "domain": "literature",
    "sourceType": "tradition",
    "essence": "Improvised rhyming poetic contests reward quick wit, attentive listening and communal participation at celebrations.",
    "strengths": [
      "improvised verbal agility",
      "deep vocabulary",
      "responsive listening"
    ],
    "shadows": [
      "can mistake humiliation for victory",
      "may cling to rigid conventions"
    ],
    "contradiction": "A champion of spontaneous verse learns that the bravest reply sometimes protects an opponent's dignity.",
    "visualMotifs": [
      "violin and lute beside a crowd",
      "wedding courtyard",
      "verses scribbled on scraps"
    ],
    "voicePatterns": [
      "rhymed challenge and answer",
      "unexpected compassionate punchline"
    ],
    "storyEngines": [
      "a young challenger overturns a biased contest",
      "two rivals improvise a poem to settle a family quarrel"
    ],
    "evolutionTriggers": [
      "concedes a clever point gracefully",
      "creates room for a previously excluded performer"
    ],
    "tags": [
      "Cyprus",
      "Tsiattista",
      "oral-poetry",
      "improvisation",
      "verbal-duel",
      "celebration"
    ]
  },
  // Research: https://ich.unesco.org/en/USL/sanke-mon-collective-fishing-rite-of-the-sanke-00289
  {
    "id": "mali-sanke-mon",
    "name": "Sanké Mon Collective Fishing Rite",
    "era": "movement",
    "domain": "myth-folklore",
    "sourceType": "tradition",
    "essence": "The San community in Mali joins collective fishing, water stewardship and masked performance in a rite tied to local memory.",
    "strengths": [
      "coordinated collective action",
      "ecological attentiveness",
      "shared ritual responsibility"
    ],
    "shadows": [
      "may romanticize a threatened ecosystem",
      "can overlook safety amid communal pressure"
    ],
    "contradiction": "A guardian of inherited festivities must change the celebration to safeguard the water that sustains it.",
    "visualMotifs": [
      "fishing nets over a pond",
      "cowrie-decorated masks",
      "drumlit public square"
    ],
    "voicePatterns": [
      "measured communal appeals",
      "describes disputes through water and seasons"
    ],
    "storyEngines": [
      "drought threatens the annual gathering",
      "a young organizer negotiates safer fishing practices"
    ],
    "evolutionTriggers": [
      "puts lake restoration ahead of spectacle",
      "invites neighboring villages into joint stewardship"
    ],
    "tags": [
      "Mali",
      "San",
      "Sanke-mon",
      "collective-fishing",
      "water",
      "ritual",
      "stewardship"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/mongolian-traditional-art-of-khoomei-00396
  {
    "id": "mongolian-khoomei",
    "name": "Mongolian Khöömei Overtone Singing",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "Altai-region vocal practice layers a sustained drone with harmonics and attentive listening to natural soundscapes.",
    "strengths": [
      "patient breath and resonance control",
      "environmental listening",
      "mentor-apprentice discipline"
    ],
    "shadows": [
      "may retreat into technical virtuosity",
      "can resist unfamiliar interpretations"
    ],
    "contradiction": "A singer seeking two simultaneous tones must learn to hear the quieter voices of companions.",
    "visualMotifs": [
      "Altai mountain horizon",
      "felt dwelling interior",
      "wind across grassland"
    ],
    "voicePatterns": [
      "spacious pauses",
      "describes emotion as overlapping resonances"
    ],
    "storyEngines": [
      "an apprentice hears a new overtone during a storm",
      "a performer must teach without treating a pupil as an echo"
    ],
    "evolutionTriggers": [
      "listens before demonstrating mastery",
      "welcomes a student's unexpected phrasing"
    ],
    "tags": [
      "Mongolia",
      "Altai",
      "Khoomei",
      "overtone-singing",
      "harmonics",
      "oral-transmission"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/lefkara-laces-or-lefkaritika-00255
  {
    "id": "cyprus-lefkara-lace",
    "name": "Lefkara Lace Craft (Lefkaritika)",
    "era": "movement",
    "domain": "design",
    "sourceType": "tradition",
    "essence": "Cypriot needlework traditions use intricate geometric embroidery and patient hand skill to pass craft knowledge between generations.",
    "strengths": [
      "pattern reasoning",
      "precise handwork",
      "intergenerational mentorship"
    ],
    "shadows": [
      "perfectionism can exhaust apprentices",
      "may guard craft boundaries too tightly"
    ],
    "contradiction": "A keeper of exacting patterns discovers that living tradition requires new hands and new uses.",
    "visualMotifs": [
      "white linen on a wooden table",
      "counted geometric stitches",
      "sunlit village doorway"
    ],
    "voicePatterns": [
      "teaches through pattern sequences",
      "compares choices to threads and knots"
    ],
    "storyEngines": [
      "a damaged lace heirloom reveals a family history",
      "an apprentice designs a practical object from an old pattern"
    ],
    "evolutionTriggers": [
      "shares a guarded technique freely",
      "accepts a respectful variation on a classic design"
    ],
    "tags": [
      "Cyprus",
      "Lefkara",
      "Lefkaritika",
      "lace",
      "embroidery",
      "geometry",
      "craft"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/traditional-art-of-shital-pati-weaving-of-sylhet-01112
  {
    "id": "sylhet-shital-pati",
    "name": "Shital Pati Murta-Cane Weaving of Sylhet",
    "era": "movement",
    "domain": "design",
    "sourceType": "tradition",
    "essence": "Bangladeshi artisans transform murta cane into cool, intricately woven mats, linking household utility with family knowledge and livelihoods.",
    "strengths": [
      "patient material preparation",
      "geometric pattern fluency",
      "cooperative apprenticeship"
    ],
    "shadows": [
      "may treat experimentation as disloyalty",
      "can overwork to meet a patron's demands"
    ],
    "contradiction": "A weaver committed to inherited patterns must invent a way for the craft to sustain the next generation.",
    "visualMotifs": [
      "pale cane strips",
      "interlocking mat geometry",
      "riverplain workshop shade"
    ],
    "voicePatterns": [
      "explains choices through weave tension and spacing",
      "offers patient corrections rather than grand speeches"
    ],
    "storyEngines": [
      "a flood damages the family's stored cane before a festival",
      "a cooperative debates fair payment for apprentices"
    ],
    "evolutionTriggers": [
      "credits an apprentice's new pattern",
      "organizes a fairer shared workshop"
    ],
    "tags": [
      "Bangladesh",
      "Sylhet",
      "Shital-Pati",
      "murta",
      "cane-weaving",
      "craft",
      "cooperative"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/mangal-shobhajatra-on-pahela-baishakh-01091
  {
    "id": "bangladesh-mangal-shobhajatra",
    "name": "Mangal Shobhajatra New Year Procession",
    "era": "contemporary",
    "domain": "visual-art",
    "sourceType": "tradition",
    "essence": "Dhaka's collaborative New Year procession turns handmade masks and floats into public images of courage, peace, and collective hope.",
    "strengths": [
      "collective visual storytelling",
      "public-spirited courage",
      "resourceful festival design"
    ],
    "shadows": [
      "can mistake a striking symbol for lasting change",
      "may silence quieter collaborators in the rush to finish"
    ],
    "contradiction": "A maker of giant public symbols discovers that hope also depends on small, unglamorous acts.",
    "visualMotifs": [
      "oversized animal masks",
      "painted procession floats",
      "dawn workshop floors"
    ],
    "voicePatterns": [
      "frames arguments in accessible symbols",
      "rallies teams with brief inclusive invitations"
    ],
    "storyEngines": [
      "a procession float must be rebuilt after a storm",
      "rival student teams disagree over what courage should look like"
    ],
    "evolutionTriggers": [
      "lets an overlooked helper design the central image",
      "follows a celebratory promise with year-round action"
    ],
    "tags": [
      "Bangladesh",
      "Dhaka",
      "Mangal-Shobhajatra",
      "Pahela-Baishakh",
      "procession",
      "public-art",
      "solidarity"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/namsadang-nori-00184
  {
    "id": "korean-namsadang-nori",
    "name": "Korean Namsadang Nori Traveling Theatre",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "Itinerant ensemble theatre combines percussion, masked satire, tightrope dialogue, puppetry, and acrobatics to entertain while questioning hierarchy.",
    "strengths": [
      "ensemble improvisation",
      "satirical social observation",
      "physical and verbal timing"
    ],
    "shadows": [
      "a sharp joke can wound allies",
      "may hide fear behind constant spectacle"
    ],
    "contradiction": "A performer who mocks authority must learn to wield influence responsibly when the audience starts listening.",
    "visualMotifs": [
      "open-air rope stage",
      "gongs and drums",
      "puppet screens and masks"
    ],
    "voicePatterns": [
      "rapid comic exchanges",
      "switches from teasing banter to pointed social questions"
    ],
    "storyEngines": [
      "a troupe is invited to perform for the official it satirizes",
      "a puppeteer smuggles a village grievance into a comic scene"
    ],
    "evolutionTriggers": [
      "turns a cruel joke into a shared reckoning",
      "gives the newest troupe member the closing scene"
    ],
    "tags": [
      "Korea",
      "Namsadang-Nori",
      "itinerant-theatre",
      "puppetry",
      "tightrope",
      "satire",
      "ensemble"
    ]
  },
  // Research: https://ich.unesco.org/en/projects/action-plan-for-the-safeguarding-of-la-tumba-francesa-00023
  {
    "id": "cuban-tumba-francesa",
    "name": "Cuban La Tumba Francesa Dance and Drumming",
    "era": "19th-century",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "Afro-Haitian heritage in eastern Cuba lives through ceremonial dance, song, and drumming shaped by historical encounters between West African and French-derived forms.",
    "strengths": [
      "rhythmic dialogue",
      "intergenerational memory",
      "ceremonial ensemble discipline"
    ],
    "shadows": [
      "can turn guardianship into gatekeeping",
      "may value flawless presentation over newcomers' learning"
    ],
    "contradiction": "A keeper of old dances must make room for new participants without erasing the history the dances carry.",
    "visualMotifs": [
      "drum circles",
      "formal dance formations",
      "embroidered ceremonial dress"
    ],
    "voicePatterns": [
      "answers with call-and-response rhythms",
      "links present choices to remembered journeys"
    ],
    "storyEngines": [
      "a youth troupe discovers a forgotten elder's dance sequence",
      "two performers disagree about changing a festival program"
    ],
    "evolutionTriggers": [
      "records an elder's account with permission",
      "shares leadership with a younger drummer"
    ],
    "tags": [
      "Cuba",
      "Afro-Haitian",
      "Tumba-Francesa",
      "drumming",
      "dance",
      "diaspora",
      "heritage"
    ]
  },
  // Research: https://ich.unesco.org/en/Decisions/20.COM/7.b.31
  {
    "id": "malagasy-tsapiky",
    "name": "Southwestern Malagasy Tsapiky Music",
    "era": "contemporary",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "Southwestern Madagascar's fast-moving Tsapiky music combines electric guitars and percussion with local instruments in celebrations and social life.",
    "strengths": [
      "rhythmic adaptability",
      "collective energy",
      "creative fusion across instruments"
    ],
    "shadows": [
      "can chase excitement at the expense of rest",
      "may confuse volume with being heard"
    ],
    "contradiction": "A musician who can energize any gathering must learn to hear the grief beneath its celebration.",
    "visualMotifs": [
      "electric guitar cables",
      "dusty outdoor dance floor",
      "marovany strings"
    ],
    "voicePatterns": [
      "quick rhythmic interjections",
      "shifts from exuberant jokes to attentive listening"
    ],
    "storyEngines": [
      "a band reunites for a village celebration after a feud",
      "a young musician tries to balance inherited repertoire with new sounds"
    ],
    "evolutionTriggers": [
      "slows the performance to honor a listener's story",
      "shares composition credit across the ensemble"
    ],
    "tags": [
      "Madagascar",
      "Tsapiky",
      "Southwest-Madagascar",
      "guitar",
      "percussion",
      "fusion",
      "dance"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/traditions-and-practices-associated-with-the-kayas-in-the-sacred-forests-of-the-mijikenda-00313
  {
    "id": "mijikenda-kaya-stewardship",
    "name": "Mijikenda Kaya Forest Stewardship",
    "era": "movement",
    "domain": "leadership",
    "sourceType": "tradition",
    "essence": "Coastal Kenyan Mijikenda communities connect sacred forest spaces with customary governance, reconciliation, biodiversity care, and intergenerational continuity.",
    "strengths": [
      "ecological stewardship",
      "patient mediation",
      "community memory"
    ],
    "shadows": [
      "may exclude unfamiliar voices from decisions",
      "can delay urgent change through deference to custom"
    ],
    "contradiction": "A guardian of protected forest traditions must adapt to protect both living communities and threatened habitats.",
    "visualMotifs": [
      "forest pathways",
      "council meeting circle",
      "seedlings beside old trees"
    ],
    "voicePatterns": [
      "asks how choices affect descendants",
      "uses deliberate consensus-building questions"
    ],
    "storyEngines": [
      "a development proposal divides elders and younger residents",
      "a forest custodian must negotiate a new conservation partnership"
    ],
    "evolutionTriggers": [
      "invites youth into stewardship decisions",
      "pairs a traditional rule with transparent ecological evidence"
    ],
    "tags": [
      "Kenya",
      "Mijikenda",
      "Kaya",
      "sacred-forests",
      "governance",
      "biodiversity",
      "reconciliation"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/bistritsa-babi-archaic-polyphony-dances-and-rituals-from-the-shoplouk-region-00095
  {
    "id": "bulgarian-bistritsa-babi",
    "name": "Bistritsa Babi Shoplouk Polyphony",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "Bulgarian women's interlocking Shoplouk voices, chain dances, and seasonal rituals carry communal knowledge through precise group listening.",
    "strengths": [
      "vocal cooperation",
      "oral transmission",
      "rhythmic group trust"
    ],
    "shadows": [
      "can narrow the repertoire to crowd favorites",
      "may dismiss unfamiliar younger voices"
    ],
    "contradiction": "An elder who preserves a shared sound discovers that survival requires teaching singers who hear the world differently.",
    "visualMotifs": [
      "linked dance circle",
      "embroidered village dress",
      "mountain village gathering"
    ],
    "voicePatterns": [
      "short leading calls against a sustained group response",
      "speaks of disagreement as voices finding a common drone"
    ],
    "storyEngines": [
      "a village choir must choose between a touring showcase and local teaching",
      "a returning singer offers an unexpected harmony"
    ],
    "evolutionTriggers": [
      "teaches an obscure song to newcomers",
      "welcomes a variation without abandoning the shared structure"
    ],
    "tags": [
      "Bulgaria",
      "Bistritsa-Babi",
      "Shoplouk",
      "polyphony",
      "women-singers",
      "horo",
      "oral-tradition"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/rickshaws-and-rickshaw-painting-in-dhaka-01589
  {
    "id": "dhaka-rickshaw-painting",
    "name": "Dhaka Rickshaw Painting and Ornament",
    "era": "contemporary",
    "domain": "visual-art",
    "sourceType": "tradition",
    "essence": "Bangladeshi workshop painters turn everyday three-wheeled transport into moving galleries of color, stories, lettering, and urban memory.",
    "strengths": [
      "accessible public art",
      "improvised visual composition",
      "craft apprenticeship"
    ],
    "shadows": [
      "may prioritize spectacle over durability",
      "can lose sight of the rider's practical needs"
    ],
    "contradiction": "An artist who paints for the whole street must balance a dazzling image with the person who pedals it.",
    "visualMotifs": [
      "painted birds and flowers",
      "bright rear panels",
      "tinsel along moving wheels"
    ],
    "voicePatterns": [
      "compares everyday people to images in motion",
      "negotiates commissions through concrete visual examples"
    ],
    "storyEngines": [
      "a beloved old rickshaw is commissioned for restoration",
      "a painter and a driver clash over the meaning of a mural"
    ],
    "evolutionTriggers": [
      "collaborates with the driver on a functional design",
      "mentors an apprentice with a different visual vocabulary"
    ],
    "tags": [
      "Bangladesh",
      "Dhaka",
      "rickshaw-art",
      "urban-folk-art",
      "painted-vehicles",
      "workshop",
      "public-art"
    ]
  },
  // Original character archetypes: occupation, temperament, relationships and evolution diversity.
  {
    "id": "night-market-medic",
    "name": "Night-Market Medic",
    "era": "late-20th-century",
    "domain": "science",
    "sourceType": "fictional-character",
    "essence": "A street healer who trades practical care for stories, but fears needing help.",
    "strengths": [
      "improvisation",
      "empathy",
      "resourcefulness"
    ],
    "shadows": [
      "overextends",
      "hides exhaustion"
    ],
    "contradiction": "Treats everyone but refuses treatment.",
    "visualMotifs": [
      "patched satchel",
      "portable lantern",
      "colorful bandages"
    ],
    "voicePatterns": [
      "asks practical questions",
      "soft jokes under pressure"
    ],
    "storyEngines": [
      "a missing remedy threatens a festival",
      "a rival offers an uneasy alliance"
    ],
    "evolutionTriggers": [
      "accepts care",
      "builds a shared clinic"
    ],
    "tags": [
      "medic",
      "street-life",
      "care",
      "improviser"
    ]
  },
  {
    "id": "retired-storm-chaser",
    "name": "Retired Storm Chaser",
    "era": "timeless-fiction",
    "domain": "fiction",
    "sourceType": "fictional-character",
    "essence": "A former danger-seeker who now notices tiny changes in ordinary weather.",
    "strengths": [
      "pattern reading",
      "bravery",
      "patience"
    ],
    "shadows": [
      "restlessness",
      "risk addiction"
    ],
    "contradiction": "Craves peace but keeps scanning the horizon.",
    "visualMotifs": [
      "weathered coat",
      "pocket barometer",
      "cloud sketches"
    ],
    "voicePatterns": [
      "speaks in forecasts",
      "understates danger"
    ],
    "storyEngines": [
      "a strange calm precedes disaster",
      "a student challenges an old warning"
    ],
    "evolutionTriggers": [
      "chooses prevention over spectacle",
      "trusts a younger scout"
    ],
    "tags": [
      "elder",
      "weather",
      "adventure",
      "mentor"
    ]
  },
  {
    "id": "subway-ghost-cartographer",
    "name": "Subway Ghost Cartographer",
    "era": "timeless-fiction",
    "domain": "fiction",
    "sourceType": "fictional-character",
    "essence": "An urban mapmaker documenting forgotten routes and the lives around them.",
    "strengths": [
      "curiosity",
      "spatial memory",
      "quiet loyalty"
    ],
    "shadows": [
      "obsession",
      "avoids sunlight"
    ],
    "contradiction": "Knows every hidden passage but cannot find a way home.",
    "visualMotifs": [
      "layered transit maps",
      "reflective vest",
      "chalk symbols"
    ],
    "voicePatterns": [
      "gives directions as riddles",
      "remembers strangers' details"
    ],
    "storyEngines": [
      "a station vanishes from maps",
      "two neighborhoods claim the same tunnel"
    ],
    "evolutionTriggers": [
      "asks for directions",
      "maps relationships instead of tunnels"
    ],
    "tags": [
      "urban-fantasy",
      "cartographer",
      "loner",
      "mystery"
    ]
  },
  {
    "id": "rooftop-gardener-diplomat",
    "name": "Rooftop Gardener Diplomat",
    "era": "contemporary",
    "domain": "leadership",
    "sourceType": "fictional-character",
    "essence": "A practical negotiator who settles feuds by getting rivals to grow something together.",
    "strengths": [
      "mediation",
      "patience",
      "systems thinking"
    ],
    "shadows": [
      "conflict avoidance",
      "secret competitiveness"
    ],
    "contradiction": "Makes peace publicly while privately keeping score.",
    "visualMotifs": [
      "seed tins",
      "patched gloves",
      "roofline trellises"
    ],
    "voicePatterns": [
      "uses plant metaphors",
      "asks both sides for concrete needs"
    ],
    "storyEngines": [
      "a water shortage divides a block",
      "an heirloom seed sparks a dispute"
    ],
    "evolutionTriggers": [
      "admits resentment",
      "shares credit"
    ],
    "tags": [
      "gardener",
      "mediator",
      "community",
      "ecology"
    ]
  },
  {
    "id": "disgraced-parade-engineer",
    "name": "Disgraced Parade Engineer",
    "era": "contemporary",
    "domain": "design",
    "sourceType": "fictional-character",
    "essence": "A flamboyant builder of impossible public spectacles seeking redemption after a disastrous debut.",
    "strengths": [
      "mechanical imagination",
      "showmanship",
      "collaboration"
    ],
    "shadows": [
      "vanity",
      "cuts corners"
    ],
    "contradiction": "Wants applause but must learn invisible reliability.",
    "visualMotifs": [
      "folding floats",
      "confetti-stained blueprints",
      "tiny motors"
    ],
    "voicePatterns": [
      "speaks in dramatic reveals",
      "hides worries in technical jargon"
    ],
    "storyEngines": [
      "a parade float becomes a rescue vehicle",
      "a former critic joins the workshop"
    ],
    "evolutionTriggers": [
      "prioritizes safety",
      "lets an apprentice lead"
    ],
    "tags": [
      "engineer",
      "festival",
      "redemption",
      "maker"
    ]
  },
  {
    "id": "interstellar-lost-and-found-clerk",
    "name": "Interstellar Lost-and-Found Clerk",
    "era": "timeless-fiction",
    "domain": "fiction",
    "sourceType": "fictional-character",
    "essence": "A meticulous keeper of abandoned objects who can infer whole lives from small clues.",
    "strengths": [
      "observation",
      "fairness",
      "memory"
    ],
    "shadows": [
      "hoarding",
      "judges too quickly"
    ],
    "contradiction": "Returns everything except the keepsake tied to their own past.",
    "visualMotifs": [
      "numbered drawers",
      "mismatched keys",
      "glowing claim tickets"
    ],
    "voicePatterns": [
      "asks oddly specific questions",
      "lists details before feelings"
    ],
    "storyEngines": [
      "an owner claims an impossible object",
      "two people remember the same item"
    ],
    "evolutionTriggers": [
      "lets go of a relic",
      "believes an unlikely claimant"
    ],
    "tags": [
      "space-opera",
      "clerk",
      "detective",
      "collector"
    ]
  },
  {
    "id": "midnight-radio-archivist",
    "name": "Midnight Radio Archivist",
    "era": "contemporary",
    "domain": "music",
    "sourceType": "fictional-character",
    "essence": "A nocturnal broadcaster who preserves unheard voices and secretly fears being recognized.",
    "strengths": [
      "listening",
      "sound collage",
      "community memory"
    ],
    "shadows": [
      "isolation",
      "selective honesty"
    ],
    "contradiction": "Gives everyone a voice but edits their own story.",
    "visualMotifs": [
      "cassette towers",
      "signal meters",
      "amber studio lights"
    ],
    "voicePatterns": [
      "speaks in intimate introductions",
      "leaves thoughtful silences"
    ],
    "storyEngines": [
      "a mysterious broadcast predicts a reunion",
      "an erased interview resurfaces"
    ],
    "evolutionTriggers": [
      "broadcasts a confession",
      "invites a co-host"
    ],
    "tags": [
      "radio",
      "archivist",
      "nocturnal",
      "storyteller"
    ]
  },
  {
    "id": "gentle-giant-repairer",
    "name": "Gentle Giant Repairer",
    "era": "timeless-fiction",
    "domain": "fiction",
    "sourceType": "fictional-character",
    "essence": "An enormous, soft-spoken repairer of tiny fragile machines who is mistaken for a threat.",
    "strengths": [
      "fine motor care",
      "steadiness",
      "protectiveness"
    ],
    "shadows": [
      "self-doubt",
      "overapologizes"
    ],
    "contradiction": "Can lift a bridge but trembles before a broken music box.",
    "visualMotifs": [
      "oversized apron",
      "miniature screwdrivers",
      "delicate spectacles"
    ],
    "voicePatterns": [
      "whispers precise instructions",
      "apologizes before speaking"
    ],
    "storyEngines": [
      "a town trusts the wrong strongman",
      "a miniature mechanism holds a city together"
    ],
    "evolutionTriggers": [
      "sets a boundary",
      "shows strength without apology"
    ],
    "tags": [
      "gentle-giant",
      "craft",
      "outsider",
      "kindness"
    ]
  },
  // Research: https://library.ltikorea.or.kr/writer/202194
  {
    "id": "heo-nanseolheon-joseon-poetry",
    "name": "Heo Nanseolheon (Heo Cho-hui)",
    "era": "early-modern",
    "domain": "literature",
    "sourceType": "historical-person",
    "essence": "A Joseon-era poet whose imaginative worlds, sorrow, and sharp social awareness reveal the distance between creative freedom and constrained public life.",
    "strengths": [
      "symbolic imagination",
      "lyrical precision",
      "attention to overlooked suffering"
    ],
    "shadows": [
      "retreats into imagined escape",
      "can turn grief into isolation"
    ],
    "contradiction": "A writer whose imagined worlds seem boundless while the rules of her society narrow the paths available to her.",
    "visualMotifs": [
      "ink-dark mountain silhouettes",
      "paper cranes over a courtyard",
      "a half-filled poetry folio",
      "a moon behind a lattice window"
    ],
    "voicePatterns": [
      "links a concrete image to an unspoken feeling",
      "lets a quiet observation carry social criticism",
      "alternates earthly detail with impossible vistas"
    ],
    "storyEngines": [
      "a recovered manuscript changes the reputation of its author",
      "a gifted student must choose between secrecy and publication",
      "a dreamlike poem exposes a real injustice"
    ],
    "evolutionTriggers": [
      "shares an unfinished work with a trusted peer",
      "turns private grief into public solidarity",
      "accepts that imagination can inspire action"
    ],
    "tags": [
      "Korea",
      "Joseon",
      "Heo-Cho-hui",
      "Nanseolheon",
      "poetry",
      "women-writers",
      "imagination",
      "social-critique"
    ]
  },
  // Research: https://www.nationalgallery.sg/sg/en/about/media-centre/a-journey-between-the-worlds-of-southeast-asia-and-europe-the-extraordinary-lives-and-works-of-raden-saleh-and-juan-luna.html
  {
    "id": "raden-saleh-indonesian-painting",
    "name": "Raden Saleh",
    "era": "19th-century",
    "domain": "visual-art",
    "sourceType": "historical-person",
    "essence": "An Indonesian painter who navigated European academic art circles and dramatic pictorial storytelling across colonial-era cultural boundaries.",
    "strengths": [
      "large-scale composition",
      "cross-cultural fluency",
      "visual drama"
    ],
    "shadows": [
      "can become captive to patrons' expectations",
      "may favor spectacle over intimate truth"
    ],
    "contradiction": "An artist seeks recognition in powerful institutions while questioning whose stories those institutions choose to celebrate.",
    "visualMotifs": [
      "storm-lit landscapes",
      "restless animal silhouettes",
      "vast canvases in a crowded studio",
      "travel-worn sketchbooks"
    ],
    "voicePatterns": [
      "frames disagreements as competing viewpoints",
      "notices posture and atmosphere before words",
      "speaks of commissions as both opportunity and compromise"
    ],
    "storyEngines": [
      "a prestigious commission clashes with the painter's loyalties",
      "a painting is interpreted differently in two cities",
      "a patron demands the removal of a troubling detail"
    ],
    "evolutionTriggers": [
      "chooses a difficult subject without a guaranteed audience",
      "invites a collaborator to challenge a composition",
      "separates personal worth from elite approval"
    ],
    "tags": [
      "Indonesia",
      "Java",
      "Raden-Saleh",
      "painting",
      "colonial-era",
      "cross-cultural-art",
      "patronage",
      "visual-drama"
    ]
  },
  // Research: https://collections.tepapa.govt.nz/topic/10675
  {
    "id": "tupaia-polynesian-navigator",
    "name": "Tupaia of Ra'iatea",
    "era": "enlightenment",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "A Ra'iatean priest, navigator, interpreter, and observer whose Pacific knowledge enabled encounters across islands and languages.",
    "strengths": [
      "wayfinding",
      "intercultural mediation",
      "observational memory"
    ],
    "shadows": [
      "can carry too much responsibility for others' misunderstandings",
      "may assume shared knowledge where none exists"
    ],
    "contradiction": "A guide who understands connected island worlds must explain them to travelers who mistake their own maps for the whole world.",
    "visualMotifs": [
      "ocean swells under stars",
      "island bearings sketched in a notebook",
      "a canoe wake",
      "a meeting on a shore"
    ],
    "voicePatterns": [
      "explains routes through relationships between places",
      "asks who knows the water before giving directions",
      "translates intent rather than only words"
    ],
    "storyEngines": [
      "a crew distrusts a route that local experts know",
      "an interpreter must reconcile conflicting accounts of a landing",
      "a journey reveals two incompatible ideas of discovery"
    ],
    "evolutionTriggers": [
      "refuses to let an outsider erase local expertise",
      "teaches another navigator to question a chart",
      "builds trust without surrendering authority"
    ],
    "tags": [
      "Ra'iatea",
      "Tahiti",
      "Polynesia",
      "Tupaia",
      "navigation",
      "interpreter",
      "Pacific",
      "wayfinding",
      "cross-cultural-knowledge"
    ]
  },
  // Research: https://www.nps.gov/people/dr-chienshiung-wu.htm
  {
    "id": "chien-shiung-wu-experimental-physics",
    "name": "Chien-Shiung Wu",
    "era": "mid-century",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "A Chinese American experimental physicist whose exacting work on beta decay and parity showed how careful evidence can overturn an accepted assumption.",
    "strengths": [
      "experimental rigor",
      "technical ingenuity",
      "intellectual persistence"
    ],
    "shadows": [
      "can demand impossible precision from herself",
      "may distrust elegant theories before testing them"
    ],
    "contradiction": "The person who supplies decisive evidence can remain less celebrated than the theorists whose ideas the experiment tests.",
    "visualMotifs": [
      "cryogenic laboratory apparatus",
      "handwritten measurement tables",
      "particle-track diagrams",
      "a clock above a night-shift bench"
    ],
    "voicePatterns": [
      "asks what result would falsify the claim",
      "separates measurement from interpretation",
      "offers concise corrections without theatricality"
    ],
    "storyEngines": [
      "a small anomaly challenges an entire discipline",
      "an overlooked technician identifies a fatal flaw",
      "a laboratory breakthrough sparks a fight over recognition"
    ],
    "evolutionTriggers": [
      "makes room for an unconventional collaborator",
      "insists that credit follows contribution",
      "lets a surprising result reshape a cherished hypothesis"
    ],
    "tags": [
      "China",
      "Chinese-American",
      "Chien-Shiung-Wu",
      "Wu-Jianxiong",
      "physics",
      "parity",
      "experiments",
      "women-in-science"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/pahlevani-and-zoorkhanei-rituals-00378
  {
    "id": "iran-pahlevani-zoorkhanei-ethics",
    "name": "Pahlevani and Zoorkhanei Rituals",
    "era": "movement",
    "domain": "spirituality",
    "sourceType": "tradition",
    "essence": "An Iranian practice linking strength training, rhythmic recitation, community service, and ethical ideals of the champion.",
    "strengths": [
      "disciplined training",
      "service-minded leadership",
      "rhythmic coordination"
    ],
    "shadows": [
      "can confuse status with virtue",
      "may hide weakness behind an ideal of toughness"
    ],
    "contradiction": "The strongest champion is expected to demonstrate humility and responsibility rather than dominance.",
    "visualMotifs": [
      "domed training hall",
      "octagonal sunken arena",
      "wooden exercise clubs",
      "drum beside a reciter"
    ],
    "voicePatterns": [
      "pairs physical advice with ethical questions",
      "praises effort more than victory",
      "keeps cadence when tension rises"
    ],
    "storyEngines": [
      "a celebrated athlete must protect a rival",
      "a novice questions whether a title can be earned without kindness",
      "a training hall becomes a refuge during a crisis"
    ],
    "evolutionTriggers": [
      "uses reputation to serve someone with no influence",
      "acknowledges an opponent's courage",
      "chooses restraint when applause rewards force"
    ],
    "tags": [
      "Iran",
      "Pahlevani",
      "Zoorkhanei",
      "zurkhaneh",
      "martial-ethics",
      "community-service",
      "ritual-training",
      "humility"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/cocolo-dance-drama-tradition-00104
  {
    "id": "dominican-cocolo-dance-drama",
    "name": "Cocolo Dance Drama Tradition",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "A Dominican Caribbean performance heritage combining African-derived music and dance with theatrical narratives shaped by British Caribbean migration.",
    "strengths": [
      "ensemble storytelling",
      "cultural adaptation",
      "community solidarity"
    ],
    "shadows": [
      "knowledge can become fragile when troupes disperse",
      "spectacle can obscure the people sustaining it"
    ],
    "contradiction": "A performance keeps a community's history visible even as the community's everyday language and institutions change.",
    "visualMotifs": [
      "masquerade procession",
      "portable band instruments",
      "festival stage cloth",
      "hand-painted rehearsal signs"
    ],
    "voicePatterns": [
      "moves between narration and collective response",
      "builds dialogue around contrasting roles",
      "invites a chorus to answer a difficult question"
    ],
    "storyEngines": [
      "a dwindling troupe recruits unexpected apprentices",
      "a forgotten costume leads to a family story",
      "a performance must adapt to a new neighborhood without losing its memory"
    ],
    "evolutionTriggers": [
      "passes a role to a younger performer",
      "documents a veteran's account with consent",
      "finds new audiences through community partnership"
    ],
    "tags": [
      "Dominican-Republic",
      "Cocolo",
      "British-Caribbean-diaspora",
      "dance-drama",
      "masquerade",
      "migration",
      "ensemble",
      "heritage"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/morna-musical-practice-of-cabo-verde-01469
  {
    "id": "cabo-verde-morna-song",
    "name": "Morna Musical Practice of Cabo Verde",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "A Cape Verdean musical and poetic practice that carries longing, departure, reunion, and island belonging through song and instrumental dialogue.",
    "strengths": [
      "emotional nuance",
      "poetic storytelling",
      "musical listening"
    ],
    "shadows": [
      "can romanticize separation",
      "may hold on to nostalgia at the expense of change"
    ],
    "contradiction": "A song of distance can make far-flung people feel present together.",
    "visualMotifs": [
      "stringed instruments at dusk",
      "harbor lights",
      "folded travel letters",
      "chairs arranged for a family gathering"
    ],
    "voicePatterns": [
      "leaves room for a gentle response",
      "uses places and departures to express feeling",
      "lets repetition change emotional meaning"
    ],
    "storyEngines": [
      "a homecoming reveals the person everyone imagined has changed",
      "a forgotten melody reunites relatives",
      "two musicians disagree about how to honor a shared memory"
    ],
    "evolutionTriggers": [
      "welcomes a new interpretation of an old song",
      "stops idealizing a place they have never revisited",
      "makes space for a younger singer's story"
    ],
    "tags": [
      "Cabo-Verde",
      "Cape-Verde",
      "Morna",
      "Creole-poetry",
      "diaspora",
      "longing",
      "reunion",
      "string-music"
    ]
  },
  // Research: https://kachchh.nic.in/handicraft/
  {
    "id": "kutch-rogan-castor-oil-painting",
    "name": "Kutch Rogan Fabric Painting",
    "era": "movement",
    "domain": "visual-art",
    "sourceType": "tradition",
    "essence": "A Kachchh textile-painting craft that draws thick castor-oil pigment into intricate motifs and transfers a mirrored design by folding fabric.",
    "strengths": [
      "patient hand control",
      "material experimentation",
      "geometric balance"
    ],
    "shadows": [
      "can become trapped by flawless symmetry",
      "specialized skills may be difficult to pass on"
    ],
    "contradiction": "A painter makes one side by hand and trusts a fold to create its partner.",
    "visualMotifs": [
      "fine metal stylus",
      "castor-oil pigment threads",
      "folded fabric revealing mirror patterns",
      "workshop dye pots"
    ],
    "voicePatterns": [
      "describes choices through balance and reflection",
      "teaches by showing a small gesture repeatedly",
      "asks what should be preserved when a design changes"
    ],
    "storyEngines": [
      "a flawed fold becomes a breakthrough pattern",
      "an apprentice proposes a motif the master distrusts",
      "a fragile commission must survive a long journey"
    ],
    "evolutionTriggers": [
      "accepts a deliberate asymmetry",
      "teaches the craft beyond the family workshop",
      "balances innovation with credit to teachers"
    ],
    "tags": [
      "India",
      "Gujarat",
      "Kutch",
      "Kachchh",
      "Rogan",
      "castor-oil-paint",
      "textile-art",
      "mirrored-design",
      "craft"
    ]
  },
  // Research: https://ich.unesco.org/en/Decisions/18.COM/8.b.33
  {
    "id": "indonesian-jamu-wellness-culture",
    "name": "Indonesian Jamu Wellness Culture",
    "era": "movement",
    "domain": "science",
    "sourceType": "tradition",
    "essence": "An Indonesian heritage of preparing and sharing botanical mixtures, with knowledge passed through families and communities; its cultural significance is distinct from proof of medical effectiveness.",
    "strengths": [
      "attentive listening to neighbors",
      "botanical craft knowledge",
      "reciprocal trust"
    ],
    "shadows": [
      "may guard inherited recipes too tightly",
      "can confuse customary authority with evidence"
    ],
    "contradiction": "A keeper of familiar remedies must respect tradition while admitting when a question needs new evidence.",
    "visualMotifs": [
      "bundles of ginger and turmeric",
      "handwritten preparation notebooks",
      "market baskets of herbs"
    ],
    "voicePatterns": [
      "asks about a person's daily routines before offering an opinion",
      "explains choices through ingredients and relationships, without promising cures"
    ],
    "storyEngines": [
      "a young maker must decide how to share a family practice responsibly",
      "a neighborhood workshop faces a commercial offer that could erase its local ties"
    ],
    "evolutionTriggers": [
      "documents the difference between inherited belief and tested knowledge",
      "teaches a newcomer without demanding unquestioning obedience"
    ],
    "tags": [
      "Indonesia",
      "Jamu",
      "herbal-heritage",
      "intergenerational-knowledge",
      "community-trust",
      "botanical-craft"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/katta-ashula-00288
  {
    "id": "ferghana-katta-ashula-song",
    "name": "Katta Ashula of the Ferghana Valley",
    "era": "movement",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "A demanding, orally transmitted vocal art of the Ferghana Valley, joining multiple singers, philosophical poetry and carefully negotiated improvisation.",
    "strengths": [
      "deep listening",
      "collaborative musical discipline",
      "poetic improvisation"
    ],
    "shadows": [
      "may prize mastery over welcome",
      "can mistake seniority for insight"
    ],
    "contradiction": "A voice can sound singular only because several performers learn to leave room for one another.",
    "visualMotifs": [
      "singers facing in a small arc",
      "handwritten poetry leaves",
      "sunlit courtyard rehearsals"
    ],
    "voicePatterns": [
      "answers an abstract question with an image from nature",
      "waits for another voice before finishing a thought"
    ],
    "storyEngines": [
      "two apprentices disagree over the meaning of a verse before a festival",
      "a master must choose whether to encourage a surprising new interpretation"
    ],
    "evolutionTriggers": [
      "invites a quieter performer to lead",
      "learns that improvisation can protect rather than weaken a tradition"
    ],
    "tags": [
      "Uzbekistan",
      "Ferghana-Valley",
      "Katta-Ashula",
      "ensemble-singing",
      "oral-poetry",
      "apprenticeship"
    ]
  },
  // Research: https://ich.unesco.org/en/USL/mongolian-calligraphy-00873
  {
    "id": "mongolian-vertical-script-calligraphy",
    "name": "Mongolian Vertical-Script Calligraphy",
    "era": "movement",
    "domain": "visual-art",
    "sourceType": "tradition",
    "essence": "The patient art of writing Classical Mongolian script in connected vertical strokes, sustained through close mentor-apprentice relationships.",
    "strengths": [
      "precision of gesture",
      "patient teaching",
      "visual rhythm"
    ],
    "shadows": [
      "may become overly protective of correct forms",
      "can hide uncertainty behind immaculate presentation"
    ],
    "contradiction": "A guardian of continuity must sometimes change the way a craft is taught to keep it alive.",
    "visualMotifs": [
      "descending ink columns",
      "brush and paper beside a window",
      "folded-script seals"
    ],
    "voicePatterns": [
      "notices the shape and pacing of words",
      "offers careful corrections without raising their voice"
    ],
    "storyEngines": [
      "an apprentice designs a new public sign without losing script integrity",
      "a mentor must decide how to preserve a fragile archive"
    ],
    "evolutionTriggers": [
      "shares expertise beyond a tiny inner circle",
      "welcomes a practical new teaching medium"
    ],
    "tags": [
      "Mongolia",
      "vertical-script",
      "calligraphy",
      "craft-preservation",
      "mentorship",
      "letterforms"
    ]
  },
  // Research: https://ich.unesco.org/en/decisions/18.COM/8.B.32
  {
    "id": "gujarat-garba-community-dance",
    "name": "Garba of Gujarat",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "A participatory Gujarati devotional dance associated with Navaratri, gathering people in accelerating circles around a shared sacred center.",
    "strengths": [
      "inclusive coordination",
      "rhythmic endurance",
      "community hospitality"
    ],
    "shadows": [
      "can let festival logistics eclipse quieter participants",
      "may confuse visible enthusiasm with belonging"
    ],
    "contradiction": "A joyful circle becomes meaningful only when its center and its margins both receive care.",
    "visualMotifs": [
      "circling dancers",
      "clapping hands",
      "a glowing earthen lamp"
    ],
    "voicePatterns": [
      "invites participation with clear, welcoming cues",
      "speaks of rhythm as shared responsibility"
    ],
    "storyEngines": [
      "a festival organizer must make space for an overlooked neighbor",
      "a costume designer and musician reconcile competing visions of a celebration"
    ],
    "evolutionTriggers": [
      "makes accessibility part of the design",
      "learns the devotional context before introducing changes"
    ],
    "tags": [
      "India",
      "Gujarat",
      "Garba",
      "Navaratri",
      "community-dance",
      "participation"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/cultural-complex-of-bumba-meu-boi-from-maranho-01510
  {
    "id": "maranhao-bumba-meu-boi-complex",
    "name": "Bumba-meu-boi of Maranhão",
    "era": "movement",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "A Brazilian festival complex combining music, theatre, costume-making and an ox-centered cycle of loss, renewal and communal reinvention.",
    "strengths": [
      "ensemble invention",
      "ceremonial storytelling",
      "craft collaboration"
    ],
    "shadows": [
      "may turn artistic rivalry into factional pride",
      "can prioritize spectacle over the people sustaining it"
    ],
    "contradiction": "A celebration of renewal must preserve its inherited meanings while inventing new performances each year.",
    "visualMotifs": [
      "embroidered ox figure",
      "layered festival costumes",
      "drums at a twilight rehearsal"
    ],
    "voicePatterns": [
      "moves between comic banter and solemn reflection",
      "uses the seasons of a festival to organize memories"
    ],
    "storyEngines": [
      "two performance groups share a damaged ceremonial costume",
      "an apprentice proposes a new scene that unsettles an elder"
    ],
    "evolutionTriggers": [
      "credits the behind-the-scenes makers",
      "reconciles a rival troupe without flattening their differences"
    ],
    "tags": [
      "Brazil",
      "Maranhao",
      "Bumba-meu-boi",
      "festival-theatre",
      "ox-symbolism",
      "renewal"
    ]
  },
  // Research: https://pubmed.ncbi.nlm.nih.gov/18481505/
  {
    "id": "ibn-al-nafis-pulmonary-inquiry",
    "name": "Ibn al-Nafis",
    "era": "medieval",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "A thirteenth-century physician whose account of pulmonary circulation challenged inherited anatomical authority through careful reasoning.",
    "strengths": [
      "critical reading",
      "medical observation",
      "courage to revise doctrine"
    ],
    "shadows": [
      "fictional tension: may become impatient with untested assertions",
      "fictional tension: risks valuing a correct argument over a worried patient"
    ],
    "contradiction": "A scholar trained inside a tradition finds its deepest promise in questioning one of its foundations.",
    "visualMotifs": [
      "annotated medical manuscripts",
      "inked diagrams of lungs",
      "a quiet study lamp"
    ],
    "voicePatterns": [
      "distinguishes a respected claim from a demonstrated one",
      "reasons patiently through anatomical consequences"
    ],
    "storyEngines": [
      "a student discovers a contradiction in a famous text",
      "a hospital debate tests whether status or evidence carries the day"
    ],
    "evolutionTriggers": [
      "listens to a novice's observation",
      "turns a critique into a clearer teaching method"
    ],
    "tags": [
      "medieval",
      "Ibn-al-Nafis",
      "medicine-history",
      "pulmonary-circulation",
      "critical-inquiry",
      "scholarship"
    ]
  },
  // Research: https://www.gutenberg.net.au/ebooks10/1000871h.html
  {
    "id": "kartini-javanese-education-letters",
    "name": "Raden Ajeng Kartini",
    "era": "19th-century",
    "domain": "leadership",
    "sourceType": "historical-person",
    "essence": "A Javanese writer and advocate for girls' education whose correspondence connected personal restrictions with wider questions of learning and social change.",
    "strengths": [
      "persuasive correspondence",
      "educational vision",
      "solidarity across distance"
    ],
    "shadows": [
      "fictional tension: takes too much responsibility for reform",
      "fictional tension: can sacrifice private hopes to public expectations"
    ],
    "contradiction": "A voice confined by social rules can travel far enough to help others imagine open doors.",
    "visualMotifs": [
      "carefully folded letters",
      "schoolroom windows",
      "a desk shared with sisters"
    ],
    "voicePatterns": [
      "makes a personal anecdote reveal an institutional problem",
      "pairs warmth with precise demands"
    ],
    "storyEngines": [
      "a circle of correspondents creates an informal school",
      "an unexpected patron offers help at the price of compromise"
    ],
    "evolutionTriggers": [
      "trusts others to carry the work forward",
      "builds a learning space that survives its founder"
    ],
    "tags": [
      "Indonesia",
      "Java",
      "Kartini",
      "education",
      "letters",
      "women-advocacy",
      "colonial-era"
    ]
  },
  // Research: https://physicstoday.aip.org/news/jagadish-chandra-bose
  {
    "id": "jagadish-chandra-bose-plant-physics",
    "name": "Jagadish Chandra Bose",
    "era": "early-modern",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "A physicist and plant researcher who connected experimental instrumentation, wireless-wave studies and questions about living responses.",
    "strengths": [
      "inventive measurement",
      "cross-disciplinary curiosity",
      "public demonstration"
    ],
    "shadows": [
      "fictional tension: pursues a beautiful experiment past its practical limits",
      "fictional tension: resists useful collaboration when recognition is unequal"
    ],
    "contradiction": "An investigator of invisible signals must make the smallest responses visible to skeptical audiences.",
    "visualMotifs": [
      "delicate crescograph apparatus",
      "laboratory glass and metal",
      "plant stems beside signal instruments"
    ],
    "voicePatterns": [
      "explains abstractions through demonstrations",
      "asks what a sensitive instrument might reveal"
    ],
    "storyEngines": [
      "a neglected laboratory builds an instrument no patron believes in",
      "an experiment forces rival disciplines to share a vocabulary"
    ],
    "evolutionTriggers": [
      "opens the laboratory to new collaborators",
      "revises a favored hypothesis after better measurements"
    ],
    "tags": [
      "India",
      "Bengal",
      "Jagadish-Chandra-Bose",
      "plant-physiology",
      "radio-research",
      "instrumentation"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/rukada-natya-traditional-string-puppet-drama-in-sri-lanka-01370
  // Character traits, flaws and plot hooks are fictional extrapolations, not biographical claims.
  {
    "id": "sri-lankan-rukada-natya",
    "name": "Sri Lankan Rūkada Nātya String-Puppet Drama",
    "era": "contemporary",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "Family-based Sri Lankan string-puppet theatre brings carved figures, handmade scripts, music, humor, and moral debate into shared public performances.",
    "strengths": [
      "nimble collaborative staging",
      "accessible moral storytelling",
      "inventive puppet craftsmanship"
    ],
    "shadows": [
      "a neat lesson can flatten a complicated person",
      "a family troupe may resist unfamiliar interpretations"
    ],
    "contradiction": "The puppeteer can make a figure move perfectly yet must learn when to surrender control of the story.",
    "visualMotifs": [
      "carved wooden figures suspended on strings",
      "painted portable stage",
      "handwritten dialogue sheets",
      "lamplit puppet shadows"
    ],
    "voicePatterns": [
      "switches between contrasting character registers",
      "uses a comic aside to reveal a serious dilemma",
      "lets a chorus challenge a narrator"
    ],
    "storyEngines": [
      "a puppet begins telling a different ending than its maker planned",
      "two generations disagree over which village story belongs onstage",
      "a festival performance turns into a public reconciliation"
    ],
    "evolutionTriggers": [
      "invites a newcomer to co-write a scene",
      "accepts an ending without a tidy moral",
      "shares the craft rather than guarding every string"
    ],
    "tags": [
      "Sri Lanka",
      "Rukada Natya",
      "string-puppetry",
      "community-theatre",
      "craft",
      "humor",
      "intergenerational"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/pirekua-traditional-song-of-the-purhepecha-00398
  // Character traits, flaws and plot hooks are fictional extrapolations, not biographical claims.
  {
    "id": "purhepecha-pirekua",
    "name": "P’urhépecha Pirekua Song and Social Mediation",
    "era": "contemporary",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "P’urhépecha song practice in Michoacán connects intimate lyrics, community memory, stylistic variation, and the work of communicating across households.",
    "strengths": [
      "tactful emotional translation",
      "symbolic lyric invention",
      "careful listening across generations"
    ],
    "shadows": [
      "may speak through songs rather than directly",
      "can become trapped in an idealized memory"
    ],
    "contradiction": "A singer trusted to voice everyone's feelings struggles to say what they personally need.",
    "visualMotifs": [
      "handwritten verses folded into a pocket",
      "small ensemble in a courtyard",
      "string instruments beside a doorway",
      "market-day gathering"
    ],
    "voicePatterns": [
      "begins with a modest image before revealing its meaning",
      "shifts from intimate confession to communal address",
      "uses refrains as invitations rather than commands"
    ],
    "storyEngines": [
      "a disputed family history is carried in two versions of one song",
      "an old refrain becomes a message between estranged neighbors",
      "a new singer challenges the rule of who may tell a story"
    ],
    "evolutionTriggers": [
      "speaks plainly when music is insufficient",
      "learns a rival community's variation respectfully",
      "allows a younger voice to change the refrain"
    ],
    "tags": [
      "Mexico",
      "Michoacan",
      "P'urhepecha",
      "Pirekua",
      "oral-song",
      "social-mediation",
      "lyric-memory"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/indonesian-angklung-00393
  // Character traits, flaws and plot hooks are fictional extrapolations, not biographical claims.
  {
    "id": "indonesian-angklung-ensemble",
    "name": "Indonesian Angklung Ensemble Craft",
    "era": "contemporary",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "Bamboo instruments tuned to individual pitches make a melody possible only when many players coordinate, listen, and share responsibility.",
    "strengths": [
      "collective timing",
      "material ingenuity",
      "patient group teaching"
    ],
    "shadows": [
      "fears disrupting the ensemble",
      "can mistake harmony for unquestioning agreement"
    ],
    "contradiction": "A musician who holds only one note must learn that a small contribution can still be indispensable.",
    "visualMotifs": [
      "suspended bamboo tubes",
      "rattan bindings",
      "hands poised to shake frames",
      "a circle of differently sized instruments"
    ],
    "voicePatterns": [
      "counts entrances gently",
      "asks who has not been heard",
      "explains teamwork through short musical phrases"
    ],
    "storyEngines": [
      "one missing instrument changes a whole festival arrangement",
      "an impatient soloist must teach a group to listen",
      "a damaged bamboo frame inspires a new collaboration"
    ],
    "evolutionTriggers": [
      "takes responsibility for an imperfect entrance",
      "lets an unconventional rhythm join the ensemble",
      "recognizes the value of a quiet player"
    ],
    "tags": [
      "Indonesia",
      "angklung",
      "bamboo-music",
      "ensemble",
      "cooperation",
      "craft",
      "rhythm"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/chidaoba-wrestling-in-georgia-01371
  // Character traits, flaws and plot hooks are fictional extrapolations, not biographical claims.
  {
    "id": "georgian-chidaoba-wrestling",
    "name": "Georgian Chidaoba Wrestling and Fair Contest",
    "era": "contemporary",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "Georgian wrestling combines athletic technique, ceremonial music, movement, and a code of respectful contest in a public arena.",
    "strengths": [
      "adaptive physical strategy",
      "discipline under pressure",
      "respect for a worthy opponent"
    ],
    "shadows": [
      "may confuse public victory with personal worth",
      "struggles to withdraw from a challenge"
    ],
    "contradiction": "A fierce competitor discovers that honoring a rival can matter more than the final hold.",
    "visualMotifs": [
      "open-air wrestling ring",
      "chokha-inspired ceremonial garment details",
      "zurna and doli instruments",
      "dust lifted by quick footwork"
    ],
    "voicePatterns": [
      "short respectful challenges",
      "praises a rival's technique before debating it",
      "turns physical setbacks into practical lessons"
    ],
    "storyEngines": [
      "a tournament rival becomes an emergency ally",
      "a veteran is asked to judge a match involving a friend",
      "a dancer and wrestler exchange skills for a festival"
    ],
    "evolutionTriggers": [
      "chooses fairness over applause",
      "learns to lose without humiliation",
      "protects a novice's dignity"
    ],
    "tags": [
      "Georgia",
      "Chidaoba",
      "wrestling",
      "fair-play",
      "martial-performance",
      "dance",
      "sportsmanship"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/traditional-weaving-of-al-sadu-02158
  // Character traits, flaws and plot hooks are fictional extrapolations, not biographical claims.
  {
    "id": "al-sadu-desert-weaving",
    "name": "Al Sadu Bedouin Weaving Knowledge",
    "era": "contemporary",
    "domain": "design",
    "sourceType": "tradition",
    "essence": "Bedouin textile knowledge uses ground looms, natural fibers, rhythmic geometric patterning, and mentorship to carry desert experience into durable cloth.",
    "strengths": [
      "material patience",
      "pattern memory",
      "resourceful design under constraints"
    ],
    "shadows": [
      "can guard expertise too closely",
      "may equate a familiar pattern with the only acceptable one"
    ],
    "contradiction": "A maker devoted to continuity must decide which changes keep a tradition alive rather than erase it.",
    "visualMotifs": [
      "ground loom stretched close to the earth",
      "red and orange geometric bands",
      "bundles of spun fibers",
      "repeated diamond and stripe patterns"
    ],
    "voicePatterns": [
      "teaches through repeated hand motions",
      "compares decisions to warp and weft",
      "notices small variations without shaming learners"
    ],
    "storyEngines": [
      "a weather-damaged textile must be reconstructed from memory",
      "a new apprentice proposes a controversial pattern",
      "two households need a shared design for a journey"
    ],
    "evolutionTriggers": [
      "documents a technique for wider teaching",
      "welcomes an apprentice's practical adaptation",
      "accepts that a repaired cloth can be more meaningful than a flawless one"
    ],
    "tags": [
      "Bedouin",
      "Al Sadu",
      "Kuwait",
      "Saudi Arabia",
      "Qatar",
      "weaving",
      "women-artisans",
      "geometry",
      "desert-craft"
    ]
  },
  // Research: https://www.cambridge.org/core/journals/hegel-bulletin/article/hegel-and-the-hatata-zara-yaqob-africa-in-the-philosophy-of-history-and-the-history-of-philosophy/84406A55A4A91EA580F022985A3862CB
  // Character traits, flaws and plot hooks are fictional extrapolations, not biographical claims.
  {
    "id": "ethiopian-hatata-inquiry",
    "name": "Ethiopian Ḥatäta Philosophical Inquiry",
    "era": "early-modern",
    "domain": "philosophy",
    "sourceType": "tradition",
    "essence": "The Ethiopian Ḥatäta text attributed to Zera Yacob explores conscience, reason, religious disagreement, and the moral duty to examine inherited claims; its authorship remains debated.",
    "strengths": [
      "independent ethical reflection",
      "reasoned tolerance",
      "patient scrutiny of authority"
    ],
    "shadows": [
      "can become isolated in perpetual questioning",
      "may overestimate the power of argument to heal wounds"
    ],
    "contradiction": "A thinker distrusts imposed certainty yet longs for a principle strong enough to unite people in conflict.",
    "visualMotifs": [
      "inked Ge'ez manuscript pages",
      "a lamp beside a solitary writing desk",
      "forking paths through highland stone",
      "questions written in margins"
    ],
    "voicePatterns": [
      "tests an assertion against conscience",
      "distinguishes a belief from its justification",
      "poses a difficult question without mocking the believer"
    ],
    "storyEngines": [
      "two neighbors invoke incompatible traditions to settle one dispute",
      "a hidden manuscript complicates a revered account",
      "a mediator must decide when reasoning needs to become action"
    ],
    "evolutionTriggers": [
      "listens to testimony before offering a principle",
      "acknowledges uncertainty about a cherished text",
      "makes a compassionate decision without total certainty"
    ],
    "tags": [
      "Ethiopia",
      "Hatata",
      "Zera Yacob attribution",
      "philosophy",
      "ethical-reason",
      "religious-pluralism",
      "authorship-debate"
    ]
  },
  // Research: https://plato.stanford.edu/entries/al-kindi/
  // Character traits, flaws and plot hooks are fictional extrapolations, not biographical claims.
  {
    "id": "al-kindi-mathematical-philosophy",
    "name": "Al-Kindī and Mathematical Philosophy",
    "era": "medieval",
    "domain": "philosophy",
    "sourceType": "historical-person",
    "essence": "The ninth-century philosopher Al-Kindī worked across translated philosophy, mathematics, optics, music, and natural inquiry, treating different fields as mutually illuminating.",
    "strengths": [
      "cross-disciplinary synthesis",
      "geometric clarity",
      "intellectual bridge-building"
    ],
    "shadows": [
      "may force messy experience into elegant systems",
      "can speak above a collaborator's practical concerns"
    ],
    "contradiction": "A translator of ideas seeks a universal structure while relying on many distinct intellectual traditions.",
    "visualMotifs": [
      "geometric ray diagrams",
      "manuscript folios in several hands",
      "measured strings and musical intervals",
      "ink-stained calculation boards"
    ],
    "voicePatterns": [
      "defines a term before arguing",
      "moves from an everyday example to a mathematical analogy",
      "asks whether two disciplines describe the same pattern"
    ],
    "storyEngines": [
      "a translated passage changes the course of a scientific dispute",
      "a musical instrument reveals a flaw in a calculation",
      "a patron demands certainty where the evidence is incomplete"
    ],
    "evolutionTriggers": [
      "credits a neglected collaborator",
      "revises a beautiful but wrong model",
      "learns to explain an idea without hiding its limits"
    ],
    "tags": [
      "Al-Kindi",
      "Arabic-philosophy",
      "Abbasid-era",
      "optics",
      "mathematics",
      "translation",
      "interdisciplinary"
    ]
  },
  // Research: https://www.epoche.online/lesson/shen-kuo/shen-kuo-dream-pool
  // Character traits, flaws and plot hooks are fictional extrapolations, not biographical claims.
  {
    "id": "shen-kuo-observational-polymath",
    "name": "Shen Kuo and Dream Pool Observation",
    "era": "medieval",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "Song-dynasty polymath Shen Kuo connected notebooks, field observation, engineering, astronomy, and changing landscapes in a restless search for practical explanations.",
    "strengths": [
      "empirical curiosity",
      "careful recordkeeping",
      "connections across technical fields"
    ],
    "shadows": [
      "pursues too many puzzles at once",
      "can underestimate the political consequences of a finding"
    ],
    "contradiction": "An official tasked with maintaining order becomes most creative when an observation unsettles accepted explanations.",
    "visualMotifs": [
      "brush-written field notebooks",
      "magnetized needle beside a map",
      "fossil shells in mountain stone",
      "astronomical instrument silhouettes"
    ],
    "voicePatterns": [
      "begins with what was directly observed",
      "offers a testable alternative to received wisdom",
      "links a small anomaly to a larger question"
    ],
    "storyEngines": [
      "a strange fossil overturns a village legend about the landscape",
      "a compass points slightly away from the expected route",
      "an ignored notebook contains a solution to a public engineering failure"
    ],
    "evolutionTriggers": [
      "shares an observation before it is fully polished",
      "accepts a craftsperson's practical correction",
      "chooses a narrow urgent problem over endless collecting"
    ],
    "tags": [
      "China",
      "Shen Kuo",
      "Song dynasty",
      "Dream Pool Essays",
      "observation",
      "magnetism",
      "geology",
      "engineering"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/music-of-the-imzad-of-the-tuareg-communities-00891
  {
    "id": "tuareg-imzad-music",
    "name": "Tuareg Imzad Music and Poetic Accompaniment",
    "era": "contemporary",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "A women-led bowed-string practice across Tuareg communities in Algeria, Mali and Niger links careful listening, poetic memory and music shaped by mood.",
    "strengths": [
      "attentive musical listening",
      "patient oral apprenticeship",
      "subtle emotional expression"
    ],
    "shadows": [
      "a fictional apprentice may fear making mistakes in public",
      "may rely on familiar forms when collaboration asks for change"
    ],
    "contradiction": "A performer can carry communal memory while needing room for a personal voice.",
    "visualMotifs": [
      "single-string bowed gourd instrument",
      "small rosette sound holes",
      "quiet evening gathering",
      "arched wooden bow"
    ],
    "voicePatterns": [
      "responds to stories with brief musical images",
      "listens before choosing a few precise words",
      "uses pauses to signal care"
    ],
    "storyEngines": [
      "a young musician is asked to accompany a new poem",
      "an old instrument needs repair before a community gathering",
      "two apprentices hear different meanings in the same melody"
    ],
    "evolutionTriggers": [
      "performs despite fear of imperfection",
      "learns to share interpretive authority",
      "mentors a younger listener without demanding imitation"
    ],
    "tags": [
      "Tuareg",
      "Algeria",
      "Mali",
      "Niger",
      "imzad",
      "bowed-string",
      "women-musicians",
      "oral-transmission",
      "music"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/orteke-traditional-performing-art-in-kazakhstan-dance-puppet-and-music-01878
  {
    "id": "kazakh-orteke-puppet-performance",
    "name": "Kazakh Orteke Music-and-Puppet Performance",
    "era": "contemporary",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "A dombyra player's finger movements animate a small wooden mountain-goat puppet, joining music, comic timing and skilled hand coordination.",
    "strengths": [
      "rhythmic dexterity",
      "playful teaching",
      "craft-and-performance coordination"
    ],
    "shadows": [
      "a fictional virtuoso may prize cleverness over audience connection",
      "may resist adapting a familiar routine"
    ],
    "contradiction": "The puppet seems independent precisely because the musician must master every hidden connection.",
    "visualMotifs": [
      "carved mountain-goat puppet",
      "dombyra strings",
      "miniature dance platform",
      "fine control threads"
    ],
    "voicePatterns": [
      "explains complicated mechanisms through jokes",
      "uses lively question-and-answer rhythms",
      "leaves space for a child's interpretation"
    ],
    "storyEngines": [
      "a broken control thread threatens a public performance",
      "a child invents an unexpected new puppet step",
      "two makers disagree over whether a puppet should be repaired or replaced"
    ],
    "evolutionTriggers": [
      "welcomes an apprentice's innovation",
      "learns to perform with fewer tricks and more feeling",
      "shares the craft rather than guarding status"
    ],
    "tags": [
      "Kazakhstan",
      "Orteke",
      "dombyra",
      "puppetry",
      "music",
      "woodcraft",
      "rhythm",
      "intergenerational"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/kimjang-making-and-sharing-kimchi-in-the-republic-of-korea-00881
  {
    "id": "korean-kimjang-collective-foodways",
    "name": "Korean Kimjang Collective Foodways",
    "era": "contemporary",
    "domain": "design",
    "sourceType": "tradition",
    "essence": "Seasonal collective preparation and sharing of kimchi connects fermentation know-how with household cooperation, food security and reciprocal care.",
    "strengths": [
      "seasonal planning",
      "resource sharing",
      "intergenerational practical teaching"
    ],
    "shadows": [
      "a fictional organizer may become rigid about the 'right' method",
      "can overlook quieter helpers while coordinating a large group"
    ],
    "contradiction": "A practice of collective generosity can still spark intimate disputes about recipes, ownership and change.",
    "visualMotifs": [
      "large earthenware fermentation vessels",
      "neatly stacked cabbage leaves",
      "shared preparation tables",
      "winter pantry shelves"
    ],
    "voicePatterns": [
      "counts supplies while checking on people",
      "tells small memories through ingredients",
      "offers direct practical encouragement"
    ],
    "storyEngines": [
      "neighbors organize a shared pantry before an early winter",
      "a newcomer introduces an unexpected ingredient",
      "an heirloom recipe sparks a debate over who gets to change it"
    ],
    "evolutionTriggers": [
      "makes space for regional variation",
      "asks for help instead of carrying the whole task",
      "shares credit with the quietest contributor"
    ],
    "tags": [
      "Korea",
      "kimjang",
      "kimchi",
      "fermentation",
      "foodways",
      "mutual-aid",
      "seasonal-cycle",
      "community"
    ]
  },
  // Research: https://ich.unesco.org/en/USL/tais-traditional-textile-01688
  {
    "id": "timor-leste-tais-weaving",
    "name": "Timor-Leste Tais Weaving Knowledge",
    "era": "contemporary",
    "domain": "visual-art",
    "sourceType": "tradition",
    "essence": "Handwoven cotton textiles carry locally varied color, motif and ceremonial meanings, sustained through skilled dyeing, weaving and teaching.",
    "strengths": [
      "patient textile design",
      "material literacy",
      "intergenerational stewardship"
    ],
    "shadows": [
      "a fictional craftsperson may worry that change threatens meaning",
      "may accept unsustainable commissions to protect income"
    ],
    "contradiction": "The cloth connects families while its maker must negotiate who controls the design and its value.",
    "visualMotifs": [
      "handloom threads",
      "plant-dyed cotton",
      "striped woven panels",
      "pattern notebooks"
    ],
    "voicePatterns": [
      "describes relationships through warp and weft",
      "asks where a color came from",
      "gives patient stepwise instructions"
    ],
    "storyEngines": [
      "a workshop must decide how to price its work fairly",
      "a ceremonial textile is repaired for a new generation",
      "an apprentice proposes a pattern with unfamiliar meaning"
    ],
    "evolutionTriggers": [
      "sets fair terms for a commission",
      "documents a technique with community consent",
      "lets a new weaver add an original motif"
    ],
    "tags": [
      "Timor-Leste",
      "Tais",
      "textiles",
      "weaving",
      "natural-dyes",
      "craft-economy",
      "heritage",
      "apprenticeship"
    ]
  },
  // Research: https://ich.unesco.org/en/USL/wosana-ritual-and-associated-practices-02117
  {
    "id": "bakalanga-wosana-community-stewardship",
    "name": "Bakalanga Wosana Community Stewardship",
    "era": "contemporary",
    "domain": "spirituality",
    "sourceType": "tradition",
    "essence": "A rain-related communal tradition among Bakalanga communities of Botswana and nearby Zimbabwe emphasizes collective roles, song, mentoring and safeguarding sacred knowledge.",
    "strengths": [
      "collective coordination",
      "respect for knowledge boundaries",
      "long-term cultural stewardship"
    ],
    "shadows": [
      "a fictional organizer may confuse stewardship with control",
      "may struggle to involve younger volunteers"
    ],
    "contradiction": "Public celebration can support continuity even when some knowledge must remain private.",
    "visualMotifs": [
      "gathering beneath a changing sky",
      "community meeting circles",
      "rain clouds over fields",
      "carefully tended cultural spaces"
    ],
    "voicePatterns": [
      "asks who has consent to share a story",
      "uses inclusive invitations rather than commands",
      "distinguishes public knowledge from protected knowledge"
    ],
    "storyEngines": [
      "a community plans a public heritage exhibition without exposing sacred details",
      "elders and youth negotiate an accessible teaching event",
      "an organizer must respond to an out-of-context commercial portrayal"
    ],
    "evolutionTriggers": [
      "obtains community consent before documenting",
      "builds trust across generations",
      "learns to say no to exploitative requests"
    ],
    "tags": [
      "Botswana",
      "Zimbabwe",
      "Bakalanga",
      "Wosana",
      "community-stewardship",
      "rain",
      "safeguarding",
      "consent",
      "living-heritage"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/ngondo-worship-of-water-oracles-and-associated-cultural-traditions-among-the-sawa-02140
  {
    "id": "sawa-ngondo-water-community",
    "name": "Sawa Ngondo Water and Community Traditions",
    "era": "contemporary",
    "domain": "myth-folklore",
    "sourceType": "tradition",
    "essence": "An annual Sawa gathering in Cameroon joins river-centered cultural identity, public festivities, intergenerational roles and communal deliberation; sacred components are not templates for imitation.",
    "strengths": [
      "public-event organization",
      "intergenerational mediation",
      "river stewardship"
    ],
    "shadows": [
      "a fictional spokesperson may mistake visibility for consensus",
      "can prioritize ceremony logistics over everyday needs"
    ],
    "contradiction": "A community speaks together through public celebration while protecting the distinct responsibilities of its members.",
    "visualMotifs": [
      "Wouri riverbank",
      "festival canoes viewed from shore",
      "community notice boards",
      "craft fair canopies"
    ],
    "voicePatterns": [
      "invites multiple viewpoints before summarizing",
      "links plans to shared responsibility",
      "uses calm public announcements"
    ],
    "storyEngines": [
      "volunteers organize river cleanup alongside a festival",
      "a community archivist seeks permission to record public performances",
      "two neighborhoods negotiate shared responsibilities for a celebration"
    ],
    "evolutionTriggers": [
      "includes a previously unheard neighbor",
      "chooses ecological repair over prestige",
      "respects a boundary around sacred knowledge"
    ],
    "tags": [
      "Cameroon",
      "Sawa",
      "Ngondo",
      "Wouri",
      "river",
      "community-festival",
      "stewardship",
      "cultural-consent"
    ]
  },
  // Research: https://www.acs.org/education/whatischemistry/landmarks/alice-ball.html
  {
    "id": "alice-augusta-ball-chemistry",
    "name": "Alice Augusta Ball and Applied Chemistry",
    "era": "early-modern",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "A pioneering early-twentieth-century chemist developed an injectable preparation from chaulmoogra oil that improved treatment for Hansen's disease; her scientific contribution was recognized fully only later.",
    "strengths": [
      "experimental precision",
      "applied chemical ingenuity",
      "focus on human benefit"
    ],
    "shadows": [
      "a fictional scientist inspired by the theme may overwork in pursuit of proof",
      "may neglect to document shared contributions"
    ],
    "contradiction": "A breakthrough can transform many lives even while its originator is denied timely recognition.",
    "visualMotifs": [
      "glass laboratory flasks",
      "handwritten reaction notes",
      "botanical oil samples",
      "careful bench labels"
    ],
    "voicePatterns": [
      "explains results in concrete steps",
      "separates observed effects from hypotheses",
      "asks whose work is missing from the record"
    ],
    "storyEngines": [
      "a lab notebook reveals a forgotten contributor",
      "a treatment prototype needs an ethical clinical partner",
      "a young researcher challenges a flawed attribution"
    ],
    "evolutionTriggers": [
      "establishes transparent credit practices",
      "shares methods so others can verify them",
      "asks how research reaches people who need it"
    ],
    "tags": [
      "Alice Ball",
      "Alice Augusta Ball",
      "chemistry",
      "Hawaii",
      "Hansen's disease",
      "research-credit",
      "medical-history",
      "early-20th-century"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/gesar-epic-tradition-00204
  {
    "id": "gesar-epic-storytelling-tradition",
    "name": "Gesar Epic Oral Storytelling Tradition",
    "era": "medieval",
    "domain": "literature",
    "sourceType": "tradition",
    "essence": "Tibetan, Mongolian and Tu epic narrators transmit a vast heroic cycle through locally varied episodes, alternating spoken and sung narration, gesture and memory.",
    "strengths": [
      "episodic narrative architecture",
      "improvisational recall",
      "community-centered teaching"
    ],
    "shadows": [
      "a fictional storyteller may idealize heroic authority",
      "may struggle to honor competing versions of a tale"
    ],
    "contradiction": "One shared epic can preserve continuity precisely because its tellers keep many versions alive.",
    "visualMotifs": [
      "bronze storyteller's mirror",
      "strings of narrative beads",
      "fiddle beside a storyteller",
      "mountain gathering at dusk"
    ],
    "voicePatterns": [
      "alternates intimate detail with sweeping scale",
      "marks transitions through repeated narrative motifs",
      "asks listeners which version they know"
    ],
    "storyEngines": [
      "two narrators disagree about a hero's forgotten choice",
      "a young performer discovers an overlooked minor character",
      "a community archive preserves several contradictory tellings"
    ],
    "evolutionTriggers": [
      "credits another lineage's telling",
      "gives an overlooked character agency",
      "chooses to preserve variation instead of enforcing a single canon"
    ],
    "tags": [
      "Gesar",
      "King Gesar",
      "Tibetan",
      "Mongolian",
      "Tu",
      "oral-epic",
      "storytelling",
      "narrative-variation",
      "folklore"
    ]
  },
  // Creative tensions below are fictional story ingredients, not biographical or cultural generalizations.
  // Research: https://ich.unesco.org/en/RL/traditional-craftsmanship-of-making-dumbara-rata-kalala-01693
  {
    "id": "dumbara-rata-kalala-weaving",
    "name": "Dumbara Ratā Kalāla Mat Weaving",
    "era": "contemporary",
    "domain": "design",
    "sourceType": "tradition",
    "essence": "Sri Lankan Kinnara artisans translate hana plant fibres, natural dyes and symbolic patterns into durable woven mats while sustaining inherited craft knowledge.",
    "strengths": [
      "patient material preparation",
      "geometric composition",
      "intergenerational teaching"
    ],
    "shadows": [
      "may guard a pattern too tightly",
      "can prioritize flawless repetition over a new apprentice's ideas"
    ],
    "contradiction": "A keeper of inherited designs must decide how much change a living tradition can welcome.",
    "visualMotifs": [
      "sun-dried hana fibres",
      "handloom with patterned mat",
      "earth-toned botanical dyes"
    ],
    "voicePatterns": [
      "explains a difficult choice through warp and weft",
      "notices small differences in texture before making judgments"
    ],
    "storyEngines": [
      "a new commission demands a motif the workshop has never attempted",
      "a young weaver asks who gets to own a family pattern"
    ],
    "evolutionTriggers": [
      "invites an apprentice to invent a variation",
      "shares credit for a collective design"
    ],
    "tags": [
      "Sri-Lanka",
      "Dumbara",
      "Kinnara-artisans",
      "weaving",
      "hana-fibre",
      "craft-transmission",
      "pattern"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/ceebu-jn-the-culinary-art-of-senegal-01748
  {
    "id": "ceebu-jen-senegal-culinary-art",
    "name": "Ceebu Jën Culinary Art of Senegal",
    "era": "contemporary",
    "domain": "design",
    "sourceType": "tradition",
    "essence": "A Saint-Louis-rooted Senegalese culinary practice brings fish, rice, vegetables and shared table etiquette into a language of hospitality and belonging.",
    "strengths": [
      "careful preparation",
      "resourceful seasonal planning",
      "welcoming hospitality"
    ],
    "shadows": [
      "may treat a family recipe as an unbreakable rule",
      "can exhaust themselves while hosting others"
    ],
    "contradiction": "A generous host who feeds everyone struggles to make room for another person's way of caring.",
    "visualMotifs": [
      "communal rice platter",
      "market baskets of seasonal vegetables",
      "sunlit coastal kitchen"
    ],
    "voicePatterns": [
      "asks about guests before describing a menu",
      "tells stories through ingredients and occasions"
    ],
    "storyEngines": [
      "a storm disrupts the market before an important meal",
      "two cooks must negotiate different regional preparations"
    ],
    "evolutionTriggers": [
      "accepts a guest's thoughtful adaptation",
      "learns to delegate the celebration"
    ],
    "tags": [
      "Senegal",
      "Saint-Louis",
      "ceebu-jen",
      "thieboudienne",
      "culinary-heritage",
      "hospitality",
      "shared-meals"
    ]
  },
  // Research: https://ich.unesco.org/en/usl/mongol-biyelgee-mongolian-traditional-folk-dance-00311
  {
    "id": "mongol-biyelgee-folk-dance",
    "name": "Mongol Biyelgee Folk Dance",
    "era": "contemporary",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "Mongolian dancers use precise hand, shoulder and seated movements in intimate spaces to express varied nomadic lifeways and community histories.",
    "strengths": [
      "expressive precision",
      "adaptation to limited space",
      "family-based mentorship"
    ],
    "shadows": [
      "may mistake unfamiliar movement for disrespect",
      "can hide stage fright behind strict technique"
    ],
    "contradiction": "A performer who can tell a vast landscape's story within a small ger fears stepping into a larger stage.",
    "visualMotifs": [
      "compact ger interior",
      "embroidered sleeves in motion",
      "hands tracing everyday work"
    ],
    "voicePatterns": [
      "explains emotions as movement sequences",
      "pauses to watch how others occupy space"
    ],
    "storyEngines": [
      "an elder and a young dancer disagree over a public performance",
      "a cramped gathering becomes an unexpected dance lesson"
    ],
    "evolutionTriggers": [
      "learns from a different community's variation",
      "finds confidence without abandoning intimate performance"
    ],
    "tags": [
      "Mongolia",
      "biyelgee",
      "folk-dance",
      "ger",
      "embodied-memory",
      "apprenticeship",
      "performance"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/makishi-masquerade-00140
  {
    "id": "makishi-masquerade-zambia",
    "name": "Makishi Masquerade of Zambia",
    "era": "contemporary",
    "domain": "myth-folklore",
    "sourceType": "tradition",
    "essence": "Public masked dance and dramatic performance among Luvale, Chokwe, Luchazi and Mbunda communities convey ancestral memory and communal transition within a wider ceremonial context.",
    "strengths": [
      "ensemble coordination",
      "symbolic storytelling",
      "community responsibility"
    ],
    "shadows": [
      "may confuse the public spectacle with the whole tradition",
      "can resist questions about who may interpret a performance"
    ],
    "contradiction": "A fictional festival organizer wants to share the beauty of a performance while protecting knowledge that is not theirs to reveal.",
    "visualMotifs": [
      "public dance circle",
      "painted performance masks without replicating restricted designs",
      "gathering at a village celebration"
    ],
    "voicePatterns": [
      "uses careful language about community permissions",
      "lets gesture carry meaning before explanation"
    ],
    "storyEngines": [
      "a visitor requests access to a private ceremony and must be refused respectfully",
      "a youth troupe plans a public celebration with elder guidance"
    ],
    "evolutionTriggers": [
      "chooses consent over publicity",
      "helps document only what custodians wish to share"
    ],
    "tags": [
      "Zambia",
      "makishi",
      "public-masquerade",
      "community-consent",
      "ceremonial-performance",
      "oral-heritage",
      "mentorship"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/al-azi-elegy-processional-march-and-poetry-00850
  {
    "id": "omani-al-azi-processional-poetry",
    "name": "Omani Al ‘Azi Processional Poetry",
    "era": "contemporary",
    "domain": "music",
    "sourceType": "tradition",
    "essence": "Northern Omani sung poetry brings a lead poet and responding chorus together through procession, movement, improvisation and communal remembrance.",
    "strengths": [
      "responsive leadership",
      "oral memory",
      "conflict mediation"
    ],
    "shadows": [
      "can favor grand declarations over quiet listeners",
      "may equate group unity with agreement"
    ],
    "contradiction": "A gifted leader can summon a chorus but must learn to hear the person who stays silent.",
    "visualMotifs": [
      "processional formation",
      "poet and answering chorus",
      "rhythmic steps at a gathering"
    ],
    "voicePatterns": [
      "builds statements toward a collective response",
      "weaves historical memory into present disagreements"
    ],
    "storyEngines": [
      "a village dispute threatens a planned public celebration",
      "an inexperienced poet must guide a chorus through an unexpected interruption"
    ],
    "evolutionTriggers": [
      "makes room for dissent within celebration",
      "invites a younger voice to lead"
    ],
    "tags": [
      "Oman",
      "al-azi",
      "processional-poetry",
      "chorus",
      "oral-memory",
      "improvisation",
      "community-unity"
    ]
  },
  // Research: https://ich.unesco.org/en/RL/tbourida-01483
  {
    "id": "moroccan-tbourida-equestrian-performance",
    "name": "Moroccan Tbourida Equestrian Performance",
    "era": "contemporary",
    "domain": "film-performance",
    "sourceType": "tradition",
    "essence": "Moroccan Arab-Amazigh equestrian troupes combine coordinated riding, ceremonial attire and choreographed displays rooted in historical parade traditions.",
    "strengths": [
      "precise teamwork",
      "animal care",
      "calm under pressure"
    ],
    "shadows": [
      "may prize perfect synchronization above individual needs",
      "can become preoccupied with public acclaim"
    ],
    "contradiction": "A celebrated troupe captain must choose between a flawless display and the welfare of a tired horse.",
    "visualMotifs": [
      "ornamented saddles",
      "riders aligned across an arena",
      "dust rising beneath horses' hooves"
    ],
    "voicePatterns": [
      "gives concise coordinated cues",
      "talks about trust as something practiced rather than proclaimed"
    ],
    "storyEngines": [
      "a horse refuses the expected formation before a major event",
      "two generations disagree about what makes a performance honorable"
    ],
    "evolutionTriggers": [
      "changes the routine to protect an animal",
      "credits the stable team rather than the captain alone"
    ],
    "tags": [
      "Morocco",
      "tbourida",
      "equestrian-arts",
      "Arab-Amazigh",
      "team-coordination",
      "horse-welfare",
      "ceremony"
    ]
  },
  // Research: https://www.journals.uchicago.edu/doi/10.1086/348609
  {
    "id": "ibn-al-shatir-astronomy",
    "name": "Ibn al-Shatir and Geometric Astronomy",
    "era": "medieval",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "A fourteenth-century Damascus astronomer whose mathematical reworking of planetary models inspires exact observation and the courage to revise elegant inherited systems.",
    "strengths": [
      "geometric reasoning",
      "observational patience",
      "constructive skepticism"
    ],
    "shadows": [
      "a fictional admirer may overvalue a perfect model",
      "can lose collaborators in technical detail"
    ],
    "contradiction": "An investigator trusts mathematics enough to challenge the mathematics they inherited.",
    "visualMotifs": [
      "interlocking celestial circles",
      "astronomical manuscript margins",
      "night-sky measurement sketches"
    ],
    "voicePatterns": [
      "explains disagreements through testable diagrams",
      "rephrases complex motions as simple geometric relationships"
    ],
    "storyEngines": [
      "a trusted star chart fails during an urgent navigation task",
      "a junior observer finds an error in a respected model"
    ],
    "evolutionTriggers": [
      "publishes a correction openly",
      "invites a rival to test the new model"
    ],
    "tags": [
      "Damascus",
      "ibn-al-shatir",
      "ibn-ash-shatir",
      "medieval-astronomy",
      "planetary-models",
      "geometry",
      "observation"
    ]
  },
  // Research: https://www.harvardmagazine.com/2010/01/pharmacologist-li-shizhen-biography
  {
    "id": "li-shizhen-materia-medica",
    "name": "Li Shizhen and the Bencao Gangmu",
    "era": "renaissance",
    "domain": "science",
    "sourceType": "historical-person",
    "essence": "A Ming-era physician and compiler whose comparative study of names, substances and historical medical texts inspires meticulous classification and critical reading.",
    "strengths": [
      "cross-checking sources",
      "taxonomic organization",
      "persistence across long projects"
    ],
    "shadows": [
      "a fictional scholar may collect more than they can verify",
      "can confuse a complete catalogue with settled truth"
    ],
    "contradiction": "A cataloguer devoted to preserving inherited knowledge becomes most useful by questioning it.",
    "visualMotifs": [
      "annotated specimen pages",
      "stacked woodblock volumes",
      "plant sketches beside marginal corrections"
    ],
    "voicePatterns": [
      "asks what different communities call the same thing",
      "distinguishes an observation from a reported claim"
    ],
    "storyEngines": [
      "two similar names conceal dangerously different specimens",
      "a family must finish and publish an unfinished reference work"
    ],
    "evolutionTriggers": [
      "marks uncertain claims instead of repeating them",
      "recognizes editors and field informants as collaborators"
    ],
    "tags": [
      "Ming-China",
      "li-shizhen",
      "bencao-gangmu",
      "materia-medica",
      "classification",
      "history-of-medicine",
      "source-criticism"
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
