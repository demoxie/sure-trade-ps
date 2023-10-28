#!/bin/bash

if sudo lsof -ti:7006; then
  yarn build
  sudo pm2 restart payment-service --watch && sudo pm2 restart payment-service --watch
else
  yarn build
  sudo pm2 start process.yml
fi