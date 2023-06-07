import {LabelProps} from './label';

export interface LinkProps {
  label: LabelProps['label'];
  cssClass: any;
  route: string;
  click: (route: string) => void;
}