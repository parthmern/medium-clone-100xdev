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


### how to get conneciton pooling string from prisma orm ?

- first go to `https://console.prisma.io/` named url and and then create a new project and then select `Accelerate` as ENABLE

- now this page need your DB url so get it from neon.tech or avian site here mine is `postgresql://test_owner:ZDh52OKkGqFw@ep-dry-hill-a5nfk1xt.us-east-2.aws.neon.tech/test?sslmode=require` 

- now select the same reason as your DB is actually belongs to

- click on DONE 
- click on GENERATE API KEY

- done you are getting connection pool url which is here `prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNmMyNmNiNGMtNDQ4OS00NDNjLWE2ZTQtMzEwMWNmODRmZjEyIiwidGVuYW50X2lkIjoiNzZhNGQ5YWJkMGRmZjY2MjRiZjllNWMxNWNjMjgxZjNhZDU5YWM2NmNlNGY3NjBjNjRlZjkwMDU0YWRiNGU1NSIsImludGVybmFsX3NlY3JldCI6ImFhYzY4ZGE0LTNkY2QtNDM1OS1hMTM5LWE5NDMxY2Q2M2ZkYSJ9.Ts2K4DvWb-J_lKeNDrodB6N0ZmqRfz7_CoGyo6Ucbng`