// Import built in link component
import Link from 'next/link';

// Import clsx to access multiple class names
import clsx from "classnames";

// Import styles so they can be applied
import styles from './section-cards.module.css';

// Import component to make it usable
import Card from "./card.js";


// SECTION CARDS COMPONENT
const SectionCards = (props) => {
    // The properties that the SectionCards component will take in
    const { title, videos = [], size, shouldWrap = false, shouldScale } = props;

    // When we create a function or component we must return something. 
    // Here I am returning my properties.
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
                {videos.map((video, idx) => {
                    return (
                    <Link key={video.id} href={`/video/${video.id}`}>
                        <a>
                            <Card 
                                id={idx} 
                                imgUrl={video.imgUrl} 
                                size={size} 
                                shouldScale={shouldScale} 
                            />
                        </a>
                    </Link>
                    );
                })}
            </div>
        </section>
    );
};

// Allow SectionCards component to be usable
// On any page I wish to use the SectionCards component I must import it
export default SectionCards;