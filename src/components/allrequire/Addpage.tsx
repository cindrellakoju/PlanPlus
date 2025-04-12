import React, { useState } from "react";
import "../../styles/AddPage.css";
import { useLocation } from "react-router-dom";

interface AddPageProps {
  table_name: string;
  colname: string[];
}

const AddPage: React.FC = () => {
  const location = useLocation();
  const { table_name, colname }: AddPageProps = location.state || {};
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  // Update form data state when input fields change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="formpage">
        <p>Table Name: {table_name}</p>
        {colname && colname.length > 0 ? (
          <form>
            {colname.map((column, index) => (
              <div key={index} className="field">
                <label htmlFor={column}>{column}</label>
                <input
                  type="text"
                  id={column}
                  name={column}
                  value={formData[column] || ""}
                  onChange={handleInputChange}
                  placeholder={`Enter value for ${column}`}
                />
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        ) : (
          <p>No columns available</p>
        )}
      </div>
    </div>
  );
};

export default AddPage;
