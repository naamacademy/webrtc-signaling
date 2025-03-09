const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 3000 });

server.on("connection", (socket, req) => {
  const clientIP = req.socket.remoteAddress; // گرفتن IP کاربر متصل‌شده
  console.log(`یک کاربر از ${clientIP} متصل شد`);

  socket.on("message", (message) => {
    const textMessage = message.toString(); // تبدیل بافر به متن
    console.log(`پیام دریافت شد: ${textMessage}`);

    // ارسال پیام به تمام کاربران دیگر (به‌جز ارسال‌کننده)
    server.clients.forEach(client => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(textMessage);
      }
    });
  });

  socket.on("close", () => {
    console.log(`یک کاربر از ${clientIP} قطع شد`);
  });
});

console.log("✅ Signaling server is running on ws://0.0.0.0:3000");
