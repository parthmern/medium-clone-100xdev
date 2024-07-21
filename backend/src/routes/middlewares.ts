import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

export const middlewaresFunc = (app : any) =>{
    app.use('/api/v1/blog/*', async (c:any, next: any) => {

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
}