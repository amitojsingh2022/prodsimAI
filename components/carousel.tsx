import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselProps {
    cards: Array<{ key: string; content: React.ReactNode }>;
    height: string;
    width: string;
    margin: string;
    offset: number;
    showArrows: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ cards, height, width, margin, offset, showArrows }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!cards || cards.length === 0) {
        return null;
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    };

    return (
        <div style={{ height, width, margin }} className="relative overflow-hidden">
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentIndex}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, x: offset }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -offset }}
                    transition={{ duration: 0.5 }}
                >
                    {cards[currentIndex].content}
                </motion.div>
            </AnimatePresence>
            {showArrows && cards.length > 1 && (
                <>
                    <button onClick={handlePrev} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black px-2 py-1 rounded">
                        Prev
                    </button>
                    <button onClick={handleNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black px-2 py-1 rounded">
                        Next
                    </button>
                </>
            )}
        </div>
    );
};

export default Carousel;
