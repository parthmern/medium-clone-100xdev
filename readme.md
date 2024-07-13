# HONO

- fantastic library to work on backend 
- work good with serverless backend and with server backend

<br />
- hono gives us backend response streaming ( like chatgpt llms takes time to give response, hono allows you to stream the response from backend )

<br />

### why library is aware ? / Features
- Ultrafast 🚀 - The router RegExpRouter is really fast. Not using linear loops. Fast.
- Lightweight 🪶 - The hono/tiny preset is under 14kB. Hono has zero dependencies and uses only the Web Standard API.
- Multi-runtime 🌍 - Works on Cloudflare Workers, Fastly Compute, Deno, Bun, AWS Lambda, or Node.js. The same code runs on all platforms. ( It works on any JavaScript runtime: Cloudflare Workers, Fastly Compute, Deno, Bun, Vercel, Netlify, AWS Lambda, Lambda@Edge, and Node.js. )
- Batteries Included 🔋 - Hono has built-in middleware, custom middleware, third-party middleware, and helpers. Batteries included.
- Delightful DX 😃 - Super clean APIs. First-class TypeScript support. Now, we've got "Types".

- it is not like same code is going to work everywhere but there are only few changes in code that u can make to use the same code on above every platform

## What is connection pulling ?

- in serverless backend, different types of server/ pc is available at different places so assume that multiple PC is going to make connection with DB so there are multiple connections exists with DB.

- here, one median entity which is called as "connection pool" helps all the pc to connect with DB so there is only one DB connection.

![image](https://github.com/user-attachments/assets/eb36f4b8-5ef9-45f0-8f13-cedefb4ff413)
