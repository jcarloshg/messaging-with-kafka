# 🖥️✨ Front Documentation

## 📝 Overview

## 🚀 Key Features

- 💬 **Chat Functionality:** Real-time chat with message list, input forms, and user management.
- 🔄 **Message Exchange:** Handles sending and receiving messages, with domain-driven design.
- 🧩 **Socket Integration:** Uses socket services for real-time communication.
- 🌐 **API Communication:** Axios-based infrastructure for RESTful interactions.
- 🧱 **Reusable UI Components:** Modular and customizable UI elements.

## 🚦 **Implementation Use Cases**

### 1. 💬 **Simple Message Exchange**

**🧐 Overview:**

**🛠️ Frontend Implementation:**

- 🗂️ **Domain Layer:** Defines message types and validation using Zod schemas (`MessageProps`, `MessageToSend`).
- 🏗️ **Application Layer:** The `MessageExchangeApplication` class orchestrates the message exchange, validating input and executing the use case.
- 📋 **Use Case:** The `MessageExchangeUseCase` validates business rules and sends messages using a repository pattern.
- 🏢 **Infrastructure Layer:** Uses an Axios-based repository (`MessageCrudAxios`) to communicate with the backend API, which interacts with Kafka topics.

**🔁 Flow:**

1. 📨 **Sender:** Publishes a message to a Kafka topic (e.g., `messages`) via the frontend form, which is validated and sent through the application/use case layers.
2. 📥 **Receiver:** Subscribes to the topic and receives messages in real time or on demand, updating the UI accordingly.

---

### 2. 📖 **Chat Message Reading**

**🧐 Overview:**

**🛠️ Frontend Implementation:**

- 🗂️ **Domain Layer:** Defines the `Message` type for chat messages.
- 🏗️ **Application Layer:** The `ReadChatApplication` class orchestrates reading chat messages, executing the use case and handling responses.
- 📋 **Use Case:** The `ReadChatUseCase` retrieves messages from the repository and maps them to domain objects.
- 🏢 **Infrastructure Layer:** Uses an Axios-based repository to fetch messages from the backend, and a socket service (`SocketService`, `useSocket` hook) for real-time message updates.

**🔁 Flow:**

1. 📝 **Chat Producer:** Publishes chat messages to a Kafka topic (e.g., `chat-messages`).
2. 👀 **Chat Consumer:** The frontend subscribes to the topic via sockets and/or API, reading incoming chat messages and displaying them to users in real time or on demand.

## 🛠️ **Technologies Used**

- ⚛️ **React**: UI library for building interactive user interfaces.
- 🟦 **TypeScript**: Strongly typed language for scalable development.
- 🟩 **Node.js**: JavaScript runtime for building scalable server-side applications.
- 🟪 **Vite**: Fast frontend build tool for modern web projects.
- 🎨 **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- 🦄 **KafkaJS**: Apache Kafka client for Node.js, used for messaging and event streaming.
- 🟣 **Socket.IO**: Real-time bidirectional event-based communication.
- 🌐 **Axios**: Promise-based HTTP client for API communication.
- 🧬 **Zod**: TypeScript-first schema validation library.
- 🧱 **Radix UI**: Primitives for building accessible design systems.
- 🧪 **Jest**: Testing framework for unit and integration tests.
- 📦 **Lucide React**: Icon library for React applications.
- 📦 **Class Variance Authority**: Utility for managing class variance in React components.
- 📦 **Yup**: JavaScript schema builder for value parsing and validation.

## 🖼️ Screenshots

![alt text](./doc/image.png)
![alt text](doc/image_01.png)
