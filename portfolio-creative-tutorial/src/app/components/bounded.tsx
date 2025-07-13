import React from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
  ({ as: Comp = "section", className, children, ...restProps }, ref) => {
    return (
      <Comp
        ref={ref}
        className={clsx(// Base padding
          "px-4 py-10",
          // Responsive padding
          "sm:px-6 sm:py-12",
          "md:py-14",
          "lg:py-16",
          // Additional custom classes
          className)}
        {...restProps}
      >
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </Comp>
    );
  }
);
Bounded.displayName = "Bounded";

export default Bounded;
