'use client';

import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default function MainPage() {
    const [consumers, setConsumers] = useState<Record<string, string>>({});
    const [open, setOpen] = useState(false);

    const addConsumer = (name: string, description: string) => {
        setConsumers(prevConsumers => ({...prevConsumers, [name]: description}));
    };

    const deleteConsumer = (name: string) => {
        setConsumers(prevConsumers => {
            const { [name]: _, ...rest } = prevConsumers;
            return rest;
        });
    };

    return (
        <div className="bg-black min-h-screen text-white p-8 flex flex-col items-center justify-start pt-16">
            <div className="max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-4">Product</h1>
                <p className="mb-4">Enter your product description below:</p>
                <Textarea placeholder="Type your product description here." className="w-full mb-8" />
                <h1 className="text-3xl font-bold mb-4 mt-8">Questions</h1>
                <h2 className="text-3xl font-bold mt-8 mb-4">Consumer</h2>
                <div className="flex justify-center">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <button className="bg-gray-800 text-white h-16 w-16 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <h4 className="font-medium leading-none">Add a New Consumer</h4>
                                <p className="text-sm text-muted-foreground">
                                    Enter the details for your new consumer.
                                </p>
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <label htmlFor="agentName">Name</label>
                                        <input
                                            id="agentName"
                                            className="col-span-2 h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            placeholder="Enter consumer name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 items-start gap-4">
                                        <label htmlFor="agentRole" className="pt-2">Description</label>
                                        <Textarea
                                            id="agentRole"
                                            className="col-span-2 min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            placeholder="Enter consumer description"
                                        />
                                    </div>
                                </div>
                                <button 
                                    className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-sm font-medium"
                                    onClick={() => {
                                        const nameInput = document.getElementById('agentName') as HTMLInputElement;
                                        const descriptionInput = document.getElementById('agentRole') as HTMLTextAreaElement;
                                        if (nameInput && descriptionInput && nameInput.value.trim() !== '') {
                                            addConsumer(nameInput.value.trim(), descriptionInput.value.trim());
                                            nameInput.value = '';
                                            descriptionInput.value = '';
                                            setOpen(false); // Close the popover
                                        }
                                    }}
                                >
                                    Add Consumer
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(consumers).map(([name, description]) => (
                        <Popover key={name}>
                            <PopoverTrigger asChild>
                                <Card className="bg-black text-white border border-white cursor-pointer h-40 flex flex-col justify-center relative group">
                                    <CardHeader>
                                        <CardTitle className="text-center">{name}</CardTitle>
                                    </CardHeader>
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                deleteConsumer(name);
                                            }}
                                            className="text-white hover:text-red-500"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 11-2 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </Card>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-black text-white border border-white">
                                <p className="font-semibold">Description:</p>
                                <p className="mt-2">{description}</p>
                            </PopoverContent>
                        </Popover>
                    ))}
                </div>
            </div>
        </div>
    );
}
