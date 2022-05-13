#!/bin/bash
set -e

if [ "$SKIP_BUILD" = true ] || [ "$SKIP_BUILD" = 1 ]
then
  docker-compose up -d
else
  docker-compose up -d --build
fi

./scripts/serviceup.sh

yarn test:acceptance
