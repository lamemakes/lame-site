const isMobileView = () => {
  // Returns a boolean based on screen px width
  const DESKTOP_MIN_WIDTH = 850;
  return window.innerWidth <= DESKTOP_MIN_WIDTH;
};

const viewUtils = {
  isMobileView,
};

export default viewUtils;
