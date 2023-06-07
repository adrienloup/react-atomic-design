import {ImageProps} from './image';

export interface ProductProps {
  cssClass: any;
  title: string;
  description: string;
  image: ImageProps;
  isNew: boolean;
  route: string;
  click: (route: string) => void;
}