"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { FaTelegramPlane } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import { IoLogoGithub } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";

const navItems = [
  { label: "Home", href: "/", active: true },
  { label: "Works", href: "https://github.com/deadlium", active: false },
  {
    label: "Calendly",
    href: "https://calendly.com/admin-uddeshjaiswal/30min",
    active: false,
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/deadlium",
    icon: <IoLogoGithub />,
  },
  {
    label: "X",
    href: "https://www.x.com/deadlium",
    icon: <RiTwitterXLine />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/uddeshjaiswal",
    icon: <GrLinkedin />,
  },
  {
    label: "Telegram",
    href: "https://t.me/deadlium",
    icon: <FaTelegramPlane />,
  },
];

const darkThemeClasses = {
  page: "bg-[#151515] text-[#e8e5e1]",
  border: "border-white/20",
  muted: "text-white/45",
  soft: "text-white/70",
  body: "text-white/75",
  strong: "text-white/85",
  hover: "hover:text-white",
  sidebarLine: "bg-white",
  sidebarIcon: "text-white/90",
  aboutBorder: "border-white/25",
  cursor: "border-white/50 bg-white/95",
  button:
    "border-white/20 bg-black/50 text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)]",
  buttonDot: "bg-white",
};

const lightThemeClasses = {
  page: "bg-[#f2efe8] text-[#1a1a1a]",
  border: "border-black/15",
  muted: "text-black/45",
  soft: "text-black/65",
  body: "text-black/70",
  strong: "text-black/85",
  hover: "hover:text-black",
  sidebarLine: "bg-black",
  sidebarIcon: "text-black/80",
  aboutBorder: "border-black/20",
  cursor: "border-white/50 bg-white/95",
  button:
    "border-black/15 bg-white/80 text-black shadow-[0_12px_30px_rgba(0,0,0,0.12)]",
  buttonDot: "bg-black",
};

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [isAnimatingTheme, setIsAnimatingTheme] = useState(false);
  const overlayRef = useRef(null);
  const buttonRef = useRef(null);

  const getThemeCircle = () => {
    const button = buttonRef.current;
    if (!button) {
      return { x: window.innerWidth - 44, y: window.innerHeight - 44, radius: 0 };
    }

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    return { x, y, radius };
  };

  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const onMouseMove = (event) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.12,
        ease: "power2.out",
      });
    };

    const growCursor = () => {
      gsap.to(cursor, { scale: 2, duration: 0.2, ease: "power2.out" });
    };

    const resetCursor = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    const interactiveElements = document.querySelectorAll(
      '[data-cursor-scope="sidebar"] a, [data-cursor-scope="theme-toggle"], .text-cursor'
    );

    window.addEventListener("mousemove", onMouseMove);
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", growCursor);
      element.addEventListener("mouseleave", resetCursor);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", growCursor);
        element.removeEventListener("mouseleave", resetCursor);
      });
    };
  }, []);

  const toggleTheme = () => {
    if (isAnimatingTheme || !overlayRef.current) return;

    const overlay = overlayRef.current;
    const { x, y, radius } = getThemeCircle();
    setIsAnimatingTheme(true);

    if (isDark) {
      gsap.set(overlay, {
        display: "block",
        clipPath: `circle(0px at ${x}px ${y}px)`,
      });

      gsap.to(overlay, {
        clipPath: `circle(${radius}px at ${x}px ${y}px)`,
        duration: 0.7,
        ease: "power2.inOut",
        onComplete: () => {
          setIsDark(false);
          gsap.set(overlay, { display: "none" });
          setIsAnimatingTheme(false);
        },
      });

      return;
    }

    setIsDark(true);
    gsap.set(overlay, {
      display: "block",
      clipPath: `circle(${radius}px at ${x}px ${y}px)`,
    });

    gsap.to(overlay, {
      clipPath: `circle(0px at ${x}px ${y}px)`,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(overlay, { display: "none" });
        setIsAnimatingTheme(false);
      },
    });
  };

  const renderPageShell = (themeClasses, { overlay = false } = {}) => (
    <section
      className={`flex min-h-screen w-screen flex-col overflow-x-hidden lg:h-screen lg:overflow-hidden ${themeClasses.page}`}
    >
      <header className={`border-b px-4 py-3 lg:hidden ${themeClasses.border}`}>
        <div className="flex items-center justify-between gap-4">
          <nav aria-label="Primary">
            <ul
              className={`flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.22em] sm:gap-6 ${themeClasses.muted}`}
            >
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`transition-colors duration-200 ${item.active ? "text-current" : themeClasses.hover
                      }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={`flex items-center gap-3 sm:gap-4 ${themeClasses.sidebarIcon}`}>
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                className={`text-lg transition-colors duration-200 ${themeClasses.hover}`}
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <section className="flex w-full min-w-0 flex-1 flex-col lg:flex-row">
        <aside
          data-cursor-scope={overlay ? undefined : "sidebar"}
          className="hidden h-full shrink-0 lg:block lg:w-55 lg:px-8 lg:py-20 xl:w-62.5 xl:px-12 xl:py-24 2xl:px-20 2xl:py-40"
        >
          <div className="space-y-10 lg:space-y-10 xl:space-y-12">
            <nav aria-label="Primary">
              <ul
                className={`space-y-4 text-[0.92rem] uppercase tracking-[0.18em] xl:space-y-5 xl:text-[1.1rem] xl:tracking-[0.24em] ${themeClasses.muted}`}
              >
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`group inline-flex flex-col pb-1 transition-colors duration-200 ${item.active ? "text-current" : themeClasses.hover
                        }`}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`mt-1 h-px w-full origin-left transition-transform duration-300 ease-out ${themeClasses.sidebarLine} ${item.active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          }`}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-3 xl:gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  className={`text-xl transition-colors duration-200 xl:text-2xl ${themeClasses.sidebarIcon} ${themeClasses.hover}`}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 font-extralight tracking-[2px]">
          <div className="flex w-full flex-col gap-14 px-6 py-12 sm:px-10 sm:py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-stretch lg:gap-12 lg:px-10 lg:py-14 xl:grid-cols-[1.1fr_0.9fr] xl:gap-10 xl:px-16 xl:py-20 2xl:px-20 2xl:py-36">
            <div className="flex flex-col justify-between gap-14 lg:min-h-full lg:py-2">
              <div className="flex flex-col">
                <h1 className="w-fit text-[3.2rem] leading-[0.92] tracking-[0.18em] sm:text-[4.6rem] lg:text-[4.9rem] lg:tracking-[0.12em] xl:text-[6.4rem] 2xl:text-[7.2rem]">
                  <span className="block text-cursor">UDDESH</span>
                  <span className="block text-cursor">JAISWAL</span>
                </h1>
                <p className={`text-cursor mt-3 text-base tracking-[0.04em] sm:text-lg lg:text-[1.15rem] xl:text-xl ${themeClasses.soft}`}>
                  Full Stack Developer / Blockchain Developer
                </p>
              </div>

              <div className={`text-cursor flex flex-col gap-1 text-lg tracking-[0.04em] sm:text-xl lg:pb-4 lg:text-[1.15rem] xl:text-2xl ${themeClasses.strong}`}>
                <p>For business inquiries, email me at</p>
                <Link
                  href="mailto:hello@uddeshjaiswal.com"
                  className={`transition-colors duration-200 ${themeClasses.hover}`}
                >
                  hello@uddeshjaiswal.com
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-end lg:min-h-full lg:py-2">
              <div className="flex flex-col gap-5 lg:mt-auto lg:pb-4 xl:pb-0">
                <div className={`text-cursor border-b pb-3 text-2xl tracking-[0.08em] sm:text-[1.75rem] lg:text-[2rem] ${themeClasses.aboutBorder}`}>
                  ABOUT ME
                </div>
                <div className={`text-cursor whitespace-pre-line text-base leading-[1.8] tracking-[0.08em] sm:text-lg lg:text-[1rem] xl:text-xl ${themeClasses.body}`}>
                  {`I’m a blockchain developer focused on building scalable Web3 infrastructure and high-performance systems. I work with Cosmos SDK and explore Solana concepts, developing indexers, sequencers, and custom modules.
I prefer an engineering-first approach, building core components for better control over performance and security. Beyond blockchain, I’ve built backend APIs, mobile apps, and modern web interfaces.
I’m passionate about decentralized systems, cross-chain communication, and creating reliable, future-ready technology.`}
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>

      <footer className="flex h-fit w-full px-4 py-3 md:px-6 lg:px-8 xl:px-20">
        <div className={`text-sm tracking-[0.04em] ${themeClasses.soft}`}>
          &copy; Uddesh Jaiswal
        </div>
      </footer>
    </section>
  );

  const themeClasses = isDark ? darkThemeClasses : lightThemeClasses;

  return (
    <>
      <div ref={overlayRef} className="pointer-events-none fixed inset-0 z-[9998] hidden overflow-hidden">
        {renderPageShell(lightThemeClasses, { overlay: true })}
      </div>

      <div
        id="custom-cursor"
        className={`pointer-events-none fixed top-0 left-0 z-9999 hidden h-5 w-5 rounded-full mix-blend-difference transition-colors duration-300 md:block ${themeClasses.cursor}`}
      />

      <div className="transition-colors duration-300">
        {renderPageShell(themeClasses)}
      </div>

      <button
        ref={buttonRef}
        type="button"
        data-cursor-scope="theme-toggle"
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        aria-pressed={!isDark}
        onClick={toggleTheme}
        className={`fixed right-5 bottom-5 z-[10000] flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur transition-all duration-300 hover:scale-105 ${themeClasses.button} ${isAnimatingTheme ? "pointer-events-none" : ""
          }`}
      >
        <span className="sr-only">Toggle theme</span>
        <span className={`h-3 w-3 rounded-full transition-colors duration-300 ${themeClasses.buttonDot}`} />
      </button>
    </>
  );
}
