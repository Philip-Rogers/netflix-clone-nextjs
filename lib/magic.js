// Requires npm install --save @magic-sdk/admin
import { Magic } from "@magic-sdk/admin";

// Allows us communicate on the server side
export const magicAdmin = new Magic(process.env.MAGIC_SERVER_KEY); // ✨