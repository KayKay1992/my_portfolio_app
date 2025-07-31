import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/app/components/bounded";
import Heading from "./Heading";
import Button from "./Button";
import { PrismicNextImage } from "@prismicio/next";
import Avatar from "./Avatar";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography: FC<BiographyProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-[2fr_1fr]">
        <Heading as="h1" size="xl" className="col-start-1">
          {slice.primary.heading}
        </Heading>

        <div className="prose prose-lg dark:prose-invert max-w-none col-start-1 prose-headings:font-bold prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-slate-400">
          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className="mb-6 last:mb-0 ">{children}</p>
              ),
              heading2: ({ children }) => (
                <h2 className="mb-4 mt-8 text-2xl">{children}</h2>
              ),
              heading3: ({ children }) => (
                <h3 className="mb-3 mt-6 text-xl">{children}</h3>
              ),
              list: ({ children }) => <ul className="my-4 pl-6">{children}</ul>,
              oList: ({ children }) => (
                <ol className="my-4 pl-6">{children}</ol>
              ),
              image: ({ node }) => (
                <div className="my-6 not-prose">
                  <PrismicNextImage
                    field={node}
                    className="rounded-lg shadow-md"
                  />
                </div>
              ),
            }}
          />
          <Button
            linkField={slice.primary.button_link}
            label={slice.primary.button}
            className="mt-6 not-prose"
          />
        </div>

        <Avatar
          image={slice.primary.avatar}
          className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
        />
      </div>
    </Bounded>
  );
};

export default Biography;
