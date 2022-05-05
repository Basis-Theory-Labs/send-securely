#!/bin/bash
set -e

docker-compose up -d

./scripts/serviceup.sh

yarn test:acceptance
docker-compose down -v
