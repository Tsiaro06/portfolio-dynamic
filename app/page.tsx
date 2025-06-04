"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { toast } from "@/hooks/use-toast"
import { Globe, Palette, Zap, Server, Triangle, Database, Cylinder, GitBranch, Github, Code2 } from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [projectFilter, setProjectFilter] = useState("all")
  const [isAnimationPaused, setIsAnimationPaused] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [selectedTech, setSelectedTech] = useState("technologies")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [typedText, setTypedText] = useState("")

  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const fullText = "Frontend & Backend Developer."

  // Typing effect
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  // Scroll detection for active navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "home", ref: heroRef },
        { id: "about", ref: aboutRef },
        { id: "projects", ref: projectsRef },
        { id: "contact", ref: contactRef },
      ]

      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const refs = {
      home: heroRef,
      about: aboutRef,
      projects: projectsRef,
      contact: contactRef,
    }

    const targetRef = refs[sectionId as keyof typeof refs]
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const techInfo = {
    html: "I use HTML5 to structure my web projects with semantic and accessible markup.",
    css: "CSS3 allows me to create visually appealing designs with animations and responsive layouts.",
    js: "JavaScript powers the interactivity in my projects, from dynamic content to API integrations.",
    php: "PHP is my go-to for server-side development, handling backend logic and database interactions.",
    vue: "Vue.js helps me build reactive and component-based frontend applications efficiently.",
    mysql: "MySQL is used for managing relational databases in my web applications.",
    pgsql: "PostgreSQL is utilized for robust geospatial and relational database management.",
    git: "Git enables version control, allowing me to track changes and collaborate effectively.",
    github: "GitHub hosts my projects, facilitating collaboration and showcasing my work.",
    technologies: "Click on a technology to learn more about its use in my projects.",
  }

  const projects = [
    {
      id: 1,
      title: "Onari B Website",
      description:
        "Working closely with the CHORIS-B team, I collaborated to ensure that the website not only met but exceeded their expectations.",
      category: "frontend",
      icon: "🌐",
      tech: ["HTML", "CSS", "JS"],
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 2,
      title: "Google Earth Tweet Map",
      description:
        "Working closely with the CHORIS-B team, I collaborated to ensure that the website not only met but exceeded their expectations.",
      category: "gis",
      icon: "🐦",
      tech: ["Python", "API", "GIS"],
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 3,
      title: "ArcGIS StoryMaps",
      description:
        "Methods in Spatial Analysis. Working closely with the CHORIS-B team, I collaborated to ensure that the website not only met but exceeded their expectations.",
      category: "gis",
      icon: "📊",
      tech: ["ArcGIS", "Analysis", "Story"],
      demoLink: "#",
      codeLink: "#",
    },
  ]

  const filteredProjects =
    projectFilter === "all" ? projects : projects.filter((project) => project.category === projectFilter)

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for your interest. I'll get back to you soon.",
        })
        e.currentTarget.reset()
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact me directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Create stars for background
  const stars = Array.from({ length: 100 }, (_, i) => {
    const size = Math.random() * 3 + 1
    return {
      id: i,
      size: size + "px",
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      animationDelay: Math.random() * 2 + "s",
      animationDuration: Math.random() * 3 + 2 + "s",
    }
  })

  return (
    <div className="min-h-screen">
      {/* Stars Background */}
      <div className="stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              width: star.size,
              height: star.size,
              left: star.left,
              top: star.top,
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav>
        <div className="container">
          <div className="logo">LANTOFANAMBINANA Tsiaro</div>
          <div className="nav-links">
            {[
              { id: "about", label: "About" },
              { id: "projects", label: "Projects" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${activeSection === item.id ? "active-link" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="flex justify-center items-center min-h-screen">
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              {typedText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="hero-description">
              I specialize in crafting immersive user experiences using the latest frontend technologies and frameworks
              to bring your ideas to life. From dynamic user interfaces to interactive geospatial solutions, where I
              find joy in harnessing the power of technology to solve and improve business insights.
            </p>

            {/* Animation Controls */}
            <div className="button-group">
              <button onClick={() => setIsAnimationPaused(!isAnimationPaused)} className="outline-button">
                {isAnimationPaused ? "▶️ Play" : "⏯️ Pause"}
              </button>
              <button onClick={() => setAnimationSpeed(animationSpeed === 1 ? 0.5 : 1)} className="outline-button">
                {animationSpeed === 1 ? "⚡ Speed" : "🐢 Speed"}
              </button>
            </div>

            <div className="button-group">
              <button onClick={() => scrollToSection("contact")} className="primary-button">
                Get In Touch
              </button>
              <button className="outline-button">Available for Hire</button>
            </div>
          </div>

          {/* Tech System - Centré et plus bas */}
          <div className="tech-orbit-container">
            {/* Panneau d'information Technologies */}
            <div className="tech-info-panel">
              <h3 className="tech-info-title">Technologies</h3>
              <p className="tech-info-description">{techInfo[selectedTech as keyof typeof techInfo]}</p>
            </div>

            <div className="tech-orbit-system">
              {/* Cercles concentriques */}
              <div className="orbit-circle orbit-circle-1"></div>
              <div className="orbit-circle orbit-circle-2"></div>
              <div className="orbit-circle orbit-circle-3"></div>
              <div className="orbit-circle orbit-circle-4"></div>

              {/* Core central */}
              <div className="tech-core">
                <Code2 size={32} />
              </div>

              {/* Tech Icons avec labels */}
              {[
                { icon: "Globe", tech: "html", label: "HTML5", angle: 0, radius: 120, color: "#e34c26" },
                { icon: "Palette", tech: "css", label: "CSS3", angle: 45, radius: 100, color: "#1572b6" },
                { icon: "Zap", tech: "js", label: "JavaScript", angle: 90, radius: 140, color: "#f7df1e" },
                { icon: "Server", tech: "php", label: "PHP", angle: 135, radius: 110, color: "#777bb4" },
                { icon: "Triangle", tech: "vue", label: "Vue.js", angle: 180, radius: 130, color: "#4fc08d" },
                { icon: "Database", tech: "mysql", label: "MySQL", angle: 225, radius: 105, color: "#00758f" },
                { icon: "Cylinder", tech: "pgsql", label: "PostgreSQL", angle: 270, radius: 125, color: "#336791" },
                { icon: "GitBranch", tech: "git", label: "Git", angle: 315, radius: 115, color: "#f05032" },
                { icon: "Github", tech: "github", label: "GitHub", angle: 360, radius: 135, color: "#333" },
              ].map((item, index) => {
                const rotation =
                  item.angle +
                  (isAnimationPaused ? 0 : Date.now() * 0.001 * animationSpeed * (index % 2 === 0 ? 1 : -1))
                const x = Math.cos((rotation * Math.PI) / 180) * item.radius
                const y = Math.sin((rotation * Math.PI) / 180) * item.radius

                // Calculer la position du label
                const labelX = Math.cos((rotation * Math.PI) / 180) * (item.radius + 40)
                const labelY = Math.sin((rotation * Math.PI) / 180) * (item.radius + 40)

                return (
                  <div key={item.tech}>
                    {/* Icône technologie */}
                    <div
                      className="tech-icon-modern"
                      style={
                        {
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: "translate(-50%, -50%)",
                          "--tech-color": item.color,
                        } as React.CSSProperties
                      }
                      onClick={() => setSelectedTech(item.tech)}
                    >
                      {item.icon === "Globe" && <Globe size={20} />}
                      {item.icon === "Palette" && <Palette size={20} />}
                      {item.icon === "Zap" && <Zap size={20} />}
                      {item.icon === "Server" && <Server size={20} />}
                      {item.icon === "Triangle" && <Triangle size={20} />}
                      {item.icon === "Database" && <Database size={20} />}
                      {item.icon === "Cylinder" && <Cylinder size={20} />}
                      {item.icon === "GitBranch" && <GitBranch size={20} />}
                      {item.icon === "Github" && <Github size={20} />}
                    </div>

                    {/* Label de la technologie */}
                    <div
                      className="tech-label"
                      style={{
                        left: `calc(50% + ${labelX}px)`,
                        top: `calc(50% + ${labelY}px)`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20">
        <div className="container">
          <div className="about-grid">
            <div className="profile-image-container">
              <div className="profile-image-glow"></div>
              <img src="/images/profile.png" alt="Lantofanambinana Tsiaro" className="profile-image" />
            </div>

            <div>
              <h2 className="section-title">About Me</h2>
              <div className="space-y-4">
                <p className="about-text">
                  My name is <span className="highlight">LANTOFANAMBINANA Tsiaro</span>, I am 19 years old and currently
                  studying Computer Science at the <span className="highlight-alt">National School of Informatics</span>
                  . Passionate about digital technologies, I have a strong interest in web development, programming, and
                  user interface design.
                </p>
                <p className="about-text">
                  I enjoy working on projects that challenge me to learn new technologies, and I'm constantly exploring
                  better ways to create customizable and sustainable software solutions. The following are tech stacks
                  that I use regularly to build amazing products.
                </p>
              </div>

              {/* Tech Stack Icons */}
              <div className="tech-stack">
                {[
                  { icon: "🌐", name: "HTML5" },
                  { icon: "🎨", name: "CSS3" },
                  { icon: "⚡", name: "JavaScript" },
                  { icon: "🐘", name: "PHP" },
                  { icon: "🗄️", name: "MySQL" },
                  { icon: "🐘", name: "PostgreSQL" },
                  { icon: "💚", name: "Vue.js" },
                  { icon: "🐙", name: "GitHub" },
                  { icon: "📝", name: "Git" },
                ].map((tech) => (
                  <div key={tech.name} className="tech-item" title={tech.name}>
                    <span>{tech.icon}</span>
                  </div>
                ))}
              </div>

              <button className="mt-6 primary-button">Download Resume</button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20">
        <div className="container">
          <div className="projects-header">
            <h2 className="section-title">Projects</h2>

            {/* Project Filters */}
            <div className="filter-buttons">
              {[
                { id: "all", label: "All Projects" },
                { id: "frontend", label: "Frontend" },
                { id: "gis", label: "Geo Informatics" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setProjectFilter(filter.id)}
                  className={projectFilter === filter.id ? "primary-button" : "outline-button"}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-icon">{project.icon}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tech.map((tech) => (
                    <span key={tech} className="project-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-buttons">
                  <button className="primary-button project-button">Live Demo</button>
                  <button className="outline-button project-button">View Code</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="primary-button">View All Projects</button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20">
        <div className="max-w-4xl container">
          <div className="contact-grid">
            <div>
              <h2 className="contact-title">Get In Touch</h2>
              <p className="contact-subtitle">
                Let's discuss on something <span className="highlight">cool</span> together
              </p>
              <p className="contact-text">
                I'm interested in freelance opportunities especially ambitious or large projects. However, if you have
                other requests or questions, don't hesitate to contact me using the form.
              </p>
            </div>

            <div className="contact-form-card">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="form-group">
                  <input id="name" name="name" required className="form-input" placeholder=" " />
                  <label htmlFor="name" className="form-label">
                    Your name
                  </label>
                </div>
                <div className="form-group">
                  <input id="email" name="email" type="email" required className="form-input" placeholder=" " />
                  <label htmlFor="email" className="form-label">
                    Your email
                  </label>
                </div>
                <div className="form-group">
                  <textarea id="message" name="message" required rows={5} className="form-textarea" placeholder=" " />
                  <label htmlFor="message" className="form-label">
                    Your message
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`submit-button ${isSubmitting ? "loading" : ""}`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="social-links">
            {[
              { icon: "📧", href: "mailto:lantofanambinanatsiaro@gmail.com" },
              { icon: "💼", href: "#" },
              { icon: "🐦", href: "#" },
              { icon: "📷", href: "#" },
            ].map((social, index) => (
              <a key={index} href={social.href} className="social-link">
                <span>{social.icon}</span>
              </a>
            ))}
          </div>
          <p className="copyright">© 2025 Tsiaro Lantofanambinana</p>
        </div>
      </footer>
    </div>
  )
}
