// Import state from React to make it usable
import { useState } from "react";

// Import images (a built-in feature of NextJS that provides a variety of image optmizations)
import Image from "next/image";

// Requires npm install classnames
// Once installed and imported we can now add multiple classes to an element
import cls from "classnames";

// Requires npm install framer-motion
// Once installed and imported we can now access Framers motion libraries for React
import { motion } from "framer-motion";

//Import styles so that they can be applied
import styles from "./card.module.css";


// CARD COMPONENT
const Card = (props) => {
    // The properties that the Card component will take in
    const {
        imgUrl = "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2912&q=80", 
        size = "medium",
        id,
        shouldScale = true,
    } = props;

    //  using React
    // Set the default as imgUrl
    const [ imgSrc, setImgSrc ] = useState(imgUrl);

    // Defining specific styles for different sized cards
    const classMap = {
        large: styles.lgItem,
        medium: styles.mdItem,
        small: styles.smItem,
    };

    // Function to handle errors on image loading
    const handleOnError = () => {
        // Set a default image to display if intended image fails to load
        setImgSrc("https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2912&q=80");
    };

    const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

    const shouldHover = shouldScale && {
        whileHover: { ...scale },
      };

    // When we create a function or component we must return something. 
    // Here I am returning my properties.
    return ( 
        <div className = {styles.container} >
            <motion.div className={cls(styles.imgMotionWrapper, classMap[size])} 
             {...shouldHover}>
            <Image 
                src = {imgSrc}
                alt = "Image"
                onError = {handleOnError}
                layout = "fill"
                className = {styles.cardImg}
            /> 
            </motion.div>
        </div>
    );
};

// Allow Card component to be usable
// On any page I wish to use the Card component I must import it
export default Card;