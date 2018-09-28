# Chess game enterer

This is a try to learn something about modern JavaScript.

Using existing libraries like [chess.js]() and [Chessground]() I have made a simple
game recorder. You enter manually the game and get the PGN of the game back.

In case you don't have or don't want to install some chess software like Scid or ChessBase.

You can download, open the index.html page in a browser and start playing with it, or use it online at https://erral.github.io/game-enter

## How to develop

### Basic install and develop

- npm install

### Run webserver with watching

- npm run server

### Standard build

It will create a dist folder with the relevant files (HTML, JS and images), with hashed urls to avoid caches.

- npm run build

### Deploy to github-pages

When you have it ready to be deployed to github pages automatically (in a branch called gh-pages):

- npm run github

If you want to inspect the code generated for github, you can run the following:

- npm run build-github

This is the same as the `npm run build` but with a different public path to match the path of github-pages.
