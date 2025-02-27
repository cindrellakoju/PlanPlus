import React from "react";
import "../styles/HomePage.css"

const HomePage: React.FC = () => {
    const selectComponents = () =>{

    }
    return(
        <>
            <div className="iconBar" onChange={selectComponents}>
                <i className='bx bx-list-ul'></i>
            </div>
            <h1>This is heading </h1>
        </>
    )
}

export default HomePage;