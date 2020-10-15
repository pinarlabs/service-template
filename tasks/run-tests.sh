if [ -v $GITHUB_REPOSITORY ]
then
    ./tasks/db-tear-up.sh
    NODE_ENV=test jest --detectOpenHandles --forceExit --testPathPattern=tests
    errCode=$?
    ./tasks/db-tear-down.sh
else
    NODE_ENV=test jest --detectOpenHandles --forceExit --testPathPattern=tests
    errCode=$?
fi

echo "exiting with error code $errCode"
exit $errCode