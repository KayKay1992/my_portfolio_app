import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock: FC<TextBlockProps> = ({ slice }) => {
  return (
    <div className="max-w-prose">
      <PrismicRichText
        field={slice.primary.text}
        components={{
          paragraph: ({ children }) => <p className="mb-6 last:mb-5">{children}</p>,
          heading1: ({ children }) => <h1 className="text-4xl mb-6 font-extrabold">{children}</h1>,
          heading2: ({ children }) => <h2 className="text-3xl font-bold mb-6">{children}</h2>,
          // Add more components as needed
        }}
      />
    </div>
  );
};

export default TextBlock;
