import {
  defineCollection,
  z,
} from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: ({image}) => z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        author: z.string(),
        //relacion
        image: image().refine(img => img.width > 500, {
            message: 'image should be lower than 500px'
        }),
        //relacion
        tags: z.array(z.string()),
    })
})


export const collections = {
    blog: blogCollection
}