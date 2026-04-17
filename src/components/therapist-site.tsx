import React from "react";

import type { TherapistSiteData } from "@/lib/therapist-types";

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="sectionIntro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {subtitle ? <p className="sectionSubtitle">{subtitle}</p> : null}
    </div>
  );
}

function DetailRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="detailRow">
      <dt>{label}</dt>
      <dd>{href ? <a href={href}>{value}</a> : value}</dd>
    </div>
  );
}

function ContactButtons({ data, variant }: { data: TherapistSiteData; variant?: "hero" }) {
  if (data.booking.schedulingUrl) {
    return (
      <div className="buttonRow">
        <a className={variant === "hero" ? "buttonPrimary buttonLg" : "buttonPrimary"} href={data.booking.schedulingUrl}>
          Book a session
        </a>
        <a className="buttonSecondary" href="#contact">
          Get in touch
        </a>
      </div>
    );
  }

  return (
    <div className="buttonRow">
      <a className={variant === "hero" ? "buttonPrimary buttonLg" : "buttonPrimary"} href={`mailto:${data.therapist.email}`}>
        {data.booking.fallbackLabel}
      </a>
      <a className="buttonSecondary" href={`tel:${data.therapist.phone}`}>
        Call the practice
      </a>
    </div>
  );
}

const SPECIALTY_DESCRIPTIONS: Record<string, string> = {
  "Anxiety": "Managing worry, panic, and stress responses. Includes generalised anxiety, social anxiety, and phobias that interfere with daily life.",
  "Depression": "Support through low mood and emotional difficulty. Therapy can help restore motivation, improve sleep, and rebuild a sense of meaning.",
  "Trauma / PTSD": "Healing from traumatic experiences safely. Structured approaches help process distressing memories and reduce their hold on the present.",
  "OCD": "Breaking cycles of obsessive thoughts and compulsions. Evidence-based methods target the patterns that keep OCD going.",
  "Child & Adolescent": "Age-appropriate care for young minds. Therapy is adapted to developmental stage, using play, art, or talk as needed.",
  "Eating Disorders": "Restoring a healthy relationship with food. Treatment addresses both the eating behaviours and the emotions driving them.",
  "Anger Management": "Developing healthier emotional responses. Learn to recognise triggers early and respond with clarity instead of reactivity.",
  "Life Transitions": "Navigating change with clarity and support. Whether it's a career shift, relationship change, or loss, therapy provides a steady anchor.",
};

const MODALITY_DESCRIPTIONS: Record<string, string> = {
  "CBT": "Cognitive Behavioural Therapy identifies and restructures unhelpful thought patterns. It's one of the most researched approaches, effective for anxiety, depression, and OCD.",
  "DBT": "Dialectical Behaviour Therapy builds skills in mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness — especially helpful when emotions feel overwhelming.",
  "Psychodynamic": "Explores how past experiences and unconscious patterns shape present behaviour. This deeper work often helps when the same difficulties keep recurring.",
  "ACT (Acceptance & Commitment)": "Acceptance and Commitment Therapy helps you make room for difficult feelings while moving toward what matters most to you.",
  "Motivational Interviewing": "A collaborative conversation style that strengthens your own motivation for change, especially useful when you feel stuck or ambivalent.",
  "Mindfulness-Based": "Integrates meditation and awareness practices into therapy. Builds the capacity to observe thoughts and feelings without being swept away by them.",
};

const GETTING_STARTED_STEPS = [
  {
    number: "01",
    title: "Reach out",
    description: "Send an email or give a call. Share what you\u2019re looking for and any questions you have.",
  },
  {
    number: "02",
    title: "First session",
    description: "We\u2019ll meet (online or in-person) to understand your concerns and explore how therapy can help.",
  },
  {
    number: "03",
    title: "Ongoing support",
    description: "Together we\u2019ll build a plan tailored to your goals, meeting regularly to track your progress.",
  },
];

