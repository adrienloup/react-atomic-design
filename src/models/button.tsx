import {LabelProps} from './label';

export interface ButtonProps {
  label?: LabelProps['label'];
  cssClass?: string;
  to?: string;
  href?: string;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  click?: () => void;
}