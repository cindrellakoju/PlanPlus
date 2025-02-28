import Header from "./components/layoutcomponent/Header"
import { MyProvider } from "./context/selectedComponent"
import HomePage from "./pages/HomePage"

function App() {
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

export default App
