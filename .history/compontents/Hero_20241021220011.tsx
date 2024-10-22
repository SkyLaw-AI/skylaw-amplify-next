// components/Hero.tsx

import Image from 'next/image'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion' // Adjust the import path as necessary

// If you don't have Button and Container components, you can use standard HTML elements or create simple ones.

export default function Hero() {
  return (
    <div className="bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-black">
        <div className="pb-16 pt-20 text-center lg:pt-32">
          <div className="z-10 flex min-h-64 items-center justify-center rounded-lg border bg-white dark:bg-black">
            <h1 className="text-4xl font-bold">
              Upload &rarr; Get The Story &rarr; Move On
            </h1>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700 dark:text-slate-300">
            Empowering informed decisions with cutting-edge MRI analytics, SkyLaw stands at the intersection of technology and clinical expertise.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Link href="/register">
              <a className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Get Started
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* United In Technology Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h2 className="my-6 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
                United In Technology
              </h2>
              <p className="mb-8 max-w-xl text-lg text-gray-700 dark:text-gray-300">
                Partnering with the UK's leading imaging provider, Scan.com, and the top-rated Advanced Imaging Centers in the U.S., we ensure high-quality, precise diagnostics.
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <Link href="/upload">
                  <a className="w-full sm:w-auto px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Upload Scans Now
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex justify-center gap-8">
              {/* Logos for partners */}
              <Image
                src="/images/logo_skylaw_w_text.png"
                alt="SkyLaw logo with text"
                width={150}
                height={50}
              />
              <Image
                src="/images/scan.com_logo.png"
                alt="Scan.com logo"
                width={150}
                height={50}
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Technology Section */}
      <section className="bg-white dark:bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="order-2 lg:order-1 flex flex-col items-center text-center lg:items-start lg:text-left">
              <h2 className="my-6 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
                AI Technology That Understands For You
              </h2>
              <p className="mb-8 max-w-xl text-lg text-gray-700 dark:text-gray-300">
                Our AI-driven platform delivers not just reports, but a comprehensive understanding of each case—highlighting crucial MRI findings, detailed conditions with ICD-10 codes, and tailored treatment paths.
              </p>
              <Link href="/get-started">
                <a className="w-full sm:w-auto px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Get Started
                </a>
              </Link>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <Image
                src="/images/doctor-in-green-scrubs-typing-on-computer.jpg"
                alt="Doctor in green scrubs typing on computer at his medical office"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Faster, Better, Smarter Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex justify-center">
              <Image
                src="/images/surgeon-showing-thumb-up-on-x-ray-scans.jpg"
                alt="Surgeon showing thumbs-up on X-ray scans in clinic"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h2 className="my-6 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
                Faster, Better, Smarter Decision Making
              </h2>
              <p className="mb-8 max-w-xl text-lg text-gray-700 dark:text-gray-300">
                At SkyLaw, we don't just analyze; we transform insights into action, making each decision clearer and every outcome better.
              </p>
              <Link href="/get-started">
                <a className="w-full sm:w-auto px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Get Started
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Generate MRI Reports Section */}
      <section className="bg-white dark:bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="order-2 lg:order-1 flex flex-col items-center text-center lg:items-start lg:text-left">
              <h2 className="my-6 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
                Generate MRI Reports The Easy Way
              </h2>
              <p className="mb-8 max-w-xl text-lg text-gray-700 dark:text-gray-300">
                With SkyLaw, medical professionals receive a neatly organized PDF file, detailing every crucial aspect of the MRI results. This cutting-edge solution enhances efficiency, reduces human error, and supports healthcare providers in delivering precise, timely diagnoses.
              </p>
              <Link href="/get-started">
                <a className="w-full sm:w-auto px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Get Started
                </a>
              </Link>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <Image
                src="/images/woman-headset-code.jpg"
                alt="Woman with headset working on code"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Each Report Includes Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex justify-center">
              <Image
                src="/images/close-up-female-report.jpg"
                alt="Close-up of a female reviewing a report"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h2 className="my-6 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
                Each Report Includes:
              </h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-xl font-medium text-gray-900 dark:text-white">
                    MRI Findings Summary
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300">
                    A clear, educational overview of the injuries, explaining their implications on the patient's daily life and activities.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-xl font-medium text-gray-900 dark:text-white">
                    Detailed Findings and ICD-10 Codes
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300">
                    Every condition identified from the MRI is detailed with corresponding codes, offering a robust foundation for insurance claims and treatment planning.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-xl font-medium text-gray-900 dark:text-white">
                    Future Treatment Considerations
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300">
                    A structured outline of potential treatment paths including pain management, surgical interventions, and at-home care options, tailored to enhance recovery and quality of life.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-white dark:bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
              Start Using SkyLaw Now
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
              Transform your decision-making process with SkyLaw's advanced MRI analytics.
            </p>
            <div className="mt-8 flex justify-center gap-x-6">
              <Link href="/register">
                <a className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Get Started
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
