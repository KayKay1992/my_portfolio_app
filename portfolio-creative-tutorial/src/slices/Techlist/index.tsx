import React, { FC } from "react"; // Importing React and the Functional Component (FC) type
import { Content } from "@prismicio/client"; // Importing types for Prismic content
import { SliceComponentProps } from "@prismicio/react"; // Type for Slice component props from Prismic
import Heading from "../Biography/Heading"; // Custom Heading component
import { MdCircle } from "react-icons/md"; // Circle icon from Material Design icons
import Bounded from "@/app/components/bounded"; // Layout wrapper component for consistent padding/margin

// Defining the component props type using the SliceComponentProps generic
export type TechlistProps = SliceComponentProps<Content.TechlistSlice>;

// Main Techlist functional component
const Techlist: FC<TechlistProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type} // Slice type for debugging or styling
      data-slice-variation={slice.variation} // Slice variation from Prismic
      className="overflow-hidden" // Prevent overflow of content
    >
      <Bounded as='div'> {/* Layout wrapper for padding */}
        <Heading size="xl" as="h2" className="mb-8"> {/* Renders the heading text from CMS */}
          {slice.primary.heading}
        </Heading>
      </Bounded>

      <ul className="">
        {/* Loop through each technology group */}
        {slice.primary.techgroup?.map((item, index) => (
          <li key={index} className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700">
            {/* Render tech name 15 times with special color on the 8th item */}
            {Array.from({ length: 15 }, (_, index) => (
              <React.Fragment key={index}>
                <span 
                  className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
                  style={{ color: index === 7 && item.techcolor ? item.techcolor : 'inherit' }}
                >
                  {item.techname}
                </span>
                <span className="text-3xl">
                  <MdCircle /> {/* Render a small circle icon after each name */}
                </span>
              </React.Fragment>
            ))}
          </li>
        )) || <p>No technologies listed.</p>} {/* Fallback if techgroup is empty */}
      </ul>
    </section>
  );
};

export default Techlist; // Export the component
