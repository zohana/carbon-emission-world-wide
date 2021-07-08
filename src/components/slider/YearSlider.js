import React from "react";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  slider: {
    marginTop: 20,
  },
});

const YearSlider = ({ value, onSliderChange, min, max }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography gutterBottom align="left">
        Please select year to view the co2 emission of each country for that
        year.
      </Typography>
      <br />
      <Typography gutterBottom align="left">
        Year selected: {value}
      </Typography>
      <br />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Slider
            track={false}
            marks
            className={classes.slider}
            value={value}
            onChange={onSliderChange}
            aria-labelledby="input-slider"
            min={min}
            max={max}
            valueLabelDisplay="on"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default YearSlider;
