import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './client';
import type { SanityImage } from './queries';

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

export function getImageUrl(
  source: SanityImage,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    blur?: number;
  }
) {
  let imageBuilder = builder.image(source);

  if (options?.width) {
    imageBuilder = imageBuilder.width(options.width);
  }
  if (options?.height) {
    imageBuilder = imageBuilder.height(options.height);
  }
  if (options?.quality) {
    imageBuilder = imageBuilder.quality(options.quality);
  }
  if (options?.blur) {
    imageBuilder = imageBuilder.blur(options.blur);
  }

  return imageBuilder.auto('format').url();
}

export const sanityImageLoader = ({
  src,
  width,
  quality
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  if (src.startsWith('http')) {
    const url = new URL(src);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', (quality || 75).toString());
    url.searchParams.set('auto', 'format');
    return url.toString();
  }
  return src;
};
