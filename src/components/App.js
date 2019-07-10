import React from "react";
import Grid from "@material-ui/core/Grid";
import SearchResults from "./SearchResults";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Axios from "axios";
import Typography from "@material-ui/core/Typography";

const apiKey = "cf01c29cdf0f4fd49dfd1c420c296be8";

const styles = theme => ({
  root: {
    flexGrow: 1,
    fontFamily: "'Roboto', sans-serif",
    padding: 30
  },
  footer: {
    marginTop: 40
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    this.onClick = this.onClick.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
  }
  async makeRequest(urls) {
    let rawData = {};
    const countries = ["canada", "brazil", "global", "usa", "mexico"];

    for (const index of urls.keys()) {
      rawData[countries[index]] = [];
      let response = await Axios.get(urls[index])
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(function() {
          // nothing
        });

      rawData[countries[index]].push(
        response.data.articles.slice(0, 3).map(e => ({
          title: e.title,
          author: e.author,
          content: e.content,
          imageUrl: e.urlToImage
        }))
      );
    }
    this.setState({ data: rawData });
  }
  onClick() {
    const query = document.getElementById("q").value;
    if (query) {
      const urls = [
        `https://newsapi.org/v2/top-headlines?q=${query}&country=ca&apiKey=${apiKey}`,
        `https://newsapi.org/v2/top-headlines?q=${query}&country=br&apiKey=${apiKey}`,
        `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${apiKey}`,
        `https://newsapi.org/v2/top-headlines?q=${query}&country=us&apiKey=${apiKey}`,
        `https://newsapi.org/v2/top-headlines?q=${query}&country=mx&apiKey=${apiKey}`
      ];
      // I decided to make all the requests I'll need at one go (after clicking the search button with a query in the text input field).
      // I think this saves me some api calls in the long run (i.e. I think on avarage people will switch tabs often enough to justify this).
      this.makeRequest(urls);
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Container fixed className={classes.root}>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={8}>
            <TextField
              fullWidth={true}
              id="q"
              label="Search Query"
              margin="dense"
            />
          </Grid>
          <Grid item>
            <IconButton
              className={classes.button}
              color="primary"
              onClick={this.onClick}
            >
              <SearchIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <SearchResults data={this.state.data} />
          </Grid>
          <Grid item>
            <Typography
              className={classes.footer}
              gutterBottom
              variant="caption"
              component="p"
              display="block"
              color="textSecondary"
            >
              Powered by News API and Material-UI.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(App);
