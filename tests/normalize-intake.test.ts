import { describe, expect, it } from "vitest";

import {
  PLACEHOLDER_THERAPIST_BIO,
  normalizeTherapistIntake,
} from "@/lib/normalize-intake";

const baseRecord = {
  "What's your full name?": "Saumya Sharan",
  "RCI-Licensed (India)": "RCI-Licensed (India)",
  "MPhil Clinical Psychology": "MPhil Clinical Psychology",
  "What's your license or registration number?": "A65975",
  "Do you have a practice name?": "The Pink Elephant",
  Anxiety: "Anxiety",
  Depression: "Depression",
  "Trauma / PTSD": "Trauma / PTSD",
  "Child & Adolescent": "Child & Adolescent",
  OCD: "OCD",
  "Eating Disorders": "Eating Disorders",
  "Anger Management": "Anger Management",
  "Life Transitions": "Life Transitions",
  CBT: "CBT",
  DBT: "DBT",
  "ACT (Acceptance & Commitment)": "ACT (Acceptance & Commitment)",
  "Mindfulness-Based": "Mindfulness-Based",
  English: "English",
  Hindi: "Hindi",
  "Where is your practice located?": "Gurugram",
  "Do you offer telehealth / online sessions?": "1",
  "Do you offer in-person sessions?": "1",
  "What's your session fee range?": "2000 per session",
  "Do you accept insurance? If so, which providers?": "Not at present",
  "What's your professional email address?": "thepinkelephant2022@gmail.com",
  "What's your phone number?": "'+918586010571",
};

describe("normalizeTherapistIntake", () => {
  it("prioritizes specialties and normalizes booleans and empty fields", () => {
    const { data, warnings } = normalizeTherapistIntake(baseRecord);

    expect(data.therapist.specialties.slice(0, 5)).toEqual([
      "Anxiety",
      "Depression",
      "Trauma / PTSD",
      "OCD",
      "Child & Adolescent",
    ]);
    expect(data.therapist.sessionFormats).toEqual(["Online sessions", "In-person sessions"]);
    expect(data.therapist.phone).toBe("+918586010571");
    expect(data.therapist.bio).toBe(PLACEHOLDER_THERAPIST_BIO);
    expect(warnings).toContain("Missing launch field: CoralEHR booking URL");
    expect(warnings).toContain("Missing launch field: therapist biography");
  });

  it("warns when key intake fields drift or disappear", () => {
    const recordWithoutName = {
      ...baseRecord,
      "What's your full name?": "",
    };

    const { warnings } = normalizeTherapistIntake(recordWithoutName);

    expect(warnings).toContain("Missing required field: What's your full name?");
  });
});
