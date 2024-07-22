import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";


export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string;
        JWT_SECRET : string ;
    },
    Variables : {
        userId : string ;
    }
}>();

blogRouter.use("*", async (c, next)=>{

    console.log(c.req.header('authorization'));

    // SET and GET used to pass data through the middleware to next function
    const authHeader = c.req.header('authorization') || "";

    const token : string = authHeader?.split(' ')[1] ;

    const user = await verify(token, "secret");

    if(user){
        console.log(user);
        // @ts-ignore
        // SET ----- adding this to c ( req ) so it can be accessible in another routes or next func
        c.set("userId", user?.id);
        await next();
    }
    else{
        c.status(403);
        return(
            c.json(
                {
                    message : "user not exist -- in middleware",
                    success : false ,
                }
            )
        )
    }

   
})

blogRouter.post('/', async(c) => {

    const body = await c.req.json();
    //@ts-ignore
    const dbUrl = c.env.DATABASE_URL ;
    const prisma = new PrismaClient({
        datasourceUrl : dbUrl ,
    }).$extends(withAccelerate());

    const userId = c.get("userId");

    const createdBlog = await prisma.post.create(
        {
            data : {
                title : body.title ,
                content : body.content ,
                authorId : userId ,
            }
        }
    )

    c.status(200);
    return(
        c.json(
            {
                createdBlog : createdBlog ,
            }
        )
    )
	
})

// can be added PAGINATION
// offset walu in api url
blogRouter.get("/bulk", async(c)=>{

    const body = await c.req.json();
    //@ts-ignore
    const dbUrl = c.env.DATABASE_URL ;
    const prisma = new PrismaClient({
        datasourceUrl : dbUrl ,
    }).$extends(withAccelerate());

    const allBlogs = await prisma.post.findMany();

    c.status(200);
    return(
        c.json(
            {
                allBlogs
            }
        )
    )



})


blogRouter.get('/:id', async (c) => {
	const body = await c.req.json();
    //@ts-ignore
    const dbUrl = c.env.DATABASE_URL ;
    const prisma = new PrismaClient({
        datasourceUrl : dbUrl ,
    }).$extends(withAccelerate());

    const blogID = await c.req.param("id");

    try{
        var foundedBlog = await prisma.post.findFirst(
            {
                where : {
                    id: blogID ,
                }
            }
        )

        if(! foundedBlog){
            throw new Error('Blog not found');
        }

        c.status(200);
        return(
            c.json(
                {
                    foundedBlog : foundedBlog ,
                }
            )
        )

    }

    catch(error){
        c.status(400);
        return(
            c.json(
                {
                    success : false, 
                    message : "error",
                    // @ts-ignore
                    error: error?.message,
                }
            )
        )
    }

    
})


blogRouter.put('/', async(c) => {
	const body = await c.req.json();
    //@ts-ignore
    const dbUrl = c.env.DATABASE_URL ;
    const prisma = new PrismaClient({
        datasourceUrl : dbUrl ,
    }).$extends(withAccelerate());

    const updatedBlog = await prisma.post.update(
        {
            where : {
                id: body.id ,
            }, 
            data : {
                title : body.title ,
                content : body.content ,
            }
        }
    )

    c.status(200);
    return(
        c.json(
            {
                updatedBlog : updatedBlog ,
            }
        )
    )
})


