import { Hono } from 'hono';

// Create the main Hono app
const app = new Hono();

app.get('/', (c) => {
  console.log(c);
  // c.json()   -- for json reponse
	return c.text('hello from hono js with cloudflare workers/wrangler')
})

app.post('/api/v1/signup', (c) => {
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
