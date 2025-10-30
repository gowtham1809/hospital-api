const dotenv = require("dotenv");
dotenv.config({ path: `.env` });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const logger = require("pino-http");
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const app = express();
const server = http.createServer(app);
const swaggerPath = path.join(__dirname, "swagger.yaml");
const swaggerDocument = YAML.load(swaggerPath);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.json());
app.use(logger());

app.use("/api", routes);

app.use(function (req, res, next) {
  next({
    status: 404,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Internal Server Error",
  });
});

async function startServer() {
  mongoose
    .connect(process.env.MONGO_URI || "")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.error(err));

  server.listen(process.env.PORT || 5001, () =>
    console.log(
      `✅ Server running on Port ${process.env.PORT || 5001}`
    )
  );
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
