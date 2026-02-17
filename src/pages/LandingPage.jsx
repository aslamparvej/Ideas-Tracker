import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: "✦",
      title: "Create",
      desc: "Capture ideas instantly with our streamlined submission flow",
      color: "var(--INPROGRESS-COLOR)",
      bg: "var(--INPROGRESS-COLOR-BACKGROUND)",
    },
    {
      icon: "◆",
      title: "Read",
      desc: "View all your projects in a clean, organized dashboard",
      color: "var(--COMPLATED-COLOR)",
      bg: "var(--COMPLATED-COLOR-BACKGROUND)",
    },
    {
      icon: "◈",
      title: "Update",
      desc: "Refine and evolve your ideas as they progress",
      color: "var(--OPEN-COLOR)",
      bg: "var(--OPEN-COLOR-BACKGROUND)",
    },
    {
      icon: "◇",
      title: "Delete",
      desc: "Remove outdated ideas to keep your workspace focused",
      color: "var(--DANGER-COLOR)",
      bg: "var(--DANGER-COLOR-BACKGROUND)",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Sign In",
      desc: "Quick authentication to access your workspace",
    },
    {
      num: "02",
      title: "Submit Ideas",
      desc: "Add your project concepts with detailed descriptions",
    },
    {
      num: "03",
      title: "Track Progress",
      desc: "Monitor status and update as projects evolve",
    },
    {
      num: "04",
      title: "Execute",
      desc: "Transform tracked ideas into completed projects",
    },
  ];

  return (
    <div className="landing-page-container">
      <section className="hero-section" id="hero">
        <div className="hero__decor-circle"></div>
        <div className="hero__decor-ring"></div>

        <div className="hero__inner">
          <div className="hero__content">
            <p className="hero__eyebrow animate-in delay-1">
              Web-Based Project Management
            </p>

            <h1 className="hero__title animate-in delay-2">
              Ideas That
              <br />
              <em>Actually</em>
              <br />
              Get Done
            </h1>

            <p className="hero__description animate-in delay-3">
              Full CRUD management for your project ideas. Create, track,
              update, and complete—all in one elegant workspace designed for
              clarity.
            </p>

            <div className="hero__actions animate-in delay-4">
              <Link to="/login"><button className="custom-btn custom-btn-primary custom-btn-lg">Get Started Free</button></Link>
              <button className="custom-btn custom-btn-outline custom-btn-lg">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="hero__cards">
            {features.map((feature, idx) => {
              const isActive = activeFeature === idx;
              return (
                <div
                  key={idx}
                  className="hero__card"
                  style={{
                    transform: `translateY(${idx * 30}px) scale(${
                      isActive ? 1 : 0.95
                    })`,
                    opacity: isActive ? 1 : 0.5,
                    zIndex: isActive ? 10 : features.length - idx,
                    boxShadow: isActive
                      ? "0 20px 60px rgba(0,0,0,0.15)"
                      : "0 8px 25px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    className="hero__card-icon"
                    style={{ color: feature.color }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="hero__card-title">{feature.title}</h3>
                  <p className="hero__card-desc">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="features__inner">
          <div className="section-header">
            <h2 className="section-header__title">Complete Project Control</h2>
            <p className="section-header__subtitle">
              Everything you need to manage your ideas from inception to
              completion
            </p>
          </div>

          <div className="features__grid">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`feature-card${
                  idx % 2 === 0 ? " feature-card--alt" : ""
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                }}
              >
                <div
                  className="feature-card__bg-icon"
                  style={{ color: feature.color }}
                >
                  {feature.icon}
                </div>

                <div
                  className="feature-card__icon-wrap"
                  style={{
                    background: feature.bg,
                    border: `2px solid ${feature.color}20`,
                  }}
                >
                  {feature.icon}
                </div>

                <h3
                  className="feature-card__title"
                  style={{ color: feature.color }}
                >
                  {feature.title}
                </h3>
                <p className="feature-card__desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how-it-works-section" id="how-it-works">
        <div className="how__inner">
          <div className="section-header">
            <h2 className="section-header__title">How It Works</h2>
            <p  className="section-header__subtitle">
              Four simple steps to organize your creative workflow
            </p>
          </div>

          <div className="how__steps">
            {steps.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-card__number">{step.num}</div>
                <div>
                  <h3 className="step-card__title">{step.title}</h3>
                  <p  className="step-card__desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="cta__decor-top"    />
        <div className="cta__decor-bottom" />

        <div className="cta__inner">
          <h2 className="cta__title">Ready to Transform Your Ideas?</h2>
          <p  className="cta__subtitle">
            Join creative professionals using Project Tracker to turn ideas into
            completed projects
          </p>
          <Link to="/login"><button className="custom-btn custom-btn-white">Start Free Today</button></Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
