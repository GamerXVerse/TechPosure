'use client';

import { useState } from 'react';

const items = [
  ['Mission', 'mission'], ['Our Story', 'story'], ['Services', 'services'],
  ['How It Works', 'process'], ['Team', 'team'], ['Contact', 'contact'],
] as const;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return <>
    <nav className="desktop-nav" aria-label="Primary navigation">{items.slice(0, 5).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
    <button className="mobile-menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(value => !value)}><span /><span /></button>
    <nav className={`mobile-nav ${open ? 'is-open' : ''}`} id="mobile-nav" aria-label="Mobile navigation" inert={!open}>{items.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label} <span aria-hidden="true">↗</span></a>)}</nav>
  </>;
}
