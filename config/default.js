module.exports = {
  app: {
    name: "memento-proxy",
    connection: {
      host: process.env.HOST || "localhost",
      port: process.env.PORT || "8001",
    },
    s3: {
      host: process.env.HOST || "URL",
      port: process.env.PORT || "PORT",
    },
    jwt: {
      secret: "cXVlc3Rpb25tZWFud29yZGFjcm9zc3plYnJhYWRk",
    },
    aes: {
      secret: "b3JnYW5pemF0aW9uanVkZ2VnYWlud29sZm9ydGFza3F1aXQ",
    },
  },
};
