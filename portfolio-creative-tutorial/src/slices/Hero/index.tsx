'use client'

import { FC } from "react";
import { useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {

  const component = useRef(null)

useEffect(() => {
  let ctx = gsap.context(() => {
    const tl = gsap.timeline();
    
    // Name animation - wave effect
    tl.fromTo('.name-animation', 
      {
        y: (i) => (i % 2 === 0 ? 40 : -40),
        opacity: 0,
        scaleY: 0.5
      }, 
      {
        y: 0,
        opacity: 1,
        scaleY: 1,
        ease: "back.out(2)",
        duration: 1.2,
        stagger: {
          each: 0.05,
          from: "end"
        }
      });
    
    // Job title - ripple effect
    tl.fromTo('.job-title', 
      {
        opacity: 0,
        scale: 0.8,
        textShadow: "0 0 10px rgba(255,255,255,0)"
      }, 
      {
        opacity: 1,
        scale: 1,
        textShadow: "0 0 10px rgba(255,255,255,0.3)",
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.5");
  }, component);
  
  return () => ctx.revert();
}, []);

    //function that will split our name span to individual alphabet span that will enable us to animate each alphabet

  const renderLetters = (name:KeyTextField, key:string)=>{
    if(!name) return;
    return name.split("").map((letter, index)=>(
      <span key={index} className={`name-animation name-animation-${key} inline-block opacity-0`}>
        {letter}
      </span>
    ))
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <div className="col-start-1 md:row-start-1">
          <h1
            className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
          >
            <span className="block text-slate-300">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="-mt-[.2em] block text-slate-500">
             {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">
            {slice.primary.tag_line}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
