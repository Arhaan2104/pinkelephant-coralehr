import { TherapistSite } from "@/components/therapist-site";
import { therapistSiteData } from "@/content/therapist";

export default function Home() {
  return <TherapistSite data={therapistSiteData} />;
}
