import http from "http";
import { Server } from "socket.io";
import app from "./app.mjs";
import { PORT } from "./config/env.mjs";
import { mongoConnection } from "./config/db.mjs";
import { socketHandler } from "./socket/socketHandler.mjs";
import { startGlobalCounter } from "./socket/counter.mjs";

async function startServer() {

  // Create HTTP server
  const server = http.createServer(app);

  // Create socket.io instance with sub-URL "/socket"
  const io = new Server(server, {
    path: "/socket",
  //   cors: {
  //   origin: "*",
  //   methods: ["GET", "POST"],
  //   allowedHeaders: ["Content-Type"],
  // }

  });

  // Attach socket handlers
  socketHandler(io);
  startGlobalCounter(io);

  // Start server
  server.listen(PORT, async () => {
    await mongoConnection();
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔌 Socket.io at ws://localhost:${PORT}/socket`);
  });

  return { server, io };
}

startServer();
