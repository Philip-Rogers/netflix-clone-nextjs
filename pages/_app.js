// Import state from React to make it usable
import { useState } from "react";

// Import router (a built in feature of NextJS)
import { useRouter } from "next/router";

// Import effect from React to make it usable
import { useEffect } from "react";

// Import magic to allow passwordless authentication
import { magic } from "../lib/magic-client";

// Import styles to be applied
import '../styles/globals.css';

// Import loader function
import Loading from "../components/loader/loading";


// My app
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

    // Ensure loading screen continues until login page loads
    useEffect(() => {
      const handleComplete = () => {
          setIsLoading(false);
      };

      router.events.on("routeChangeComplete", handleComplete);
      router.events.on("routeChangeError", handleComplete);

      return () => {
          router.events.off("routeChangeComplete", handleComplete);
          router.events.off("routeChangeError", handleComplete);
      };
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />
}

export default MyApp;