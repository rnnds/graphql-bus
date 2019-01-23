#!/bin/bash
PORT=8095 node index.js & \
PORT=8096 node api/index.js & \
PORT=8097 node api/index.js