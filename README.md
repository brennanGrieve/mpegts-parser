mpegts-parser

A simple parser for mpegts packets in nodeJS.

To run:

(If you already have nodeJS installed, skip to step 4)
1. Install NVM from [here](https://github.com/nvm-sh/nvm), or [here for Windows](https://github.com/coreybutler/nvm-windows). 
2. Run `nvm install node` (or `nvm install latest` on Windows) to install the latest version of nodeJS.
3. Run `nvm use node` (or `nvm use latest` on Windows) to set up Node for use.
4. Using a command line, run `npm install` in the project root to install all dependencies.
5. Run `npm run parse-success` to run the parser with the valid test file, `npm run parse-failure` to run the parser with the invalid test file, or `npm test` to run the suite of Jest tests.