import type { Metadata } from "next";
import { AxonNav } from "@/components/axon/axon-nav";
import { AxonHero } from "@/components/axon/axon-hero";
import { AxonProblem } from "@/components/axon/axon-problem";
import { AxonEcosystem } from "@/components/axon/axon-ecosystem";
import { AxonVideo } from "@/components/axon/axon-video";
import { AxonMission } from "@/components/axon/axon-mission";

export const metadata: Metadata = {
  title: "Axon — Predicting the Unpredictable",
  description:
    "The Axon Stroke Monitor by GeTech Solutions. Clinical-grade stroke prevention and continuous cardiovascular tracking in an affordable AI-powered IoT wearable — a red alert reaches your doctor in under 1.5 seconds.",
  keywords: [
    "Axon",
    "stroke monitor",
    "stroke prevention wearable",
    "AI health monitoring",
    "IoT wearable",
    "blood pressure tracking",
    "GeTech Solutions",
    "Rwanda health technology",
  ],
  openGraph: {
    title: "Axon — Predicting the Unpredictable",
    description:
      "Clinical-grade stroke prevention and continuous cardiovascular tracking, built affordably for everyone.",
    url: "https://getech.rw/axon",
    siteName: "GeTech Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axon — Predicting the Unpredictable",
    description:
      "Clinical-grade stroke prevention, built affordably for everyone.",
  },
  alternates: { canonical: "https://getech.rw/axon" },
};

export default function AxonPage() {
  return (
    <main className="relative">
      <AxonNav />
      <AxonHero />
      <AxonProblem />
      <AxonEcosystem />
      <AxonVideo />
      <AxonMission />
    </main>
  );
}
