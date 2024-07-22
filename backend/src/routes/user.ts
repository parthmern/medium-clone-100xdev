import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import {signinInput, signupInput} from "@parthmern/common-blogapp";

export const userRouter = new Hono();

userRouter.post('/signup', async (c) => {

	// in hono how to get ENV vars
	// @ts-ignore
	const DATABASE_URL = c.env.DATABASE_URL ;

	console.log(DATABASE_URL);

	// this is IMP acceleatate needed for connection pooling in serverless backend
	// Finally, extend your Prisma Client instance with the Accelerate extension to enable Accelerate’s connection pool:
	// specific lib named "prisma/extension-accelerate"
	const prisma = new PrismaClient({
		datasourceUrl: DATABASE_URL,
	}).$extends(withAccelerate())


	const body = await c.req.json();

    console.log(body);

    const {success} = await signupInput.safeParse(body);

    if(!success){
        c.status(411);
        return(
            c.json(
                {
                    success : success ,
                    message : "zod validation failed"
                }
            )
        )
    }

	const createdUser = await prisma.user.create(
		{
			data : {
				email : body.username ,
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

userRouter.post('/signin', async (c) => {
	// @ts-ignore
	const DATABASE_URL = c.env.DATABASE_URL ;

	const prisma = new PrismaClient({
		datasourceUrl: DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();

    const {success} =  await signinInput.safeParse(body);

    if(!success){
        c.status(411);
        return(
            c.json(
                {
                    success : success ,
                    message : "zod validation failed = signinInput"
                }
            )
        )
    }

	const user = await prisma.user.findUnique({
		where: {
			email: body.username,
			password : body.password,
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found or password wrong" });
	}

	const jwt = await sign({ id: user.id }, 'secret');
	return c.json({ jwt });
})