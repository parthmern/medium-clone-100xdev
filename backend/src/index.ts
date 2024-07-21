import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { middlewaresFunc } from './routes/middlewares';

// Create the main Hono app
// const app = new Hono<{
// 	Bindings: {
// 		DATABASE_URL: string
// 	}
// }>();

const app = new Hono();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

// middleware
// @ts-ignore
// middlewaresFunc(app);                 // can do like this


app.get('/', (c) => {
  // console.log(c);
  // c.json()   -- for json reponse

  // @ts-ignore
  const DATABASE_URL = c.env.DATABASE_URL ;

	console.log(DATABASE_URL);

	return c.text('hello from hono js with cloudflare workers/wrangler')
})




export default app;
