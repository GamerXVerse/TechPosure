'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const SpatialWorld = dynamic(() => import('./spatial-world'), { ssr: false });

export default function Experience() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const check = () => setEnabled(!motion.matches && !!document.createElement('canvas').getContext('webgl2'));
    check();
    motion.addEventListener('change', check);
    return () => motion.removeEventListener('change', check);
  }, []);

  return <div className="experience-world" aria-hidden="true">{enabled ? <SpatialWorld /> : <div className="world-fallback"><svg viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet"><g fill="none" stroke="#87bdad" strokeWidth="1.5" opacity=".7"><path d="M400 400 155 210 275 120 550 150 670 300 700 520 545 650 315 680 130 535Z"/><path d="M400 400 275 120M400 400 550 150M400 400 670 300M400 400 700 520M400 400 545 650M400 400 315 680M400 400 130 535M155 210 130 535M550 150 700 520M315 680 130 535"/></g><g fill="#16816a"><circle cx="400" cy="400" r="17"/><circle cx="155" cy="210" r="8"/><circle cx="550" cy="150" r="9"/><circle cx="315" cy="680" r="10"/><circle cx="130" cy="535" r="7"/></g><g fill="#3775cc"><circle cx="275" cy="120" r="7"/><circle cx="670" cy="300" r="8"/><circle cx="700" cy="520" r="8"/><circle cx="545" cy="650" r="8"/></g></svg></div>}</div>;
}
