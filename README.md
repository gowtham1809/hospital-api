# Hospital API

A Node.js RESTful API for managing hospitals, doctors, patients, and appointments. Built with Express, featuring modular controllers, models, and routes. Includes Swagger documentation for easy API exploration.

## Features

- CRUD operations for hospitals, doctors, patients, and appointments
- Organized MVC structure
- Swagger API documentation (`swagger.yaml`)
- Environment configuration via `.env`

## Folder Structure

```
hospital-api/
├── controllers/      # Request handlers for each entity
├── models/           # Mongoose models for data schema
├── routes/           # Express routes for API endpoints
├── .env              # Environment variables
├── .gitignore        # Git ignore file
├── index.js          # API entry point
├── package.json      # Project metadata and dependencies
├── swagger.yaml      # Swagger/OpenAPI documentation
└── README.md         # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB (local or cloud)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd hospital-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables in `.env` (e.g., MongoDB URI, port).

4. Start the server:
   ```
   npm start
   ```

5. API runs at `http://localhost:<PORT>` (default: 5000).

### API Documentation

- Open `swagger.yaml` with [Swagger Editor](https://editor.swagger.io/) or use a tool like [Swagger UI](https://swagger.io/tools/swagger-ui/) to explore endpoints.


