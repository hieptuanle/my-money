const withErrorHandler = (func) => {
  return async function (req, res) {
    try {
      await func(req, res);
    } catch (e) {
      res.status(400);
      res.json({
        message: e.message,
        stack: e.stack,
      });
    }
  };
};

export default withErrorHandler;
