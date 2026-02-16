"use client";
import { useEffect, useMemo, useState } from "react";

const MAX_MESSAGES = 10;

export default function ChatWidget() {
  const starter = useMemo(
    () => [
      {
        role: "assistant",
        content: "Hi — I’m the 4Tek Advisor. What type of business are you running?",
      },
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [remaining, setRemaining] = useState(MAX_MESSAGES);
  const [sending, setSending] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [error, setError] = useState("");
  const [retryPayload, setRetryPayload] = useState(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages(starter);
    }
  }, [open, messages.length, starter]);

  async function sendMessage(payload) {
    if (sending || limitReached) return;

    const messageToSend = (payload?.message ?? input).trim();
    if (!messageToSend) return;

    const baseHistory = Array.isArray(payload?.history) ? payload.history : messages;
    const newMessages = [...baseHistory, { role: "user", content: messageToSend }];
    const outgoing = { message: messageToSend, history: newMessages };

    setSending(true);
    setError("");
    setRetryPayload(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(outgoing),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(
          data?.reply ||
            `Something went wrong (HTTP ${res.status}). Please retry.`
        );
        setRetryPayload(outgoing);
        setSending(false);
        return;
      }

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: data.reply || "Sorry — something went wrong.",
        },
      ]);
      if (typeof data.remaining === "number") setRemaining(data.remaining);
      if (data.limitReached) setLimitReached(true);
      setInput("");
      setSending(false);
    } catch (e) {
      setError("Network error. Please retry.");
      setRetryPayload(outgoing);
      setSending(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-black/75 backdrop-blur-sm text-white px-4 py-3 rounded-full shadow-2xl"
        >
          Chat with 4Tek
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-[22rem] max-w-[calc(100vw-3rem)] bg-stone-900/40 backdrop-blur-md text-white shadow-2xl rounded-xl overflow-hidden z-[9999]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/40">
            <div className="text-sm font-semibold text-white">4Tek Advisor</div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-white">{remaining}/{MAX_MESSAGES}</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs text-white hover:text-white/80"
              >
                Close
              </button>
            </div>
          </div>

          <div className="h-80 overflow-y-auto px-4 py-3">
            {error && (
              <div className="mb-3 rounded-lg border border-red-600 bg-red-700 p-2 text-xs text-white">
                <div className="flex items-start justify-between gap-3">
                  <div className="leading-snug">{error}</div>
                  <div className="flex items-center gap-2">
                    {retryPayload && (
                      <button
                        type="button"
                        onClick={() => sendMessage(retryPayload)}
                        className="underline"
                      >
                        Retry
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setError("");
                        setRetryPayload(null);
                      }}
                      className="underline"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "text-right" : "text-left"}
              >
                <p
                  className={
                    m.role === "user"
                      ? "inline-block bg-black/90 text-white rounded-2xl px-3 py-2 mb-2 max-w-[90%]"
                      : "inline-block bg-white/10 backdrop-blur-sm text-white rounded-2xl px-3 py-2 mb-2 max-w-[90%]"
                  }
                >
                  {m.content}
                </p>
              </div>
            ))}

            {limitReached && (
              <div className="text-left">
                <p className="inline-block bg-amber-700 text-white rounded-2xl px-3 py-2 mb-2 max-w-[90%]">
                  To continue, book a free consultation: <a className="underline" href="/get-started">/get-started</a>
                </p>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                disabled={sending || limitReached}
                className="flex-1 border rounded-lg px-3 py-2 text-sm bg-white/10 border-white/20 text-white placeholder-white/70 backdrop-blur-sm"
                placeholder={limitReached ? "Book a consult to continue" : "Type your message…"}
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={sending || limitReached}
                className="bg-black text-white px-4 rounded-lg text-sm"
              >
                {sending ? "…" : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}