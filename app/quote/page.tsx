import type { Metadata } from "next";
import QuoteView from "@/components/QuoteView";

export const metadata: Metadata = {
  title: "制作报价单",
  robots: { index: false, follow: false },
};

export default function QuotePage() {
  return <QuoteView />;
}
