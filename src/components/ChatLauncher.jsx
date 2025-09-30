"use client";

import { useEffect, useId, useState } from "react";
import Chatbot from "@/components/Chatbot";

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        title="Abrir chat"
      >
        💬 Chat
      </button>

      <div
        className={`fixed inset-0 z-50 transition ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`absolute bottom-0 right-0 m-6 w-full max-w-md transform rounded-2xl border border-white/10 bg-slate-900 p-4 text-slate-100 shadow-2xl transition-transform ${
            open ? "translate-y-0" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 id={titleId} className="text-lg font-semibold">
              Asistente
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md border border-white/10 px-2 py-1 text-sm hover:bg-white/5"
            >
              Cerrar
            </button>
          </div>

          <Chatbot />
        </div>
      </div>
    </>
  );
}
