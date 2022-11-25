// Built in component that allows us to append elements such as title and meta tags
import Head from "next/head";

//Import components
import NavBar from "../../components/nav/navbar";
import SectionCards from "../../components/card/section-cards";

// Import redirect hook
import useRedirectUser from "../../utils/redirectUser";

// Import function to grab user my-list
import { getMyList } from "../../lib/videos.js";

// Import styles to be applied
import styles from "../../styles/MyList.module.css";

export async function getServerSideProps(context) {
  const { userId, token } = await useRedirectUser(context);
  const videos = await getMyList(userId, token);

  return {
    props: {
      myListVideos: videos,
    },
  };
}

const MyList = ({ myListVideos }) => {
  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="My List"
            videos={myListVideos}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
};

export default MyList;