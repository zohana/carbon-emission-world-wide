import React, { memo, useEffect, useState } from "react";
import { ComposableMap } from "react-simple-maps";
// Material ui
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// components
import "./MapChart.css";
import Title from "../ui/title";
import YearSlider from "../slider/YearSlider";
import { getCo2EmmisionData } from "../../services/index";
import MapGeographies from "./MapGeographies";

const useStyles = makeStyles({
  root_title: {
    marginTop: 20,
  },
  root_slider: {
    width: 400,
    marginTop: 25,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "auto",
    display: "block",
    padding: 12,
  },
  root_map: {
    width: "auto",
    marginTop: 25,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "auto",
    display: "block",
  },
});

const MapChart = ({ setTooltipContent }) => {
  const classes = useStyles();

  let parsedData = [];
  let parsedDataObject;

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sliderValue, setSliderValue] = useState(1990);
  const [isLoading, setLoading] = useState(true);

  // fetch data
  const renderParsedData = (sliderValue) => {
    if (data) {
      Object.values(data).forEach((item) => {
        item.data.filter((i) => {
          if (i.year === sliderValue) {
            parsedDataObject = {
              year: i.year,
              country_code: item.iso_code,
              co2: i.co2,
              consumption_co2: i.consumption_co2,
              trade_co2: i.trade_co2,
              trade_co2_share: i.trade_co2_share,
              co2_per_capita: i.co2_per_capita,
              cement_co2: i.cement_co2,
              coal_co2: i.coal_co2,
              flaring_co2: i.flaring_co2,
              gas_co2: i.gas_co2,
              oil_co2: i.oil_co2,
              other_industry_co2: i.other_industry_co2,
            };
          }
          return parsedDataObject;
        });
        parsedData = [...parsedData, parsedDataObject];
        setFilteredData(parsedData);
      });
      return filteredData;
    }
  };

  useEffect(() => {
    renderParsedData(sliderValue);
  }, [data]);

  useEffect(() => {
    getCo2EmmisionData()
      .then((resp) => {
        console.log("resp");
        setData(resp);
        setLoading(false);
      })
      .catch((err) => {
        console.log("axios err ", err);
        setData([]);
      });

    return () => {
      console.log("axios clean up");
    };
  }, []);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    renderParsedData(newValue);
  };

  return (
    <div>
      <Title
        className={classes.root_title}
        variant="h5"
        component="h2"
        title="Selected year"
        yearSelected={sliderValue}
      />

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card className={classes.root_slider}>
            <CardContent>
              <YearSlider
                value={sliderValue}
                onSliderChange={handleSliderChange}
                min={1990}
                max={2019}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card className={classes.root_map}>
            <CardContent>
              <ComposableMap
                data-tip=""
                projectionConfig={{ scale: 150 }}
                projection="geoEqualEarth"
              >
                <MapGeographies
                  co2Data={filteredData}
                  selectedYear={sliderValue}
                  setTooltipContent={setTooltipContent}
                />
              </ComposableMap>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(MapChart);
