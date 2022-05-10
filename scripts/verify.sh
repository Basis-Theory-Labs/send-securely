#!/bin/bash
set -e

docker-compose up -d --build

./scripts/serviceup.sh

yarn test:acceptance
