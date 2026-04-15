import type { NormalizedTherapistIntake, TherapistSiteData } from "@/lib/therapist-types";

const SPECIALTY_FIELDS = [
  "Anxiety",
  "Depression",
  "Trauma / PTSD",
  "Couples & Marriage",
  "Child & Adolescent",
  "OCD",
  "ADHD",
  "Grief & Loss",
  "Substance Use",
  "Eating Disorders",
  "LGBTQ+",
  "Anger Management",
  "Life Transitions",
];

const PRIORITY_SPECIALTIES = [
  "Anxiety",
  "Depression",
  "Trauma / PTSD",
  "OCD",
  "Child & Adolescent",
];

const MODALITY_FIELDS = [
  "CBT",
  "DBT",
  "EMDR",
  "Psychodynamic",
  "Somatic",
  "ACT (Acceptance & Commitment)",
  "Motivational Interviewing",
  "Play Therapy",
  "Art Therapy",
  "Mindfulness-Based",
];

const LANGUAGE_FIELDS = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Spanish",
];

const REQUIRED_FIELDS = [
  "What's your full name?",
  "Do you have a practice name?",
  "Where is your practice located?",
  "What's your professional email address?",
  "What's your phone number?",
];

const PLACEHOLDER_BIO =
  "A full professional biography will be added before launch. Until then, please use the contact details below to learn more about The Pink Elephant and available appointments.";

function hasSelection(value?: string): boolean {
  const normalized = value?.trim();
  return Boolean(normalized && normalized !== "0");
}

function readValue(record: Record<string, string>, field: string): string {
  return record[field]?.trim() ?? "";
}

function selectedList(record: Record<string, string>, fields: string[]): string[] {
  return fields.filter((field) => hasSelection(record[field]));
}

function prioritizeSpecialties(selected: string[]): string[] {
  const priority = PRIORITY_SPECIALTIES.filter((item) => selected.includes(item));
  const remaining = selected.filter((item) => !PRIORITY_SPECIALTIES.includes(item));
  return [...priority, ...remaining];
}

function sessionFormats(record: Record<string, string>): string[] {
  const formats: string[] = [];

  if (hasSelection(record["Do you offer telehealth / online sessions?"])) {
    formats.push("Online sessions");
  }

  if (hasSelection(record["Do you offer in-person sessions?"])) {
    formats.push("In-person sessions");
  }

  return formats;
}

function sanitizePhone(phone: string): string {
  return phone.replace(/^'+/, "").trim();
}

function buildDescription(data: Omit<TherapistSiteData, "site" | "coral" | "booking">["therapist"]): string {
  const leadSpecialties = data.specialties.slice(0, 3).join(", ");
  const sessionFormatText = data.sessionFormats.join(" and ").toLowerCase();
  return `${data.practiceName} is a therapy practice in ${data.location} offering ${sessionFormatText} support for ${leadSpecialties}.`;
}

export function normalizeTherapistIntake(
  record: Record<string, string>,
): NormalizedTherapistIntake {
  const warnings: string[] = [];

  for (const field of REQUIRED_FIELDS) {
    if (!readValue(record, field)) {
      warnings.push(`Missing required field: ${field}`);
    }
  }

  const credentials = [
    "RCI-Licensed (India)",
    "MPhil Clinical Psychology",
    "PhD",
    "PsyD",
    "LCSW",
    "LMFT",
    "LPC",
    "LMHC",
    "MD",
    "Other",
  ].filter((field) => hasSelection(record[field]));

  const therapist = {
    fullName: readValue(record, "What's your full name?"),
    practiceName: readValue(record, "Do you have a practice name?"),
    credentials,
    licenseNumber: readValue(record, "What's your license or registration number?"),
    location: readValue(record, "Where is your practice located?"),
    sessionFormats: sessionFormats(record),
    specialties: prioritizeSpecialties(selectedList(record, SPECIALTY_FIELDS)),
    modalities: selectedList(record, MODALITY_FIELDS),
    languages: selectedList(record, LANGUAGE_FIELDS),
    sessionFee: readValue(record, "What's your session fee range?"),
    insurance: readValue(record, "Do you accept insurance? If so, which providers?"),
    bio: readValue(record, "Write a short bio for your website") || PLACEHOLDER_BIO,
    bioStatus: readValue(record, "Write a short bio for your website") ? "final" : "placeholder",
    headshot: {
      imageUrl: undefined,
      sourceUrl: readValue(record, "Share a link to your professional headshot") || undefined,
      alt: `Portrait of ${readValue(record, "What's your full name?") || "the therapist"}`,
    },
    email: readValue(record, "What's your professional email address?"),
    phone: sanitizePhone(readValue(record, "What's your phone number?")),
    coralContactPreference: readValue(
      record,
      "How should we (CoralEHR) reach you if we have questions?",
    ),
  } as const;

  const schedulingUrl = readValue(record, "What's your booking or scheduling link?") || undefined;
  if (!schedulingUrl) {
    warnings.push("Missing launch field: CoralEHR booking URL");
  }

  if (therapist.bioStatus === "placeholder") {
    warnings.push("Missing launch field: therapist biography");
  }

  if (!therapist.headshot.imageUrl && therapist.headshot.sourceUrl) {
    warnings.push("Headshot source link captured, but no optimized public image is configured yet");
  }

  const data: TherapistSiteData = {
    site: {
      title: `${therapist.practiceName} | ${therapist.fullName}`,
      description: buildDescription(therapist),
      themeName: readValue(record, "Pick a color palette for your website") || "Teal - calm & grounding",
    },
    therapist,
    booking: {
      provider: "CoralEHR",
      schedulingUrl,
      fallbackLabel: "Get in touch",
    },
    coral: {
      footerLabel: "Powered by CoralEHR",
      bookingLabel: "Scheduling powered by CoralEHR",
    },
  };

  return { data, warnings };
}

export const PLACEHOLDER_THERAPIST_BIO = PLACEHOLDER_BIO;
