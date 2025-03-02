import HomePage from "./HomePage"
import Header from "../components/layoutcomponent/Header"
import { MyProvider } from "../context/Component.context"


function AppPage() {
  return(
    <>
      <Header/>
      <MyProvider>
        <HomePage />
      </MyProvider>
      {/* <SideBar/> */}
    </>
)
}

export default AppPage
