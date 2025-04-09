import type { SVGProps } from "react";
const BackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={20} {...props}>
    <title>{"ic_back"}</title>
    <g
      fill="cartas"
      fillRule="evenodd"
      stroke="#f9f5d4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path d="M17 10H1M1 10l8.062-8.062M1 10l8.062 8.062" />
    </g>
  </svg>
);
export default BackIcon;
