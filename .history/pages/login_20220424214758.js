// Login page is a nested route and a nested route in NextJS must be a react component

// Import state and effect from React to make it usable
import { useEffect, useState } from "react";

// Import useRouter hook so we can use the router object inside any function or component
import { useRouter } from "next/router";

// Import built in link component
import Link from 'next/link';

// Built in component that allows us to append elements such as title and meta tags
import Head from "next/head";

// Import images (a built-in feature of NextJS that provides a variety of image optmizations)
import Image from "next/image";

// Import magic to allow passwordless authentication
import { magic } from "../lib/magic-client";

// Import styles so they can be applied
import styles from "../styles/Login.module.css";



// Login component
const Login = () => {
    // Make sure user enters a valid email
    const [email, setEmail] = useState("");
    // Build user message using React
    const [userMsg, setUserMsg] = useState("");
    // Provide loading screen
    // Set default as false so loading screen only appears when user clicks login
    const [isLoading, setIsLoading] = useState(false);
    // Invoke router
    const router = useRouter();

    // Ensure loading screen continues until home page loads
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

    // Function to check if email exists
    const handleOnChangeEmail = (event) => {
        setUserMsg("");
        const email = event.target.value;
        setEmail(email);
    };

    // Function to handle email login
    // async required when using await
    const handleLoginWithEmail = async (event) => {
        // Prevent page from refreshing on button press
        event.preventDefault();

        if (email) {
                // log in a user by their email
                try {
                     // Loading screen appears once login button is clicked
                    setIsLoading(true);

                    const didToken = await magic.auth.loginWithMagicLink({ email, });

                    // If email is authenticated reroute to home page
                    if (didToken) {
                        const response = await fetch("/api/login", {
                            method: "POST",
                            headers: {
                              Authorization: `Bearer ${didToken}`,
                              "Content-Type": "application/json",
                            },
                        });

                        const loggedInResponse = await response.json();
                        if (loggedInResponse.done) {
                        router.push("/");
                    } else {
                        setIsLoading(false);
                        setUserMsg("Something went wrong logging in");
                    }
                }
            } catch (error) {
                // Handle errors if required!
                console.error("Failed to log in", error)
                setIsLoading(false);
            }
        } else {
            // Show user message
            setIsLoading(false);
            setUserMsg("Enter a valid email address");
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Netflix SignIn</title>
            </Head>

            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <Link href="/">
                        <a className={styles.logoLink}> 
                            <div className={styles.logoWrapper}>
                                <Image 
                                    src="/static/netflix.svg" 
                                    alt="Netflix Logo" 
                                    width="128px"
                                    height="34px"
                                />
                            </div>
                        </a>
                    </Link>
                </div>
                </header>

                <main className={styles.main}>
                    <div className={styles.mainWrapper}>
                        <h1 className={styles.signinHeader}>Sign In</h1>
                        <input className={styles.emailInput} 
                            type="text" 
                            placeholder="Email Address"
                            onChange={handleOnChangeEmail} 
                        />
                        <p className={styles.userMsg}>{userMsg}</p>
                        <button className={styles.loginBtn} onClick={handleLoginWithEmail}>{isLoading ? "Loading..." : "Sign In"}</button>
                    </div>
                </main>
        </div>
    );
};

// Component needs to be exported by default to be usable
export default Login;