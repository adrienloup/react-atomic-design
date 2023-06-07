import {DataProps} from './data';

export interface HeaderProps {
  data: DataProps['data'];
  click: (route: string) => void;
}