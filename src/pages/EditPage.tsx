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
import CreateTable from "../components/allrequire/CreateTable";

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

    const handlesave = () => {
        editcontext.setSaveMode(true);
    };

    const handleHeightwidth = () => {
        editcontext.setEditHeightWidth(true);
        editcontext.setEditPosition(false);
        editcontext.setAddTable(false);
        editcontext.setCreateTable(false);
    };

    const handlePosition = () => {
        editcontext.setEditPosition(true);
        editcontext.setEditHeightWidth(false);
        editcontext.setAddTable(false);
        editcontext.setCreateTable(false);
    };

    const handleAddTable = () => {
        editcontext.setAddTable(true);
        editcontext.setEditHeightWidth(false);
        editcontext.setEditPosition(false);
        editcontext.setCreateTable(false);
    };

    const handleCreateTable = () => {
        editcontext.setCreateTable(true);
        editcontext.setAddTable(false);
        editcontext.setEditHeightWidth(false);
        editcontext.setEditPosition(false);
    }
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
        if(userId){
        axios
          .get(`${backend_url}/user/tablename/${userId}`)
          .then((response) => {
            const newComponents = response.data;
            const currentComponents = context.components;
      
            if (JSON.stringify(newComponents) !== JSON.stringify(currentComponents)) {
              context.setComponents(newComponents);
            }
          })
          .catch((error) => {
            console.error("Error fetching the data: ", error);
          });
        }
    }, [editcontext.addTable]);
      


    const handleSelectComponent = (component: ComponentType) => {
        compareLocalStorageData(component)
    }
      
    return (
        <div className="container">
            <div className="tabs">
                <SideBar />
            </div>
            <div className="edit-info" style={{ overflow: 'hidden'}}>
                <UpHeader />
                <div className="body-field">
                    <div className="editheader">
                        <div className="names">
                            <a onClick={() => handleHeightwidth()} className={editcontext.editHeightWidth ? "selected" : ""} >Height and Width</a>
                            <a onClick={() => handlePosition()} className={editcontext.editPosition ? "selected" : ""}>Positions</a>
                            <a onClick={() => handleAddTable()} className={editcontext.addTable ? "selected" : ""}>Add Tables</a>
                            <a onClick={() => handleCreateTable()} className={editcontext.createTable ? "selected" : ""}>Create Table</a>
                        </div>
                        <button onClick={() => handlesave()}>Save</button>
                    </div>
                    <div className="editbody">
                        {
                            editcontext.addTable && (
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
                            )
                        }
                            {
                            editcontext.createTable ? (
                                <div className="createtable">
                                    <CreateTable/>
                                </div>
                            ) : (
                                <Selecttheme />
                            )
                            }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPage;
