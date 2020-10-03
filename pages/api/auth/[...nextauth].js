import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "user:email,read:user",
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // ...add more providers here
  ],

  callbacks: {
    signIn: async (user, account, profile) => {
      if (
        (account.provider === "google" &&
          profile.verified_email === true &&
          profile.email.endsWith("hieptuanle@gmail.com")) ||
        (account.provider === "github" && profile.login === "hieptuanle")
      ) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    },
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_URI,
};

export default (req, res) => NextAuth(req, res, options);
