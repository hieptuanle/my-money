const requireAuthentication = (func) => {
  return async function (req, res) {
    function bypass() {
      return func(req, res);
    }

    const secret = req.body.secret;
    if (secret === process.env.BYPASS_SECRET) {
      return bypass();
    }
  };
};

export default requireAuthentication;
