// Import magic SDK to make it usable for passwordless authentication
import { Magic } from 'magic-sdk';

// Create a new instance and export it to make it usable
const createMagic = () => { 
    return(
        typeof window !== "undefined" &&
        new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY)
    ); // ✨
};

export const magic = createMagic();