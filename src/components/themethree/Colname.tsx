interface ColnameProps {
    displacolname: boolean;
    col_name: string | string[];
    flex_value: number | number[]; // Could be a single number or an array
  }
  
  const Colname: React.FC<ColnameProps> = ({ displacolname, col_name, flex_value }) => {
    const colNamesArray = Array.isArray(col_name) ? col_name : [col_name];

    const getFlexValue = (index: number) => {
      if (Array.isArray(flex_value)) {
        return flex_value[index] || 1; // Default to 1 if index exceeds array length
      }
      return flex_value; // If it's a single number, use it for all items
    };

    return (
      <div className="colname">
        {displacolname ? (
          colNamesArray.map((name, index) => (
            <div 
              key={index} 
              className={`colname-item ${name} left-align`} 
              style={{ flex: `${getFlexValue(index)}` }} // Get the appropriate flex value
            >
              {name.charAt(0).toUpperCase() + name.slice(1)} {/* Capitalize first letter */}
            </div>
          ))
        ) : null}
      </div>
    );
  };
  
  export default Colname;
  