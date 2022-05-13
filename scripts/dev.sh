#!/bin/bash
set -e

if [ "$SKIP_BUILD" = true ] || [ "$SKIP_BUILD" = 1 ]
then
  docker-compose -f docker-compose-wiremock.yml up -d
else
  docker-compose -f docker-compose-wiremock.yml up -d --build
fi

yarn dev
