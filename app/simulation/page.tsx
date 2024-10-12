'use client';

import { useEffect, useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Consumer {
    name: string;
    description: string;
}

export default function SimulationPage() {
    const [consumers, setConsumers] = useState<Consumer[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const cardWidth = 300; // Width of each card in pixels
    const visibleCards = 5; // Number of visible cards

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
        <div className="bg-black min-h-screen text-white flex flex-col items-center">
            <div className="w-full max-w-4xl mt-8">
                <Tabs defaultValue="individual" className="w-full">
                    <TabsList className="w-full justify-center mb-8">
                        <TabsTrigger value="individual" className="text-lg px-8 py-4">Individual</TabsTrigger>
                        <TabsTrigger value="group" className="text-lg px-8 py-4">Group</TabsTrigger>
                    </TabsList>
                    <TabsContent value="individual" className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Individual Simulation</h2>
                        <div className="relative w-full h-64 overflow-hidden">
                            <button onClick={prevCard} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">←</button>
                            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                {consumers.map((consumer, index) => (
                                    <Popover key={index}>
                                        <PopoverTrigger asChild>
                                            <Card className="bg-black text-white border border-white cursor-pointer w-full h-60 flex-shrink-0 flex flex-col justify-center mx-2">
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
                                ))}
                            </div>
                            <button onClick={nextCard} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">→</button>
                        </div>
                    </TabsContent>
                    <TabsContent value="group" className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Group Simulation</h2>
                        <p>Group simulation content goes here.</p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
