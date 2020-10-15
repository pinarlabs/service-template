module.exports = declareMigration;

function declareMigration({up, down}) {
    return {
        up: executeQuery(up),
        down: executeQuery(down)
    }
}

function executeQuery(queryStr) {
    return async (queryInterface) => {
        await queryInterface.sequelize.query(queryStr);
    }
}