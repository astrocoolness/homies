import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { askHomie, boredLine } from "@/game/chat";
import { bioOf, nameOf } from "@/game/content";
import { playSound } from "@/game/sfx";
import { useHomies } from "@/game/store";

type Msg = { who: "you" | "them"; text: string };
type Thread = { messages: Msg[]; answers: number; done: boolean };

const EMPTY: Thread = { messages: [], answers: 0, done: false };
const memory = new Map<string, Thread>();

function voiceOf(id: string, job: string, home: string) {
  const name = nameOf(id);
  const bio = bioOf(id);
  if (id === "tony") return `${name}. Lazy, social, impulsive. Drives a cab, wants pancakes, keeps a weird hat.`;
  if (id === "betty") return `${name}. Kind and stubborn. Garden, kitchen, and a cat who will not explain.`;
  if (id === "nori") return `${name}. Curious and strange. Names streets that are not there yet. Lives in a pod.`;
  return `${name}. ${bio} Days: ${job}. Home: ${home}.`;
}

export function ChatSheet({ id, onClose }: { id: string; onClose: () => void }) {
  const homie = useHomies((s) => s.save.homies[id]);
  const muted = useHomies((s) => s.save.muted);
  const [thread, setThread] = useState<Thread>(() => memory.get(id) ?? EMPTY);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const name = nameOf(id);

  useEffect(() => {
    const box = scroller.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [thread.messages, sending]);

  if (!homie || homie.hatchedAt == null) return null;

  function remember(next: Thread) {
    memory.set(id, next);
    setThread(next);
  }

  async function send(event: React.FormEvent) {
    event.preventDefault();
    const question = draft.replace(/\s+/g, " ").trim().slice(0, 180);
    if (!question || sending || thread.done) return;
    setDraft("");
    if (homie.sleeping) {
      remember({
        ...thread,
        messages: [...thread.messages, { who: "you", text: question }, { who: "them", text: `${name} is asleep. The question can wait.` }],
      });
      return;
    }
    const turn = thread.answers;
    const pending: Thread = {
      ...thread,
      messages: [...thread.messages, { who: "you", text: question }],
    };
    remember(pending);
    setSending(true);
    try {
      const profile = homie.profile;
      const reply = await askHomie({
        data: {
          name,
          voice: voiceOf(id, profile?.job ?? "", profile?.homeTitle ?? ""),
          question,
          turn,
        },
      });
      const messages: Msg[] = [...pending.messages, { who: "them", text: reply.text }];
      const answers = turn + 1;
      const done = answers >= 3;
      if (done) messages.push({ who: "them", text: boredLine(id) });
      remember({ messages, answers, done });
      playSound("talk", muted);
    } catch {
      const messages: Msg[] = [
        ...pending.messages,
        { who: "them", text: `${name} lost the thought. Ask that one again.` },
      ];
      remember({ ...pending, messages });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-cream px-4 pt-4 pb-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl text-ink">{name}</h2>
          <p className="text-sm text-ink-soft">{thread.done ? "Done with questions" : `${3 - thread.answers} questions left`}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex size-11 items-center justify-center rounded-full bg-paper text-ink"
        >
          <X className="size-5" />
        </button>
      </div>
      <div ref={scroller} className="mt-3 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        {thread.messages.length === 0 && !sending && (
          <p className="text-pretty text-sm text-ink-soft">Ask {name} something. They'll answer three times, then get bored.</p>
        )}
        {thread.messages.map((msg, index) => (
          <p
            key={`${index}-${msg.text.slice(0, 12)}`}
            className={
              msg.who === "you"
                ? "ml-auto max-w-[85%] rounded-2xl bg-tomato px-3 py-2 text-pretty text-paper"
                : "mr-auto max-w-[85%] rounded-2xl bg-paper px-3 py-2 text-pretty text-ink"
            }
          >
            {msg.text}
          </p>
        ))}
        {sending && <p className="mr-auto rounded-2xl bg-paper px-3 py-2 text-ink-soft">...</p>}
      </div>
      {thread.done ? (
        <p className="mt-3 text-center text-sm text-ink-soft">{name} stopped answering.</p>
      ) : (
        <form className="mt-3 flex gap-2" onSubmit={(event) => void send(event)}>
          <label className="sr-only" htmlFor="homie-question">
            Question for {name}
          </label>
          <input
            id="homie-question"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={homie.sleeping ? "They're asleep" : "Ask a question"}
            maxLength={180}
            disabled={sending}
            className="min-h-12 min-w-0 flex-1 rounded-2xl bg-paper px-3 text-ink"
          />
          <button
            type="submit"
            disabled={sending || draft.trim().length === 0}
            className="min-h-12 shrink-0 rounded-2xl bg-tomato px-4 font-display text-paper disabled:opacity-50"
          >
            Ask
          </button>
        </form>
      )}
    </div>
  );
}
