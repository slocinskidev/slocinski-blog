export type LinkVariant = 'regular' | 'tag';

export interface LinkProps {
  children: string | React.ReactNode;
  url: string;
  variant?: LinkVariant;
  ariaLabel?: string;
  customClass?: string;
  activeClass?: string;
}
