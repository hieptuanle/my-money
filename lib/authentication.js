import { getSession } from "next-auth/client";

const requireAuthentication = (func) => {
  return async function (req, res) {
    const session = await getSession({ req });
    if (session) {
      return func(req, res);
    } else {
      res.status(401).send({ message: "Forbidden" });
    }
  };
};

export default requireAuthentication;
