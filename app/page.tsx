'use client';

import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default function MainPage() {
    return (
        <div className="bg-black min-h-screen text-white p-8 flex flex-col items-center justify-start pt-16">
            <div className="max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-4">Product</h1>
                <p className="mb-4">Enter your product description below:</p>
                <Textarea placeholder="Type your product description here." className="w-full mb-8" />
                <h2 className="text-3xl font-bold mt-8 mb-4">Consumer</h2>
                <div className="flex justify-center">
                    <Popover>
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
                                <button className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-sm font-medium">
                                    Add Consumer
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
}
