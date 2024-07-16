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


## How to setup ?

- `npm i prisma
npx prisma init`

- then go to .env file where replace the DATABASE_URL with `actual db url` (make sure do not do with connection pooling url) because prima client need to connect with actual db url and prisma migration commands need to connect with actual db url to generate migrations.

- so actually here this connection pooling url is going to be used by cloudflare workers so go to the file named `wrangler.toml` in which u can change your ENV variables and where 
```
[vars]
DATABASE_URL = "<connection pooling prisma url>"
```
- is going to be the connection pooling url

# DB schema explained

![image](https://github.com/user-attachments/assets/bbc2175f-0188-486b-ad7e-a5bbe25e0b60)


```
-- IN PRISMA

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       String   @id @default(uuid())
  email    String   @unique
  name     String?
  password String
  posts    Post[]
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
}

---------------------------------------------------------------------------
-- IN SQL

CREATE TABLE Users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE Posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    userId INT,
    FOREIGN KEY (userId) REFERENCES Users(userId)
);


----------------------------------------------------------------------------
-- IN MONGODB

const userSchema = new Schema({
  userId: {
    type: Number,
    unique: true,
    required: true,
    autoIncrement: true
  },
  name: {
    type: String,
    required: true
  }
});

const postSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
    autoIncrement: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Number,
    ref: 'User'
  }
});

-- but here if we change relationship
-- and create posts[] array in user's schema where we can store all the post's ids related to that user

```
# PRISMA RELATIONSHIP EXPLAINED

![image](https://github.com/user-attachments/assets/2d2a1fef-3320-4d18-b03f-4eba491b4ce0)

- [video link = one to one relationship](https://youtu.be/yecyn3Zr_tA?si=Q2CMyiFXjOKSRnUX)

![image](https://github.com/user-attachments/assets/9cde28f5-6dc1-45aa-b16c-f5b169f6e01a)

- [video link = one to many relationship](https://youtu.be/Ls99mqMT1bA?si=JeNt18IskhUKJCqT)
