import type { WithChildren } from "@/components/ui-types";

type ContainerProps = {
  className?: string;
};

export default function Container({ children, className = "" }: WithChildren<ContainerProps>) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
