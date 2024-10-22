// components/Hero.tsx

import Image from 'next/image'
import { Button } from '@/components/Button' // Ensure you have this component or adjust accordingly
import { Container } from '@/components/Container' // Ensure you have this component or adjust accordingly
import TextReveal from '@/components/ui/text-reveal' // Ensure you have this component or adjust accordingly
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion' // Ensure you have this component or adjust accordingly

export function Hero() {
  return (
    <div className="bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-black">
        {/* ... (rest of your Hero component code) */}
      </section>
      {/* Include the rest of the sections as per your component code */}
    </div>
  )
}

export default Hero
