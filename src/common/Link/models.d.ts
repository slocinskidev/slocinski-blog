export type LinkVariant = 'nav' | 'regular' | 'hamburger';

export interface LinkProps {
  children: string | React.ReactNode;
  url: string;
  variant?: LinkVariant;
  ariaLabel?: string;
  customClass?: string;
  activeClass?: string;
}
