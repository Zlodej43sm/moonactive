export default (theme) => ({
  wrapper: {
    minWidth: theme.customStyles.contentMinWidth,
    maxWidth: theme.customStyles.contentWidth,
    padding: theme.spacing(5),
    margin: "0 auto"
  },
  buttonsRegion: {
    marginBottom: theme.spacing(5)
  }
});
