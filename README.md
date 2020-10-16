# service-template

[![Actions Status](https://github.com/pinarlabs/service-template/workflows/ci/badge.svg)](https://github.com/pinarlabs/service-template/actions)
[![Coverage Status](https://coveralls.io/repos/github/pinarlabs/service-template/badge.svg)](https://coveralls.io/github/pinarlabs/service-template)

# Service Template

This repository contains a template to build a REST API using:
- Typescript
- Express
- Jest for Testing
- Postgres as database
- Sequelize as ORM and database migrations

Also getting this template you get a github workflow configured with:
- postgres database for running tests unit/integration depending on your strategy
- running tests
- posting results to coveralls

## How to apply this template to your project

1. Create a git repo
2. Get the project running the following on your terminal

```
curl -s https://raw.githubusercontent.com/pinarlabs/service-template/main/tasks/get.sh | bash
```
