// Import stat tracking functions
import { findVideoIdByUser, updateStats, insertStats, } from "../../lib/db/hasura";

// Import token verification function
import { verifyToken } from "../../lib/utils";

// Function to validate jwt
export default async function stats(req, resp) {
    try {
      const token = req.cookies.token;
      if (!token) {
        // User does not have access rights
        resp.status(403).send({});
      } else {
        const inputParams = req.method === "POST" ? req.body : req.query;
        const { videoId } = inputParams;
        if (videoId) {
            // Check if stats exist
          const userId = await verifyToken(token);
          const findVideo = await findVideoIdByUser(token, userId, videoId);
          const doesStatsExist = findVideo?.length > 0;
  
          if (req.method === "POST") {
            const { favourited, watched = true } = req.body;
            if (doesStatsExist) {
              // Update stats
              const response = await updateStats(token, {
                watched,
                userId,
                videoId,
                favourited,
              });
              resp.send({ data: response });
            } else {
              // Insert stats
              const response = await insertStats(token, {
                watched,
                userId,
                videoId,
                favourited,
              });
              resp.send({ data: response });
            }
          } else {
            if (doesStatsExist) {
              resp.send(findVideo);
            } else {
              resp.status(404);
              resp.send({ user: null, msg: "Video not found" });
            }
          }
        }
      }
    } catch (error) {
      console.error("Error occurred /stats", error);
      resp.status(500).send({ done: false, error: error?.message });
    }
};