'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Progress } from "@/components/ui/progress";

import { generate_agent, answer_question, group_answer, Customer } from '../functions/models'

interface Person {
    name: string,
    description: string,
}

async function generate_agents(people: Person[]) {
    const customers = [];
    for (const person in people) {
        const sys_prompt = await generate_agent(person.name, person.description, product);
        customers.push({ name: person.name, history: { role: "system", content: sys_prompt }})
    }
    return customers;
}

export default function LoadingPage() {
    const router = useRouter();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(oldProgress => {
                if (oldProgress === 100) {
                    clearInterval(timer);
                    router.push('/simulation');
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
