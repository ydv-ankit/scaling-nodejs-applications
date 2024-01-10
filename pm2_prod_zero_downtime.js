const http = require("http");

const options = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "http://localhost:3004",
  "http://localhost:3005",
];

const server = http.createServer((req, res) => {
  const randomIndex = Math.floor(Math.random() * options.length);
  const advice = options[randomIndex];
  const payload = JSON.stringify({ processID: process.pid, advice });
  console.log(`advice from ${process.pid}: ${advice}`);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(payload);
});

server.listen(3000, () => {
  console.log("Server is running...");
});
