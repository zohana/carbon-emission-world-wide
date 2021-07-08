import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root_title: {
    marginTop: 50,
    marginBottom: 40,
  },
});

const Title = ({ title, yearSelected, variant, component }) => {
  const classes = useStyles();
  return (
    <Typography
      variant={variant}
      component={component}
      className={classes.root_title}
    >
      {title} {yearSelected}
    </Typography>
  );
};

export default Title;
