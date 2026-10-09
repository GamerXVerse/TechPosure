'use client';

import Image from 'next/image';
import type { directors } from '@/lib/content';

type Director = (typeof directors)[number];

export default function DirectorCard({ director, index }: { director: Director; index: number }) {
  return <article className="director-card" style={{ '--card-index': index } as React.CSSProperties}>
    <div className="director-card-inner">
      <div className="director-face director-front">
        <span className="mono">0{index + 1} / THE PEOPLE BEHIND TECHPOSURE</span>
        <div><p className="director-back-kicker">Meet the director</p><h3>{director.name}</h3><p className="director-role">{director.role}</p></div>
        <div className="director-links"><a href="#contact" data-contact-person={director.contact}>Use the contact form ↗</a><a href={`mailto:${director.email}`}>{director.email}</a></div>
      </div>
      <div className="director-face director-back">
        <div className="director-photo"><Image src={director.image} alt={director.name} fill sizes="(max-width: 700px) 80vw, 30vw" /></div>
        <div className="director-front-label"><span>0{index + 1} / DIRECTOR</span><h3>{director.name}</h3></div>
      </div>
    </div>
    <button type="button" className="director-flip" aria-label={`Flip ${director.name}'s card`} onClick={event => {
      const card = event.currentTarget.closest('.director-card');
      card?.classList.toggle('is-flipped');
    }}>Flip card <span aria-hidden="true">↻</span></button>
  </article>;
}
