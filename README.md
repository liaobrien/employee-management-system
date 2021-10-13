# employee-management-system

## Description

This is a CLI application that features a persistent database powered by MySQL of a company's various employees, roles, and departments. Users can interact with the application in various ways through user input to add to or modify the database.

## Table of Contents

- [Installation](#installation)
- [Tests](#tests)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Links](#links)

## Installation

Use the following command to install dependencies:

```
$ npm i
```

## Tests

Use the following command for tests:

```
$ npm run test
```

## Usage

The following command initializes the app:

```
$ node index.js
```

This app is meant to be used in the command line. The user is first presented with a list prompt that shows all the possible options to interact with the application and database. Choosing "View Employees", "View All Roles", or "View Departments" will present the user with respective tables depicting each of those categories. Users can also add employees, add roles, and add departments as well as update an existing employee's role.

## Credits

The Node packages [Inquirer](https://www.npmjs.com/package/inquirer), [Dotenv](https://www.npmjs.com/package/dotenv), [MySQL2](https://www.npmjs.com/package/mysql2#using-prepared-statements), and [console.table](https://www.npmjs.com/package/console.table) were installed for this application.

## License

This project is licensed under the MIT license.

## Links

A demo of the application can be viewed [here](https://youtu.be/OJ66ZXbPN5E).
