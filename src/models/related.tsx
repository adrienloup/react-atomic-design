import {LabelProps} from './label';

export interface RelatedProps {
  title: LabelProps['label'];
  list: any[];
  click: (route: string) => void;
}