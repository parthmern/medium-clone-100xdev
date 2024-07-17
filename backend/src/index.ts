import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


// Create the main Hono app
// const app = new Hono<{
// 	Bindings: {
// 		DATABASE_URL: string
// 	}
// }>();

const app = new Hono();

app.get('/', (c) => {
  console.log(c);
  // c.json()   -- for json reponse
	return c.text('hello from hono js with cloudflare workers/wrangler')
})

app.post('/api/v1/signup', (c) => {

	// in hono how to get ENV vars
	// @ts-ignore
	const DATABASE_URL = c.env.DATABASE_URL ;

	// this is IMP acceleatate needed for connection pooling in serverless backend
	const prisma = new PrismaClient({
		datasourceUrl: DATABASE_URL,
	}).$extends(withAccelerate())

	return c.text('signup route')
})

app.post('/api/v1/signin', (c) => {
	return c.text('signin route')
})

app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

export default app;
