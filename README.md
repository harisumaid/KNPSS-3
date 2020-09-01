This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. For this project first run 

```bash
npm run watch-semantic
```

this would create static named folder inside which would be the compiled semantic ui code

which is imported in _document.js file inside pages/ folder

After static folder is completely built, then

2. Create "files" named folder in the root directory of server and these folder inside "files" folder respectively:

 - files/
    - achievement/
    - gallery/
    - news/
    - office/

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

