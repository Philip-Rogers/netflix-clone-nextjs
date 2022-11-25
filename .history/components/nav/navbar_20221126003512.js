// Import state and effect from React to make it usable
import { useEffect, useState } from "react";

// Import styles so they can be applied
import styles from "./navbar.module.css";

// Import router (a built in feature of NextJS)
import { useRouter } from "next/router";

// Import built in link component
import Link from 'next/link';

// Import images (a built-in feature of NextJS that provides a variety of image optmizations)
import Image from "next/image";

// Import magic to allow passwordless authentication
import { magic } from "../../lib/magic-client";


// NAVBAR COMPONENT
const NavBar = () => {
    // Build dropdown using React
    // Set the default as false so that the dropdown is not visible until the user interacts with it
    const [showDropdown, setShowDropdown] = useState(false);

    const [username, setUsername] = useState("");

    // Verify user
    const [didToken, setDidToken] = useState("");

    // We must both import and declare the useRouter function to make it usable
    // In the NavBar component we will use this function for the home, my list, and login/signout
    const router = useRouter();

    useEffect(() => {
        async function fetchData(){
        // Assumes a user is already logged in
        try {
            const { email, } = await magic.user.getMetadata();
            const didToken = await magic.user.getIdToken();

            if (email) {
                setUsername(email);
                setDidToken(didToken);
            }
        } catch (error) {
            // Handle errors if required!
            console.error("Error retrieving email", error);
        }   
    }
    fetchData();
    }, []);

    // Declaring where the home link will route too
    const handleOnClickHome = (event) => {
        // Prevent the refresh page default behaviour by passing the event parameter into the function
        event.preventDefault();
        router.push("/");
    };

    // Declaring where the my-list link will route too
    const handleOnClickMyList = (event) => {
        // Prevent the refresh page default behaviour by passing the event paremeter into the function
        event.preventDefault();
        router.push("/browse/my-list");
    };

    // Declaring the dropdown function
    // Here we make the dropdown either visable or hidden depending on it's current state
    const handleShowDropdown = (event) => {
        event.preventDefault();
        setShowDropdown(!showDropdown);
    };

    const handleSignout = async (event) => {
        // Prevent the refresh page default behaviour by passing the event paremeter into the function
        event.preventDefault();

        try {
            const response = await fetch("/api/logout", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${didToken}`,
                  "Content-Type": "application/json",
                },
              });
        
              const res = await response.json();
          } catch (error) {
                // Handle errors if required!
                console.error("Error logging out", error);
                router.push("/login");
        }
    };

    // When we create a function or component we must return something. 
    // Here I am returning my properties.
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Link href="/" passHref>
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
                <ul className={styles.navItems}>
                    <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
                    <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
                </ul>
                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameBtn} onClick={handleShowDropdown}>
                            <p className={styles.username}>{username}</p>
                                <Image 
                                    src="/static/expand_more.svg" 
                                    alt="Expand Dropdown" 
                                    width="24px"
                                    height="24px"
                                />
                        </button>
                        {showDropdown && (
                            <div className={styles.navDropdown}>
                                <div>
                                    <a className={styles.linkName} onClick={handleSignout}>Sign Out</a>
                                    <div className={styles.lineWrapper}></div>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
};


// Allow NavBar component to be usable
// On any page I wish to use the NavBar component I must import it
export default NavBar;