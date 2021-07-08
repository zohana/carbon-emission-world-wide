import React from "react";
import { scaleQuantile } from "d3-scale";
import { Geographies, Geography } from "react-simple-maps";
import { GET_GEO_URL } from "../../services/constants";

const MapGeographies = ({ co2Data, setTooltipContent }) => {
  let toolTipContentContainer;
  const colorScale = scaleQuantile()
    .domain(co2Data.map((d) => d.co2))
    .range([
      "#d9e6f2",
      "#b3cce6",
      "#9fbfdf",
      "#79a6d2",
      "#538cc6",
      "#4080bf",
      "#336699",
      "#2d5986",
      "#204060",
    ]);

  const renderToolTipData = (geo) => {
    const { ISO_A3, NAME_LONG } = geo.properties;
    if (NAME_LONG === "Antarctica") {
      return (toolTipContentContainer = `<div>
              <h3>${NAME_LONG}</h3>
              <p>No data available for ${NAME_LONG} </p>
            </div>`);
    }
    const currentCountry = co2Data.find((s) => s.country_code === ISO_A3);
    if (currentCountry) {
      return (toolTipContentContainer = `<div>
            <h3>${NAME_LONG}</h3>
            <hr />
            <p>Year: ${currentCountry.year}</p>
            ${
              currentCountry.co2
                ? `<p>Emissions of carbon dioxide: ${currentCountry.co2} <sup>*</sup></p>`
                : ""
            }
            ${
              currentCountry.trade_co2
                ? `<p> Net CO2 emissions embedded in trade: ${currentCountry.trade_co2} <sup>*</sup></p>`
                : ""
            }
            ${
              currentCountry.cement_co2
                ? `<p> CO2 emissions from cement production: ${currentCountry.cement_co2} <sup>*</sup></p>`
                : ""
            }
            ${
              currentCountry.coal_co2
                ? `<p> CO2 emissions from coal production: ${currentCountry.coal_co2} <sup>*</sup></p>`
                : ""
            }
            ${
              currentCountry.flaring_co2
                ? `<p>
                  CO2 emissions from flaring gas production:
                  ${currentCountry.flaring_co2} <sup>*</sup>
                </p> `
                : ""
            }
            ${
              currentCountry.gas_co2
                ? `<p> CO2 emissions from gas production: ${currentCountry.gas_co2} <sup>*</sup>
                </p>`
                : ""
            }
            ${
              currentCountry.oil_co2
                ? `<p>
                  CO2 emissions from oil production:
                  ${currentCountry.oil_co2} <sup>*</sup>
                </p>`
                : ""
            }
            ${
              currentCountry.other_industry_co2
                ? `<p>
                  CO2 emissions from other industrial
                  processes: ${currentCountry.other_industry_co2} <sup>*</sup>
                </p>`
                : ""
            }
            ${
              !currentCountry.co2 &&
              !currentCountry.trade_co2 &&
              !currentCountry.cement_co2 &&
              !currentCountry.coal_co2 &&
              !currentCountry.flaring_co2 &&
              !currentCountry.gas_co2 &&
              !currentCountry.oil_co2 &&
              !currentCountry.other_industry_co2
                ? `<p>No data available for ${NAME_LONG}.</p>`
                : `<p><small>* data is measured in million tonnes per year.</small></p>`
            }
          </div>`);
    } else {
      return (toolTipContentContainer = `<div>
        <h3>${NAME_LONG}</h3>
        <p>No data available for ${NAME_LONG}</div></p>`);
    }
  };

  const handleMouseEnter = (geo) => {
    renderToolTipData(geo);
    setTooltipContent(toolTipContentContainer);
  };

  return (
    <Geographies geography={GET_GEO_URL}>
      {({ geographies }) =>
        geographies.map((geo) => {
          const { ISO_A3 } = geo.properties;
          const cur = co2Data.find((s) => s.country_code === ISO_A3);
          return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={() => {
                handleMouseEnter(geo);
              }}
              onMouseLeave={() => {
                setTooltipContent("");
              }}
              style={{
                default: {
                  fill: cur ? colorScale(cur.co2) : "#EEE",
                  outline: "none",
                },
                hover: {
                  fill: "#d279a6",
                  outline: "none",
                },
                pressed: {
                  fill: "#2d5986",
                  outline: "red",
                },
              }}
            />
          );
        })
      }
    </Geographies>
  );
};

export default MapGeographies;
