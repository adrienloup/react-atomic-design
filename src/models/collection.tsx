import {LabelProps} from './label';
import {ImageProps} from './image';

export interface CollectionProps {
  label: LabelProps['label'];
  image: ImageProps;
  route: string;
  click: (route: string) => void;
}