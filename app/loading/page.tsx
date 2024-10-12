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
