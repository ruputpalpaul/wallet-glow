
// Basic Card Component
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={cn("bg-white rounded-[32px] p-6 shadow-sm border border-[#e2e8f0]/50", className)}>
            {children}
        </div>
    );
}
