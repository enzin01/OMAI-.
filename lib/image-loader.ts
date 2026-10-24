"use client";

import type { ImageLoaderProps } from "next/image";
import imageAssets from "./image-assets.json";

const assets = imageAssets as Record<string, { stem: string; widths: number[] }>;

// Exportação estática: srcset aponta para arquivos WebP reais, sem servidor de imagens.
export default function imageLoader({ src, width }: ImageLoaderProps): string {
  const image = assets[src];
  if (!image) return src;
  const selectedWidth = image.widths.find((available) => available >= width) ?? image.widths[image.widths.length - 1];
  return `${image.stem}-${selectedWidth}.webp`;
}
