"use client";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";

import "./../app/app.css";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";

import { Button } from '@/components/ui/button';

interface SignupFormProps {
  onClose: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycby-OYUjGBGATC8SkEunk59DgYm-euO1OIsQD48LYwux3XWqCxYcc-Zx2HlSioiuow5N_g/

      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email }),
      });

      if (response.ok) {
        setSuccessMessage('Email submitted successfully!');
        setEmail(''); // Clear the email input
        setTimeout(() => {
          onClose();  // Close the form after 3 seconds
        }, 3000); // Delay form closure to allow user to see the success message
      } else {
        throw new Error('Failed to submit email.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('There was an error submitting the email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
        {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
        <Button onClick={onClose} variant="secondary" size="lg" className="mt-4">
          Close
        </Button>
      </div>
    </div>
  );
};

export function Hero() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleSignupClick = () => {
    setIsSignupOpen(true);
  };

  const handleCloseSignup = () => {
    setIsSignupOpen(false);
  };

  return (
    <Container className="pb-20 pt-20 text-center lg:pt-32 lg:pb-32">
      {/* Main Heading Section */}
      <header className="mb-12">
        <h1 className="mx-auto max-w-4xl font-display font-medium tracking-tight text-slate-900 text-2xl sm:text-3xl md:text-4xl lg:tex
          <span className="relative whitespace-normal text-blue-600">
            <span className="relative">Upload -&gt; Get The Story -&gt; Move On</span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg tracking-tight text-slate-700">
        Empowering informed decisions with cutting-edge AI Models & Industry Expertise. <br/> SkyLaw stands at the intersection of tech
      </header>

      {/* Button Section */}
      <div className="mb-20 flex justify-center gap-6">
        <Button onClick={handleSignupClick} size="lg">Get started</Button>
      </div>

      {/* Signup Form Modal */}
      {isSignupOpen && <SignupForm onClose={handleCloseSignup} />}

      {/* Upload Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text and Buttons */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h2 className="my-4 text-3xl font-bold text-slate-900 lg:text-4xl">
                United in Technology
              </h2>
              <p className="mb-8 max-w-xl text-base text-muted-foreground lg:text-lg">
                In every major injury case, MRI imaging is the crux of both proving and treating injuries. It’s critical to get it righ
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
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              AI Technology That Thinks Ahead
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Our AI-driven platform goes beyond generating reports—it delivers a comprehensive understanding of each case. By highligh
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              Faster, Smarter, Better Decision Making
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              We don’t just analyze—we ignite action by transforming complex data into crystal-clear insights, empowering you to make f
            </p>
          </div>
        </div>
      </section>


      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              Generate Case-Specific Reports with Ease
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              SkyLaw’s AI-driven platform delivers neatly organized reports that highlight every crucial detail, from MRI findings to m
            </p>
            <ul className="mt-8 text-left max-w-2xl mx-auto space-y-4 text-muted-foreground">
              <li><strong>Findings Summary:</strong> A concise, easy-to-understand overview of key injuries, medical conditions, and le
              <li><strong>Detailed Medical Coding Review:</strong> Comprehensive identification of all relevant medical conditions with
              <li><strong>Missed Opportunities:</strong> We identify any overlooked details or missed coding opportunities that could e
              <li><strong>Next Steps:</strong> A tailored outline of potential treatment paths, along with strategic insights for attor
            </ul>
          </div>
        </div>
      </section>



        {/* Contact Form Section */}
        <section id="contact" className="py-20 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
                Get in Touch
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Fill out the form below to get in touch with us. We are here to answer any questions you may have.
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
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Here are some of the common questions we get asked by our clients.
            </p>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="faq-1">
              <AccordionTrigger>What is SkyLaw&apos;s platform all about?</AccordionTrigger>
              <AccordionContent>
                SkyLaw provides cutting-edge MRI analytics using advanced AI technologies to empower informed decision-making in diagno
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>Is the platform easy to use for patients?</AccordionTrigger>
              <AccordionContent>
                Yes, the platform is designed to be user-friendly, allowing patients to easily upload scans and access results with min
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>How secure is my data?</AccordionTrigger>
              <AccordionContent>
                We use state-of-the-art security protocols to ensure all patient data is fully encrypted and compliant with healthcare 
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="flex items-center justify-center h-full text-center">
          <p className="flex items-center justify-center h-full">© {new Date().getFullYear()} SkyLaw. All rights reserved.</p>
        </div>
      </footer>
    </Container>
  );
}
