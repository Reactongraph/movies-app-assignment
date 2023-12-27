import React from "react";

const DisplayImage = ({ base64String }) => {
  return <img src={`data:image/jpeg;base64,${base64String}`} alt="Uploaded" />;
};

export default DisplayImage;
