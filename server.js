const WebSocket = require("ws");

// تغییر از localhost به 0.0.0.0 تا سرور روی همه IP‌ها گوش کند
const server = new WebSocket.Server({ port: 3000, host: "0.0.0.0" });

server.on("connection", (socket, req) => {
  const clientIP = req.socket.remoteAddress;
  console.log(`یک کاربر از ${clientIP} متصل شد`);

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
    console.log(`کاربر ${clientIP} قطع شد`);
  });
});

console.log("Signaling server is running on ws://0.0.0.0:3000");
