export interface TherapistSiteData {
  site: {
    title: string;
    description: string;
    themeName: string;
  };
  therapist: {
    fullName: string;
    practiceName: string;
    credentials: string[];
    licenseNumber: string;
    location: string;
    sessionFormats: string[];
    specialties: string[];
    modalities: string[];
    languages: string[];
    sessionFee: string;
    insurance: string;
    bio: string;
    bioStatus: "placeholder" | "final";
    headshot: {
      imageUrl?: string;
      sourceUrl?: string;
      alt: string;
    };
    email: string;
    phone: string;
    coralContactPreference?: string;
  };
  booking: {
    provider: "CoralEHR";
    schedulingUrl?: string;
    fallbackLabel: string;
  };
  coral: {
    footerLabel: string;
    bookingLabel: string;
  };
}

export interface NormalizedTherapistIntake {
  data: TherapistSiteData;
  warnings: string[];
}
