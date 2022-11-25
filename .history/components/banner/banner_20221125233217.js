// Import images (a built-in feature of NextJS that provides a variety of image optmizations)
import Image from "next/image";

// Import router (a built in feature of NextJS)
import { useRouter } from "next/router";

//Import styles so that they can be applied
import styles from "./banner.module.css";


// BANNER COMPONENT
const Banner = (props) => {
    // The properties that the Banner component will take in
    const{ videoId, title, subTitle, imgUrl } = props;
    // Declare router
    const router = useRouter();

    // Button function
    const handleOnPlay = () => {
        router.push(`video/${videoId}`);
    };

    // When we create a function or component we must return something. 
    // Here I am returning my properties.
    return (
        <div className={styles.container}>
            <div className={styles.leftWrapper}>
                <div className={styles.left}>
                    <div className={styles.nseriesWrapper}>
                        <p className={styles.firstLetter}>N</p>
                        <p className={styles.series}>S E R I E S</p>
                    </div>
                    <h3 className={styles.title}>{title}</h3>
                    <h3 className={styles.subTitle}>{subTitle}</h3>
                    <div className={styles.playBtnWrapper}>
                        <button className={styles.btnWithIcon} onClick={handleOnPlay}>
                            <Image 
                                src="/static/play_arrow.svg" 
                                alt="Play Icon" 
                                width="32px"
                                height="32px"
                            />
                            <span className={styles.playText}>Play</span>
                        </button>
                    </div>
                </div>
            </div>
            <div 
                className={styles.bannerImg}
                style={{ 
                backgroundImage: `url(${imgUrl})`, 
                }}>,
            </div>
        </div>
    );
};


// Allow Banner component to be usable
// On any page I wish to use the Banner component I must import it
export default Banner;