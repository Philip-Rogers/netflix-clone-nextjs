// Import state & effect from React to make it usable
import { useState, useEffect } from "react";

// Import useRouter hook so we can use the router object inside any function or component
import { useRouter } from "next/router";

// Requires 'npm install --save react-modal' then import to use
import Modal from "react-modal";

// Import styles to be applied
import styles from "../../styles/Video.module.css";
// Import clsx so we can combine classnames
import clsx from "classnames";

// Import components so they can be used
import NavBar from "../../components/nav/navbar.js";

// Import function to get youtube videos by their id
import { getYoutubeVideoById } from "../../lib/videos";

// Import like & dislike buttons
import Like from "../../components/icons/like-icon.jsx";
import DisLike from "../../components/icons/dislike-icon.jsx";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#__next");

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps(context) {
    // Declare videoId, videoArray
    const videoId = context.params.videoId;
    const videoArray = await getYoutubeVideoById(videoId);
  
    return {
      props: {
        video: videoArray.length > 0 ? videoArray[0] : {},
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10, // In seconds
    };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
    const listOfVideos = ["yQEondeGvKo", "ndl1W4ltcmg", "_EonRi0yQOE"];
  
    // Get the paths we want to pre-render based on posts
    const paths = listOfVideos.map((videoId) => ({
      params: { videoId },
    }));
  
    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' };
};

// Video Component
const Video = ({ video }) => {
    const router = useRouter();
    const videoId = router.query.videoId;

    const [toggleLike, setToggleLike] = useState(false);
    const [toggleDisLike, setToggleDisLike] = useState(false);

    const { title, publishTime, description, channelTitle, statistics: { viewCount } = { viewCount: 0 }, } = video;
    
    // UseEffect react component
    useEffect(() => {
      async function fetchData(){
        // Invoke stats API on the frontend to provide persistentence with like/dislike toggle
        const response = await fetch(`/api/stats?videoId=${videoId}`, {
          method: "GET",
        });
        const data = await response.json();
    
        if (data.length > 0) {
          const favourited = data[0].favourited;
          if (favourited === 1) {
            setToggleLike(true);
          } else if (favourited === 0) {
            setToggleDisLike(true);
          }
        };
      }
      fetchData();
      }, [videoId]);
    
      // Pass like/dislike persistence to the backend
      const runRatingService = async (favourited) => {
        return await fetch("/api/stats", {
          method: "POST",
          body: JSON.stringify({
            videoId,
            favourited,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      };

    const handleToggleLike = async () => {
        const val = !toggleLike;
        setToggleLike(val);
        setToggleDisLike(toggleLike);
    
        const favourited = val ? 1 : 0;
        const response = await runRatingService(favourited);
    };

    const handleToggleDislike = async () => {
        setToggleDisLike(!toggleDisLike);
        setToggleLike(toggleDisLike);

        const val = !toggleDisLike;
        const favourited = val ? 0 : 1;
        const response = await runRatingService(favourited);
    };

    return (
        <div className={styles.container}>
            <NavBar />
            <Modal
                isOpen={true}
                contentLabel="Watch Video"
                onRequestClose={() => router.back()}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <iframe 
                    id="ytplayer"
                    className={styles.videoPlayer} 
                    type="text/html" 
                    width="100%" 
                    height="360"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                    frameBorder="0">
                </iframe>

                <div className={styles.likeDislikeBtnWrapper}>
                    <div className={styles.likeBtnWrapper}>
                        <button onClick={handleToggleLike}>
                            <div className={styles.btnWrapper}>
                                <Like selected={toggleLike} />
                            </div>
                        </button>
                    </div>
                    <button onClick={handleToggleDislike}>
                        <div className={styles.btnWrapper}>   
                            <DisLike selected={toggleDisLike} />
                        </div>
                    </button>      
                </div>
                
                <div className={styles.modalBody}>
                    <div className={styles.modalBodyContent}>
                        <div className={styles.col1}>
                            <p className={styles.publishTime}>{publishTime}</p>
                            <p className={styles.title}>{title}</p>
                            <p className={styles.description}>{description}</p>
                        </div>
                        <div className={styles.col2}>
                            <p className={clsx(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>Cast: </span>
                                <span className={styles.channelTitle}>{channelTitle}</span>
                            </p>
                            <p className={clsx(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>View Count: </span>
                                <span className={styles.channelTitle}>{viewCount}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

// Export video component to make it usable
export default Video;