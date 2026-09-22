import { useState, useEffect } from "react";
import LogoMark from "./components/LogoMark";
import { fabricacionPhoto } from "./assets/fabricacion-photo";
import {
  discosPhoto,
  parrillaPhoto,
  braseroPhoto,
  lenieroPhoto,
  tablasPhoto,
  herreriaPhoto,
} from "./assets/products-photos";

/* ============================================================
   Constants
   ============================================================ */
const WHATSAPP_NUMBER = "5492234545354";
const WHATSAPP_DISPLAY = "+54 9 223 454-5354";
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;
const DEFAULT_MSG = "Hola! Vi la web de Todo para el Asador MDQ y quiero consultar por...";

const waLink = (msg: string = DEFAULT_MSG) =>
  `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;

/* ============================================================
   Image URLs (Unsplash)
   ============================================================ */
const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const IMG = {
  // Carne asada con fuego y brasas
  hero: U("photo-1555939594-58d7cb561ad1", 2000),
  // Parrilla con brasas rojas
  heroAlt: U("photo-1529193591184-b1d58069ecdd", 2000),
  // Disco de arado (foto real del cliente)
  disco: discosPhoto,
  // Parrilla a medida (foto real del cliente)
  parrilla: parrillaPhoto,
  // Brasero / fogonero (foto real del cliente)
  brasero: braseroPhoto,
  // Leñero / chulengo (foto real del cliente)
  leniero: lenieroPhoto,
  // Tabla y kit parrillero (foto real del cliente)
  tablas: tablasPhoto,
  // Herrería gourmet (foto real del cliente)
  herreria: herreriaPhoto,
  // Asado al fuego con embutidos (foto real del cliente)
  fabricacion: fabricacionPhoto,
};

/* ============================================================
   Icon components
   ============================================================ */
const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const IconFlame = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2s1.5 3 1.5 6c0 1.66-1.34 3-3 3-1.5 0-2.5-1.5-2-3 .5 1 1 1 1 0 0-2.5-2-3-2-5 2 .5 4.5 2 4.5 6-.5-1-1-1-1 0 0 2 1.5 3 3 3 3 0 4-3 4-5 0-2-2-4-4-5zM10 22c0-2.2 1.8-4 4-4-1 1.1-1 2.2 0 3.3.6.7 1 1.5 1 2.4-.3.2-.7.3-1 .3H10z"/>
  </svg>
);

const IconWhatsApp = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const IconPhone = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.21l-2.26 1.13a11.04 11.04 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z"/>
  </svg>
);

const IconTruck = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V20H13m-4-4h5"/>
  </svg>
);

const IconHammer = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 9.879l-8.486 8.485a2 2 0 11-2.828-2.828l8.485-8.486m2.829 2.829l2.829-2.829a2 2 0 000-2.828L14.121 1.05a2 2 0 00-2.828 0L8.464 3.879a2 2 0 000 2.828L11.293 9.5m2.828.379l-4.243 4.242"/>
  </svg>
);

const IconCard = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
  </svg>
);

const IconShield = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>
);

const IconStar = ({ className = "w-5 h-5", filled = true }: { className?: string; filled?: boolean }) => (
  <svg className={`${className} ${filled ? "star-filled" : "text-acero-light"}`} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
  </svg>
);

const IconMenu = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
  </svg>
);

const IconClose = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
  </svg>
);

const IconMapPin = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);

const IconClock = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);

const IconGoogle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83c.87-2.6 3.3-4.52 6.16-4.52z"/>
  </svg>
);

/* ============================================================
   Stars
   ============================================================ */
const Stars = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <IconStar key={i} filled={i <= rating} className="w-5 h-5 md:w-6 md:h-6" />
    ))}
  </div>
);

/* ============================================================
   Logo — sello oficial (vector) + bajada
   ============================================================ */
const Logo = ({ size = "md" }: { size?: "md" | "lg" }) => {
  const isLg = size === "lg";
  return (
    <a href="#inicio" className="flex items-center gap-3 md:gap-4 group">
      <LogoMark
        uid={isLg ? "logo-footer" : "logo-header"}
        className={`flex-shrink-0 drop-shadow-[0_6px_18px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:rotate-[-3deg] ${
          isLg ? "w-24 h-24 md:w-32 md:h-32" : "w-14 h-14 md:w-[74px] md:h-[74px]"
        }`}
      />
      {isLg ? (
        <div className="flex flex-col leading-tight">
          <span className="font-display text-2xl md:text-3xl tracking-[0.08em] text-hueso">
            LOS MEJORES ARTÍCULOS
          </span>
          <span className="font-display text-lg md:text-xl tracking-[0.25em] text-fuego">
            PARA EL ASADOR ARGENTINO
          </span>
          <span className="mt-2 text-hueso/60 text-sm font-medium max-w-xs">
            Fabricación propia · Mar del Plata · Envíos a todo el país
          </span>
        </div>
      ) : (
        <div className="hidden sm:flex flex-col leading-tight border-l-2 border-fuego/40 pl-3">
          <span className="font-display text-lg md:text-xl tracking-[0.14em] text-hueso leading-none">
            LOS MEJORES ARTÍCULOS
          </span>
          <span className="font-display text-sm md:text-base tracking-[0.3em] text-fuego leading-none mt-1">
            PARA EL ASADOR ARGENTINO
          </span>
        </div>
      )}
    </a>
  );
};

/* ============================================================
   Floating WhatsApp
   ============================================================ */
const FloatingWhatsApp = () => (
  <a
    href={waLink()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contactar por WhatsApp"
    className="hidden md:flex fixed bottom-5 right-5 z-[90] btn-fuego rounded-full w-[72px] h-[72px] items-center justify-center whatsapp-pulse"
  >
    <IconWhatsApp className="w-8 h-8 md:w-9 md:h-9 text-carbon-deep" />
  </a>
);

/* ============================================================
   Header
   ============================================================ */
const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#productos", label: "Productos" },
    { href: "#a-medida", label: "A Medida" },
    { href: "#opiniones", label: "Opiniones" },
    { href: "#ubicacion", label: "Ubicación" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-carbon-deep/95 backdrop-blur-md border-b-2 border-fuego/30 shadow-2xl shadow-black/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-extrabold uppercase tracking-[0.15em] text-hueso/85 hover:text-fuego transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:+5492234545354`}
            className="hidden lg:flex items-center gap-2 text-hueso hover:text-fuego transition-colors font-bold text-sm tracking-wide"
          >
            <IconPhone className="w-4 h-4" />
            {WHATSAPP_DISPLAY}
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn-fuego font-bold px-5 py-2.5 rounded-md text-sm uppercase tracking-wider"
          >
            WhatsApp
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-hueso p-2"
            aria-label="Abrir menú"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-carbon-deep border-t-2 border-fuego/30">
          <div className="px-4 py-5 flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-hueso hover:text-fuego font-extrabold uppercase tracking-wider py-3 border-b-2 border-acero/20"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`tel:+5492234545354`}
              className="flex items-center gap-2 text-fuego font-bold py-3 text-lg"
            >
              <IconPhone className="w-5 h-5" /> {WHATSAPP_DISPLAY}
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fuego font-bold px-4 py-4 rounded-md text-center uppercase tracking-wider mt-2"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

