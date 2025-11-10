import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type PropsWithChildren,
} from "react";

import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = PropsWithChildren<{
  as?: T;
  className?: string;
}> &
  Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component className={cn("vb-container", className)} {...rest}>
      {children}
    </Component>
  );
}

