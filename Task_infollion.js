function generateRandomIP() {
  return Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 256)
  ).join(".");
}

let servers = ["Node-A", "Node-B", "Node-C"];

const requestHistory = [];
let hashCircle = [];

function computeHash(input) {
  let result = 7;
  for (let i = 0; i < input.length; i++) {
    result = result * 31 + input.charCodeAt(i);
  }
  return Math.abs(result);
}

function initializeCircle() {
  hashCircle = servers
    .map(s => ({ point: computeHash(s), name: s }))
    .sort((a, b) => a.point - b.point);
}

function resolveServer(ip) {
  const ipPoint = computeHash(ip);

  for (let i = 0; i < hashCircle.length; i++) {
    if (ipPoint <= hashCircle[i].point) {
      return hashCircle[i].name;
    }
  }
  return hashCircle[0].name;
}

function identifyNode(ip, node) {
  console.log(`Incoming IP: ${ip} → Routed to: ${node}`);
}

function LoadBalancer(ip) {
  const target = resolveServer(ip);

  requestHistory.push({
    ip,
    server: target,
    timestamp: Date.now()
  });

  identifyNode(ip, target);
  return target;
}

function simulateTraffic(count = 5) {
  for (let i = 0; i < count; i++) {
    LoadBalancer(generateRandomIP());
  }
}

initializeCircle();
simulateTraffic(10);
console.table(requestHistory);
