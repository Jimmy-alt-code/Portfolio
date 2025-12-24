"use client";

import PixelTransition from "@/components/PixelTransition";
import ProfileCard from "@/components/ProfileCard";
import Prism from "@/components/Prism";
import ScrollReveal from "@/components/ScrollReveal";
import TextPressure from "@/components/TextPressure";
import { useRef } from 'react';

export default function Home() {
  const scrollContainerRef = useRef(null);

  return (
    <main className="relative min-h-screen">
      {/* Rotating Prism background */}
      <div className="fixed inset-0 -z-10">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={2.0}
          hueShift={0.5}
          colorFrequency={0.6}
          noise={0.2}
          glow={0.45}
          bloom={0.6}
          transparent={false}
        />
      </div>

      {/* Top nav */}
      <header className="container mx-auto px-4 sm:px-6 pt-4 sm:pt-6 sticky top-0 z-50">
        <nav
          className="mx-auto max-w-5xl flex items-center justify-end rounded-[24px] sm:rounded-[34px] px-4 sm:px-8 py-4 sm:py-5 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 ring-1 ring-white/15 shadow-[0_18px_60px_-16px_rgba(0,0,0,0.65)] [box-shadow:_inset_0_1px_0_0_rgba(255,255,255,0.25),_inset_0_-1px_0_0_rgba(255,255,255,0.06)] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))]"
        >
          <div className="ml-auto flex items-center gap-12 sm:gap-16 md:gap-20 lg:gap-24 text-white/75 text-sm sm:text-base font-sans">
            <a href="#about" className="transition-colors hover:text-white tracking-wide">About</a>
            <a href="#projects" className="transition-colors hover:text-white tracking-wide">Projects</a>
            <a href="#contact" className="transition-colors hover:text-white tracking-wide">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero copy, Illustration & CTAs */}
      <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Quote & Creative Writing */}
            <div className="order-1 lg:order-1 space-y-6 sm:space-y-8 flex flex-col justify-center text-center sm:text-left">
              {/* Text Pressure Effect */}
              <div className="relative h-[72px] sm:h-[96px] md:h-[120px] mb-2 sm:mb-3">
                <TextPressure
                  text="Heyy... Irfan here"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor="#ffffff"
                  strokeColor="#3b82f6"
                  minFontSize={32}
                />
              </div>

              {/* Subheading below TextPressure */}
              <div className="text-white/80 text-lg sm:text-xl md:text-2xl font-body fade-in-up stagger-2 text-center sm:text-right">
                <span className="inline-block align-baseline text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-300 to-white bg-clip-text text-transparent drop-shadow-[0_1px_8px_rgba(255,255,255,0.15)]">developer</span>
                <span className="inline-block align-baseline ml-2">who</span>
              </div>

               {/* Main Quote */}
               <blockquote className="space-y-4 text-center sm:text-right">
                 <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight">
                   <span className="block text-white font-heading fade-in-left stagger-2">
                     A book is judged by its cover — <span className="text-gradient-animated pulse-glow">a developer by their website.</span>
                   </span>
                 </div>
               </blockquote>

              {/* Professional Tagline */}
              <div className="text-white/85 text-sm sm:text-base font-body font-semibold tracking-wide text-center sm:text-right fade-in-up stagger-3">
                <span className="opacity-90">Web Developer</span>
                <span className="px-2 opacity-40">|</span>
                <span className="opacity-90">AI Enthusiast</span>
                <span className="px-2 opacity-40">|</span>
                <span className="opacity-90">Data Science</span>
                <span className="px-2 opacity-40">|</span>
                <span className="opacity-90">Rapid Learner</span>
              </div>


              {/* Call to Action */}
              <div className="pt-4 fade-in-up stagger-4">
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-medium shadow-lg shadow-black/20 hover:shadow-black/30 transition-all duration-300 hover:scale-105 hover-lift"
                >
                  <span>Explore My Work</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="order-2 lg:order-2 flex justify-center lg:justify-end mt-6 sm:mt-0">
              <div className="relative float">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/illust.png"
                  alt="Professional working on a laptop illustration"
                  loading="lazy"
                  className="w-[260px] xs:w-[320px] sm:w-[420px] md:w-[520px] max-w-full h-auto scale-in stagger-1 illust-toned-down"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo card section (optional showcase) */}
      <section className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-28 mt-[10vh] sm:mt-[14vh] md:mt-[18vh]" id="home">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
          {/* Left: Profile Card */}
          <div className="place-self-center flex items-center justify-center min-h-[320px]">
            {/* @ts-expect-error - JS component without TS typings */}
            <ProfileCard
              name="IRFAN"
              title="Software Engineer"
              handle="its_jimmy "
              avatarUrl="/irfan.png"
              miniAvatarUrl="/irfan.png"
              showBehindGradient
              onContactClick={() => window.open("https://linkedin.com/in/irfan-fakir-393bb8330", "_blank", "noopener,noreferrer")}
            />
          </div>

          {/* Right: Featured Projects + About */}
          <div className="space-y-8 sm:space-y-10">
            {/* Featured Projects */}
            <div>
              <h3 className="text-white/90 text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 font-heading text-gradient-animated">Featured Projects</h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6">
                {[1,2].map((i)=> (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 p-4 sm:p-6 md:p-7 text-white/85 hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="text-lg sm:text-xl font-semibold font-heading">Project {i}</div>
                      <span className="text-xs sm:text-sm text-white/60">2025</span>
                    </div>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/75 leading-6 sm:leading-7 font-body">A short one-liner about impact and what makes this build notable.</p>
                    <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                      {['Next.js','TypeScript','Tailwind'].map(t => (
                        <span key={t} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/15 bg-white/5 ring-1 ring-white/10">{t}</span>
                      ))}
                    </div>
                    <div className="mt-3 sm:mt-5">
                      <a href="#" className="text-sm sm:text-base underline decoration-white/40 hover:decoration-white">View Case Study</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About + CTAs */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 p-5 sm:p-8 md:p-10">
              <h3 className="text-white/90 text-xl sm:text-2xl md:text-3xl font-semibold text-gradient-animated">About</h3>
              <p className="mt-2 sm:mt-3 text-white/75 text-sm sm:text-base leading-6 sm:leading-7">
                I craft performant, polished web experiences. I care about clean architecture, smooth animations,
                and measurable business impact.
              </p>
              <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <a
                  href="https://linkedin.com/in/irfan-fakir-393bb8330"
          target="_blank"
          rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center rounded-full bg-white text-black px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium shadow-md shadow-black/20 hover:shadow-black/30"
                >
                  Hire Me
                </a>
                <a
                  href="#"
                  className="w-full sm:w-auto text-center rounded-full border border-white/20 bg-white/10 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white backdrop-blur hover:border-white/30"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 [box-shadow:_inset_0_1px_0_0_rgba(255,255,255,0.12)] p-5 sm:p-8 md:p-12 text-white/90">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-gradient-animated" style={{ fontFamily: 'var(--font-poppins)' }}>About</h2>
          <p className="mt-4 sm:mt-6 text-white/80 text-sm sm:text-base leading-6 sm:leading-7">
            <ScrollReveal scrollContainerRef={scrollContainerRef}>Hi, I'm Irfan, an AI & Data Science engineering student passionate about building intelligent, real-world solutions. </ScrollReveal>
            <ScrollReveal scrollContainerRef={scrollContainerRef}>I love turning ideas into impactful projects — from developing Rakt Dhara, a blood bank management system, to creating DeepFake Radar, an AI-based deepfake detection system. </ScrollReveal>
            <ScrollReveal scrollContainerRef={scrollContainerRef}>I'm currently enhancing my skills in Python, Machine Learning, and AI agents, while improving my communication and problem-solving abilities. </ScrollReveal>
            <ScrollReveal scrollContainerRef={scrollContainerRef}>My goal is to become an AI engineer who combines innovation with purpose, building technology that truly makes a difference.</ScrollReveal>
          </p>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-10 tracking-tight text-white text-gradient-animated" style={{ fontFamily: 'var(--font-poppins)' }}>Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {[
              'React / Next.js',
              'TypeScript',
              'Tailwind CSS',
              'Node.js',
              'REST / GraphQL',
              'Testing',
              'Animations',
              'UI/UX'
            ].map((s) => (
              <div key={s} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 px-4 sm:px-5 py-3 sm:py-4 text-white/85 text-sm sm:text-base md:text-lg">
                <ScrollReveal scrollContainerRef={scrollContainerRef}>{s}</ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-5 sm:mb-8 tracking-tight text-white text-gradient-animated" style={{ fontFamily: 'var(--font-poppins)' }}>Projects</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {[1,2,3,4].map((i)=> (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 p-4 sm:p-6 text-white/85 flex flex-col justify-center items-center h-full min-h-[120px] sm:min-h-[140px]">
              <div className="text-base sm:text-lg font-semibold text-center w-full mb-1 sm:mb-2">
                <ScrollReveal scrollContainerRef={scrollContainerRef}>Project {i}</ScrollReveal>
              </div>
              <p className="mt-1 sm:mt-1.5 text-white/75 text-sm sm:text-base text-center w-full px-3 sm:px-5 flex items-center justify-center leading-5 sm:leading-6">
                <ScrollReveal scrollContainerRef={scrollContainerRef}>Short description of the project highlighting stack and impact.</ScrollReveal>
              </p>
            </div>
          ))}
        </div>
        </section>

      {/* Experience */}
      <section id="experience" className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-5 sm:mb-8 tracking-tight text-gradient-animated" style={{ fontFamily: 'var(--font-poppins)' }}>Experience</h2>
        <div className="mx-auto max-w-5xl space-y-3 sm:space-y-4">
          {[1,2].map((i)=> (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 [box-shadow:_inset_0_1px_0_0_rgba(255,255,255,0.12)] p-4 sm:p-6 text-white/85">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="text-base sm:text-lg font-semibold font-heading">Project {i}</div>
                <div className="text-white/60 text-xs sm:text-sm mt-1 sm:mt-0">2023 — Present</div>
              </div>
              <p className="mt-2 sm:mt-3 text-white/75 text-sm sm:text-base text-center sm:text-left leading-5 sm:leading-6 font-body px-1 sm:px-0">Role, key responsibilities, and notable achievements.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 [box-shadow:_inset_0_1px_0_0_rgba(255,255,255,0.12)] p-5 sm:p-8 md:p-12 text-white/90">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-gradient-animated" style={{ fontFamily: 'var(--font-poppins)' }}>Contact</h2>
          <p className="mt-2 sm:mt-3 text-white/80 text-sm sm:text-base leading-5 sm:leading-6 font-body px-1 sm:px-0">I'm open to opportunities and collaborations. Feel free to reach out:</p>

          <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3">
            <a
              href="mailto:irfanfakir52@gmail.com"
              className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors ring-1 ring-white/10 px-3 sm:px-4 py-2.5 sm:py-3"
            >
              <div className="text-xs sm:text-sm text-white/60 font-sans">Email</div>
              <div className="text-white/90 text-sm sm:text-base font-medium break-all font-body">irfanfakir52@gmail.com</div>
            </a>
            <a
              href="https://linkedin.com/in/irfan-fakir-393bb8330"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors ring-1 ring-white/10 px-3 sm:px-4 py-2.5 sm:py-3"
            >
              <div className="text-xs sm:text-sm text-white/60 font-sans">LinkedIn</div>
              <div className="text-white/90 text-sm sm:text-base font-medium truncate font-body">linkedin.com/in/irfan-fakir-393bb8330</div>
            </a>
            <a
              href="tel:+918329111153"
              className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors ring-1 ring-white/10 px-3 sm:px-4 py-2.5 sm:py-3"
            >
              <div className="text-xs sm:text-sm text-white/60 font-sans">Phone</div>
              <div className="text-white/90 text-sm sm:text-base font-medium font-body">+91 83291 11153</div>
            </a>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
            <a
              href="mailto:irfanfakir52@gmail.com"
              className="rounded-full bg-white text-black px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium shadow-md shadow-black/20 hover:shadow-black/30 font-sans"
            >
              Email Me
            </a>
            <a
              href="https://linkedin.com/in/irfan-fakir-393bb8330"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/10 px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-white backdrop-blur hover:border-white/30 font-sans"
            >
              View LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="container mx-auto px-6 pb-16 text-center text-white/50 font-sans">
        © {new Date().getFullYear()} IRFAN. All rights reserved.
      </footer>
    </main>
  );
}
