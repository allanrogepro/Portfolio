import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ThreeDTimeline = ({ items }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll progress (0 to 1) to rotation (0 to -360 degrees)
    const rotateValue = useTransform(scrollYProgress, [0, 1], [0, -360]);

    const radius = 180;
    const angleStep = 360 / items.length;

    return (
        <div ref={containerRef} className="h-[500vh] relative">
            <div className="sticky top-0 h-screen flex justify-center pt-24 md:pt-36 overflow-hidden perspective-1000">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 text-gray-300 text-sm font-bold uppercase tracking-widest animate-pulse">
                    Scrollez pour explorer
                </div>

                <div className="relative flex items-center justify-center transform-style-3d">
                    <motion.div
                        className="relative flex items-center justify-center"
                        style={{
                            transformStyle: "preserve-3d",
                            rotateY: rotateValue
                        }}
                    >
                        {items.map((item, index) => (
                            <TimelineCard
                                key={index}
                                item={item}
                                index={index}
                                total={items.length}
                                scrollYProgress={scrollYProgress}
                                radius={radius}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const TimelineCard = ({ item, index, total, scrollYProgress, radius }) => {
    const angleStep = 360 / total;
    const angle = index * angleStep;

    const opacity = useTransform(scrollYProgress, (value) => {
        const currentRot = value * 360;
        // Normalize angle difference to find how close this card is to the "front" (0 deg relative)
        let diff = (angle - currentRot) % 360;
        if (diff < 0) diff += 360;
        if (diff > 180) diff -= 360;

        const dist = Math.abs(diff);
        if (dist > 90) return 0.2;
        return 1 - (dist / 90) * 0.7;
    });

    const blur = useTransform(scrollYProgress, (value) => {
        const currentRot = value * 360;
        let diff = (angle - currentRot) % 360;
        if (diff < 0) diff += 360;
        if (diff > 180) diff -= 360;

        const dist = Math.abs(diff);
        // Map distance to blur (0px to 5px)
        if (dist < 60) return "0px";
        return `${Math.min((dist / 180) * 4, 4)}px`;
    });

    return (
        <div
            className="absolute flex items-center justify-center transition-all duration-300"
            style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                transformStyle: "preserve-3d",
            }}
        >
            <motion.div
                style={{ opacity, filter: useTransform(blur, b => `blur(${b})`) }}
                className="bg-white/95 backdrop-blur-xl border border-gray-100 p-6 md:p-8 rounded-[2rem] w-[280px] md:w-[340px] h-auto min-h-[300px] md:h-[320px] flex flex-col justify-center items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] backface-visibility-hidden"
            >
                <span className="inline-block bg-portfolio-yellow text-black text-sm font-black px-4 py-1.5 rounded-full mb-5 shadow-sm">
                    {item.year}
                </span>
                <h3 className="text-2xl font-black mb-3 text-black">{item.title}</h3>
                <div className="w-10 h-1 bg-gray-100 mb-4 rounded-full"></div>
                <p className="text-gray-500 font-medium text-sm leading-relaxed text-balance line-clamp-3 mb-5">
                    {item.subtitle}
                </p>

                {item.link && (
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                            px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-colors
                            ${item.isCurrent
                                ? 'bg-portfolio-yellow text-black hover:bg-white'
                                : 'bg-black text-white hover:bg-portfolio-yellow hover:text-black'}
                        `}
                    >
                        Découvrir la formation
                    </a>
                )}
            </motion.div>
        </div>
    );
};


export default ThreeDTimeline;
