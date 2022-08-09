// // Import jwt from npm package
// import jwt from "jsonwebtoken";

// // Function to verify token to allow access to users videos
// export async function verifyToken(token) {
//   if (token) {
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

//     const userId = decodedToken?.issuer;
//     return userId;
//   }
//   return null;
// };

/ Import jwt from npm package
import jwt from "jsonwebtoken";

// Function to verify token to allow access to users videos
export async function verifyToken(token) {
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedToken?.issuer;
    return userId;
  }
  return null;
};