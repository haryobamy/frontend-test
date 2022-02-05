import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, Button } from "@mui/material";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Header = (props) => {
  const { className, handleApplicationOpen, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Management
          </Typography>
          <Typography variant="h5">Employees's</Typography>
        </Grid>
        <Grid item>
          <Button
            style={{ marginRight: 70 }}
            color="primary"
            variant="contained"
            onClick={() => {
              handleApplicationOpen();
            }}
          >
            Add Employee
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
