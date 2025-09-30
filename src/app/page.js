"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import { CartProvider } from "@/context/CartContext";
import { products } from "@/lib/products";
import ChatLauncher from "@/components/ChatLauncher";

export default function Home() {
  return (
    <CartProvider>
      <div className="flex min-h-dvh flex-col">
        <Navbar />

        <section
          id="home"
          className="mx-auto w-full max-w-6xl px-4 py-16 scroll-mt-24"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
                Further{" "}
                <span className="block bg-gradient-to-r from-[#EE7203] via-[#FF3816] to-[#EE7203] bg-clip-text text-transparent animate-gradient">
                  Academy
                </span>
              </h1>

              <p className="mt-3 text-2xl font-semibold text-slate-200 md:text-3xl">
                Comunicación en otros idiomas, con impacto real.
              </p>

              <p className="mt-4 text-lg text-slate-300">
                Educación en contexto cultural para generar comunicadores
                asertivos. Workshops, programas y soluciones a medida para
                empresas y particulares.
              </p>

              <div className="mt-6 flex gap-3">
                <a
                  href="#cursos"
                  className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                  Ver cursos
                </a>
                <a
                  href="#contact"
                  className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-white/90 hover:bg-white/10"
                >
                  Contacto
                </a>
              </div>
            </div>

            <div>
              <iframe
                src="https://www.youtube.com/embed/Q_mfg5gTuEE?si=hBm5Fy9QY3yKPpSE"
                title="YouTube video player"
                className="aspect-video w-full rounded-2xl"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section
          id="cursos"
          className="mx-auto w-full max-w-6xl px-4 py-12 scroll-mt-24"
        >
          <h2 className="text-2xl font-semibold text-center text-white">
            Cursos y Workshops
          </h2>
          <div className="mt-6 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2">
            {products.map((p) => (
              <article
                key={p.id}
                className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/50 p-5"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="aspect-video w-full rounded-xl object-cover"
                />
                <h3 className="mt-4 text-center text-lg font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-center text-sm text-slate-300 line-clamp-3">
                  {p.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold text-white">${p.price}</span>
                  <Cart.AddButton item={p} />
                </div>
              </article>
            ))}
          </div>
        </section>
            <div id="contact" className="h-1 scroll-mt-24"></div>
        <Footer id="contact" />
      </div>

      <Cart.Drawer />
      <ChatLauncher />
      </CartProvider>
  );
}