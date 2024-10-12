'use client';

import { useEffect, useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import React from 'react';
import Link from 'next/link';

interface Consumer {
    name: string;
    description: string;
}

interface Simulation {
    title: string;
    description: string;
    link: string;
}

const simulations: Simulation[] = [
    // Add your simulation objects here
    { title: "Simulation 1", description: "Description 1", link: "/sim1" },
    { title: "Simulation 2", description: "Description 2", link: "/sim2" },
    // Add more simulations as needed
];

export default function SimulationPage() {
    const [consumers, setConsumers] = useState<Consumer[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardWidth = 250;

    useEffect(() => {
        // Fetch consumers from localStorage or API
        const storedConsumers = localStorage.getItem('consumers');
        if (storedConsumers) {
            setConsumers(JSON.parse(storedConsumers));
        }
    }, []);

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % consumers.length);
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + consumers.length) % consumers.length);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Simulation Page</h1>

            <div className="bg-black min-h-screen text-white flex flex-col items-center">
                <div className="w-full max-w-4xl mt-8">
                    <Tabs defaultValue="individual" className="w-full">
                        <TabsList className="w-full justify-center mb-8">
                            <TabsTrigger value="individual" className="text-lg px-8 py-4">Individual</TabsTrigger>
                            <TabsTrigger value="group" className="text-lg px-8 py-4">Group</TabsTrigger>
                        </TabsList>
                        <TabsContent value="individual" className="text-center">
                            <h2 className="text-2xl font-bold mb-4">Individual Simulation</h2>
                            <div className="relative w-full h-56 overflow-hidden flex justify-center items-center">
                                <button onClick={prevCard} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 p-2 rounded-full">←</button>
                                <div className="w-60 h-52 relative">
                                    {consumers.map((consumer, index) => (
                                        <div
                                            key={index}
                                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                                }`}
                                        >
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Card className="bg-black text-white border border-white cursor-pointer w-full h-full flex flex-col justify-center">
                                                        <CardHeader>
                                                            <CardTitle className="text-center">{consumer.name}</CardTitle>
                                                        </CardHeader>
                                                    </Card>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-80 bg-black text-white border border-white">
                                                    <p className="font-semibold">Description:</p>
                                                    <p className="mt-2">{consumer.description}</p>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={nextCard} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 p-2 rounded-full">→</button>
                            </div>
                        </TabsContent>
                        <TabsContent value="group" className="text-center">
                            <h2 className="text-2xl font-bold mb-4">Group Simulation</h2>
                            <p>Group simulation content goes here.</p>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <div className="mt-8 overflow-x-auto">
                <div className="flex justify-center space-x-4 pb-4">
                    {simulations.map((simulation: Simulation, index) => (
                        <div key={index} className="flex-shrink-0 w-56">
                            <div className="rounded-lg border border-transparent px-4 py-3 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30">
                                <h2 className="mb-3 text-2xl font-semibold">{simulation.title}</h2>
                                <p className="m-0 max-w-[30ch] text-sm opacity-50">{simulation.description}</p>
                                <div className="mt-4">
                                    <Link href={simulation.link} className="text-primary hover:underline">
                                        Start Simulation →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
