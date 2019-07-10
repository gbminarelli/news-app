import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    marginBottom: "20px",
    marginTop: "20px"
  },
  media: {
    width: 250,
    flex: "none"
  },
  content: {
    flex: "auto"
  }
}));

function Article(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={props.imageUrl}
        title={`Image from the article titled: ${props.title}`}
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h4" component="h2">
          {props.title}
        </Typography>
        <Typography
          gutterBottom
          variant="overline"
          color="primary"
          component="h3"
        >
          {props.author}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Article;
