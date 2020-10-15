NODE_ENV=test jest --detectOpenHandles --forceExit --testPathPattern=tests
errCode=$?
./tasks/db-setup.sh down
echo "exiting with error code $errCode"
exit $errCode