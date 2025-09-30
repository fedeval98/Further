import { Linkedin, Instagram, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <footer id="contact" className="mt-auto border-t border-white/10 bg-slate-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-slate-300">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src="https://raw.githubusercontent.com/fedeval98/FurtherLibTest/refs/heads/main/logo.avif"
                alt="Further logo"
                className="h-10 w-auto"
              />
              <span className="sr-only">Further Corporate</span>
            </div>

            {/* Dirección */}
            <p className="mt-3">
              Arcos 2215, Office 303° <br />
              Belgrano, CABA, <br />
              Buenos Aires, Argentina
            </p>

            {/* Redes */}
            <div className="mt-4 flex gap-4 text-slate-300">
              <a
                href="https://www.linkedin.com/company/furthercorporate/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/furthercorporate"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.tiktok.com/@further_corporate"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200"
              >
                <SiTiktok className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/@furthercorporate"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white">Links</h4>
            <ul className="mt-2 space-y-1">
              <li><a className="hover:text-indigo-400" href="#about">About</a></li>
              <li><a className="hover:text-indigo-400" href="#cursos">Cursos</a></li>
              <li><a className="hover:text-indigo-400" href="#contact">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Contacto</h4>
            <p className="mt-2">
              <span className="font-semibold">School:</span>{" "}
              <a
                href="mailto:info@furtherenglish.com"
                className="hover:text-indigo-400"
              >
                info@furtherenglish.com
              </a>
            </p>
            <p className="mt-2">
              <span className="font-semibold">Companies:</span>{" "}
              <a
                href="mailto:incompany@furtherenglish.com"
                className="hover:text-indigo-400"
              >
                incompany@furtherenglish.com
              </a>
            </p>
          </div>
        </div>

        <p className="mt-8 text-slate-400">
          © {new Date().getFullYear()} Further Corporate. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