export function TherapistSite({ data }: { data: TherapistSiteData }) {
  const firstName = data.therapist.fullName.split(" ")[0];
  const extraCount = data.therapist.specialties.length - 3;
  const headerCtaLabel = data.booking.schedulingUrl ? "Book a session" : "Get in touch";
  const headerCtaHref = data.booking.schedulingUrl
    ? data.booking.schedulingUrl
    : `mailto:${data.therapist.email}`;

  return (
    <>
      <a className="skipLink" href="#main-content">
        Skip to content
      </a>

      {/* ── Header ── */}
      <header className="siteHeader">
        <div className="shell navShell">
          <a className="wordmark" href="#hero">
            <img src="/elephant-icon.png" alt="" className="wordmarkIcon" aria-hidden="true" />
            {data.therapist.practiceName}
          </a>
          <nav aria-label="Primary">
            <ul className="navList">
              <li>
                <a href="#specialties">Specialties</a>
              </li>
              <li>
                <a href="#approach">How I Work</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
          <a className="navCta" href={headerCtaHref}>
            {headerCtaLabel}
          </a>
        </div>
      </header>

      <main id="main-content">
        {/* ── Hero ── */}
        <section className="heroSection shell" id="hero">
          <div className="heroCopy fadeUp">
            <p className="eyebrow">{data.therapist.location} &bull; Online &amp; In-person</p>
            <h1>{data.therapist.practiceName}</h1>
            <p className="heroLead">
              Compassionate therapy for{" "}
              {data.therapist.specialties.slice(0, 3).join(", ").toLowerCase()}
              {extraCount > 0 ? ` \u2014 plus ${extraCount} more areas of focus \u2014 ` : " \u2014 "}
              in {data.therapist.location} and online.
            </p>
            <div className="heroPills" aria-label="Practice overview">
              {data.therapist.sessionFormats.map((format) => (
                <span className="pill" key={format}>
                  {format}
                </span>
              ))}
              <span className="pill">{data.therapist.sessionFee}</span>
            </div>
            <ContactButtons data={data} variant="hero" />
          </div>
          <aside className="heroCard fadeUp fadeUpDelay">
            <div className="portraitCard">
              {data.therapist.headshot.imageUrl ? (
                <img
                  alt={data.therapist.headshot.alt}
                  className="portraitImage"
                  src={data.therapist.headshot.imageUrl}
                />
              ) : (
                <div className="portraitPlaceholder" aria-label={data.therapist.headshot.alt}>
                  <span>{data.therapist.fullName.charAt(0)}</span>
                </div>
              )}
              <div className="portraitMeta">
                <p className="portraitName">{data.therapist.fullName}</p>
                <p className="mutedText">{data.therapist.credentials.join(" \u2022 ")}</p>
                <p className="mutedText">{data.therapist.location} | {data.therapist.languages.join(", ")}</p>
              </div>
            </div>
          </aside>
        </section>

        {/* ── Specialties (flat grid, all equal) ── */}
        <section className="section shell" id="specialties">
          <SectionHeading
            eyebrow="Specialties"
            title="Areas of focus"
            subtitle={`Concerns ${firstName} works with most often.`}
          />
          <div className="cardGrid cardGrid2col">
            {data.therapist.specialties.map((specialty, i) => (
              <article className="specialtyCard staggerIn" key={specialty} style={{ animationDelay: `${i * 0.08}s` }}>
                <div>
                  <h3>{specialty}</h3>
                  {SPECIALTY_DESCRIPTIONS[specialty] && (
                    <p className="specialtyDesc">{SPECIALTY_DESCRIPTIONS[specialty]}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── How I Work (modality cards) ── */}
        <section className="section shell sectionAccent" id="approach">
          <SectionHeading
            eyebrow="How I Work"
            title="Therapeutic approach"
            subtitle="Evidence-based modalities tailored to your needs."
          />
          <div className="modalityGrid">
            {data.therapist.modalities.map((modality, i) => (
              <article className="modalityCard glassCard staggerIn" key={modality} style={{ animationDelay: `${i * 0.08}s` }}>
                <h3>{modality}</h3>
                {MODALITY_DESCRIPTIONS[modality] && (
                  <p>{MODALITY_DESCRIPTIONS[modality]}</p>
                )}
              </article>
            ))}
          </div>
          <p className="sectionNote">
            {firstName} draws on these modalities flexibly, matching the approach to each client&rsquo;s unique concerns and goals.
          </p>
        </section>

        {/* ── How to Get Started ── */}
        <section className="section shell sectionAccent" id="getting-started">
          <SectionHeading
            eyebrow="Getting started"
            title="How to begin"
            subtitle="Three simple steps to start your therapy journey."
          />
          <div className="stepsGrid">
            {GETTING_STARTED_STEPS.map((step, i) => (
              <div className="stepCard staggerIn" key={step.number} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="stepNumber">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="section shell sectionCta" id="contact">
          <SectionHeading
            eyebrow="Contact"
            title="Take the first step"
            subtitle="Reach out to schedule your first session or ask any questions."
          />
          <div className="contactGrid">
            <article className="contactCard ctaCard">
              <h3>{data.booking.schedulingUrl ? "Book a session" : "Schedule a session"}</h3>
              <p>
                {data.booking.schedulingUrl
                  ? "Choose a time that works for you using the link below."
                  : "Get in touch directly to discuss availability and schedule your first appointment."}
              </p>
              <ContactButtons data={data} />
            </article>
            <aside className="infoCard">
              <h3>Practice information</h3>
              <dl className="stackedDetails">
                <DetailRow label="Email" value={data.therapist.email} href={`mailto:${data.therapist.email}`} />
                <DetailRow label="Phone" value={data.therapist.phone} href={`tel:${data.therapist.phone}`} />
                <DetailRow label="Location" value={data.therapist.location} />
                <DetailRow label="Fee" value={data.therapist.sessionFee} />
                <DetailRow label="Languages" value={data.therapist.languages.join(", ")} />
                <DetailRow label="Insurance" value={data.therapist.insurance} />
              </dl>
            </aside>
          </div>
        </section>
      </main>

      {/* ── Footer (3-column grid) ── */}
      <footer className="siteFooter">
        <div className="shell footerGrid">
          <div className="footerBrand">
            <p className="footerPractice">
              <img src="/elephant-icon.png" alt="" className="footerIcon" aria-hidden="true" />
              {data.therapist.practiceName}
            </p>
            <p className="mutedText">{data.therapist.fullName}</p>
            <p className="mutedText">{data.therapist.location}</p>
            <p className="mutedText">Sessions in {data.therapist.languages.join(" & ")}</p>
          </div>
          <nav className="footerNav" aria-label="Footer">
            <h4>Quick links</h4>
            <ul>
              <li><a href="#specialties">Specialties</a></li>
              <li><a href="#approach">How I Work</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <div className="footerContact">
            <h4>Contact</h4>
            <a href={`mailto:${data.therapist.email}`}>{data.therapist.email}</a>
            <a href={`tel:${data.therapist.phone}`}>{data.therapist.phone}</a>
          </div>
        </div>
        <div className="shell footerBottom">
          <span className="mutedText">{data.coral.footerLabel}</span>
          <span className="mutedText">&copy; {new Date().getFullYear()} {data.therapist.practiceName}</span>
        </div>
      </footer>
    </>
  );
}
