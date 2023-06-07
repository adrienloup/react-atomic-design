import {DataProps} from './data';

export interface MenuProps {
  data?: DataProps['data'];
  click: (route: string) => void;
}