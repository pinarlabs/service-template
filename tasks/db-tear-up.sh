#!/bin/bash
IMAGE_POSTGRES=postgres:9.6
CONTAINER_NAME_POSTGRES=pinarlabs_postgres_test
POSTGRES_DEFAULT_PORT=5432
POSTGRES_EXPOSE_PORT=5444
TIMEOUT=5s

echo ""
echo " ** Starting Postgres **"
docker run --rm -d --name $CONTAINER_NAME_POSTGRES -p $POSTGRES_EXPOSE_PORT:$POSTGRES_DEFAULT_PORT -e "POSTGRES_USER=postgres" -e "POSTGRES_PASSWORD=pinarlabs" -e "POSTGRES_DB=pinarlabs-db" $IMAGE_POSTGRES > /dev/null 2>&1

sleep $TIMEOUT
echo " ** Waiting for Postgres readiness **"
while ! docker exec $CONTAINER_NAME_POSTGRES pg_isready -U postgres > /dev/null 2>&1;
    do
    sleep $TIMEOUT
    done
echo " ** Postgres is ready! **"

echo " ** Running Migrations **"
npm run db:migrate
    > /dev/null 2>&1

echo " ** Migrations ready!**"