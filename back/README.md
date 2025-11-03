# 📚 **Backend Documentation**

## 🗂️ **Index**

1. 🚦 [Implementation Use Cases](#implementation-use-cases)

- 💬 [Simple Message Exchange](#1-simple-message-exchange)
- 📖 [Chat Message Reading](#2-chat-message-reading)

2. 🛠️ [Technologies Used](#technologies-used)
3. 📦 [Main Modules](#main-modules)
4. ⚙️ [How It Works](#how-it-works)
5. 🚀 [Getting Started](#getting-started)
6. 🌐 [Enable Endpoints](#enable-endpoints)

- 🛣️ [REST API Endpoints](#rest-api-endpoints)
- 🔌 [Socket.IO Events](#socketio-events)

## 🚦 **Implementation Use Cases**

### 1. 💬 **Simple Message Exchange**

**📝 Overview:**
The Simple Message Exchange module enables asynchronous communication between users or services using Kafka topics. It is designed with Domain-Driven Design principles and separates concerns into application, domain, and infrastructure layers. The sender issues commands, which trigger domain events and are handled by event handlers for side effects such as notifications, persistence, and message delivery.

**🔑 Key Components:**

---

**🧩 Application Layer:**

- 🗂️ `message-exchange.application.ts`: Orchestrates message sending, event publishing, and coordinates domain logic.
- 🛎️ `domain-handlers/`: Contains event handlers for: - 🔔 Notifying recipients (`notify.event-handler.ts`) - 💾 Saving messages to repositories (`save-in-repo.event-handler.ts`) - 📤 Sending messages to recipients (`send-message-to-recipients.event-handler.ts`)
  **🧠 Domain Layer:**
- 📝 `message-exchange.command.ts`: Defines commands for message exchange operations.
- 🏗️ `message-exchange.use-case.ts`: Implements use cases for sending and processing messages.
- 🎯 `domain-event/`: Defines domain events (e.g., `message-created.domain-event.ts`).
- 🏷️ `entity/`: Message aggregates and entities (`message.aggregate.ts`, `message.entity.ts`).
  **🛠️ Infrastructure Layer:**
- 🦄 `infra/kafka/`: Kafka integration for event bus and publisher
  - 🚌 `event-bus.kafka.ts`: Kafka event bus integration.
  - 📢 `event-publisher.kafka.ts`: Publishes events to Kafka topics.
  - 🏁 `init-kafka.ts`: Kafka client initialization.
- ⚡ `infra/sockets/`:
  - 🔌 `socket.ts`: Socket integration for real-time message delivery.

**🔄 Workflow:**

1. 📨 A sender issues a command to send a message (`message-exchange.command.ts`).
2. 🏢 The application layer (`message-exchange.application.ts`) receives the command, validates it, and invokes the domain use case (`message-exchange.use-case.ts`).
3. 🏗️ The use case creates a message aggregate/entity (`message.aggregate.ts`, `message.entity.ts`) and triggers a domain event (`message-created.domain-event.ts`).
4. 🚀 The domain event is published to the event bus using Kafka (`event-bus.kafka.ts`, `event-publisher.kafka.ts`), initialized via `init-kafka.ts`.
5. 🛎️ Event handlers in `domain-handlers/` respond to the domain event:

- 🔔 `notify.event-handler.ts`: Notifies recipients (e.g., via sockets or other means).
- 💾 `save-in-repo.event-handler.ts`: Persists the message to a repository (could be JSON, PostgreSQL, etc.).
- 📤 `send-message-to-recipients.event-handler.ts`: Delivers the message to intended recipients, possibly using sockets (`infra/sockets/socket.ts`).

6. 🛠️ The infrastructure layer manages integration with Kafka and sockets for real-time and asynchronous delivery.
7. 📦 The message is stored and/or delivered, and notifications are sent as needed.

**🗃️ Kafka Topic:** `messages` 📨

### 2. 📖 **Chat Message Reading**

**📝 Overview:**
The Chat Message Reading module enables users or services to retrieve chat messages from the database, supporting access to historical conversation data. It is structured using Domain-Driven Design principles and separates responsibilities into application, domain, and infrastructure layers.

**🔑 Key Components:**

---

**🧩 Application Layer:**

- 🗂️ `read-chat.application.ts`: Orchestrates reading chat messages from the database and coordinates domain logic for message retrieval.
- 🛎️ `domain-handlers/`: (If present) Event handlers for processing read events or side effects.
  **🧠 Domain Layer:**
- 🏷️ `message.entity.ts`: Defines the message entity structure for chat messages.
- 🏗️ `read-chat.use-case.ts`: Implements use cases for reading chat messages, including filtering, pagination, or transformation logic.
  **🛠️ Infrastructure Layer:**
- 🗄️ (If present) Integration points for repositories or other storage mechanisms.

**🔄 Workflow:**

1. 🧑‍💻 A consumer (user/service) requests to read chat messages.
2. 🏢 The application layer (`read-chat.application.ts`) receives the request and invokes the domain use case (`read-chat.use-case.ts`).
3. 🏗️ The use case interacts with the message entity (`message.entity.ts`) and retrieves messages from the database.
4. 📜 Messages are returned to the consumer, supporting historical queries as needed.

## 🛠️ **Technologies Used**

---

🟩 ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat-square) & ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white&style=flat-square): Main backend language and runtime.
🖤 ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=flat-square): Web framework for building APIs.
🟫 ![KafkaJS](https://img.shields.io/badge/KafkaJS-231F20?logo=apachekafka&logoColor=white&style=flat-square): Kafka client for Node.js.
🔵 ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white&style=flat-square): Database integration for message persistence.
🔷 ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize&logoColor=white&style=flat-square): ORM for PostgreSQL.
⚫ ![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socket.io&logoColor=white&style=flat-square): Real-time communication.
🟢 ![Zod](https://img.shields.io/badge/Zod-4EAA25?logo=zod&logoColor=white&style=flat-square): TypeScript schema validation.
🟥 ![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white&style=flat-square): Testing framework.
🟩 ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon&logoColor=white&style=flat-square): Development tool for auto-restarting server.
🐳 ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=flat-square) & ![Docker Compose](https://img.shields.io/badge/Docker--Compose-2496ED?logo=docker&logoColor=white&style=flat-square): Containerization and orchestration.
🌱 ![Env](https://img.shields.io/badge/Env-4EAA25?logo=dotenv&logoColor=white&style=flat-square): Managed via `.env` files.

### 📦 **Main Modules**

---

💬 **message-exchange/**: Core logic for sending messages, handling events, and integrating with Kafka.
📖 **read-chat/**: Logic for reading chat messages and retrieving history.
🧩 **shared/**: Common domain models, event bus, repositories, and infrastructure (JSON, Kafka, Postgres, utilities).
🎤 **presentation/**: API controllers, middleware, routes, socket handlers, and utility documentation.
🧪 **test/**: Unit and integration tests for backend modules.

### ⚙️ **How It Works**

---

📨 **Event-Driven Messaging**: Messages are sent and processed using Kafka as the event bus. Event handlers manage side effects (notifications, persistence, etc.).
🧠 **Domain-Driven Design**: Separation of domain logic, application services, and infrastructure for maintainability.
💾 **Persistence**: Messages can be stored in JSON files or PostgreSQL, depending on the repository implementation.
🔌 **Socket Communication**: Real-time chat features via WebSocket controllers.
🧪 **Testing**: Jest is used for automated tests.

### 🚀 **Getting Started**

1. 📦 **Install dependencies**:

```zsh
📦 npm install
```

2. 🧪 **Run tests**:

```zsh
🧪 npm test
```

3. 🐳 **Start services** (with Docker Compose):

```zsh
🐳 docker-compose up --build
```

## 🌐 **Enable Endpoints**

### 🛣️ **REST API Endpoints**

**Base Path:** `/api/messages` 🛤️

| 🛠️ Method | 🛣️ Path | 📝 Description                           |
| --------- | ------- | ---------------------------------------- |
| 🟢 GET    | /health | 🩺 Health check for the messages service |
| 🟠 POST   | /       | ✉️ Send a new message                    |
| 🟢 GET    | /       | 📖 Retrieve chat messages                |

#### 🟠 POST /api/messages

✉️ **Send a new message.**
**📦 Request Body:**

```json
{
  "senderId": "string",
  "recipients": ["string"],
  "content": "string"
}
```

**📨 Response:**

```json
{
  "success": true,
  "messageId": "string",
  ...
}
```

#### 🟢 GET /api/messages

📖 **Retrieve chat messages.**
**📨 Response:**

```json
[
  {
    "messageId": "string",
    "senderId": "string",
    "content": "string",
    "timestamp": "ISO8601"
  },
  ...
]
```

#### 🟢 GET /api/messages/health

🩺 **Health check endpoint. Returns a simple status message.**

### 🔌 **Socket.IO Events**

| ⚡ Event Name   | 📝 Description                              |
| --------------- | ------------------------------------------- |
| 💬 chat-message | 📢 Broadcasts a new chat message to clients |

**📦 Payload Example:**

```json
{
  "payload": {
    "messageId": "string",
    "senderId": "string",
    "content": "string",
    "timestamp": "ISO8601"
  }
}
```
