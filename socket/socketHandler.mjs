// socket/socketHandler.mjs

export const socketHandler = (io) => {
  
  io.on("connection", (socket) => {
    console.log("⚡ Client Connected:", socket.id);

    // ---------------------------
    // 1️⃣ Welcome event
    // ---------------------------
    socket.emit("welcome", {
      message: "Welcome to the Socket Server!",
      id: socket.id,
    });

    // ---------------------------
    // 2️⃣ Listen for messages from a client
    // ---------------------------
    socket.on("msg", (data) => {
      console.log("📩 Received:", data);

      // Broadcast to all clients
      io.emit("msg", data);
    });

    // ---------------------------
    // 3️⃣ Join Room
    // ---------------------------
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`🚪 User ${socket.id} joined room: ${room}`);

      socket.emit("roomJoined", {
        room,
        message: `Joined room ${room}`,
      });
    });

    // ---------------------------
    // 4️⃣ Send message to specific room
    // ---------------------------
    socket.on("roomMessage", ({ room, message }) => {
      io.to(room).emit("roomMessage", {
        id: socket.id,
        room,
        message,
      });

      console.log(`📤 Room: ${room} | Message: ${message}`);
    });

    // ---------------------------
    // 5️⃣ Disconnect event
    // ---------------------------
    socket.on("disconnect", () => {
      console.log("❌ Client Disconnected:", socket.id);
    });
  });
};
