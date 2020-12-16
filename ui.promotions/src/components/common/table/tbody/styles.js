export default (theme) => ({
  rowRoot: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.selected
    },
    cursor: "pointer"
  }
});
