const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 3000 });

server.on("connection", (socket) => {
  console.log("یک کاربر متصل شد");

  socket.on("message", (message) => {
    console.log("پیام دریافت شد:", message);

    // ارسال پیام به تمام کاربران دیگر (به‌جز ارسال‌کننده)
    server.clients.forEach(client => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on("close", () => {
    console.log("یک کاربر قطع شد");
  });
});

console.log("Signaling server is running on ws://localhost:3000");
