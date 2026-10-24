import { pageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/PageSeo";
import { SiteChrome } from "@/components/SiteChrome";
import { BriefingForm } from "./BriefingForm";


export const metadata = pageMetadata("/briefing");

export default function BriefingPage() {
  return (
    <SiteChrome>
      <main className="briefing-page" id="top">
        <PageSeo path="/briefing" />
        <BriefingForm />
      </main>
    </SiteChrome>
  );
}
