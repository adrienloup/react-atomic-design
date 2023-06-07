import {DataProps} from './data';
import {RefProps} from './ref';

export interface FooterProps {
  data: DataProps['data'];
  objectRef: RefProps['objectRef'];
  click: (route: string) => void;
}
