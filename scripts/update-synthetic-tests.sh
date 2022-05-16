#!/bin/bash

set -e

current_directory=`pwd`

cd synthetic-tests

pulumi login

(pulumi stack init $PULUMI_STACK) || echo "Pulumi $PULUMI_STACK already exists"

pulumi stack select $PULUMI_STACK

if [ "$IS_PR_WORKFLOW" = true ] ; then
  pulumi preview --diff
else
  pulumi up -y
fi

result=$?

cd "$current_directory"

exit $result
