import React, { useState } from "react";
// components
import ReactTooltip from "react-tooltip";
import MapChart from "../components/map/MapChart";

const CarbonEmission = () => {
  const [content, setContent] = useState("");
  return (
    <div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip html={true} style={{ opacity: 1 }}>
        {content}
      </ReactTooltip>
    </div>
  );
};

export default CarbonEmission;
