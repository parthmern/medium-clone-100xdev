import { z } from "zod";

console.log("starting ...");

export const signupInput = z.object({
    username : z.string().email(),
    password : z.string().min(6),
    name : z.string().optional()
})

// zod infer (directly to TS types usage)
// type inferance in zod
export type SignupInput = z.infer<typeof signupInput>

//=========================

export const signinInput = z.object({
    username : z.string().email(),
    password : z.string().min(6),
})

export type SigninInput = z.infer<typeof signinInput>

// ==========================

export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
});


export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});

export type CreatePostType = z.infer<typeof createPostInput>;
export type UpdatePostType = z.infer<typeof updatePostInput>;

console.log("Ending ..");