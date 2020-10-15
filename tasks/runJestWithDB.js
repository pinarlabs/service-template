const jest = require("jest");
const { buildArgv } = require("../node_modules/jest/node_modules/jest-cli/build/cli");
const shell = require("shelljs");

function databaseDockerCommand(command) {

  const  { code } = shell.exec(`./tasks/db-setup.sh ${command}`);

  if (code !== 0) {
    throw new Error(`Error running docker command: exit code: ${code}`);
  }
}

(async () => {
  let exitCODE = 0;

  try {
    databaseDockerCommand("up");

    const args = buildArgv(process.argv.splice(2));

    const { results: { success }} = await jest.runCLI(args, [__dirname]);

    if (!success) {
        exitCODE = 1;
    }
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
    exitCODE = 1;
  } finally {
    try {
      databaseDockerCommand("down");
    } catch (e) {
      console.error("\x1b[31m%s\x1b[0m", e);
      exitCODE = 1;
    }

    process.exit(exitCODE);
  }
})();
