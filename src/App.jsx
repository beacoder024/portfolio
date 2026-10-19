import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import { profile, journey, skills, projects, contact } from './data'
import './styles.css'
// CHANGE a: icon imports (right under your existing imports)
import { FaEnvelope, FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { SiLeetcode, SiCodechef, SiHackerrank } from 'react-icons/si'

const ICONS = { email: FaEnvelope, linkedin: FaLinkedinIn, github: FaGithub, leetcode: SiLeetcode, codechef: SiCodechef, hackerrank: SiHackerrank }

const NAV = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact']

export default function App() {
  const [open, setOpen] = useState(false)
  const [first, ...rest] = profile.name.split(' ')

  const go = (id) => {
    if (id === 'Home') return setOpen(false)
    const scroll = () => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    if (open) scroll()
    else { setOpen(true); setTimeout(scroll, 1300) }
  }

  return (
    <div className="app">
      <Canvas className="canvas" camera={{ position: [0, 1.5, 12], fov: 40 }} dpr={[1, 2]}>
        <Scene open={open} />
      </Canvas>

      <nav className="nav">
        <span className="brand">{first} ✈</span>
        <div className="links">
          {NAV.map((n) => <button key={n} className={n === 'Home' && !open ? 'on' : ''} onClick={() => go(n)}>{n}</button>)}
        </div>
        {profile.resumeUrl && <a className="resume" href={profile.resumeUrl} target="_blank" rel="noreferrer">View Resume ↗</a>}
      </nav>

      <header className={'hero' + (open ? ' gone' : '')}>
        <div>
          <p className="hello">Hello, I’m</p>
          <h1>{first} <span>{rest.join(' ')}</span></h1>
          <h2>{profile.role}</h2>
          <p className="meta">{profile.years} of Experience | {profile.company}</p>
          <p className="tag">{profile.tagline} ✈</p>
          <div className="btns">
            <button className="primary" onClick={() => go('Projects')}>View My Work →</button>
            <button className="ghost" onClick={() => go('Contact')}>Get in Touch ✉</button>
          </div>
          {/* CHANGE b: the hero icons (replaces your old <div className="social"> line) */}
          <div className="social">
            {contact.map((c) => {
              const Icon = ICONS[c.icon]
              return <a key={c.label} href={c.href} title={c.label} aria-label={c.label} target="_blank" rel="noreferrer">{Icon ? <Icon /> : c.short}</a>
            })}
          </div>
        </div>
        <button className="jp" onClick={() => setOpen(true)}>
          <span className="jp-ico">✈</span>
          <span><b>Job Profile</b><small>Flights are Flying...</small></span><i>→</i>
        </button>
      </header>

      <main className={'profile' + (open ? ' show' : '')} aria-hidden={!open}>
        <div className="wrap">
          <section id="about" className="card" style={{ '--i': 0 }}>
            <h2>About <span>Me</span></h2>
            <div className="about">
              <div>
                {profile.about.map((p) => <p key={p}>{p}</p>)}
                <p className="loc">📍 Based in {profile.location} {profile.openToWork && <em>● Open to Opportunities</em>}</p>
              </div>
              <div className="facts">
                <h3>Quick Facts</h3>
                {profile.facts.map(([a, b]) => <p key={a}><b>{a}</b><small>{b}</small></p>)}
              </div>
            </div>
            <blockquote>“{profile.quote}”</blockquote>
          </section>

          <section id="experience" className="card" style={{ '--i': 1 }}>
            <h2>My <span>Journey</span></h2>
            <div className="timeline">
              {journey.map((j) => (
                <div className="job" key={j.period}>
                  <i className="logo">V</i>
                  <div>
                    <span className="pill">{j.period}</span>
                    <h3>{j.title} @ {j.org}</h3>
                    <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="card" style={{ '--i': 2 }}>
            <h2>Pro<span>jects</span></h2>
            <div className="projgrid">
              {projects.map((p) => (
                <div key={p.name} className="proj">
                  <h3>{p.link ? <a href={p.link} target="_blank" rel="noreferrer">{p.name}</a> : p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="chips">{p.stack.map((x) => <span key={x}>{x}</span>)}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="skills" className="card" style={{ '--i': 3 }}>
            <h2>Tech <span>Stack</span></h2>
            <div className="chips">{skills.map((x) => <span key={x}>{x}</span>)}</div>
          </section>

          <section id="contact" className="card" style={{ '--i': 4 }}>
            <h2>Get in <span>Touch</span></h2>
            {/* CHANGE c: the contact rows with icons (replaces your old <ul className="contact"> line) */}
            <ul className="contact">
              {contact.map((c) => {
                const Icon = ICONS[c.icon]
                return <li key={c.label}><b>{Icon && <Icon />} {c.label}</b><a href={c.href} target="_blank" rel="noreferrer">{c.value}</a></li>
              })}
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}