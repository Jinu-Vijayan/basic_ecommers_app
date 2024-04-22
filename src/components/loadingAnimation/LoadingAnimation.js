import React, { useState } from 'react'
import BeatLoader from "react-spinners/BeatLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    position: "absolute",
    top: "10%",
    // backgroundColor: "black"
  };

const LoadingAnimation = ({loading}) => {

    // const [color, setColor] = useState("#36d7b7");

  return (
    <BeatLoader
        color="#36d7b7"
        loading={loading}
        cssOverride={override}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier = "1"
    />
  )
}

export default LoadingAnimation