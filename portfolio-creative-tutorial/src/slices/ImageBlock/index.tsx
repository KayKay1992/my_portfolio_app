import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock: FC<ImageBlockProps> = ({ slice }) => {
  return (
    <div className="my-8 flex justify-center">
      <div className="overflow-hidden rounded-2xl shadow-xl max-w-4xl w-full">
        <PrismicNextImage
          field={slice.primary.image}
          imgixParams={{
            w: 1200,
          auto: ["format", "compress"],
            fit: "max",
            q: 80,
          }}
          className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default ImageBlock;
