// Built in component that allows us to append elements such as title and meta tags
import Head from 'next/head';

// Import styles so they can be applied
import styles from '../styles/Home.module.css';

// Import components so they can be used
import NavBar from "../components/nav/navbar.js";
import Banner from "../components/banner/banner.js";
import SectionCards from "../components/card/section-cards";

// Import functions from video.js file to grab youtube videos
import { getVideos, getPopularVideos, getWatchItAgainVideos } from "../lib/videos.js";
import useRedirectUser from "../utils/redirectUser";


export async function getServerSideProps(context) {
  // Grab videos on the server side
  const { userId, token } = await useRedirectUser(context);
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
  const disneyVideos = await getVideos("disney trailer");
  const crimeVideos = await getVideos("netflix crime documentaries trailer");
  const netflix_originalsVideos = await getVideos("netflix original official trailer");
  const animeVideos = await getVideos("netflix anime official trailer");
  const popularVideos = await getPopularVideos();

  // Pass videos as a prop to our home page
  return { 
    props: { 
      disneyVideos, 
      watchItAgainVideos, 
      netflix_originalsVideos, 
      animeVideos,
      crimeVideos,  
      popularVideos 
    },
  };
}


// HOME PAGE
export default function Home({ 
  disneyVideos, 
  watchItAgainVideos, 
  netflix_originalsVideos, 
  animeVideos,
  crimeVideos,  
  popularVideos 
}) {

  return ( 
    <div className={styles.container}>
      <Head>
        <title>Netflix Clone</title> 
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <NavBar />
        <Banner 
          videoId="yQEondeGvKo"
          title="Stranger Things 4"
          subTitle="The world turns upside down!"
          imgUrl="/static/stranger-things.webp" />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="small" />
          <SectionCards title="Watch it Again" videos={watchItAgainVideos} size="small" />

          <SectionCards title="Netflix Originals" videos={netflix_originalsVideos} size="small" />

          <SectionCards title="Anime" videos={animeVideos} size="small" />
          <SectionCards title="True Crime" videos={crimeVideos} size="small" />
          
          <SectionCards title="Trending Now" videos={popularVideos} size="small" />
        </div> 
      </div>  
    </div>
  );
};