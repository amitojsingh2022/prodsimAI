'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Progress } from "@/components/ui/progress";

export default function LoadingPage() {
    const router = useRouter();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(oldProgress => {
                if (oldProgress >= 100) {
                    clearInterval(timer);
                    router.push('/simulation');
                    return 100;
                }
                return oldProgress + 100/30; // Increase by 3.33% every 100ms
            });
        }, 100);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-black">
            <h1 className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold">
                Jarvis, activate!
            </h1>
            <div className="w-1/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Progress value={progress} className="h-1" />
            </div>
        </div>
    );
}
