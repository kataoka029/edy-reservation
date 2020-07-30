const config = {};

config.url =
  process.env.NODE_ENV === "production"
    ? "https://edy-bot.herokuapp.com/"
    : "http://localhost:4000/";

export default config;
