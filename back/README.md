# Backend Documentation

# 📚 Backend Documentation

## 🗂️ Index

1. [Technologies Used](#technologies-used)
2. [Main Modules](#main-modules)
3. [How It Works](#how-it-works)
4. [Getting Started](#getting-started)
5. [Project Structure](#project-structure)

## Implementation Use Cases

### 1. Simple Message Exchange

**Overview:**
The Simple Message Exchange module enables asynchronous communication between users or services using Kafka topics. It is designed with Domain-Driven Design principles and separates concerns into application, domain, and infrastructure layers. The sender issues commands, which trigger domain events and are handled by event handlers for side effects such as notifications, persistence, and message delivery.

**Key Components:**

- **Application Layer:**
  - `message-exchange.application.ts`: Orchestrates message sending, event publishing, and coordinates domain logic.
  - `domain-handlers/`: Contains event handlers for:
    - Notifying recipients (`notify.event-handler.ts`)
    - Saving messages to repositories (`save-in-repo.event-handler.ts`)
    - Sending messages to recipients (`send-message-to-recipients.event-handler.ts`)
- **Domain Layer:**
  - `message-exchange.command.ts`: Defines commands for message exchange operations.
  - `message-exchange.use-case.ts`: Implements use cases for sending and processing messages.
  - `domain-event/`: Defines domain events (e.g., `message-created.domain-event.ts`).
  - `entity/`: Message aggregates and entities (`message.aggregate.ts`, `message.entity.ts`).
- **Infrastructure Layer:**
- `infra/kafka/`: Kafka integration for event bus and publisher

  - `event-bus.kafka.ts`: Kafka event bus integration.
  - `event-publisher.kafka.ts`: Publishes events to Kafka topics.
  - `init-kafka.ts`: Kafka client initialization.

- `infra/sockets/`:
  - `socket.ts`: Socket integration for real-time message delivery.

**Workflow:**

1. A sender issues a command to send a message.
2. The application layer processes the command, creates a domain event, and publishes it to Kafka.
3. Event handlers react to the domain event, performing actions such as notifying recipients, saving the message, and delivering it to Kafka consumers.
4. Kafka acts as the event bus, decoupling sender and receiver logic and enabling scalable, asynchronous messaging.

**Kafka Topic:** `messages`

### 2. Chat Message Reading

**Overview:**
Enables users/services to read chat messages from Kafka topics, supporting real-time or on-demand access to conversation data.

**Implementation:**

- Producer logic: `src/app/read-chat/application/read-chat.application.ts`
- Domain logic/use cases: `src/app/read-chat/domain/`

## Technologies Used

- ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat-square) & ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white&style=flat-square): Main backend language and runtime.
- ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=flat-square): Web framework for building APIs.
- ![KafkaJS](https://img.shields.io/badge/KafkaJS-231F20?logo=apachekafka&logoColor=white&style=flat-square): Kafka client for Node.js.
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white&style=flat-square): Database integration for message persistence.
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize&logoColor=white&style=flat-square): ORM for PostgreSQL.
- ![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socket.io&logoColor=white&style=flat-square): Real-time communication.
- ![Zod](https://img.shields.io/badge/Zod-4EAA25?logo=zod&logoColor=white&style=flat-square): TypeScript schema validation.
- ![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white&style=flat-square): Testing framework.
- ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon&logoColor=white&style=flat-square): Development tool for auto-restarting server.
- ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=flat-square) & ![Docker Compose](https://img.shields.io/badge/Docker--Compose-2496ED?logo=docker&logoColor=white&style=flat-square): Containerization and orchestration.
- ![Env](https://img.shields.io/badge/Env-4EAA25?logo=dotenv&logoColor=white&style=flat-square): Managed via `.env` files.

## Main Modules

- **message-exchange/**: Core logic for sending messages, handling events, and integrating with Kafka.
- **read-chat/**: Logic for reading chat messages and retrieving history.
- **shared/**: Common domain models, event bus, repositories, and infrastructure (JSON, Kafka, Postgres, utilities).
- **presentation/**: API controllers, middleware, routes, socket handlers, and utility documentation.
- **test/**: Unit and integration tests for backend modules.

## How It Works

- **Event-Driven Messaging**: Messages are sent and processed using Kafka as the event bus. Event handlers manage side effects (notifications, persistence, etc.).
- **Domain-Driven Design**: Separation of domain logic, application services, and infrastructure for maintainability.
- **Persistence**: Messages can be stored in JSON files or PostgreSQL, depending on the repository implementation.
- **Socket Communication**: Real-time chat features via WebSocket controllers.
- **Testing**: Jest is used for automated tests.

## Getting Started

1. **Install dependencies**:
   ```zsh
   npm install
   ```
2. **Run tests**:
   ```zsh
   npm test
   ```
3. **Start services** (with Docker Compose):
   ```zsh
   docker-compose up --build
   ```

## Project Structure

```
back/
│
├── .dockerignore
├── .env.development
├── .env.template
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── package.json
├── README.md
├── tsconfig.json
│
├── documentation/
│   └── doc.md
│
├── src/
│   ├── index.ts
│   ├── app/
│   │   ├── message-exchange/
│   │   │   ├── application/
│   │   │   │   ├── message-exchange.application.ts
│   │   │   │   └── domain-handlers/
│   │   │   │       ├── notify.event-handler.ts
│   │   │   │       ├── save-in-repo.event-handler.ts
│   │   │   │       └── send-message-to-recipients.event-handler.ts
│   │   │   ├── domain/
│   │   │   │   ├── message-exchange.command.ts
│   │   │   │   ├── message-exchange.use-case.ts
│   │   │   │   ├── domain-event/
│   │   │   │   │   └── message-created.domain-event.ts
│   │   │   │   └── entity/
│   │   │   │       ├── message.aggregate.ts
│   │   │   │       └── message.entity.ts
│   │   │   └── infra/
│   │   │       └── kafka/
│   │   │           ├── event-bus.kafka.ts
│   │   │           ├── event-publisher.kafka.ts
│   │   │           └── init-kafka.ts
│   │   ├── read-chat/
│   │   │   ├── application/
│   │   │   │   └── read-chat.application.ts
│   │   │   ├── domain/
│   │   │   │   ├── message.entity.ts
│   │   │   │   └── read-chat.use-case.ts
│   │   │   └── infra/
│   │   └── shared/
│   │       ├── domain/
│   │       │   ├── domain-event/
│   │       │   │   ├── aggregate-root.ts
│   │       │   │   ├── domain-event.ts
│   │       │   │   ├── event-bus.ts
│   │       │   │   ├── event-handler.ts
│   │       │   │   └── event-publisher.ts
│   │       │   └── repository/
│   │       │       ├── crud.repository.ts
│   │       │       └── messgae.crud-repository.ts
│   │       └── infrastructure/
│   │           ├── json/
│   │           │   └── message.crud-json.ts
│   │           ├── kafka/
│   │           │   ├── consumer.ts
│   │           │   └── producer.ts
│   │           ├── postgres/
│   │           │   ├── message.crud-postgress.ts
│   │           │   ├── message.model-postgress.ts
│   │           │   └── postgres-manager.ts
│   │           └── utils/
│   │               └── enviroment-variables.ts
│   └── presentation/
│       ├── readme.md
│       ├── controllers/
│       │   └── purpose.md
│       ├── middleware/
│       │   └── purpose.md
│       ├── routes/
│       │   ├── purpose.md
│       │   └── send.routes.ts
│       ├── sockets/
│       │   ├── chat-message.controller.ts
│       │   └── socket.ts
│       └── utils/
│           └── purpose.md
│
└── test/
	├── index.test.ts
	└── src/
		└── app/
			└── shared/
				└── infrastructure/
					└── kafka/
						└── producer.test.ts
```
