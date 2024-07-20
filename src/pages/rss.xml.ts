import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import markdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

import rss from '@astrojs/rss';

const parser = new markdownIt()


export const GET: APIRoute = async ({ params, request, site }) => {
  const blogPost = await getCollection("blog");
  console.log(blogPost);

  return rss({
    stylesheet: "/styles/rss.xsl",
    // `<title>` field in output xml
    title: "Santi Blog",
    // `<description>` field in output xml
    description:
      "Un blog simple con el proposito de aprender cosas nuevas en Astro framework",


      xmlns: {
        media: 'http://search.yahoo.com/mrss/',
      },
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: site ?? "",
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blogPost.map(({data, slug, body}) => ({
      title: data.title,
      pubDate: data.date,
      description: data.description,
      link: `posts/${slug}`,



      content: sanitizeHtml(parser.render(body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
      
      customData: `<media:content
          type="image/${data.image.format === 'jpg' ? 'jpeg' : 'png'}"
          width="${data.image.width}"
          height="${data.image.height}"
          medium="image"
          url="${site + data.image.src}" />
      `,
      
      xmlns: {
        media: 'http://search.yahoo.com/mrss/',
      },
      
    })),
    // (optional) inject custom xml
    customData: `<language>es</language>`,
  });
};
