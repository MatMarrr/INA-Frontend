import React from "react";

export const Table = ({ header, data }) => {
  return (
    <table className="margin_top_small">
      <thead>
        <tr>
          {header.map((element, index) => (
            <th key={index}>{element}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((elements, rowIndex) => (
          <tr key={rowIndex}>
            {elements.map((element, colIndex) => (
              <td key={colIndex}>{element}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
