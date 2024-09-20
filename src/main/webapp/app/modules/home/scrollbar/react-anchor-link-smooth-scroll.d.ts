declare module 'react-anchor-link-smooth-scroll' {
  import { ComponentType } from 'react';

  interface AnchorLinkProps {
    href: string;
    offset?: () => number;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    className?: string;
    children?: React.ReactNode;
  }

  const AnchorLink: ComponentType<AnchorLinkProps>;

  export default AnchorLink;
}
