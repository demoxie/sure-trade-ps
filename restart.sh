#!/bin/bash

if sudo lsof -ti:7006; then
  sudo pm2 restart payment-service --watch && sudo pm2 restart payment-service --watch
else
  sudo pm2 start process.yml
fi