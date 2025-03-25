import HomePage from "./HomePage"
import Header from "../components/layoutcomponent/Header"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { MyContext } from "../context/Component.context";

function AppPage() {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const storedUser = localStorage.getItem('userdetail');
  const [userid, setUserId]  = useState<{ user_id:string} | null>(null);
  const context = useContext(MyContext);

  // Ensure context is available
  if (!context) {
    throw new Error("SideBar must be used within a MyProvider");
  }
  useEffect(() => {
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser); // Store parsed user info in state
    }
  }, [storedUser]);

  const userId = userid?.user_id

  useEffect(() => {
    if(userId){
    axios
      .get(`${backend_url}/user/tablename/${userId}`) // API endpoint for components
      .then((response) => {
        console.log("Successfully fetched components from AppPage: ", response.data);
        context.setComponents(response.data); // Set the fetched components to context
      })
      .catch((error) => {
        console.error("Error fetching the data: ", error); // Handle any errors
      });
    }
  }, [userId]);

  return(
    <>
      <Header/>
      <HomePage />
      {/* <SideBar/> */}
    </>
)
}

export default AppPage
