import type { SVGProps } from "react";

type IconVolumeProps = SVGProps<SVGSVGElement> & {
  volume: number;
};

const IconVolume = ({ volume, ...props }: IconVolumeProps) =>
  volume === 0 ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="75"
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <style>{".cls-2{fill:#231f20}"}</style>
      </defs>
      <title>{"volume-off"}</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="volume-off">
          <g id="volume-off-2" data-name="volume-off">
            <path d="m16.91 14.08 1.44 1.44a6 6 0 0 0-.07-7.15 1 1 0 1 0-1.56 1.26 4 4 0 0 1 .19 4.45Z" />
            <path d="M21 12a6.51 6.51 0 0 1-1.78 4.39l1.42 1.42A8.53 8.53 0 0 0 23 12a8.75 8.75 0 0 0-3.36-6.77 1 1 0 1 0-1.28 1.54A6.8 6.8 0 0 1 21 12ZM15 12.17V4a1 1 0 0 0-1.57-.83L9 6.2ZM4.74 7.57H2a1 1 0 0 0-1 1v6.86a1 1 0 0 0 1 1h5l6.41 4.4A1.06 1.06 0 0 0 14 21a1 1 0 0 0 1-1v-2.17ZM4.71 3.29a1 1 0 0 0-1.42 1.42l16 16a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42Z" />
          </g>
        </g>
      </g>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="75"
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <style>{".cls-2{fill:#231f20}"}</style>
      </defs>
      <title>{"volume-up"}</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="volume-up">
          <g id="volume-up-2" data-name="volume-up">
            <path d="M18.28 8.37a1 1 0 1 0-1.56 1.26 4 4 0 0 1 0 4.74A1 1 0 0 0 17.5 16a1 1 0 0 0 .78-.37 6 6 0 0 0 0-7.26Z" />
            <path d="M19.64 5.23a1 1 0 1 0-1.28 1.54A6.8 6.8 0 0 1 21 12a6.8 6.8 0 0 1-2.64 5.23 1 1 0 0 0-.13 1.41A1 1 0 0 0 19 19a1 1 0 0 0 .64-.23A8.75 8.75 0 0 0 23 12a8.75 8.75 0 0 0-3.36-6.77ZM14.47 3.12a1 1 0 0 0-1 0L7 7.57H2a1 1 0 0 0-1 1v6.86a1 1 0 0 0 1 1h5l6.41 4.4A1.06 1.06 0 0 0 14 21a1 1 0 0 0 1-1V4a1 1 0 0 0-.53-.88Z" />
          </g>
        </g>
      </g>
    </svg>
  );

export default IconVolume;
