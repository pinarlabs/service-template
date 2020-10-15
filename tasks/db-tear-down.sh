#!/bin/bash
CONTAINER_NAME_POSTGRES=pinarlabs_postgres_test


echo ""
echo " ** Stoping Database Container! **"
docker stop $CONTAINER_NAME_POSTGRES > /dev/null 2>&1
