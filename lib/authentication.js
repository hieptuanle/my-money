import { getSession } from "next-auth/client";

const requireAuthentication = (func) => {
  return async function (req, res) {
    function bypass() {
      return func(req, res);
    }

    const secret = req.body.secret;
    if (secret === process.env.BYPASS_SECRET) {
      return bypass();
    }

    const session = await getSession({ req });
    if (session) {
      return bypass();
    } else {
      res.status(401).send({ message: "Forbidden" });
    }
  };
};

export default requireAuthentication;
