'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function MotionDirector() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1 });
    const update = () => ScrollTrigger.update();
    lenis.on('scroll', update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
        gsap.fromTo(element, { y: 48, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.95, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('.process-step').forEach((element, index) => {
        gsap.fromTo(element, { y: 65, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, delay: index * 0.1,
          scrollTrigger: { trigger: '#process', start: 'top 65%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('.director-card').forEach((element, index) => {
        ScrollTrigger.create({
          trigger: '#team', start: `top ${68 - index * 7}%`, once: true,
          onEnter: () => element.classList.add('is-flipped'),
        });
      });
      gsap.utils.toArray<HTMLElement>('.story-note').forEach((element, index) => {
        gsap.fromTo(element, { x: index % 2 === 0 ? 110 : -110, opacity: 0 }, {
          x: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: element, start: 'top 92%', end: 'center 60%', scrub: 0.6 },
        });
      });
      gsap.to('.story-backdrop img', {
        scale: 1.13, ease: 'none',
        scrollTrigger: { trigger: '#story', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
    });

    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const scrollToAnchor = (event: Event) => {
      const anchor = event.currentTarget as HTMLAnchorElement;
      const target = document.getElementById(anchor.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -76, duration: 0.85 });
    };
    anchors.forEach(anchor => anchor.addEventListener('click', scrollToAnchor));
    return () => {
      anchors.forEach(anchor => anchor.removeEventListener('click', scrollToAnchor));
      context.revert();
      gsap.ticker.remove(tick);
      lenis.off('scroll', update);
      lenis.destroy();
    };
  }, []);
  return null;
}
