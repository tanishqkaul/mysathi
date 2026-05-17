import * as React from 'react';
import { CardBlob } from './CardBlob';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div
      className="bg-white relative rounded-lg overflow-hidden flex flex-col items-center text-center pt-6 pb-6 px-4 w-full border border-fuchsia-100"
      style={{ minHeight: '12.5rem', boxShadow: '0px 7px 10px 0px rgba(0,0,0,0.05)' }}
    >
      {/* Blob decoration — exact Figma positioning */}
      <CardBlob />

      {/* Icon: pink outer (70px) + white inner (51px) matching Figma structure */}
      <div
        className="relative z-10 flex items-center justify-center shrink-0"
        style={{ width: 70, height: 70, borderRadius: 13.128, backgroundColor: '#fbcffb' }}
      >
        <div
          className="flex items-center justify-center overflow-hidden"
          style={{ width: 51.333, height: 51.333, borderRadius: 8.752, backgroundColor: '#ffffff' }}
        >
          {icon}
        </div>
      </div>

      {/* Text — exact Figma typography */}
      <div className="relative z-10 flex flex-col items-center gap-2 mt-5 w-full">
        <h3
          className="text-base leading-[1.4] w-full"
          style={{ color: '#303030', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-[1.4] w-full"
          style={{ color: '#616161', fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