/* ============================================================
   Ember particles (pure CSS decorative dots)
   ============================================================ */
const EmberParticles = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 14 }).map((_, i) => {
      const left = (i * 7.3 + 5) % 100;
      const delay = (i * 0.6) % 7;
      const duration = 5 + (i % 4);
      const size = 3 + (i % 4);
      return (
        <span
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            background: i % 2
              ? "radial-gradient(circle, #F2994A 0%, #E87722 60%, transparent 100%)"
              : "radial-gradient(circle, #E87722 0%, #C44536 60%, transparent 100%)",
            animation: `float-ember ${duration}s ${delay}s infinite ease-out`,
            boxShadow: "0 0 8px rgba(232, 119, 34, 0.8)",
          }}
        />
      );
    })}
  </div>
);

/* ============================================================
   Hero
   ============================================================ */
const Hero = () => (
  <section id="inicio" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img
        src={IMG.hero}
        alt="Asado argentino con brasas y carne"
        className="w-full h-full object-cover"
        loading="eager"
        onError={(e) => {
          (e.target as HTMLImageElement).src = IMG.heroAlt;
        }}
      />
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-carbon-deep/80 via-carbon-deep/65 to-carbon-deep" />
      <div className="absolute inset-0 bg-gradient-to-r from-carbon-deep/95 via-carbon-deep/60 to-transparent" />
      {/* Ember glow at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-80 bg-ember-glow" />
    </div>

    <EmberParticles />

    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-28 md:py-36 w-full">
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-carbon-deep/80 backdrop-blur border-2 border-fuego text-fuego px-5 py-2 rounded-sm mb-8">
          <IconFlame className="w-5 h-5" />
          <span className="text-xs md:text-sm font-extrabold uppercase tracking-[0.2em]">
            Fabricación propia · Mar del Plata
          </span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-hueso leading-[0.92] tracking-wide mb-6 drop-shadow-2xl">
          DE MAR DEL PLATA<br />
          A <span className="text-fuego-gradient">TODO EL PAÍS</span>.
        </h1>

        <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-hueso/90 leading-[1.1] tracking-wide mb-8">
          Asadores, parrillas y discos<br />
          que <span className="text-fuego">duran toda la vida.</span>
        </p>

        <p className="text-lg md:text-xl text-hueso/85 max-w-2xl mb-10 leading-relaxed font-medium">
          Fabricación propia y a medida. Herrería gourmet. Envíos a todo el país.
          Acero de verdad, hecho por asadores para asadores.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={waLink("Hola! Quiero ver el catálogo de Todo para el Asador MDQ")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fuego font-bold px-8 py-5 rounded-md text-base md:text-lg uppercase tracking-widest text-center inline-flex items-center justify-center gap-3"
          >
            <IconWhatsApp className="w-6 h-6" />
            Ver catálogo por WhatsApp
          </a>
          <a
            href={waLink("Hola! Quiero pedir un presupuesto a medida para una parrilla")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-rustico font-bold px-8 py-5 rounded-md text-base md:text-lg uppercase tracking-widest text-center"
          >
            Pedir presupuesto a medida
          </a>
        </div>

        <div className="mt-10 flex items-center gap-3 text-hueso/70">
          <IconShield className="w-5 h-5 text-fuego flex-shrink-0" />
          <p className="text-sm md:text-base font-semibold">
            +5 años · Más de 55 clientes satisfechos · Garantía en todas las piezas
          </p>
        </div>
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-fuego/80">
      <span className="text-xs uppercase tracking-[0.3em] font-bold">Bajá</span>
      <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </div>
  </section>
);

/* ============================================================
   Trust bar
   ============================================================ */
const TrustBar = () => {
  const items = [
    { icon: <IconTruck />, label: "Envíos a todo el país" },
    { icon: <IconHammer />, label: "Fabricación propia" },
    { icon: <IconCard />, label: "Todos los medios de pago" },
    { icon: <IconShield />, label: "Más de 5 años en MDQ" },
  ];

  return (
    <section className="relative bg-carbon-deep border-y-4 border-fuego/30 py-7 md:py-9 shadow-[inset_0_2px_20px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-center md:justify-start gap-4 text-hueso">
              <div className="text-fuego flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,119,34,0.5)]">
                {item.icon}
              </div>
              <span className="font-extrabold text-sm md:text-base uppercase tracking-[0.1em]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   Products
   ============================================================ */
type Product = {
  name: string;
  desc: string;
  img: string;
  msg: string;
  badge?: string;
};

const products: Product[] = [
  {
    name: "Discos de Arado",
    desc: "De 30 a 52 cm. Borde alto, patas desmontables y tapa. Acero boro templado. Para pollo al disco, asados, bifes y frituras al aire libre.",
    img: IMG.disco,
    msg: "Hola! Quiero consultar por los Discos de Arado",
    badge: "El más vendido",
  },
  {
    name: "Parrillas a Medida",
    desc: "Fijas, plegables, tipo valija, combinadas. De 60 cm a 2 metros. Las hacemos del tamaño que necesites para tu quincho o local.",
    img: IMG.parrilla,
    msg: "Hola! Quiero una parrilla a medida",
    badge: "A medida",
  },
  {
    name: "Braseros y Fogoneros",
    desc: "Braseros de mesa y de pie, fogoneros para exterior e interior. Hierro macizo. Calor de hogar para el invierno y las juntadas.",
    img: IMG.brasero,
    msg: "Hola! Quiero consultar por Braseros y Fogoneros",
  },
  {
    name: "Leñeros y Chulengos",
    desc: "Guardaleña, chulengos y leñeros circulares. Chapa reforzada. Ordená tu leña con estilo criollo y liberá espacio en el quincho.",
    img: IMG.leniero,
    msg: "Hola! Quiero consultar por Leñeros y Chulengos",
  },
  {
    name: "Tablas y Kits Parrilleros",
    desc: "Tablas de algarrobo macizo, kits con cuchillos, pinzas, tenedores y delantal. Sets premium ideales para regalo. Grabados personalizados.",
    img: IMG.tablas,
    msg: "Hola! Quiero ver Tablas y Kits Parrilleros",
    badge: "Regalo ideal",
  },
  {
    name: "Herrería Gourmet",
    desc: "Carretas gourmet, domos, planchas bifera, provoleteras, mecheros, porta espadas y regalos empresariales. Diseños exclusivos a pedido.",
    img: IMG.herreria,
    msg: "Hola! Quiero consultar por Herrería Gourmet personalizada",
  },
];

const ProductCard = ({ p }: { p: Product }) => (
  <div className="card-industrial rounded-md overflow-hidden group">
    <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-acero/30">
      <img
        src={p.img}
        alt={p.name}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/50 to-transparent" />
      <div className="absolute inset-0 ring-2 ring-inset ring-fuego/0 group-hover:ring-fuego/20 transition-all" />
      {p.badge && (
        <span className="absolute top-4 left-4 badge-brasa text-xs uppercase tracking-wider px-3 py-1.5 rounded-sm">
          {p.badge}
        </span>
      )}
    </div>
    <div className="p-6 md:p-7">
      <h3 className="font-display text-3xl md:text-4xl text-hueso mb-3 tracking-wide leading-none">
        {p.name}
      </h3>
      <p className="text-hueso/75 text-sm md:text-base leading-relaxed mb-6 min-h-[4.5rem]">
        {p.desc}
      </p>
      <a
        href={waLink(p.msg)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 bg-fuego/10 hover:bg-fuego text-fuego hover:text-carbon-deep font-extrabold border-2 border-fuego/70 hover:border-fuego py-3.5 rounded-sm text-sm uppercase tracking-widest transition-all"
      >
        <IconWhatsApp className="w-4 h-4" />
        Consultar por este
      </a>
    </div>
  </div>
);

const ProductsSection = () => (
  <section id="productos" className="py-20 md:py-28 bg-carbon bg-carbon-brasas">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="text-center mb-14 md:mb-20">
        <span className="text-fuego font-extrabold uppercase tracking-[0.25em] text-sm">
          · Lo que hacemos ·
        </span>
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-hueso mt-3 tracking-wide">
          PRODUCTOS <span className="text-fuego-gradient">ESTRELLA</span>
        </h2>
        <div className="mx-auto w-24 h-1 bg-fuego-gradient mt-4" />
        <p className="text-hueso/75 mt-6 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
          Todo lo que necesitás para tu quincho, tu asado o tu próximo regalo.
          Cada pieza está fabricada por nosotros en Mar del Plata, una por una.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
        {products.map((p, i) => (
          <ProductCard key={i} p={p} />
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   Fabricación a medida
   ============================================================ */
const FabricacionSection = () => (
  <section id="a-medida" className="relative py-20 md:py-28 bg-madera-texture overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative">
          <div className="relative rounded-md overflow-hidden border-4 border-acero/50 shadow-2xl shadow-black/80">
            <img
              src={IMG.fabricacion}
              alt="Asado al fuego con embutidos en parrilla artesanal"
              loading="lazy"
              className="w-full h-[420px] md:h-[560px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            {/* Frame corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-fuego" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-fuego" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-fuego" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-fuego" />
          </div>
          <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-8 hidden md:block btn-fuego font-display text-2xl md:text-3xl px-6 py-4 rounded-sm shadow-2xl tracking-wide rotate-[-2deg]">
            100% A TU MEDIDA
          </div>
          <div className="absolute -top-4 -left-4 hidden md:flex items-center gap-2 bg-carbon-deep border-2 border-fuego text-fuego px-4 py-2 rounded-sm font-extrabold uppercase text-xs tracking-[0.2em]">
            <IconHammer className="w-4 h-4" />
            Soldado a mano
          </div>
        </div>

        <div>
          <span className="text-fuego font-extrabold uppercase tracking-[0.25em] text-sm">
            · Herrería gourmet ·
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-hueso mt-3 mb-7 tracking-wide leading-[0.95]">
            FABRICAMOS<br />
            <span className="text-fuego-gradient">TU PARRILLA</span><br />
            A MEDIDA.
          </h2>

          <p className="text-hueso/90 text-lg md:text-xl mb-7 leading-relaxed font-medium">
            ¿Tenés un quincho, una casa, un restaurante o un espacio que necesita una parrilla
            que <u className="text-fuego decoration-fuego/50">entre justo</u>?
            <br />
            <strong className="text-hueso">Nos mandás las medidas y te la fabricamos</strong>,
            con el diseño y la estructura que vos quieras.
          </p>

          <ul className="space-y-3 mb-10">
            {[
              "Parrillas fijas, plegables, tipo valija o con cajón",
              "Combinadas: hierro redondo, malla, en V o plancha bifera",
              "Medidas estándar o 100% personalizadas al centímetro",
              "Asadores criollos con regulación de altura manual",
              "Terminaciones: pintura anti-calórica, cincado o aceitado",
              "Ideal para quinchos, terrazas, bares y restaurantes",
            ].map((f) => (
              <li key={f} className="flex items-start gap-3 text-hueso/90 text-base md:text-lg">
                <span className="mt-1 text-fuego flex-shrink-0"><IconCheck className="w-5 h-5" /></span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={waLink("Hola! Tengo las medidas de mi parrilla y quiero un presupuesto")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fuego font-bold px-7 py-4 rounded-sm uppercase tracking-widest text-sm inline-flex items-center justify-center gap-2"
            >
              <IconWhatsApp className="w-5 h-5" />
              Pedir presupuesto
            </a>
            <a
              href="#productos"
              className="btn-outline-rustico font-bold px-7 py-4 rounded-sm uppercase tracking-widest text-sm text-center"
            >
              Ver productos estándar
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ============================================================
   Reviews
   ============================================================ */
const reviews = [
  {
    name: "Matías G.",
    rating: 5,
    date: "hace 2 meses",
    text: "Excelente atención. Cumplieron con todo lo pactado, la parrilla quedó hermosa y súper sólida. Se nota que laburan con amor por lo que hacen. 100% recomendable, muchachos.",
    initial: "M",
  },
  {
    name: "Javier L.",
    rating: 5,
    date: "hace 3 semanas",
    text: "Compré un disco de arado de 45cm con tapa y la verdad es una masa. La calidad del acero es otra cosa comparado con los chotos que venden en otros lados. Me llegó a Capital en 3 días.",
    initial: "J",
  },
  {
    name: "Carolina M.",
    rating: 5,
    date: "hace 1 mes",
    text: "Me hicieron una parrilla a medida para el quincho y quedó espectacular. La welda es prolija, la pintura anti-calórica no se levanta ni con fuego fuerte. Muy buen precio también.",
    initial: "C",
  },
  {
    name: "Rodrigo T.",
    rating: 5,
    date: "hace 2 semanas",
    text: "Gente seria, responsable y que sabe de asadores. Me asesoraron re bien porque no tenía ni idea qué disco comprar. El de 35 alcanza perfecto para 4 personas. Gracias totales.",
    initial: "R",
  },
];

const ReviewsSection = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const updateVisible = () => {
      const w = window.innerWidth;
      setVisible(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, reviews.length - visible);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 5500);
    return () => clearInterval(id);
  }, [maxIndex]);

  return (
    <section id="opiniones" className="py-20 md:py-28 bg-carbon-2 bg-acero-texture relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-14 md:mb-16">
          <span className="text-fuego font-extrabold uppercase tracking-[0.25em] text-sm">
            · Lo que dicen los clientes ·
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-hueso mt-3 tracking-wide">
            <span className="text-fuego-gradient">4.7 ESTRELLAS</span> NOS AVALAN
          </h2>
          <div className="mx-auto w-24 h-1 bg-fuego-gradient mt-4" />
          <p className="text-hueso/75 mt-6 max-w-2xl mx-auto text-base md:text-lg font-medium">
            Más de 55 opiniones verificadas en Google de clientes de todo el país.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Stars rating={5} />
            <span className="font-display text-4xl md:text-5xl text-fuego tracking-wider">4.7/5</span>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-sm">
              <IconGoogle className="w-5 h-5" />
              <span className="font-bold text-carbon text-sm">Google</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden -mx-2 md:-mx-3">
            <div
              className="flex transition-transform duration-600 ease-out"
              style={{ transform: `translateX(-${index * (100 / visible)}%)` }}
            >
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="px-2 md:px-3 flex-shrink-0"
                  style={{ width: `${100 / visible}%` }}
                >
                  <div className="card-industrial rounded-md p-6 md:p-7 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b-2 border-acero/30">
                      <div className="w-12 h-12 rounded-full btn-fuego font-display text-xl flex items-center justify-center flex-shrink-0 text-carbon-deep">
                        {r.initial}
                      </div>
                      <div>
                        <p className="font-extrabold text-hueso text-lg">{r.name}</p>
                        <p className="text-xs text-hueso/50 uppercase tracking-wider">{r.date}</p>
                      </div>
                    </div>
                    <div className="mb-4"><Stars rating={r.rating} /></div>
                    <p className="text-hueso/85 text-sm md:text-base leading-relaxed flex-grow italic">
                      "{r.text}"
                    </p>
                    <div className="mt-5 pt-4 border-t border-acero/30 flex items-center gap-2 text-xs text-hueso/50 font-semibold uppercase tracking-wider">
                      <IconGoogle className="w-4 h-4" />
                      Reseña verificada
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir a reseña ${i + 1}`}
                className={`h-2.5 rounded-sm transition-all ${
                  i === index ? "bg-fuego-gradient w-10" : "bg-acero w-2.5 hover:bg-fuego/60"
                }`}
              />
            ))}
          </div>
        </div>

        <div id="google-reviews-widget" className="hidden" />

        <div className="text-center mt-12">
          <a
            href="https://www.google.com/search?q=Todo+para+el+Asador+MDQ+Moreno+5239"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white hover:bg-hueso text-carbon-deep font-extrabold px-7 py-4 rounded-sm uppercase tracking-widest text-sm transition-colors border-2 border-white hover:border-fuego shadow-xl"
          >
            <IconGoogle className="w-5 h-5" />
            Ver las 55+ opiniones en Google
          </a>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   Why us
   ============================================================ */
const WhyUsSection = () => {
  const reasons = [
    {
      num: "01",
      title: "Calidad artesanal",
      subtitle: "no industrial",
      desc: "Cada pieza es soldada a mano por herreros con años de experiencia. No hacemos producción en masa. Acá cada asador es único y se revisa antes de salir del taller.",
    },
    {
      num: "02",
      title: "Acero de verdad",
      subtitle: "no chapa fina",
      desc: "Usamos acero boro templado, hierro macizo y chapa de espesor. No trabajamos con materiales que se deforman con el primer fuego. Esto dura generaciones.",
    },
    {
      num: "03",
      title: "De asador a asador",
      subtitle: "no vendedores",
      desc: "No somos empleados de comercio. Somos tipos que prendemos el fuego los fines de semana. Te asesoramos como lo haría un amigo que sabe, sin vueltas.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-carbon-deep bg-carbon-brasas relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-14 md:mb-16">
          <span className="text-fuego font-extrabold uppercase tracking-[0.25em] text-sm">
            · Nuestra diferencia ·
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-hueso mt-3 tracking-wide">
            ¿POR QUÉ <span className="text-fuego-gradient">NOSOTROS</span>?
          </h2>
          <div className="mx-auto w-24 h-1 bg-fuego-gradient mt-4" />
          <p className="text-hueso/75 mt-6 max-w-2xl mx-auto text-base md:text-lg font-medium">
            No vendemos el producto más barato. Vendemos el que te va a durar más.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((r) => (
            <div
              key={r.num}
              className="card-industrial rounded-md p-8 md:p-9 relative group"
            >
              <div className="font-display text-7xl md:text-8xl text-fuego/15 group-hover:text-fuego/30 transition-colors absolute top-4 right-5 leading-none">
                {r.num}
              </div>
              <div className="relative">
                <div className="w-14 h-1 bg-fuego-gradient mb-5" />
                <h3 className="font-display text-3xl md:text-4xl text-hueso tracking-wide leading-none uppercase">
                  {r.title}
                </h3>
                <p className="text-fuego font-extrabold uppercase tracking-[0.15em] text-sm mt-2 mb-6">
                  {r.subtitle}
                </p>
                <p className="text-hueso/80 leading-relaxed text-base md:text-lg">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   Location
   ============================================================ */
const LocationSection = () => (
  <section id="ubicacion" className="py-20 md:py-28 bg-madera-texture">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="text-center mb-14">
        <span className="text-fuego font-extrabold uppercase tracking-[0.25em] text-sm">
          · Visitá el taller ·
        </span>
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-hueso mt-3 tracking-wide">
          ESTAMOS EN <span className="text-fuego-gradient">MAR DEL PLATA</span>
        </h2>
        <div className="mx-auto w-24 h-1 bg-fuego-gradient mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-5 order-2 lg:order-1">
          <div className="card-industrial rounded-md p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-sm btn-fuego flex items-center justify-center flex-shrink-0">
                <IconMapPin className="w-5 h-5 text-carbon-deep" />
              </div>
              <div>
                <p className="text-hueso/60 text-xs uppercase tracking-[0.2em] font-extrabold mb-1">Dirección</p>
                <p className="text-hueso font-extrabold text-xl leading-tight">Moreno 5239</p>
                <p className="text-hueso/75 font-medium">Mar del Plata, Buenos Aires</p>
              </div>
            </div>
          </div>

          <div className="card-industrial rounded-md p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-sm btn-fuego flex items-center justify-center flex-shrink-0">
                <IconClock className="w-5 h-5 text-carbon-deep" />
              </div>
              <div>
                <p className="text-hueso/60 text-xs uppercase tracking-[0.2em] font-extrabold mb-1">Horarios</p>
                <p className="text-hueso font-extrabold text-lg">Lunes a Sábado</p>
                <p className="text-hueso/75 font-medium">8:00 a 20:00 hs</p>
                <p className="text-hueso/50 text-sm mt-1">Domingos cerrado</p>
              </div>
            </div>
          </div>

          <div className="card-industrial rounded-md p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-sm btn-fuego flex items-center justify-center flex-shrink-0">
                <IconWhatsApp className="w-5 h-5 text-carbon-deep" />
              </div>
              <div>
                <p className="text-hueso/60 text-xs uppercase tracking-[0.2em] font-extrabold mb-1">Contacto</p>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hueso font-extrabold text-lg hover:text-fuego transition-colors block"
                >
                  {WHATSAPP_DISPLAY}
                </a>
                <p className="text-hueso/75 text-sm font-medium">Respuesta inmediata por WhatsApp</p>
              </div>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Moreno+5239+Mar+del+Plata+Buenos+Aires"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 btn-fuego font-bold px-5 py-4 rounded-sm uppercase tracking-widest text-sm"
          >
            <IconMapPin className="w-5 h-5" />
            Cómo llegar
          </a>
        </div>

        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="rounded-md overflow-hidden border-4 border-fuego/50 shadow-2xl shadow-black/80 h-full min-h-[400px] md:min-h-[520px] relative">
            <iframe
              title="Mapa Todo para el Asador MDQ"
              src="https://www.google.com/maps?q=Moreno+5239,+Mar+del+Plata,+Buenos+Aires,+Argentina&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px", filter: "grayscale(0.3) contrast(1.05)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-fuego pointer-events-none z-10" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-fuego pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-fuego pointer-events-none z-10" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-fuego pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ============================================================
   Final CTA
   ============================================================ */
const FinalCTASection = () => (
  <section className="relative py-24 md:py-32 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img
        src={IMG.heroAlt}
        alt="Brasas rojas de un asado"
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-carbon-deep via-carbon-deep/90 to-carbon-deep" />
      <div className="absolute inset-x-0 bottom-0 h-96 bg-ember-glow" />
    </div>

    <EmberParticles />

    <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
      <div className="inline-flex items-center gap-2 bg-carbon-deep/80 border-2 border-fuego text-fuego px-5 py-2 rounded-sm mb-8">
        <IconFlame className="w-5 h-5" />
        <span className="font-extrabold uppercase tracking-[0.2em] text-sm">Último paso</span>
      </div>

      <h2 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-hueso leading-[0.95] tracking-wide mb-8">
        ¿LISTO PARA ARMAR<br />
        TU <span className="text-fuego-gradient">QUINCHO</span><br />
        DE UNA VEZ?
      </h2>

      <p className="text-lg md:text-xl text-hueso/90 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
        Escribinos ahora por WhatsApp. Te contestamos en minutos,
        te pasamos fotos reales, precios y presupuesto a medida sin compromiso.
      </p>

      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-fuego font-bold px-8 py-6 md:px-12 md:py-7 rounded-md text-lg md:text-2xl uppercase tracking-widest shadow-2xl inline-flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto max-w-2xl mx-auto"
      >
        <IconWhatsApp className="w-8 h-8 md:w-9 md:h-9 text-carbon-deep" />
        <span className="font-display tracking-[0.05em]">Hablar con un asesor ahora</span>
      </a>

      <p className="mt-8 text-sm text-hueso/70 flex items-center justify-center gap-2 font-semibold">
        <IconCheck className="w-4 h-4 text-fuego" />
        Respuesta en menos de 15 minutos en horario de atención
      </p>
    </div>
  </section>
);

/* ============================================================
   Footer
   ============================================================ */
const Footer = () => (
  <footer className="bg-black pt-14 pb-28 md:pb-10 border-t-4 border-fuego/40">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div className="md:col-span-2">
          <Logo size="lg" />
          <p className="mt-6 text-hueso/65 text-sm md:text-base leading-relaxed max-w-md font-medium">
            Venta y fabricación de asadores, discos de arado, parrillas a medida,
            braseros, leñeros, fogoneros, tablas, kits parrilleros y herrería gourmet
            en Mar del Plata. Envíos a todo el país.
          </p>
          <p className="mt-4 font-display text-fuego text-lg tracking-widest">
            · ACERO · FUEGO · SABOR ·
          </p>
        </div>

        <div>
          <h4 className="font-display text-fuego text-2xl tracking-[0.1em] mb-4">NAVEGACIÓN</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#productos" className="text-hueso/75 font-bold hover:text-fuego transition-colors uppercase tracking-wider text-xs">Productos</a></li>
            <li><a href="#a-medida" className="text-hueso/75 font-bold hover:text-fuego transition-colors uppercase tracking-wider text-xs">Fabricación a medida</a></li>
            <li><a href="#opiniones" className="text-hueso/75 font-bold hover:text-fuego transition-colors uppercase tracking-wider text-xs">Opiniones</a></li>
            <li><a href="#ubicacion" className="text-hueso/75 font-bold hover:text-fuego transition-colors uppercase tracking-wider text-xs">Ubicación</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-fuego text-2xl tracking-[0.1em] mb-4">CONTACTO</h4>
          <ul className="space-y-3 text-sm text-hueso/75">
            <li className="flex items-start gap-2 font-medium">
              <IconMapPin className="w-4 h-4 mt-0.5 text-fuego flex-shrink-0" />
              Moreno 5239, Mar del Plata
            </li>
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-fuego transition-colors font-bold">
                <IconWhatsApp className="w-4 h-4 text-fuego flex-shrink-0" />
                {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li className="flex items-start gap-2 font-medium">
              <IconClock className="w-4 h-4 mt-0.5 text-fuego flex-shrink-0" />
              Lun a Sáb 8-20hs
            </li>
          </ul>
        </div>
      </div>

      <div className="w-24 h-1 bg-fuego-gradient mb-6" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-hueso/50 font-medium">
        <p>© {new Date().getFullYear()} Todo para el Asador MDQ. Todos los derechos reservados.</p>
        <p className="font-display tracking-[0.2em] text-fuego/80 text-sm">
          HECHO CON 🔥 EN MAR DEL PLATA
        </p>
      </div>
    </div>
  </footer>
);

/* ============================================================
   Sticky bottom bar (mobile only)
   ============================================================ */
const StickyBottomBar = () => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-carbon-deep/95 backdrop-blur-md border-t-4 border-fuego p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center justify-center gap-2 btn-fuego font-extrabold py-4 rounded-sm uppercase tracking-widest text-sm"
    >
      <IconWhatsApp className="w-5 h-5 text-carbon-deep" />
      Consultar por WhatsApp
    </a>
  </div>
);

/* ============================================================
   App
   ============================================================ */
export default function App() {
  return (
    <div className="min-h-screen bg-carbon text-hueso overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <ProductsSection />
        <hr className="fire-divider" />
        <FabricacionSection />
        <ReviewsSection />
        <WhyUsSection />
        <LocationSection />
        <FinalCTASection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <StickyBottomBar />
    </div>
  );
}
