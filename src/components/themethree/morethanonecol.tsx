import React from 'react';

// MoreThanOneColProps interface for the props
interface MoreThanOneColProps {
  data: Record<string, any>[]; // Generic data structure: array of objects with string keys and any type of values
  addcheckbox: boolean;
  displacolname: boolean;
  col_name: string | string[]; // Column names
  table: boolean;
  bgforhead: boolean;
}

const MoreThanOneCol: React.FC<MoreThanOneColProps> = ({
  data,
  addcheckbox,
  displacolname,
  col_name,
  table,
  bgforhead,
}) => {
  const colNamesArray = Array.isArray(col_name) ? col_name : [col_name];

  return (
    <>
      <div className="tables">
        <table>
          <thead>
            <tr>
              {displacolname && (
                <th
                  style={{
                    border: table ? '1px solid black' : 'none',
                    backgroundColor: bgforhead ? '#9ec4a8' : 'transparent',
                  }}
                ></th>
              )}
              {colNamesArray.map((name, index) => (
                <th
                  key={index}
                  style={{
                    border: table ? '1px solid black' : 'none',
                    backgroundColor: bgforhead ? '#9ec4a8' : 'transparent',
                  }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)} {/* Capitalize first letter */}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {addcheckbox && (
                  <td style={{ border: table ? '1px solid black' : 'none' }}>
                    <input type="checkbox" />
                  </td>
                )}
                {colNamesArray.map((colName, idx) => {
                  return (
                    <td key={idx} style={{ border: table ? '1px solid black' : 'none' }}>
                      {item[colName]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MoreThanOneCol;
