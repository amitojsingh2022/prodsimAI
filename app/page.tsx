'use client';

import React from 'react';
import { Textarea } from "@/components/ui/textarea";

export default function MainPage() {
    return (
        <div className="bg-black min-h-screen text-white p-8 flex flex-col items-center justify-center">
            <div className="max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-4">Product</h1>
                <p className="mb-4">Enter your product description below:</p>
                <Textarea placeholder="Type your product description here." className="w-full mb-8" />
                <h2 className="text-2xl font-bold mt-8">Agents</h2>
            </div>
        </div>
    );
}
