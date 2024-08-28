import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from 'next/link';
import FlickeringGrid from '@/utils/pattern';
import gsap from 'gsap';

export default function Index() {
  const [notification, setNotification] = useState(true)
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setNotification(!notification);
  };

  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    const links = document.querySelectorAll('a');
    const textLine = document.getElementById('text-line');
    const textLines = document.getElementById('text-lines');


    const onMouseMove = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 4, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    document.addEventListener('mousemove', onMouseMove);
    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnter);
      link.addEventListener('mouseleave', onMouseLeave);
    });

    if (textLine) {
      textLine.addEventListener('mouseenter', onMouseEnter);
      textLine.addEventListener('mouseleave', onMouseLeave);
    }
    if (textLines) {
      textLines.addEventListener('mouseenter', onMouseEnter);
      textLines.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onMouseEnter);
        link.removeEventListener('mouseleave', onMouseLeave);
      });
      if (textLine) {
        textLine.removeEventListener('mouseenter', onMouseEnter);
        textLine.removeEventListener('mouseleave', onMouseLeave);
      }
      if (textLine) {
        textLines.removeEventListener('mouseenter', onMouseEnter);
        textLines.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, []);

  return (
    <>
      <div id="custom-cursor" className="custom-cursor fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white border border-black" />

      <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.25}
        flickerChance={0.1}
      />
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EYZRXJNM1Q',{
            page_path: window.location.pathname
          });
          `
          }} />
      </Head>

      <main className='h-screen'>
        <header className='absolute top-0 left-0 right-0 z-50'>
          <nav className='home-container flex justify-between py-8 px-10 md:px-0'>
            <Link href="/" className='text-lg md:text-xl'>deadlium</Link>
            <button className="background cursor-none" onClick={toggleMenu}>
              <div className={`menu__icon ${isOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </nav>
        </header>
        <div
          className={`absolute z-40 top-0 left-0 px-10 transition-all ease-in-out duration-500 w-screen bg-black text-white ${notification ? "h-0 opacity-0" : "h-screen opacity-100"}`}
        >
          <div className={`home-container flex flex-col-reverse gap-16 md:flex-row items-start md:items-end md:justify-between pb-10 md:pb-32 ${notification ? "h-0 opacity-0" : "h-screen opacity-100"}`}>
            <div className='flex flex-row md:flex-col gap-5 justify-center md:justify-end md:h-screen'>
              <Link
                href="https://github.com/deadlium"
                className='bg-gray-800 hover:bg-white hover:text-black transition-all duration-500  rounded-full p-2'
              ><GitHubIcon /></Link>
              <Link
                href="https://x.com/deadlium"
                className='bg-gray-800 hover:bg-white hover:text-black transition-all duration-500  rounded-full p-2'
              ><XIcon /></Link>
              <Link
                href="https://t.me/deadlium"
                className='bg-gray-800 hover:bg-white hover:text-black transition-all duration-500  rounded-full p-2'
              ><TelegramIcon /></Link>
              <Link
                href="www.linkedin.com/in/uddeshjaiswal"
                className='bg-gray-800 hover:bg-white hover:text-black transition-all duration-500  rounded-full p-2'
              ><LinkedInIcon /></Link>
              <Link
                href="https://www.instagram.com/0xdeadlium?igsh=aXY5b2FtZW1jeG5x"
                className='bg-gray-800 hover:bg-white hover:text-black transition-all duration-500  rounded-full p-2'
              ><InstagramIcon /></Link>
              <Link
                href="mailto:self@uddeshjaiswal.com"
                className='bg-gray-800 hover:bg-white hover:text-black transition-all duration-500  rounded-full p-2'
              ><EmailIcon /></Link>
            </div>
            <div className='flex flex-col gap-5 md:gap-10 text-6xl md:text-8xl font-black text-gray-600'>
              <Link href="/" className='' onClick={() => toggleMenu}>Home</Link>
              <Link href="/" className='' onClick={() => toggleMenu}>About</Link>
              <Link href="https://calendly.com/admin-uddeshjaiswal/30min" className='' onClick={() => toggleMenu}>Calendly</Link>
            </div>
          </div>
        </div>
        <div className='home-container z-50'>
          <div className='h-screen manrope flex flex-col gap-5 justify-center px-10 md:px-40'>
            <span id='text-line' className='text-xs md:text-sm font-medium tracking-[4px] md:tracking-[6px]'>HELLO MATE!</span>
            <div>
              <h2 id='text-lines' className='text-4xl md:text-7xl font-extrabold leading-normal'>
                I’m Uddesh Jaiswal,<span className='block'>Crafting Digital Magic</span> <span>as a Full-Stack Wizard.</span>
              </h2>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
