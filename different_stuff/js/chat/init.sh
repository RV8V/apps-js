#!/bin/bash
echo "Start running..."

ROOTPATH="/root/chat"
BASE_IMAGE="chat"
REGISTERY="ruslan"
TAG="latest"
TOKEN=""
IMAGE="$REGISTERY/$BASE_IMAGE:$TAG"
NAME="$BASE_IMAGE-$TAG"

cd "$ROOTPATH"
git pull
docker rm -f "$NAME"
docker build -f Dockerfile --tag "$IMAGE"
docker run -d --name "$NAME" -p 3000:3000 "$IMAGE"

echo "Finish"