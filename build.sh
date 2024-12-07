#!/bin/bash

echo "=========="
echo "param > environment (dev/prd)"

ENV=${1:-none}

if [ "$ENV" != "dev" ] && [ "$ENV" != "prd" ]; then
  # 그냥 종료함
  echo "Environment must be either dev or prd"
  exit 0
fi

if [ "$ENV" == "dev" ]; then
  cp ./.env.dev ./.env
  yarn build
fi
if [ "$ENV" == "prd" ]; then
  cp ./.env.prd ./.env
  yarn build
fi
