import {DataProps} from './data';

import {RefProps} from './ref';

export interface FrameProps {
  data: DataProps['data'];
  objectRef?: RefProps['objectRef'];
  cssClass?: string;
  click?: (route: string) => void;
}
