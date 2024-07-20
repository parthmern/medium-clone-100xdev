import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

// Create the main Hono app
// const app = new Hono<{
// 	Bindings: {
// 		DATABASE_URL: string
// 	}
// }>();

const app = new Hono();

app.get('/', (c) => {
  // console.log(c);
  // c.json()   -- for json reponse

  // @ts-ignore
  const DATABASE_URL = c.env.DATABASE_URL ;

	console.log(DATABASE_URL);

	return c.text('hello from hono js with cloudflare workers/wrangler')
})

// middleware
app.use('/api/v1/blog/*', async (c, next) => {

	// get header
	const header = c.req.header("authorization") || "";
	const token = header.split(" ")[1];

	// verify header
	const response = await verify(token, "secret");

	if(response.id){
		console.log("jwt verification successful");
		await next();
	}
	else{
		console.log("jwt verification failed");
		c.status(401);
		return c.json(
			{
				success : false, 
				message : "jwt verification failed" 
			}
		)
	}

	
})

app.post('/api/v1/signup', async (c) => {

	// in hono how to get ENV vars
	// @ts-ignore
	const DATABASE_URL = c.env.DATABASE_URL ;

	console.log(DATABASE_URL);

	// this is IMP acceleatate needed for connection pooling in serverless backend
	// Finally, extend your Prisma Client instance with the Accelerate extension to enable Accelerate’s connection pool:
	const prisma = new PrismaClient({
		datasourceUrl: DATABASE_URL,
	}).$extends(withAccelerate())


	const body = await c.req.json();

	const createdUser = await prisma.user.create(
		{
			data : {
				email : body.email ,
				password : body.password ,
			}
		}
	)

	// jwt library cannot work in cloudflare workers so hono has its own
	
	const jwtToken = await sign(
		{
			id : createdUser.id
		},
		"secret"
	);
	  


	return c.json(
		{
			success : true,
			message : "signup route user created",
			createdUser ,
			jwt : jwtToken
		}
	)
})

app.post('/api/v1/signin', async (c) => {
	// @ts-ignore
	const DATABASE_URL = c.env.DATABASE_URL ;

	const prisma = new PrismaClient({
		datasourceUrl: DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign({ id: user.id }, 'secret');
	return c.json({ jwt });
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
