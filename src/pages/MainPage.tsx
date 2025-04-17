import { useEffect} from "react";
import SideBar from "../components/homepage/sidebar";
import UpHeader from "../components/homepage/upheader";
import "../styles/MainPage.css"
import Selecttheme from "../test/Selecttheme";
import axios from "axios";
import { useUserInfo } from "../hooks/useUserInfo";
import { compareLocalStorageData } from "../utils/compareLocalStorageData";
import { useLocalStorageData } from "../hooks/useLocalStorageData";

const MainPage:React.FC = () => {
    const {backend_url} = useUserInfo()

    // const [filteredData, setFilteredData] = useState<ComponentType[]>([]);
    
    const localData = useLocalStorageData(); // Assuming this is a custom hook
    useEffect(() => {
        axios
          .get(`${backend_url}/user/tablename/2`)
          .then((response) => {
            console.log("Response:", response.data);
      
            if (Array.isArray(response.data)) {
              const responses = response.data.filter((item) =>
                localData.some(localItem => localItem.table_name === item.table_name)
              );
              responses.map((comp) =>{
                //   console.log("Filtered Responses:", comp);
                compareLocalStorageData(comp)
              })
            }
          })
          .catch((err) => {
            console.log("Error:", err);
          });
      }, [localData]);
      
    return(
        <div className="container">
            <div className="tabs">
                <SideBar/>
            </div>
            <div className="info">
                <UpHeader/>
                <div className="body-field">
                    <Selecttheme/>
                </div>
            </div>
        </div>
    )
}

export default MainPage;