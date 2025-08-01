import React from "react";
import clsx from "clsx";

type BoundedProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithRef<T>;

function BoundedBase(
  props: BoundedProps<"section">,
  ref: React.Ref<HTMLElement>
) {
  const {
    as: Component = "section",
    className,
    children,
    ...rest
  } = props;

  return (
    <Component
      ref={ref}
      className={clsx(
        "px-4 py-10", // Default padding (can be overridden)
        "sm:px-6 sm:py-12",
        "md:py-14",
        "lg:py-10",
        className
      )}
      {...rest}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </Component>
  );
}

const BoundedWithRef = React.forwardRef(BoundedBase);

const Bounded = <T extends React.ElementType = "section">(
  props: BoundedProps<T>
) => {
  return (
    <BoundedWithRef
      {...(props as unknown as BoundedProps<"section">)}
    />
  );
};

Bounded.displayName = "Bounded";

export default Bounded;