'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Agent {
    id: number;
    name: string;
    product: string;
}

export default function MainPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agents, setAgents] = useState<Agent[]>([]);
    const [productInput, setProductInput] = useState('');
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAgent(null);
    };

    const createAgent = () => {
        if (productInput.trim()) {
            const newAgent: Agent = {
                id: Date.now(),
                name: `Agent ${agents.length + 1}`,
                product: productInput.trim(),
            };
            setAgents([...agents, newAgent]);
            setProductInput('');
            closeModal();
        }
    };

    const viewAgentInfo = (agent: Agent) => {
        setSelectedAgent(agent);
        openModal();
    };

    return (
        <div className="container mx-auto px-4 py-8 text-center">
            {/* <h1 className="text-3xl font-bold mb-4">Product Marketing Simulation</h1>
            <p className="mb-8">A new way to simulate product marketing!</p>

            <div className="w-full flex flex-col items-center">
                <div className="w-[70%] mb-4">
                    <label htmlFor="product" className="block text-sm font-medium text-white mb-2">
                        What's your product?
                    </label>
                    <input
                        type="text"
                        id="prompt"
                        name="prompt"
                        value={productInput}
                        onChange={(e) => setProductInput(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                        placeholder="Enter your product here"
                    />
                </div>
                <button
                    onClick={openModal}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Create Agent
                </button>
            </div>

            {agents.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Created Agents</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {agents.map((agent) => (
                            <button
                                key={agent.id}
                                onClick={() => viewAgentInfo(agent)}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            >
                                {agent.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg">
                        {selectedAgent ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4">{selectedAgent.name}</h2>
                                <p className="mb-4">Product: {selectedAgent.product}</p>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Create Agent</h2>
                                <p>Are you sure you want to create an agent for "{productInput}"?</p>
                                <button
                                    onClick={createAgent}
                                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mr-2"
                                >
                                    Confirm
                                </button>
                            </>
                        )}
                        <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )} */}
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
        </div>
    );
}
