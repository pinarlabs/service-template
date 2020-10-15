const declareMigration = require('./helpers/declare-migration');

module.exports = declareMigration({
    up: `
        CREATE TABLE running_context
        (
            "id"               varchar(128) PRIMARY KEY,
            "organizations"    varchar(128) NOT NULL,
            "dryRun"           boolean NOT NULL,
            "cronRunning"      boolean NOT NULL,
            "createdAt"        timestamp WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt"        timestamp WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        INSERT INTO running_context VALUES
        (
            'running-context',
            'pinarlabs',
            true,
            false
        )
        `,

    down: `DROP TABLE IF EXISTS running_context`
});