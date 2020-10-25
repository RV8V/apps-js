#!/bin/bash
echo "Start running..."

docker run -d \
  --restart unless-stopped \
  --name some-redis \
  -v $PWD/redis-data:/var/lib/redis \
  -v $PWD/redis.conf:/usr/local/etc/redis/redis.conf \
  -p 6379:6379 redis &&
docker run -d \
  --restart unless-stopped \
  --name some-mongo \
  -v $PWD/mongo-volume:/data/db \
  -p 27017:27017 mongo:latest

echo "Finish"
