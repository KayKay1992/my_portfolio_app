import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Button from "../Biography/Button";

/**
 * Props for `LinkBlock`.
 */
export type LinkBlockProps = SliceComponentProps<Content.LinkBlockSlice>;

/**
 * Component for "LinkBlock" Slices.
 */
const LinkBlock: FC<LinkBlockProps> = ({ slice }) => {
  return (
    <Button
               linkField={slice.primary.project_link}
               label={slice.primary.button}
               className="mt-6 not-prose"
             />
  );
};

export default LinkBlock;
