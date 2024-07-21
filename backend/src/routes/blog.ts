import { Hono } from "hono";


export const blogRouter = new Hono();



blogRouter.get('/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

blogRouter.post('/', (c) => {

	return c.text('signin route')
})

blogRouter.put('/', (c) => {
	return c.text('signin route')
})