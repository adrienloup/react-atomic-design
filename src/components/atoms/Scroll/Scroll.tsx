import {RefProps} from '../../../models/ref';
import style from './Scroll.module.scss';

function Scroll({objectRef}: RefProps) {
  return <div
    className={style.scroll}
    ref={objectRef}
  ></div>;
}

export default Scroll;
