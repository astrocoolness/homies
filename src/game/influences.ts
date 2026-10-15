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
  }
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
