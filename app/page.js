"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

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

const THEME_STORAGE_KEY = "portfolio-theme";
const THEME_EVENT_NAME = "portfolio-theme-change";

const getStoredTheme = () => {
  if (typeof window === "undefined") return "dark";

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme === "light" ? "light" : "dark";
};

const subscribeToTheme = (callback) => {
  if (typeof window === "undefined") return () => { };

  const handleChange = () => callback();

  window.addEventListener("storage", handleChange);
  window.addEventListener(THEME_EVENT_NAME, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(THEME_EVENT_NAME, handleChange);
  };
};

const setStoredTheme = (theme) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  window.dispatchEvent(new Event(THEME_EVENT_NAME));
};

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
  const storedTheme = useSyncExternalStore(
    subscribeToTheme,
    getStoredTheme,
    () => "dark"
  );
  const isDark = storedTheme === "dark";
  const [isAnimatingTheme, setIsAnimatingTheme] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [bootTheme] = useState(() => getStoredTheme());
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
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark]);

  useEffect(() => {
    document.documentElement.style.colorScheme =
      bootTheme === "dark" ? "dark" : "light";

    let progress = 0;
    const intervalId = window.setInterval(() => {
      progress += progress < 70 ? 9 : progress < 90 ? 4 : 2;
      const nextValue = Math.min(progress, 100);
      setLoadingProgress(nextValue);

      if (nextValue === 100) {
        window.clearInterval(intervalId);
        window.setTimeout(() => {
          setIsBooting(false);
        }, 180);
      }
    }, 45);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [bootTheme]);

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

    const imageLensCleanups = [];
    const imageContainers = document.querySelectorAll('.img-lens-container');
    imageContainers.forEach((container) => {
      const maskLayer = container.querySelector('.img-mask');
      if (!maskLayer) return;

      let currentRadius = 0;

      const enter = () => {
        gsap.to(cursor, { opacity: 0, duration: 0.2 });
        currentRadius = 20;
      };

      const leave = (e) => {
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
        currentRadius = 0;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        gsap.to(maskLayer, { clipPath: `circle(0px at ${x}px ${y}px)`, duration: 0.3, ease: 'power2.out' });
      };

      const move = (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        gsap.to(maskLayer, { clipPath: `circle(${currentRadius}px at ${x}px ${y}px)`, duration: 0.15, ease: 'power2.out' });
      };

      container.addEventListener('mouseenter', enter);
      container.addEventListener('mouseleave', leave);
      container.addEventListener('mousemove', move);

      imageLensCleanups.push(() => {
        container.removeEventListener('mouseenter', enter);
        container.removeEventListener('mouseleave', leave);
        container.removeEventListener('mousemove', move);
      });
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", growCursor);
        element.removeEventListener("mouseleave", resetCursor);
      });
      imageLensCleanups.forEach(cleanup => cleanup());
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
          setStoredTheme("light");
          gsap.set(overlay, { display: "none" });
          setIsAnimatingTheme(false);
        },
      });

      return;
    }

    setStoredTheme("dark");
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
      className={`flex h-dvh w-screen flex-col overflow-hidden ${themeClasses.page}`}
    >
      <header className={`shrink-0 border-b px-4 py-3 lg:hidden ${themeClasses.border}`}>
        <div className="flex items-center justify-between gap-4">
          <nav aria-label="Primary">
            <ul
              className={`flex items-center gap-3 text-[0.58rem] uppercase tracking-[0.18em] sm:gap-5 sm:text-[0.62rem] ${themeClasses.muted}`}
            >
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
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

      <section className="flex min-h-0 w-full min-w-0 flex-1 flex-col lg:flex-row">
        <aside
          data-cursor-scope={overlay ? undefined : "sidebar"}
          className="hidden h-full shrink-0 lg:block lg:w-55 lg:px-8 lg:py-16 xl:w-62.5 xl:px-12 xl:py-20 2xl:px-20 2xl:py-28"
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
                      target="_blank"
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

        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto font-extralight tracking-[2px] lg:overflow-hidden">
          <div className="grid min-h-fit w-full grid-cols-1 grid-rows-[auto_auto_auto_1fr] gap-x-4 gap-y-10 px-5 py-5 sm:px-8 sm:py-6 lg:min-h-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(260px,0.95fr)] lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-10 lg:px-10 lg:py-10 xl:grid-cols-[1.08fr_0.92fr] xl:gap-x-14 xl:gap-y-14 xl:px-16 xl:py-16 2xl:px-20 2xl:py-20">
            <div className="col-start-1 row-start-1 flex min-w-0 flex-col self-start lg:col-start-1 lg:row-start-1 lg:self-start">
              <h1 className="w-fit text-[clamp(2rem,8vw,7.2rem)] leading-[0.9] tracking-widest sm:tracking-[0.12em]">
                <span className="block text-cursor">UDDESH</span>
                <span className="block text-cursor">JAISWAL</span>
              </h1>
              <p className={`text-cursor mt-2 text-[clamp(0.82rem,2.5vw,1.25rem)] tracking-[0.04em] ${themeClasses.soft}`}>
                Full Stack Developer
              </p>
            </div>

            <div className="col-start-1 row-start-2 flex justify-start self-start lg:col-start-2 lg:row-start-1 lg:self-start">
              {overlay ? (
                <div className="relative w-[clamp(7rem,min(22vw,30vh),16rem)] lg:w-[clamp(12rem,min(18vw,35vh),20rem)] aspect-5/6 overflow-hidden rounded-sm">
                  <Image
                    fill
                    alt="ud dark"
                    src="/ud.png"
                    className={`img object-cover transition-all duration-500 ${themeClasses === darkThemeClasses
                      ? "scale-100 opacity-100"
                      : "absolute inset-0 scale-95 opacity-0"
                      }`}
                  />
                  <Image
                    fill
                    alt="ud color"
                    src="/ud_color.png"
                    className={`img object-cover transition-all duration-500 ${themeClasses === lightThemeClasses
                      ? "scale-100 opacity-100"
                      : "absolute inset-0 scale-105 opacity-0"
                      }`}
                  />
                </div>
              ) : (
                <div className="img-lens-container cursor-none relative w-[clamp(7rem,min(22vw,30vh),16rem)] lg:w-[clamp(12rem,min(18vw,35vh),20rem)] aspect-5/6 overflow-hidden rounded-sm">
                  <Image
                    fill
                    alt="ud"
                    src={isDark ? "/ud.png" : "/ud_color.png"}
                    className="object-cover"
                  />
                  <div 
                    className="img-mask absolute inset-0 z-10 pointer-events-none"
                    style={{ clipPath: 'circle(0px at 50% 50%)' }}
                  >
                    <Image
                      fill
                      alt="ud opposite"
                      src={isDark ? "/ud_color.png" : "/ud.png"}
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className={`text-cursor col-start-1 row-start-3 flex flex-col gap-1 text-[clamp(0.9rem,2.4vw,1.45rem)] tracking-[0.04em] lg:col-span-1 lg:row-start-2 lg:col-start-1 lg:self-end ${themeClasses.strong}`}>
              <p>For business inquiries, email me at</p>
              <Link
                href="mailto:hello@uddeshjaiswal.com"
                target="_blank"
                className={`transition-colors duration-200 ${themeClasses.hover}`}
              >
                hello@uddeshjaiswal.com
              </Link>
            </div>

            <div className="col-start-1 row-start-4 flex min-h-0 flex-col gap-3 self-end lg:col-span-1 lg:row-start-2 lg:col-start-2 lg:self-end">
              <div className={`text-cursor border-b pb-2 text-[clamp(1.1rem,3vw,2rem)] tracking-[0.08em] ${themeClasses.aboutBorder}`}>
                ABOUT ME
              </div>
              <div className={`text-cursor whitespace-pre-wrap text-[clamp(0.85rem,1.8vw,1.25rem)] leading-relaxed tracking-[0.05em] ${themeClasses.body}`}>
                {`Full-stack developer specializing in scalable web applications and high-performance systems. Focused on clean architecture, efficient backend design, and seamless user experiences, I build robust, reliable solutions designed for real-world impact and long-term scalability. 🚀`}
              </div>
            </div>
          </div>
        </main>
      </section>

      <footer className="flex shrink-0 w-full px-4 py-2 md:px-6 lg:px-8 xl:px-20">
        <div className={`text-[0.78rem] tracking-[0.04em] sm:text-sm ${themeClasses.soft}`}>
          &copy; Uddesh Jaiswal / deadlium
        </div>
      </footer>
    </section>
  );

  const themeClasses = isDark ? darkThemeClasses : lightThemeClasses;
  const loaderThemeClasses =
    bootTheme === "dark" ? darkThemeClasses : lightThemeClasses;
  const loaderCircumference = 2 * Math.PI * 52;
  const loaderOffset =
    loaderCircumference - (loadingProgress / 100) * loaderCircumference;

  return (
    <>
      {isBooting && (
        <div
          className={`fixed inset-0 z-10001 flex flex-col items-center justify-center gap-8 transition-colors duration-300 ${loaderThemeClasses.page}`}
        >
          <div className="relative flex h-36 w-36 items-center justify-center">
            <svg
              className="-rotate-90"
              width="136"
              height="136"
              viewBox="0 0 136 136"
              aria-hidden="true"
            >
              <circle
                cx="68"
                cy="68"
                r="52"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={loaderThemeClasses.muted}
              />
              <circle
                cx="68"
                cy="68"
                r="52"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className={loaderThemeClasses.strong}
                style={{
                  strokeDasharray: loaderCircumference,
                  strokeDashoffset: loaderOffset,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-light tracking-[0.14em]">
                {loadingProgress}
              </span>
            </div>
          </div>

          <p
            className={`text-sm uppercase tracking-[0.4em] ${loaderThemeClasses.soft}`}
          >
            Loading
          </p>
        </div>
      )}

      <div ref={overlayRef} className="pointer-events-none fixed inset-0 z-9998 hidden overflow-hidden">
        {renderPageShell(lightThemeClasses, { overlay: true })}
      </div>

      <div
        id="custom-cursor"
        className={`pointer-events-none fixed top-0 left-0 z-9999 hidden h-5 w-5 rounded-full mix-blend-difference transition-colors duration-300 md:block ${themeClasses.cursor}`}
      />

      <div
        className={`transition-opacity duration-300 ${isBooting ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
      >
        {renderPageShell(themeClasses)}
      </div>

      <button
        ref={buttonRef}
        type="button"
        data-cursor-scope="theme-toggle"
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        aria-pressed={!isDark}
        onClick={toggleTheme}
        className={`fixed right-5 bottom-5 z-10000 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur transition-all duration-300 hover:scale-105 ${themeClasses.button} ${isAnimatingTheme ? "pointer-events-none" : ""
          }`}
      >
        <span className="sr-only">Toggle theme</span>
        <span className={`h-3 w-3 rounded-full transition-colors duration-300 ${themeClasses.buttonDot}`} />
      </button>
    </>
  );
}
