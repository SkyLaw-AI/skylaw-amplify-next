"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import Hero from '@/compontents/Hero'

Amplify.configure(outputs);

export default function HomePage(){
  return (
    <main>
      <Hero />
    </main>
  )
}