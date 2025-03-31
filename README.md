# r4s


## Prerequisites

Ensure you have the following installed before running the tests:

* [Node.js](https://nodejs.org/en) (LTS recommended)
* [npm](https://www.npmjs.com/)
* [git](https://git-scm.com/downloads)

## Installation

Clone the repository and install dependencies:

### Clone the repository

```
https://github.com/lukasz-lyczko/r4s.git
```

### Install dependencies

`npm install`

#### Playwright Setup

Ensure Playwright is set up correctly by installing browsers:

`npx playwright install`

### Running Tests

Run all tests in headless mode:
`npx playwright test` or `npm run e2e:headless`

Run tests from specific directory:
`npx playwright test tests/web-automation`

Run tests and update all the snapshots:
`npx playwright test -u` or `npm run e2e:update-snapshots`

Run tests in headed mode:
`npx playwright test --headed` or `npm run e2e:headed`
