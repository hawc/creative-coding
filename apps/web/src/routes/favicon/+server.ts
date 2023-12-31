import { error, type RequestHandler } from '@sveltejs/kit';
import { image_from_component, type RenderOptions } from 'svelte-component-to-image';

import Favicon from './Favicon.svelte';

export const GET: RequestHandler = (async ({ url }: { url: URL }) => {
  try {
    const options: RenderOptions = {
      width: 128,
      height: 128,
      props: {
        text: url.searchParams.get('text') ?? 'text not found'
      },
      fonts: [
        {
          name: 'Typewriter',
          url: `${url.origin}/fonts/Noto_Emoji/static/NotoEmoji-Bold.ttf`,
        }
      ]
    };

    // pass the component and options to the package
    const image = await image_from_component(Favicon, options);
    const response = new Response(image);
    response.headers.append('Content-Type', 'image/png');
    response.headers.append('Cache-Control', 's-maxage=120, stale-while-revalidate=120');
    return response;
  } catch (e) {
    console.error(e);
    throw error(500, 'Error trying to generate image from component.');
  }
}) satisfies RequestHandler;