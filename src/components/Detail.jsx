import React from "react";

const Detail = ({ match }) => {
  return <div>Detail: {match.params.id}</div>;
};
export default Detail;
