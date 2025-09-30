"use client";

import { useEffect, useRef, useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "¡Hola! ¿En qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

const send = async () => {
  const text = input.trim();
  if (!text) return;
  setInput("");
  setMessages((m) => [...m, { role: "user", text }]);
  setLoading(true);
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json().catch(() => ({}));
    const reply = data?.reply ?? "No pude entender la respuesta 😅";

    setMessages((m) => [...m, { role: "assistant", text: String(reply) }]);
  } catch (e) {
    setMessages((m) => [
      ...m,
      { role: "assistant", text: "Uy, hubo un problema hablando con el bot." },
    ]);
  } finally {
    setLoading(false);
  }
};

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex h-[70dvh] w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900">
      <div className="flex-1 space-y-3 overflow-auto p-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] rounded-2xl px-4 py-2 ${
              m.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "bg-white/5 text-slate-100"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="inline-block rounded-2xl bg-white/5 px-4 py-2 text-slate-300">
            Escribiendo…
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            rows={1}
            placeholder="Escribí tu mensaje…"
            className="min-h-[44px] flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
