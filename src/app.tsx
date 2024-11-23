import { component$, useSignal, $, useTask$ } from "@builder.io/qwik";
import clsx from "clsx";
import "./app.css";

import {
  Image,
  useImageProvider,
  type ImageTransformerProps,
} from "qwik-image";

interface OptimalImage {
  width?: number;
  height?: number;
  style?: string;
  class?: string;
  placeholder?: string;
  layout?: string;
  src?: string;
  resolutions?: number[];
}

const initialProps = {
  resolutions: [3840, 1920, 1280, 960, 640],

  style: "border: 2px solid red;",
  class: "flex flex-wrap gap-6 px-8 lg:gap-8 lg:px-10",
  placeholder: "#e6e6e6",
  layout: "constrained",
  src: "image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fe5113e1c02db40e5bac75146fa46386f",
};

const OptimalImage = component$<OptimalImage>((props = initialProps) => {
  const ref = useSignal<HTMLImageElement>();
  const attrs = useSignal<any>(initialProps);

  useTask$(({ track }) => {
    track(() => props);
    attrs.value = props;
  });

  const imageTransformer$ = $(
    ({ src, width, height }: ImageTransformerProps): string => {
      // Here you can set your favorite image loaders service
      return `https://cdn.builder.io/api/v1/${src}?height=${height}&width=${width}&format=webp&fit=fill`;
    }
  );
  // Global Provider (required)
  useImageProvider({
    // You can set this prop to overwrite default values [3840, 1920, 1280, 960, 640]
    resolutions: [640],
    imageTransformer$,
  });
  return (
    <Image
      ref={ref}
      {...attrs.value}
      class={clsx(initialProps.class, attrs.value.class)}
    />
  );
});

export const App = component$(() => {
  return (
    <>
      <div>Image</div>

      <OptimalImage
        src={"src/assets/qwik.svg"}
        class="bg-red-500"
        width={600}
        height={600}
      />
    </>
  );
});
