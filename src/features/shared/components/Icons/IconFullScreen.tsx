import type { SVGProps } from "react";
const FullScreenIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    viewBox="0 0 32 32"
    id="i-fullscreen"
    fill="none"
    stroke="currentcolor"
    stroke-width="2"
    {...props}
  >
    <title>Fullscreen icon</title>
    <path d="M4 12 L4 4 12 4 M20 4 L28 4 28 12 M4 20 L4 28 12 28 M28 20 L28 28 20 28" />
  </svg>
);

export default FullScreenIcon;
