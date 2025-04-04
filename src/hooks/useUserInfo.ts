import { useEffect, useState } from "react";

export const useUserInfo = () => {
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const [userId, setUserId] = useState<string | undefined>();

    useEffect(() => {
      const userInfo = localStorage.getItem("userdetail");
      if (userInfo) {
        try {
          const parsedUserInfo = JSON.parse(userInfo);
          if (parsedUserInfo && parsedUserInfo.user_id) {
            setUserId(parsedUserInfo.user_id);
          }
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
        }
      }
    }, []);

    return { userId, backend_url };
};
