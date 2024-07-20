import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

import rss from '@astrojs/rss';

export const GET: APIRoute = async({ params, request, site }) => {



  const blogPost = await getCollection('blog')
console.log(blogPost)

  return rss({
     stylesheet: '/styles/rss.xsl',
    // `<title>` field in output xml
    title: 'Santi Blog',
    // `<description>` field in output xml
    description: 'Un blog simple con el proposito de aprender cosas nuevas en Astro framework',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: site ?? '',
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blogPost.map(post => ({
title: post.data.title,
pubDate: post.data.date,
description: post.data.description,
link: `posts/${post.slug}`
    })),
    // (optional) inject custom xml
    customData: `<language>es</language>`,
  });


  }



