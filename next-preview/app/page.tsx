import Image from 'next/image';
import Experience from '@/components/experience';
import MotionDirector from '@/components/motion-director';
import DirectorCard from '@/components/director-card';
import ContactForm from '@/components/contact-form';
import Navigation from '@/components/navigation';
import { directors, processSteps, services } from '@/lib/content';

const storyNotes = [
  ['We learned by building.', 'Hands-on work taught us to turn a complex problem into something useful: a clear website, an organized workflow, a tool people can actually use.'],
  ['Then we noticed a gap.', 'Community organizations often have the ideas and expertise, but not always the time, budget, or technical staff to create the systems behind them.'],
  ['That became our purpose.', 'We created TechPosure to put technical skills to work for nonprofits—helping the people strengthening our region spend more time on their missions.'],
] as const;

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Experience />
    <MotionDirector />
    <header className="site-header">
      <a className="brand" href="#mission" aria-label="TechPosure home"><Image src="/assets/techposure-logo.svg" alt="TechPosure" width={188} height={50} priority /></a>
      <Navigation />
      <a className="header-cta" href="#contact">Work With Us <span aria-hidden="true">↗</span></a>
    </header>
    <main id="main" className="relative min-h-screen">
      <section className="hero chapter" id="mission" aria-labelledby="hero-title">
        <div className="hero-content" data-reveal>
          <p className="eyebrow"><span className="eyebrow-dot" /> NORTHWEST ARKANSAS · COMMUNITY TECHNOLOGY</p>
          <h1 id="hero-title">Technology built for those <em>building our community.</em></h1>
          <p className="hero-lede">We help Northwest Arkansas nonprofits design, build, and improve the technical systems behind their work—so more energy can stay focused on the mission.</p>
          <div className="hero-actions"><a className="button button-primary" href="#contact">Work With Us <span aria-hidden="true">↗</span></a><a className="text-link" href="#story">Follow our story <span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="hero-bottom"><span>01 / 08</span><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></div>
        <div className="world-caption" aria-hidden="true"><span>TECHPOSURE NETWORK</span><span>MISSION → SYSTEMS → COMMUNITY</span></div>
      </section>

      <section className="mission-bridge chapter panel-chapter" aria-labelledby="mission-bridge-title">
        <div className="section-index" data-reveal><span>01</span> WHY TECHNOLOGY MATTERS</div>
        <div className="bridge-copy" data-reveal><h2 id="mission-bridge-title">A strong mission deserves <em>systems that keep up.</em></h2><p>Websites, data, workflows, and everyday tools shape how an organization reaches people and runs its programs. When those systems work well, teams have more room to do what only they can do: serve their community.</p></div>
        <div className="system-rail" data-reveal><div><b>Community mission</b><small>Deep local knowledge</small></div><span aria-hidden="true">→</span><div><b>TechPosure</b><small>Added technical capacity</small></div><span aria-hidden="true">→</span><div><b>Practical systems</b><small>Built around real work</small></div></div>
      </section>

      <section className="story chapter" id="story" aria-labelledby="story-title">
        <figure className="story-backdrop">
          <Image src="/assets/ignite-building.jpg" alt="The entrance of Ignite Professional Studies in Bentonville, Arkansas" fill sizes="100vw" />
          <figcaption><span>THE STARTING POINT · BENTONVILLE, AR</span><a href="https://www.bentonvillek12.org/o/ignite/page/facility" target="_blank" rel="noopener noreferrer">Ignite Professional Studies ↗</a></figcaption>
        </figure>
        <div className="story-content">
          <div className="story-intro"><div className="section-index" data-reveal><span>02</span> WHERE WE STARTED</div><div data-reveal><p className="eyebrow">A CLASSROOM IDEA WITH A COMMUNITY PURPOSE</p><h2 id="story-title">Our story began at <em>Ignite.</em></h2></div><p data-reveal>Learning to build with technology showed us what the right systems can make possible. It also made us look beyond our own projects—and toward the organizations already doing essential work across Northwest Arkansas.</p></div>
          <div className="story-notes">{storyNotes.map(([title, copy], index) => <article key={title} className={`story-note story-note-${index + 1}`}><span>0{index + 1} / 03</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        </div>
      </section>

      <section className="problem chapter" aria-labelledby="problem-title"><div className="section-index" data-reveal><span>03</span> WHAT WE NOTICED</div><div className="problem-layout"><div data-reveal><h2 id="problem-title">Great missions shouldn’t be <em>limited by technology.</em></h2><p>Nonprofit teams are experts in the people and causes they serve. We can add focused technical capacity when a needed project sits outside the team’s time or expertise.</p></div><div className="problem-list" data-reveal><span className="mono">THE FRICTION WE CAN HELP UNTANGLE</span><ol><li>Manual, repetitive processes</li><li>Disconnected spreadsheets and tools</li><li>Outdated or missing web experiences</li><li>Ideas for tools with no builder available</li><li>Technology setup and organization</li></ol></div></div><blockquote data-reveal>“They already know how to serve the community. We help build the systems behind that work.”</blockquote></section>

      <section className="services chapter" id="services" aria-labelledby="services-title"><div className="section-heading services-heading"><div className="section-index" data-reveal><span>04</span> WHAT WE BUILD</div><div data-reveal><h2 id="services-title">Technical support, <em>shaped around your mission.</em></h2></div><p data-reveal>Every organization has different needs. We start by understanding the problem, then determine where our skills can be most useful.</p></div><div className="services-grid">{services.map(([name, copy], index) => <article className="service-card" data-reveal key={name}><span className="service-number">{String(index + 1).padStart(2, '0')} / 10</span><span className="service-icon" aria-hidden="true">{index % 3 === 0 ? '✳' : index % 3 === 1 ? '⌘' : '◈'}</span><h3>{name}</h3><p>{copy}</p>{index === 9 ? <a href="#contact">Bring us the challenge ↗</a> : null}</article>)}</div></section>

      <section className="process chapter" id="process" aria-labelledby="process-title"><div className="section-index" data-reveal><span>05</span> HOW IT WORKS</div><h2 id="process-title" data-reveal>Start with the need. <em>Build the useful thing.</em></h2><ol className="process-track">{processSteps.map(([name, copy], index) => <li className="process-step" key={name}><span className="step-number">0{index + 1}</span><span className="process-node" aria-hidden="true" /><h3>{name}</h3><p>{copy}</p></li>)}</ol></section>

      <section className="vision chapter" id="vision" aria-labelledby="vision-title"><div className="vision-copy" data-reveal><div className="section-index"><span>06</span> WHERE WE’RE GOING</div><p className="eyebrow">BUILT HERE. BUILT FOR HERE.</p><h2 id="vision-title">A stronger technical network for <em>Northwest Arkansas.</em></h2><p>We want nonprofit organizations and community initiatives across our region to be able to reach technical talent when they need it. As we grow, our goal is to take on more projects, expand what we can build, and strengthen the digital infrastructure supporting local work.</p></div><div className="county-labels" aria-label="Benton County network connects Bentonville to Rogers, Bella Vista, Pea Ridge, Siloam Springs, and Lowell"><span>BENTON COUNTY · CONCEPT MAP</span><div><b>BENTONVILLE</b><span>ROGERS</span><span>BELLA VISTA</span><span>PEA RIDGE</span><span>SILOAM SPRINGS</span><span>LOWELL</span></div></div></section>

      <section className="team chapter" id="team" aria-labelledby="team-title"><div className="team-heading"><div className="section-index" data-reveal><span>07</span> THE PEOPLE BEHIND TECHPOSURE</div><h2 id="team-title" data-reveal>Meet the <em>team.</em></h2><p data-reveal>Three directors. One shared commitment to useful technology for our community.</p></div><div className="director-grid">{directors.map((director, index) => <DirectorCard key={director.name} director={director} index={index} />)}</div><p className="team-hint">SCROLL TO REVEAL · USE THE FLIP BUTTONS TO REVISIT</p></section>

      <section className="contact chapter" id="contact" aria-labelledby="contact-title"><div className="contact-heading" data-reveal><div className="section-index"><span>08</span> WORK WITH US</div><h2 id="contact-title">Have a technical problem <em>we can help solve?</em></h2><p>If your nonprofit or community initiative needs a website, application, tracking system, workflow, technology setup, or another technical project, we’d like to hear about it.</p></div><div className="contact-panel" data-reveal><span className="mono">START A CONVERSATION · NORTHWEST ARKANSAS</span><ContactForm /></div></section>
    </main>
    <footer className="site-footer"><div><a className="brand" href="#mission" aria-label="TechPosure home"><Image src="/assets/techposure-logo.svg" alt="TechPosure" width={188} height={50} /></a><p>Technology that strengthens the people strengthening our community.</p></div><nav aria-label="Footer navigation"><a href="#story">Our Story</a><a href="#services">Services</a><a href="#process">How It Works</a><a href="#contact">Contact</a></nav><div className="footer-meta"><span>Northwest Arkansas</span><span>© 2026 TechPosure</span></div></footer>
  </>;
}
