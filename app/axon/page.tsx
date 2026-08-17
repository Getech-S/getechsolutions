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
    "The Axon Stroke Monitor by GeTech Solutions. An AI-powered wearable that catches the warning signs of a stroke early and alerts a doctor in under 1.5 seconds — clinical-grade monitoring at a fraction of the cost.",
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
      "Catching the warning signs of a stroke early, and reaching a doctor while there is still time to stop it.",
    url: "https://getech.rw/axon",
    siteName: "GeTech Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axon — Predicting the Unpredictable",
    description:
      "Catching the warning signs of a stroke early — and reaching a doctor in under 1.5 seconds.",
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
