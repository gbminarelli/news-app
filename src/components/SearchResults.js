import React from "react";
import Article from "./Article";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

let TabContainer = ({ children }) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
};

let formatData = (rawData = []) =>
  rawData.map((e, i) => (
    <Article
      key={i}
      author={e.author}
      title={e.title}
      imageUrl={e.imageUrl}
      content={e.content}
    />
  ));

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function SearchResults(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  let formatedData = {
    canada: formatData(
      props.data && props.data.canada ? props.data.canada[0] : []
    ),
    brazil: formatData(
      props.data && props.data.brazil ? props.data.brazil[0] : []
    ),
    global: formatData(
      props.data && props.data.global ? props.data.global[0] : []
    ),
    usa: formatData(props.data && props.data.usa ? props.data.usa[0] : []),
    mexico: formatData(
      props.data && props.data.mexico ? props.data.mexico[0] : []
    )
  };

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div key={props.data} className={classes.root} id="resultsComponent">
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          {/* I'm changing the default values for each tab so I can control the initial focus (in this case, the middle one). */}
          <Tab value={1} label="CANADA" />
          <Tab value={2} label="BRAZIL" />
          <Tab value={0} label="SEARCH RESULTS" />
          <Tab value={3} label="USA" />
          <Tab value={4} label="MEXICO" />
        </Tabs>
      </AppBar>
      {value === 1 && formatedData.canada}
      {value === 2 && formatedData.brazil}
      {value === 0 && formatedData.global}
      {value === 3 && formatedData.usa}
      {value === 4 && formatedData.mexico}
    </div>
  );
}

export default SearchResults;
