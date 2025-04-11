import React, { useContext, useEffect, useRef } from "react";
import SideBar from "../components/homepage/sidebar";
import UpHeader from "../components/homepage/upheader";
import "../styles/MainPage.css";
import "../styles/EditPage.css";
import { EditThemeContext } from "../context/EditThemeContext";
import { MyContext } from "../context/Component.context";
import axios from "axios";
import { useUserInfo } from "../hooks/useUserInfo";
import { compareLocalStorageData } from "../utils/compareLocalStorageData";
import { ComponentType } from "../types";
import Selecttheme from "../test/Selecttheme";

const EditPage: React.FC = () => {
    const {userId , backend_url} = useUserInfo()
    const editcontext = useContext(EditThemeContext);
    if (!editcontext) {
        throw new Error("EditPage must be used within a EditThemeProvider");
    }

      const context = useContext(MyContext);
    
      if (!context) {
        throw new Error("SideBar must be used within a MyProvider");
      }

    const handlesave = (e: React.MouseEvent<HTMLButtonElement>) => {
        editcontext.setSaveMode(true);
    };

    const handleHeightwidth = (e: React.MouseEvent<HTMLAnchorElement>) => {
        editcontext.setEditHeightWidth(true);
        editcontext.setEditPosition(false);
        editcontext.setAddTable(false);
    };

    const handlePosition = (e: React.MouseEvent<HTMLAnchorElement>) => {
        editcontext.setEditPosition(true);
        editcontext.setEditHeightWidth(false);
        editcontext.setAddTable(false);
    };

    const handleAddTable = (e: React.MouseEvent<HTMLAnchorElement>) => {
        editcontext.setAddTable(true);
        editcontext.setEditHeightWidth(false);
        editcontext.setEditPosition(false);
    };

    const buttonLabels = [
        'Bucket List',
        'To do List List',
        'Money List',
        'Bucket List',
        'Bucket List',
        'To do List List',
        'Money List',
        'Bucket List',
        'Money List',
        'HAHAHA',
    ];

    // ⭐ Infinite loop scroll logic
    const carouselRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = carouselRef.current;
        if (!container) return;

        let animationFrameId: number;

        const scroll = () => {
            container.scrollLeft += 1; 

            // when scrolled halfway (to end of original content), reset scrollLeft
            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollLeft = 0;
            }

            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    useEffect(() => {
        axios
          .get(`${backend_url}/user/tablename/2`) // API endpoint for components
          .then((response) => {
            console.log("Successfully fetched components from AppPage: ", response.data);
            context.setComponents(response.data); // Set the fetched components to context
          })
          .catch((error) => {
            console.error("Error fetching the data: ", error); // Handle any errors
          });
      }, []);


    const handleSelectComponent = (component: ComponentType) => {
        compareLocalStorageData(component)
    }
      
    return (
        <div className="container">
            <div className="tabs">
                <SideBar />
            </div>
            <div className="info">
                <UpHeader />
                <div className="body-field">
                    <div className="editheader">
                        <div className="names">
                            <a onClick={(e) => handleHeightwidth(e)}>Height and Width</a>
                            <a onClick={(e) => handlePosition(e)}>Positions</a>
                            <a onClick={(e) => handleAddTable(e)}>Add Tables</a>
                        </div>
                        <button onClick={(e) => handlesave(e)}>Save</button>
                    </div>
                    <div className="editbody">
                        <div className="sidebar">
                            <p>Available Tables</p>
                            <div className="carousel-wrapper">
                                <div className="carousel" ref={carouselRef}>
                                    {context.components.map((component, index) => (
                                        <button key={index} onClick={() => handleSelectComponent(component)}>{component.table_name}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Selecttheme/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPage;
