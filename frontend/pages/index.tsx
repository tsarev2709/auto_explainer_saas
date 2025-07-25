import Head from "next/head";
import Hero from "../components/Hero";
import ScaryBlock from "../components/ScaryBlock";
import CaseStudies from "../components/CaseStudies";
import CallToAction from "../components/CallToAction";

export default function Home() {
  return (
    <>
      <Head>
        <title>Auto Explainer</title>
      </Head>
      <Hero />
      <ScaryBlock />
      <CaseStudies />
      <CallToAction />
    </>
  );
}
