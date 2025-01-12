import type { ComponentPropsWithoutRef, SVGProps } from "react";

interface LogoSvgLightProps extends ComponentPropsWithoutRef<"svg"> {
  title?: string;
}

export function LogoSvg(props: LogoSvgLightProps) {
  const title = props.title || "logo";

  return (
    <svg
      height="24"
      width="22"
      viewBox="0 0 22 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>
      <g fill="currentColor">
        <path d="M21.56 6.41a0.76 0.76 0 0 0-0.39-0.66l-9.87-5.65a0.76 0.76 0 0 0-0.76 0l-7.22 4.12 1.99 1.15 5.43-3.1a0.38 0.38 0 0 1 0.36 0l7.52 4.28-4.72 2.7-0.03-3.43-2-1.15 0.05 6.81 5.93 3.43v-2.28l-2.93-1.7 4.65-2.65 1.99-1.12v-0.76z" />
        <path d="M21.56 9.43l-1.99 1.14v6.21a0.38 0.38 0 0 1-0.2 0.32l-7.45 4.27v-5.25l2.89 1.63 1.99-1.16-5.88-3.32-5.88 3.32 1.99 1.16 2.89-1.63v7.52l0.62 0.35c0.24 0.13 0.51 0.13 0.76 0l9.88-5.65a0.76 0.76 0 0 0 0.38-0.66v-8.25z" />
        <path d="M7.94 20.23v2.27l-7.28-4.15a0.76 0.76 0 0 1-0.38-0.67v-11.27c0-0.28 0.15-0.52 0.38-0.66l0.67-0.38 1.99 1.13-0.01 0.01 4.61 2.63 0.02-3.3 1.98-1.14-0.03 6.78-5.9 3.42v-2.29l3-1.73-4.72-2.69v8.59c0 0.15 0.06 0.27 0.19 0.32l5.48 3.13z" />
      </g>
    </svg>
  );
}
