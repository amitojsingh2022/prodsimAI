"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Progress } from "@/components/ui/progress";

import {
  generate_agent,
  answer_question,
  group_answer,
  Customer,
  Message,
} from "../functions/models";

interface Person {
  name: string;
  description: string;
}

export default function LoadingPage() {
  const router = useRouter();
  // const { data } = router.query;
  const [progress, setProgress] = useState(0);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [product, setProduct] = useState('')
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  

  async function generate_agents(people: Person[]) {
    const cms: Customer[] = [];
    for (const person of people) {
      const sys_prompt = await generate_agent(
        person.name,
        person.description,
        product
      );
      cms.push({
        name: person.name,
        history: [{ role: "system", content: sys_prompt }],
      });
    }
    setCustomers(cms);
  }

  async function run_census() {
    let rsp: string[] = [];
    for (const c of customers) {
      for (const q of questions) {
        const t = await answer_question(q, c);
        rsp.push(t ? t : "");
      }
    }
    setResponses(rsp);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          router.push("/simulation");
          return 100;
        }
        return Math.min(oldProgress + 2, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-1/2">
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
}
