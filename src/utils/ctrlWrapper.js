const ctrlWrapper = (ctrl) => {
  return (req, res, next) => {
    Promise.resolve(ctrl(req, res, next)).catch(next);
  };
};

export default ctrlWrapper;
