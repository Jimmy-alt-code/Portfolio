"use client";

import ProfileCard from "@/components/ProfileCard";
import Prism from "@/components/Prism";
import ScrollReveal from "@/components/ScrollReveal";
import TextPressure from "@/components/TextPressure";
import CodeViewer from "@/components/CodeViewer";
import { useRef, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  year: string;
}

export default function Home() {
  const scrollContainerRef = useRef(null);
  const [codeViewerOpen, setCodeViewerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleViewCode = (project: Project) => {
    setSelectedProject(project);
    setCodeViewerOpen(true);
  };

  const handleCloseCodeViewer = () => {
    setCodeViewerOpen(false);
    setSelectedProject(null);
  };

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

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="order-1 lg:order-1 space-y-4 sm:space-y-6 flex flex-col justify-center text-center lg:text-left">
              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6 w-fit mx-auto lg:mx-0">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="hidden xs:inline">Available for new projects</span>
                <span className="xs:hidden">Available</span>
              </div>

              {/* Text Pressure Effect */}
              <div className="relative h-[60px] xs:h-[72px] sm:h-[96px] md:h-[120px] mb-2 sm:mb-3">
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
                  minFontSize={24}
                />
              </div>


              {/* Main Quote - Stable Code Style */}
              <div className="my-6 sm:my-8">
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 overflow-hidden">
                  {/* Static background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>
                  
                  {/* Code file header */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-white/10">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                      <span className="text-white/60 text-xs sm:text-sm font-mono ml-1 sm:ml-2">philosophy.js</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400/60 text-xs font-mono">Live</span>
                    </div>
                  </div>
                  
                  {/* Quote content */}
                  <blockquote className="text-center lg:text-left relative">
                    {/* Quote marks - hidden on mobile */}
                    <div className="hidden sm:block absolute -top-2 -left-2 text-3xl sm:text-4xl text-blue-400/20 font-serif">&quot;</div>
                    <div className="hidden sm:block absolute -bottom-2 -right-2 text-3xl sm:text-4xl text-blue-400/20 font-serif">&quot;</div>
                    
                    <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium leading-relaxed relative z-10">
                      <div className="text-white mb-2 sm:mb-3">
                        As a book is judged by its cover,
                      </div>
                      <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-bold">
                        a developer gets judged by their website.
                      </div>
                    </div>
                    
                    {/* Code signature */}
                    <div className="mt-4 sm:mt-6 flex items-center justify-center lg:justify-start">
                      <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                          <span className="text-white/80 text-xs sm:text-sm font-mono">
                            <span className="text-blue-400">const</span> philosophy = <span className="text-yellow-400">&apos;Irfan&apos;s Code&apos;</span>;
                          </span>
                        </div>
                      </div>
                    </div>
                  </blockquote>
                  
                  {/* Static code elements - hidden on mobile */}
                  <div className="hidden sm:block absolute top-3 sm:top-4 right-3 sm:right-4 text-green-400/40 font-mono text-xs">
                    <div>&lt;<span className="text-green-300">div</span>&gt;</div>
                    <div>&lt;/<span className="text-green-300">div</span>&gt;</div>
                  </div>
                  
                  {/* Corner decorations - hidden on mobile */}
                  <div className="hidden sm:block absolute top-1 sm:top-2 left-1 sm:left-2 w-3 h-3 sm:w-4 sm:h-4 border-l-2 border-t-2 border-blue-400/30 rounded-tl-lg"></div>
                  <div className="hidden sm:block absolute bottom-1 sm:bottom-2 right-1 sm:right-2 w-3 h-3 sm:w-4 sm:h-4 border-r-2 border-b-2 border-purple-400/30 rounded-br-lg"></div>
                </div>
              </div>

              {/* Professional Tagline */}
              <div className="text-white/85 text-sm sm:text-base font-body font-semibold tracking-wide text-center lg:text-left fade-in-up stagger-3">
                <span className="opacity-90">Web Developer</span>
                <span className="px-2 opacity-40">|</span>
                <span className="opacity-90">AI Enthusiast</span>
                <span className="px-2 opacity-40">|</span>
                <span className="opacity-90">Data Science</span>
                <span className="px-2 opacity-40">|</span>
                <span className="opacity-90">Rapid Learner</span>
              </div>

              {/* Description */}
              <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                I craft exceptional digital experiences through clean code, innovative solutions, and a passion for turning complex problems into elegant, user-friendly applications.
              </p>


              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center lg:justify-start">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  <span>View My Work</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
                >
                  <span>Get In Touch</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </a>
              </div>

            </div>

            {/* Right: Visual */}
            <div className="order-2 lg:order-2 flex justify-center lg:justify-end mt-8 lg:mt-0">
              <div className="relative -mt-20 sm:-mt-32 lg:-mt-40 xl:-mt-56 lg:mr-8 xl:mr-16">
                {/* Floating elements - responsive sizes */}
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                
                {/* Main illustration */}
                <div className="relative z-10 float">
                  <img
                    src="/illust.png"
                    alt="Professional working on a laptop illustration"
                    loading="lazy"
                    className="w-[200px] xs:w-[240px] sm:w-[320px] md:w-[400px] lg:w-[440px] xl:w-[540px] max-w-full h-auto scale-in stagger-1 illust-toned-down drop-shadow-2xl"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo card section (optional showcase) */}
      <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 mt-8 sm:mt-12 md:mt-16 lg:mt-20" id="home">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start lg:items-center">
          {/* Left: Profile Card */}
          <div className="place-self-center flex items-center justify-center min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] order-2 lg:order-1">
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
          <div className="space-y-6 sm:space-y-8 md:space-y-10 order-1 lg:order-2">
            {/* Featured Projects */}
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-white/90">
                Featured Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {[
                  {
                    id: 1,
                    title: "RAKTDHARA",
                    description: "AI-powered blood bank management system for efficient blood inventory management and donor coordination.",
                    image: "/raktdhara.png",
                    technologies: ["Python", "Flask", "SQLite"],
                    year: "2024"
                  },
                  {
                    id: 2,
                    title: "DEEP FAKE RADAR",
                    description: "AI-driven platform that detects whether videos are deepfake or real using advanced machine learning algorithms.",
                    image: "/project2.png",
                    technologies: ["Python", "Deep Learning", "OpenCV", "TensorFlow"],
                    year: "2024"
                  }
                ].map((project) => (
                  <div key={project.id} className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 overflow-hidden text-white/85 hover:bg-white/10 transition-all duration-300 group">
                    {/* Project Image - Only for RAKTDHARA */}
                    {project.id === 1 && (
                      <div className="relative h-32 sm:h-36 overflow-hidden">
                        <img
                          src={project.image}
                          alt={`${project.title} project screenshot`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white/90 font-medium">
                          {project.year}
                        </div>
                      </div>
                    )}
                    
                    {/* Project Content */}
                    <div className="p-3 sm:p-4 md:p-6 lg:p-7">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <div className="text-base sm:text-lg md:text-xl font-semibold font-heading">{project.title}</div>
                        {project.id !== 1 && (
                          <span className="text-xs sm:text-sm text-white/60">{project.year}</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm md:text-base text-white/75 leading-5 sm:leading-6 md:leading-7 font-body mb-3 sm:mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {project.technologies.map(tech => (
                          <span key={tech} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/15 bg-white/5 ring-1 ring-white/10">{tech}</span>
                        ))}
                      </div>
                      <div>
                        <a href="#" className="text-xs sm:text-sm md:text-base underline decoration-white/40 hover:decoration-white transition-colors">View Case Study</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About + CTAs */}
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 p-4 sm:p-6 md:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white/90">
                Quick About
              </h3>
              <p className="text-white/75 text-xs sm:text-sm md:text-base leading-5 sm:leading-6 md:leading-7 mb-4 sm:mb-5 text-center lg:text-left">
                I craft performant, polished web experiences. I care about clean architecture, smooth animations,
                and measurable business impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <a
                  href="https://linkedin.com/in/irfan-fakir-393bb8330"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center rounded-full bg-white text-black px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-medium shadow-md shadow-black/20 hover:shadow-black/30 transition-all duration-300"
                >
                  Hire Me
                </a>
                <a
                  href="#"
                  className="w-full sm:w-auto text-center rounded-full border border-white/20 bg-white/10 px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-medium text-white backdrop-blur hover:border-white/30 transition-all duration-300"
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-8 font-bold tracking-tight text-white">
            About
          </h2>
          <p className="mt-4 sm:mt-6 text-white/80 text-sm sm:text-base leading-6 sm:leading-7">
            <ScrollReveal scrollContainerRef={scrollContainerRef}>Hi, I&apos;m Irfan, an AI & Data Science engineering student passionate about building intelligent, real-world solutions. </ScrollReveal>
            <ScrollReveal scrollContainerRef={scrollContainerRef}>I love turning ideas into impactful projects — from developing Rakt Dhara, a blood bank management system, to creating DeepFake Radar, an AI-based deepfake detection system. </ScrollReveal>
            <ScrollReveal scrollContainerRef={scrollContainerRef}>I&apos;m currently enhancing my skills in Python, Machine Learning, and AI agents, while improving my communication and problem-solving abilities. </ScrollReveal>
            <ScrollReveal scrollContainerRef={scrollContainerRef}>My goal is to become an AI engineer who combines innovation with purpose, building technology that truly makes a difference.</ScrollReveal>
          </p>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-10 sm:mb-12 font-bold tracking-tight text-white">
            Skills
          </h2>
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
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-10 sm:mb-12 font-bold tracking-tight text-white">
            Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            {
              id: 1,
              title: "RAKTDHARA",
              description: "AI-powered blood bank management system that streamlines blood inventory tracking, donor management, and emergency blood requests. Features intelligent matching algorithms and real-time notifications.",
              image: "/raktdhara.png",
              technologies: ["Python", "Flask", "SQLite", "OpenCV"],
              year: "2024"
            },
            {
              id: 2,
              title: "DEEP FAKE RADAR",
              description: "Advanced AI-driven platform that analyzes videos to detect deepfake content using state-of-the-art machine learning models. Provides real-time analysis with high accuracy rates.",
              image: "/project2.png",
              technologies: ["Python", "Deep Learning", "TensorFlow", "OpenCV", "PyTorch"],
              year: "2024"
            },
            {
              id: 3,
              title: "Data Visualization Dashboard",
              description: "Interactive dashboard for data analysis with D3.js and React. Features real-time data updates and customizable charts.",
              image: "/project3.png",
              technologies: ["React", "D3.js", "Python", "PostgreSQL"],
              year: "2023"
            },
            {
              id: 4,
              title: "Mobile Banking App",
              description: "Secure mobile banking application with biometric authentication and real-time transaction processing.",
              image: "/project4.png",
              technologies: ["React Native", "Node.js", "PostgreSQL", "AWS"],
              year: "2023"
            }
          ].map((project) => (
            <div key={project.id} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 group">
              {/* Project Image - Only for RAKTDHARA */}
              {project.id === 1 && (
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white/90 font-medium">
                    {project.year}
                  </div>
                </div>
              )}
              
              {/* Project Content */}
              <div className="p-4 sm:p-6 text-white/85">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="text-base sm:text-lg font-semibold">
                    {project.title}
                  </div>
                  {project.id !== 1 && (
                    <span className="text-xs sm:text-sm text-white/60">{project.year}</span>
                  )}
                </div>
                <p className="text-white/75 text-sm sm:text-base leading-5 sm:leading-6 mb-3 sm:mb-4">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-full border border-white/15 bg-white/5 ring-1 ring-white/10 text-white/70">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <a
                    href="#"
                    className="flex-1 text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105"
                  >
                    View Project
                  </a>
                  <button
                    onClick={() => handleViewCode(project)}
                    className="flex-1 text-center border border-white/20 bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300"
                  >
                    View Code
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
        </section>

      {/* Experience */}
      <section id="experience" className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-10 sm:mb-12 font-bold tracking-tight text-white">
            Experience
          </h2>
          <div className="space-y-3 sm:space-y-4">
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
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 [box-shadow:_inset_0_1px_0_0_rgba(255,255,255,0.12)] p-5 sm:p-8 md:p-12 text-white/90">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-8 font-bold tracking-tight text-white">
            Contact
          </h2>
          <p className="mt-2 sm:mt-3 text-white/80 text-sm sm:text-base leading-5 sm:leading-6 font-body px-1 sm:px-0">I&apos;m open to opportunities and collaborations. Feel free to reach out:</p>

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

      {/* Code Viewer Modal */}
      <CodeViewer 
        isOpen={codeViewerOpen}
        onClose={handleCloseCodeViewer}
        projectData={selectedProject}
      />
    </main>
  );
}
