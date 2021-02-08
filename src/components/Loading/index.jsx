import { CircularProgress, makeStyles } from "@material-ui/core";

const displayName = "Loading";

const useStyles = makeStyles(
  {
    loading: {
      alignItems: "center",
      display: "flex",
      flex: 1,
      height: "100%",
      justifyContent: "center",
      width: "100%",
    },
  },
  { name: displayName }
);

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  );
};

Loading.displayName = displayName;

export default Loading;
