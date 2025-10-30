const dotenv = require("dotenv");
dotenv.config({ path: `.env` });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const http = require("http");
const logger = require("pino-http");
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const app = express();
// const server = http.createServer(app);

// ✅ Load Swagger file using absolute path
const swaggerPath = path.join(__dirname, "swagger.yaml");
console.log("Swagger Path:", swaggerPath);
const swaggerDocument = YAML.load(swaggerPath);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(logger());

// ✅ API routes
app.use("/api", routes);

// ✅ Error handling
app.use((req, res, next) => {
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
  // ✅ Connect to MongoDB
  mongoose
    .connect(process.env.MONGO_URI || "")
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB Error:", err));

  // ✅ For Local Development
  if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`✅ Server running locally on port ${PORT}`);
    });
  }

  // ✅ For Vercel (export the app)
  module.exports = app;
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});