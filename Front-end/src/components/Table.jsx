import React from "react";

const Table = ({beach, water, city}) => {
  return (
    <>
    <tr>
      <td>{beach}</td>
      <td>{city}</td>
      <td>{water}</td>
    </tr>
    </>
  );
};

export default Table;
