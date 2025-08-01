'use client'

import { FC } from "react";
import { useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {gsap} from "gsap";
import Bounded from "@/app/components/bounded";
import Shapes from './shapes'

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
    
       // Name animation
    tl.fromTo('.name-animation', 
      {x: -100, opacity: 0, rotate: -10}, 
      {
        x: 0,
        opacity: 1,
        rotate: 0,
        ease: "elastic.out(1,0.2)",
        duration: 2,
        delay: 0.5,
        transformOrigin: "left top",
        stagger: {
          each: 0.2,
          from: "random"
        }
      });
    
    // Job title - radial wipe
    tl.fromTo('.job-title', 
      {
        clipPath: "circle(0% at 50% 50%)",
        opacity: 0
      }, 
      {
        clipPath: "circle(100% at 50% 50%)",
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut"
      }, "-=1");
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
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
      className="!pt-0" // 👈 Force remove top padding
    >
      <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 md:grid-cols-2 items-center">
        <Shapes/>
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
    </Bounded>
  );
};

export default Hero;
