import {
  defineCollection,
  reference,
  z,
} from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: ({image}) => z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        image: image().refine(img => img.width > 500, {
            message: 'image should be lower than 500px'
        }),
        //relacion
        //author: z.string(),
        author: reference('author'),
        //relacion
        tags:  z.array(z.string()),


        //boolean
        isDraft: z.boolean().default(false),
    })
})


const authorCollection = defineCollection({
    type: 'data',
    schema: ({image}) => z.object({
        name: z.string(),
        avatar: image().refine((img) => img.width > 300, {
            message: 'you image should be lower than 300px'
        }),
        twitter: z.string(),
        linkedIn: z.string(),
        github: z.string(),
        bio: z.string(),
        subtitle: z.string()

    })
})

// const tagsCollection = defineCollection({
//     type: 'data',
//     schema: () => z.object({
   
//     })
// })


export const collections = {
    blog: blogCollection,
    author: authorCollection,
    //tags: tagsCollection
}