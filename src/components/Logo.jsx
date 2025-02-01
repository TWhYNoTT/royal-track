import React from 'react';

const Logo = ({ className = '' }) => (
    <svg
        viewBox="0 0 800 600"
        className={`w-full h-auto ${className}`}
        aria-label="المسار الملكي"
    >
        {/* Crown */}
        <path
            d="M400 150 L450 200 L500 150 L550 200 L600 150 L575 250 L225 250 L200 150 L250 200 L300 150 L350 200 L400 150Z"
            fill="currentColor"
            className="text-brand-gold"
        />

        {/* Bridge Left */}
        <path
            d="M100 300 L300 300 L300 400 L100 400 M150 300 L150 250 M250 300 L250 250"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-brand-gold"
        />

        {/* Bridge Right */}
        <path
            d="M500 300 L700 300 L700 400 L500 400 M550 300 L550 250 M650 300 L650 250"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-brand-gold"
        />

        {/* Water */}
        <path
            d="M0 350 L800 350 L800 450 L0 450 Z"
            fill="currentColor"
            className="text-brand-water opacity-30"
        />

        {/* Ship */}
        <path
            d="M350 325 L450 325 L425 375 L375 375 Z"
            fill="currentColor"
            className="text-brand-gold"
        />
    </svg>
);

export default Logo;