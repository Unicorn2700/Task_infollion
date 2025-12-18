# Load Balancer Implementation

This repository contains a simple load balancer implemented in JavaScript.
The main idea is to route incoming requests based on IP address instead of
random selection.

A consistent hashing approach is used so that the same IP is routed to the
same server node. This helps avoid unnecessary redistribution when nodes
are added or removed.

## What this does
- Routes requests deterministically using IP address
- Ensures the same IP always reaches the same node
- Handles node changes with minimal impact
- Logs each request for visibility

## Approach
Each server node and incoming IP is converted into a hash value and placed
on a logical ring. An IP is mapped to the nearest available node on this ring.
This keeps routing stable even if the number of nodes changes.

## How to run
Make sure Node.js is installed.

```bash
node index.js
