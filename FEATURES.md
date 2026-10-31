# HOMIES Feature Backlog

Saved 2026-10-31. Specs from planning sessions; not yet built.

## Mood System (specced)
- Three stats: energy, hunger, mood.
- Energy decays ~1 point per 45 minutes; hunger ~1 per 30; mood drifts toward neutral at 0.5/hour unless pushed.
- Feeding: hunger +20, mood +5. Playing: energy -10, mood +15. Sleeping restores energy (only while app open in background, or catch-up on next visit).
- Scene gating via prompt suffixes on the existing xAI path: energy <20 adds "sleepy, dim light, curled up"; hunger <20 adds "looking at an empty food bowl"; mood <30 adds "sad, head down".
- Storage: single JSON blob in Supabase keyed by homie ID, updated on every care action and visit. Decay computed from last-updated timestamp at read time. No cron jobs.

## Mini-Games (specced)
- Beat Bounce: pick any track from the WUSB/WRIR logged database, plays through speaker, two on-screen buttons (left/right paw) light up with the beat. Tap on cue = bounce; miss = stumble. Streak milestones trigger a short celebratory xAI clip via the reel path.
- Difficulty scales with BPM from stored track metadata tempo. 100 BPM blues = forgiving, 175 BPM drum and bass = chaos.
- Storage: high score per track per homie in the same Supabase blob.
- Beat detection approximated server-side from metadata tempo field, not live audio analysis.

## Photo Mode
- One-tap still capture of the current room frame as a polaroid-style shareable card. No video generation cost — just the image-edit output.

## Evolution Tiers
- After a set number of episodes or care streaks, the homie unlocks a new visual variant (winter coat, glow effect) rendered as prompt modifiers on the existing xAI path.

## Neighborhood Map
- Zoomable canvas where each user's homie sits on a street; walk past others' rooms. Connects to the live music venue map concept on rva.guru.

## Dream Journal
- When a homie sleeps, generate a one-line "dream" from a random track in the database, e.g. "dreamed of a slow techno sunrise." Blends music and pet systems.

## Shareable Reel Cards
- Finished ten-second moments get an auto-generated caption and export button for Stories/Reels.

## Breeding
- Two homies with high mood produce a third with blended traits. Natural hook for Homies 2.0 MySpace profiles.

## Trade Posts
- Marketplace where homies get listed with a price in in-app currency earned from episodes. Ties radio/track-logging into the pet side.

## Voice Lines
- Short TTS clips per homie using name + canned phrase library. Audio feedback on Care actions without video generation cost.

## Rival Homies
- NPCs that occasionally appear in your room; feed or ignore them. Light social drama.

## Seasonal Events
- Setting string swap with a badge, e.g. Halloween room variant.

## Homie Radio
- Each homie gets a mini station seeded from their taste profile across the track database.
