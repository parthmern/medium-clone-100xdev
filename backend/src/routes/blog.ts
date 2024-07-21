import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";


export const blogRouter = new Hono();

blogRouter.use("*", async (c, next)=>{

    await next();
})

blogRouter.post('/', async(c) => {

    const body = await c.req.json();
    //@ts-ignore
    const dbUrl = c.env.DATABASE_URL ;
    const prisma = new PrismaClient({
        datasources : dbUrl ,
    }).$extends(withAccelerate());

    const createdBlog = await prisma.post.create(
        {
            data : {
                title : body.title ,
                content : body.content ,
                authorId : "1" ,
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



blogRouter.get('/:id', async (c) => {
	const body = await c.req.json();
    //@ts-ignore
    const dbUrl = c.env.DATABASE_URL ;
    const prisma = new PrismaClient({
        datasources : dbUrl ,
    }).$extends(withAccelerate());

    try{
        var foundedBlog = await prisma.post.findFirst(
            {
                where : {
                    id: body.id ,
                }
            }
        )
    }

    catch(error){
        c.status(400);
        return(
            c.json(
                {
                    success : false, 
                    message : "error",
                    error : error ,
                }
            )
        )
    }

    c.status(200);
    return(
        c.json(
            {
                foundedBlog : foundedBlog ,
            }
        )
    )
})


blogRouter.put('/', async(c) => {
	const body = await c.req.json();
    //@ts-ignore
    const dbUrl = c.env.DATABASE_URL ;
    const prisma = new PrismaClient({
        datasources : dbUrl ,
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


// can be added PAGINATION
// offset walu in api url
blogRouter.get("/bulk", async(c)=>{

    const body = await c.req.json();
    //@ts-ignore
    const dbUrl = c.env.DATABASE_URL ;
    const prisma = new PrismaClient({
        datasources : dbUrl ,
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