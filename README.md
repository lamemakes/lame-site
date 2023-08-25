# 🥳 LAME SITE v3 🥳

This is the third major iteration of the website located at https://www.lamemakes.com. The lastest version implements unit testing + linting, more dynamic loading, and cleaner formatting.

The website was built with the intention of being nearly a fully static website. Previously auto-generated JSON files are fulled from the host and are used to populate different components of the site (projects, music, picture directories). Example object structures can be found in the test directory, with the name "test\_<return type>".

The `HOST` constant can be found in `main.ts`. Changing this constant will globally change where the previously mentioned JSON requests are pulled from.

## Setup & install the lame-site

```
npm install --global yarn                          # install yarn
git clone https://github.com/lamemakes/lame-site   # clone the repo
cd lame-site
yarn install --frozen-lockfile                     # install dependencies
```

**NOTE**: If running the vite dev server locally and using our own remote apache server containing statically hosted JSON files (ie. pulling from "yourdomain.com/projects.json"), it is required to enable CORS for JSON files. This can be done by adding the following lines in your `.htaccess` file (usually located in `public_html/`).

```
<FilesMatch "\.(json)$">
    <IfModule mod_headers.c>
        Header set Access-Control-Allow-Origin "*"
    </IfModule>
</FilesMatch>
```

This lets Apache know to only allow CORS for JSON files.

## Run the development server

```sh
yarn dev
```

## Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

## Format with [Prettier](https://prettier.io/) in the project root directory

```sh
yarn prettier . --write
```

## Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

## Build for production

```sh
yarn build
```

## Notes

- Unit tests are a WIP, fighting with Jest to get proper API mocks.
- The JSON static files are updates with an "admin panel" ran on my local machine that makes it wasy to generate, upload, and modify previous projects/images
