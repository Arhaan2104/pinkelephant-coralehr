import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { TherapistSite } from "@/components/therapist-site";
import { therapistSiteData } from "@/content/therapist";

afterEach(() => {
  cleanup();
});

describe("TherapistSite", () => {
  it("renders CoralEHR attribution and therapist details", () => {
    render(<TherapistSite data={therapistSiteData} />);

    expect(screen.getAllByText("Powered by CoralEHR").length).toBeGreaterThan(0);
    expect(screen.getAllByText("The Pink Elephant").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Saumya Sharan/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/₹2,000 per session/).length).toBeGreaterThan(0);
  });

  it("falls back to direct contact when the booking link is missing", () => {
    render(<TherapistSite data={therapistSiteData} />);

    expect(screen.queryByText("Book a session")).not.toBeInTheDocument();
    for (const link of screen.getAllByRole("link", { name: "Get in touch" })) {
      expect(link).toHaveAttribute("href", "mailto:thepinkelephant2022@gmail.com");
    }
    for (const link of screen.getAllByRole("link", { name: "Call the practice" })) {
      expect(link).toHaveAttribute("href", "tel:+918586010571");
    }
  });

  it("renders all 8 specialties as equal cards", () => {
    render(<TherapistSite data={therapistSiteData} />);

    const specialties = [
      "Anxiety",
      "Depression",
      "Trauma / PTSD",
      "Child & Adolescent",
      "OCD",
      "Eating Disorders",
      "Anger Management",
      "Life Transitions",
    ];

    for (const specialty of specialties) {
      const headings = screen.getAllByRole("heading", { name: specialty });
      expect(headings.length).toBeGreaterThanOrEqual(1);
    }

    // "Also supports" section should no longer exist
    expect(screen.queryByText("Also supports")).not.toBeInTheDocument();
  });

  it("renders modality explanation cards instead of chips", () => {
    render(<TherapistSite data={therapistSiteData} />);

    // Modalities should appear as headings (cards)
    expect(screen.getAllByRole("heading", { name: "CBT" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("heading", { name: "DBT" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("heading", { name: "Psychodynamic" }).length).toBeGreaterThanOrEqual(1);

    // Languages card should be gone — no heading named "Languages"
    const languageHeadings = screen.queryAllByRole("heading", { name: "Languages" });
    expect(languageHeadings.length).toBe(0);
  });

  it("renders the How to Get Started section", () => {
    render(<TherapistSite data={therapistSiteData} />);

    expect(screen.getAllByRole("heading", { name: "How to begin" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Reach out").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("First session").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Ongoing support").length).toBeGreaterThanOrEqual(1);
  });

  it("does not render a standalone Practice Details section", () => {
    render(<TherapistSite data={therapistSiteData} />);

    expect(screen.queryByRole("heading", { name: "Good to know" })).not.toBeInTheDocument();
  });

  it("renders Practice information in the contact sidebar", () => {
    render(<TherapistSite data={therapistSiteData} />);

    expect(screen.getAllByRole("heading", { name: "Practice information" }).length).toBeGreaterThanOrEqual(1);
  });

  it("renders a rich 3-column footer", () => {
    render(<TherapistSite data={therapistSiteData} />);

    // Footer nav heading
    expect(screen.getAllByText("Quick links").length).toBeGreaterThanOrEqual(1);

    // Copyright
    expect(screen.getAllByText(/© \d{4} The Pink Elephant/).length).toBeGreaterThanOrEqual(1);
  });
});
