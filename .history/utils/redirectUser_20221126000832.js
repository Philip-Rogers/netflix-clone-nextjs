// Import token verification function
import { verifyToken } from "../lib/utils";

// Hook to redirect user to login if verification fails
const useRedirectUser = async (context) => {
  const token = context.req ? context.req.cookies?.token : null;

  const userId = await verifyToken(token);

  return {
    userId,
    token,
  };
};

// Export hook to make it usable
export default useRedirectUser;