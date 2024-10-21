"use client";

import Link from 'next/link'

import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";

import "./../app/app.css";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";

import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

Amplify.configure(outputs);



const client = generateClient<Schema>();

export default function HomePage() {

  const { signOut } = useAuthenticator();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded border border-gray-300 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
        {successMessage && (
          <p className="mt-4 text-green-600">{successMessage}</p>
        )}
        {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
        <Button
          onClick={onClose}
          variant="secondary"
          size="lg"
          className="mt-4"
        >
          Close
        </Button>
      </div>
    </div>
  )
}

  


  return (
  
 <Container className="pb-20 pt-20 text-center lg:pb-32 lg:pt-32">
      {/* Main Heading Section */}
      <header className="mb-12">
        <h1 className="mx-auto max-w-4xl font-display text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
          <span className="relative whitespace-normal text-blue-600">
            <span className="relative">
              Upload -&gt; Get The Story -&gt; Move On
            </span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg tracking-tight text-slate-700">
          Empowering informed decisions with cutting-edge AI Models & Industry
          Expertise. <br /> SkyLaw stands at the intersection of technology,
          claims processing, and clinical expertise.{' '}
        </p>
      </header>

      {/* Button Section */}
      <div className="mb-20 flex justify-center gap-6">
        <Button onClick={handleSignupClick} size="lg">
          Get started
        </Button>
        <Link href="#contact" passHref>
          <Button size="lg">Sign Up for Updates</Button>
        </Link>
      </div>

      {/* Signup Form Modal */}
      {isSignupOpen && <SignupForm onClose={handleCloseSignup} />}

      {/* Upload Section */}
      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text and Buttons */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h2 className="my-4 text-3xl font-bold text-slate-900 lg:text-4xl">
                United in Technology
              </h2>
              <p className="mb-8 max-w-xl text-base text-muted-foreground lg:text-lg">
                In every major injury case, MRI imaging is the crux of both
                proving and treating injuries. It’s critical to get it
                right—there’s no room for error or cutting corners. Partnering
                with leading imaging facilities, we ensure high-quality, precise
                diagnostics that support personal injury cases. Our AI-powered
                solutions turn advanced imaging into actionable insights,
                improving patient care and providing legal teams with the
                evidence needed for strong, successful claims.
              </p>
            </div>

            {/* Logos and Images */}
            <div className="grid grid-cols-2 gap-6 lg:gap-8">
              <Image
                src="/images/logo_skylaw_w_text.png"
                alt="SkyLaw emblem and text logo"
                width={300}
                height={100}
                priority
                className="mx-auto"
              />
              <Image
                src="/images/scan.com_logo.png"
                alt="Scan.com logo"
                width={300}
                height={100}
                priority
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              AI Technology That Thinks Ahead
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Our AI-driven platform goes beyond generating reports—it delivers
              a comprehensive understanding of each case. By highlighting key
              findings, providing detailed condition summaries with accurate
              ICD-10 codes, and suggesting tailored treatments, our technology
              ensures that both medical providers and legal teams have the
              insights they need to make informed, strategic decisions, leading
              to better patient outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              Faster, Smarter, Better Decision Making
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              We don’t just analyze—we ignite action by transforming complex
              data into crystal-clear insights, empowering you to make faster,
              smarter decisions that drive real results. Every choice becomes
              sharper & every outcome stronger.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              Generate Case-Specific Reports with Ease
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              SkyLaw’s AI-driven platform delivers neatly organized reports that
              highlight every crucial detail, from MRI findings to missed value
              points. By streamlining data interpretation, we reduce human
              error, enhance efficiency, and empower healthcare providers and
              attorneys with the insights they need to ensure better patient
              outcomes and stronger legal cases—quickly and accurately.
            </p>
            <ul className="mx-auto mt-8 max-w-2xl space-y-4 text-left text-muted-foreground">
              <li>
                <strong>Findings Summary:</strong> A concise, easy-to-understand
                overview of key injuries, medical conditions, and legal
                insights, providing actionable data to help both healthcare
                providers and attorneys quickly assess and act on each case.
              </li>
              <li>
                <strong>Detailed Medical Coding Review:</strong> Comprehensive
                identification of all relevant medical conditions with the
                appropriate coding, streamlining insurance claims and helping
                legal professionals substantiate the case.
              </li>
              <li>
                <strong>Missed Opportunities:</strong> We identify any
                overlooked details or missed coding opportunities that could
                enhance the value of the case, ensuring nothing is left on the
                table.
              </li>
              <li>
                <strong>Next Steps:</strong> A tailored outline of potential
                treatment paths, along with strategic insights for attorneys on
                how to handle anticipated legal challenges, including injury
                valuation and rebuttal strategies for insurance rejections.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="bg-gray-50 py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              Get in Touch
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Fill out the form below to get in touch with us. We are here to
              answer any questions you may have.
            </p>
          </div>
          <div className="flex justify-center">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfUjDCEp-0mFSiLKQxnE2dGcyHxA_C93fbmh7XffJxaOAo30A/viewform?embedded=true"
              width="640"
              height="800"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              className="w-full max-w-xl"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Here are some of the common questions we get asked by our clients.
            </p>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="faq-1">
              <AccordionTrigger>
                What is SkyLaw&apos;s platform all about?
              </AccordionTrigger>
              <AccordionContent>
                SkyLaw provides cutting-edge MRI analytics using advanced AI
                technologies to empower informed decision-making in diagnostics.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>
                Is the platform easy to use for patients?
              </AccordionTrigger>
              <AccordionContent>
                Yes, the platform is designed to be user-friendly, allowing
                patients to easily upload scans and access results with minimal
                steps.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>How secure is my data?</AccordionTrigger>
              <AccordionContent>
                We use state-of-the-art security protocols to ensure all patient
                data is fully encrypted and compliant with healthcare data
                regulations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-slate-900 py-12 text-white">
        <div className="flex h-full items-center justify-center text-center">
          <p className="flex h-full items-center justify-center">
            © {new Date().getFullYear()} SkyLaw. All rights reserved.
          </p>
        </div>
      </footer>
    </Container>

  );
}


