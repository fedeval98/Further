"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { key: "home",    href: "#home",    label: "Home",        targetId: "home" },
  { key: "cursos",  href: "#cursos",  label: "All Courses", targetId: "cursos" },
  { key: "about",   href: "#about",   label: "About",       targetId: "about" }, 
  { key: "contact", href: "#contact", label: "Contact",     targetId: "contact" },
];

export default function Navbar() {
  const { open, totalQty } = useCart();
  const [current, setCurrent] = useState("home");
  const sectionsRef = useRef([]);
  const HEADER_OFFSET = 64;

  const computeSections = () => {
    const els = LINKS
      .map(l => {
        const el = document.getElementById(l.targetId);
        return el ? { key: l.key, id: l.targetId, el } : null;
      })
      .filter(Boolean);

    sectionsRef.current = els
      .map(s => ({
        ...s,
        top: s.el.getBoundingClientRect().top + window.scrollY,
      }))
      .sort((a, b) => a.top - b.top);
  };

  const updateCurrent = () => {
    if (!sectionsRef.current.length) return;

    const y = window.scrollY + HEADER_OFFSET + 1;

    let active = sectionsRef.current[0].key;
    for (const s of sectionsRef.current) {
      if (s.top <= y) active = s.key;
      else break;
    }

    const nearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 8;

    if (nearBottom) active = "contact";

    setCurrent(active);
  };

  useEffect(() => {
    const onResize = () => {
      computeSections();
      updateCurrent();
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateCurrent();
        ticking = false;
      });
    };

    computeSections();
    updateCurrent();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, []);

  // Click con desplazamiento compensado por header
  const handleClick = (e, link) => {
    if (!link.href.startsWith("#")) return;
    e.preventDefault();
    const el = document.getElementById(link.targetId);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    setCurrent(link.key); // feedback inmediato en el nav
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", link.href);
  };

  const base =
    "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition";
  const inactive =
    "text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30";
  const active =
    "text-white bg-gradient-to-r from-sky-500 to-blue-700 shadow-lg shadow-blue-600/30";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src="https://raw.githubusercontent.com/fedeval98/FurtherLibTest/refs/heads/main/logo.avif"
            alt="Further logo"
            className="h-8 w-auto"
          />
          <span className="sr-only">Further</span>
        </a>

        <nav className="hidden gap-3 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={(e) => handleClick(e, link)}
              className={`${base} ${
                current === link.key ? active : inactive
              }`}
              aria-current={current === link.key ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          onClick={open}
          className="relative rounded-2xl border border-white/10 px-3 py-1.5 text-white/90 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label="Abrir carrito"
          title="Abrir carrito"
        >
          🛒
          {totalQty > 0 && (
            <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-bold text-white">
              {totalQty}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}