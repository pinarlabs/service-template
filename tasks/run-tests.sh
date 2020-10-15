if [ -v $GITHUB_REPOSITORY ]
then
    echo "RUNNING LOCAL"
    ./tasks/db-tear-up.sh
    NODE_ENV=test jest --detectOpenHandles --forceExit --testPathPattern=tests
    errCode=$?
    ./tasks/db-tear-down.sh
else
    echo "RUNNING ON GITHUB ACTIONS"
    NODE_ENV=test jest --detectOpenHandles --forceExit --testPathPattern=tests
    errCode=$?
fi

echo "exiting with error code $errCode"
exit $errCode