// Import data from videos.json file
import videoTestData from "../data/videos.json";
import { getWatchedVideos, getMyListVideos } from "./db/hasura";

const fetchVideos = async (url) => {
    // Invoke Youtube API
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    // Fetch call returns a promise
    const BASE_URL = `youtube.googleapis.com/youtube/v3`;
        
    const response = await fetch(`https://${BASE_URL}/${url}type&maxResults=10&key=${YOUTUBE_API_KEY}`);

    // Asking for a response
    return await response.json();
};

export const getCommonVideos = async (url) => {
    // Try catch error with video library to prevent page breaking
    try {
        // paste DEVELOPMENT=true in env.local to run videoTestData
        const isDev = process.env.DEVELOPMENT;
        const data = isDev ? videoTestData : await fetchVideos(url);

        // If there is an error with the YouTube API don't execute following map code return empty array
        // This will prevent the page breaking 
        if (data?.error) {
            console.error("Youtube API error", data.error);
            return [];
        }

        // Map out the data we wish to grab
        return data?.items.map((item) => {

            // If there is a video id use that otherwise use item id
            const id = item.id?.videoId || item.id;

            const snippet = item.snippet;
            return {
                title: snippet?.title,
                imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
                id,
                description: snippet.description,
                publishTime: snippet.publishedAt,
                channelTitle: snippet.channelTitle,
                statistics: item.statistics ? item.statistics : {viewCount : 0},
            };
        });
    } catch (error) {
        console.error("Something went wrong with video library", error);
        return [];
    }
};

// Function to search and return YouTube trailers by keywords
export const getVideos = (searchQuery) => {
    const URL = `search?part=snippet&q=${searchQuery}&type=video`;
    return getCommonVideos(URL);
};

// Function to find and return most popular YouTube trilers
export const getPopularVideos = () => {
    const URL = "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
    return getCommonVideos(URL);
  };

// Function to find and return most popular YouTube trilers
export const getYoutubeVideoById = (videoId) => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
    return getCommonVideos(URL);
  };

// Function to find a list of watched videos and render them on the frontend
export const getWatchItAgainVideos = async (userId, token) => {
    const videos = await getWatchedVideos(userId, token);
    return videos?.map((video) => {
      return {
        id: video.videoId,
        imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      };
    }) || [];
};

// Function to populate my list page with user choices
export const getMyList = async (userId, token) => {
    const videos = await getMyListVideos(userId, token);
    return videos?.map((video) => {
      return {
        id: video.videoId,
        imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      };
    }) || [];
};