import type { Metadata } from "next";
import { LandingHome } from "@/features/landing/ui/view/landing-home";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Landing page para apresentar seus produtos.",
};

export default function HomePage() {
  return <LandingHome />;
}
