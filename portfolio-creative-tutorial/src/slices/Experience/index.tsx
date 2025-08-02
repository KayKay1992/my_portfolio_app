import { FC } from "react"; // Add this import
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "../Biography/Heading";
import Bounded from "@/app/components/bounded";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slice.
 */
const Experience: FC<ExperienceProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.heading && (
        <Heading as="h2" size="lg">
          {slice.primary.heading}
        </Heading>
      )}

      {Array.isArray(slice.primary.experience) &&
        slice.primary.experience.map((item, index) => (
          <div
            key={index}
            className="ml-6 mt-8 max-w-prose md:ml-12 md:mt-16"
          >
            {item.title && (
              <Heading as="h3" size="sm">
                {item.title}
              </Heading>
            )}

            {(item.time_period || item.institution) && (
              <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
                {item.time_period && <span>{item.time_period}</span>}
                {item.time_period && item.institution && (
                  <span className="text-3xl font-extralight">/</span>
                )}
                {item.institution && <span>{item.institution}</span>}
              </div>
            )}

            {item.description && (
              <div className="prose prose-lg prose-invert mt-4">
                <PrismicRichText field={item.description} />
              </div>
            )}
          </div>
        ))}
    </Bounded>
  );
};

export default Experience;