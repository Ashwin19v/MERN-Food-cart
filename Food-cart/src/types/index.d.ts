declare module "react-rating-stars-component" {
  import { ComponentType } from "react";

  interface ReactStarsProps {
    count?: number;
    value?: number;
    onChange?: (newRating: number) => void;
    size?: number;
    isHalf?: boolean;
    edit?: boolean;
    color?: string;
    activeColor?: string;
    emptyIcon?: React.ReactNode;
    halfIcon?: React.ReactNode;
    filledIcon?: React.ReactNode;
  }

  const ReactStars: ComponentType<ReactStarsProps>;
  export default ReactStars;
}
