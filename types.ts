import type React from 'react';

// Fix: Add back the Medal type definition, as it is used in Gamification.tsx,
// and export it to make this file a module.
export interface Medal {
  name: string;
  description: string;
  icon: React.ReactNode;
}
