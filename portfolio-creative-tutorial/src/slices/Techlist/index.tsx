'use client'


import React, { FC, useEffect, useRef } from "react"; // Importing React and the Functional Component (FC) type
import { Content } from "@prismicio/client"; // Importing types for Prismic content
import { SliceComponentProps } from "@prismicio/react"; // Type for Slice component props from Prismic
import { MdCircle } from "react-icons/md"; // Circle icon from Material Design icons
import {gsap} from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "../Biography/Heading"; // Custom Heading component
import Bounded from "@/app/components/bounded"; // Layout wrapper component for consistent padding/margin

//register the scrolltrigger plugin to gsap
gsap.registerPlugin(ScrollTrigger)


// Defining the component props type using the SliceComponentProps generic
export type TechlistProps = SliceComponentProps<Content.TechlistSlice>;

// Main Techlist functional component
const Techlist: FC<TechlistProps> = ({ slice }) => {
  //using gsap context as a ref
  const component =useRef(null)

  useEffect(() => {
    let ctx = gsap.context(()=> {
     const tl = gsap.timeline({
      scrollTrigger: {
        trigger: component.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 7,
      },
     });

     tl.fromTo('.tech-row', {
      x: (index) => {
        return index % 2 === 0 ? gsap.utils.random(600, 400) : gsap.utils.random(-600, -400)
      }
     },
      {
      x: (index) => {
        return index % 2 === 0 ? gsap.utils.random(-600, -400) : gsap.utils.random(600, 400)
      },
      ease: 'power1.inOut'
     } 
    )
    }, component)
    return () => ctx.revert();
  }, [])
  return (
    <section
      data-slice-type={slice.slice_type} // Slice type for debugging or styling
      data-slice-variation={slice.variation} // Slice variation from Prismic
      className="overflow-hidden" // Prevent overflow of content
      ref={component}
    >
      <Bounded as='div'> {/* Layout wrapper for padding */}
        <Heading size="xl" as="h2" className="mb-8"> {/* Renders the heading text from CMS */}
          {slice.primary.heading}
        </Heading>
      </Bounded>

      <ul className="">
        {/* Loop through each technology group */}
        {slice.primary.techgroup?.map((item, index) => (
          <li key={index} className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700" aria-label={item.techname || undefined}>
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
