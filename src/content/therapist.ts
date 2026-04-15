import { normalizeTherapistIntake } from "@/lib/normalize-intake";

const intakeRecord = {
  "What's your full name?": "Saumya Sharan",
  "RCI-Licensed (India)": "RCI-Licensed (India)",
  "MPhil Clinical Psychology": "MPhil Clinical Psychology",
  "What's your license or registration number?": "A65975",
  "Share a link to your professional headshot":
    "https://drive.google.com/file/d/1Q_L_7UnGLPVTruKVttD4SiWOj85e5JNe/view?usp=drivesdk",
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
  Psychodynamic: "Psychodynamic",
  "ACT (Acceptance & Commitment)": "ACT (Acceptance & Commitment)",
  "Motivational Interviewing": "Motivational Interviewing",
  "Mindfulness-Based": "Mindfulness-Based",
  English: "English",
  Hindi: "Hindi",
  "Where is your practice located?": "Gurugram",
  "Do you offer telehealth / online sessions?": "1",
  "Do you offer in-person sessions?": "1",
  "What's your session fee range?": "2000 per session",
  "Do you accept insurance? If so, which providers?": "Not at present",
  "Write a short bio for your website": "",
  "Pick a color palette for your website": "Teal \u2014 calm & grounding",
  "How should clients book with you?": "CoralEHR scheduling link",
  "What's your booking or scheduling link?": "",
  "What's your professional email address?": "thepinkelephant2022@gmail.com",
  "What's your phone number?": "'+918586010571",
  "How should we (CoralEHR) reach you if we have questions?": "WhatsApp",
};

const normalized = normalizeTherapistIntake(intakeRecord);

// Wire up the local headshot image
normalized.data.therapist.headshot.imageUrl = "/saumya-sharan.jpg";

// Format fee with currency
normalized.data.therapist.sessionFee = "\u20B92,000 per session";

export const therapistSiteData = normalized.data;
export const therapistLaunchWarnings = normalized.warnings;
