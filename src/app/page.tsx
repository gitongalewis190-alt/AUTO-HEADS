import type { Metadata } from "next";
import LandingClient from "./LandingClient";

export const metadata: Metadata = {
  title: "AUTO HEADS — Where automotive passion meets commerce",
  description: "The premium social marketplace for automotive enthusiasts in Kenya.",
};

export default function LandingPage() {
  return <LandingClient />;
}
