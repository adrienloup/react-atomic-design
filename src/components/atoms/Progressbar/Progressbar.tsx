import {RefProps} from '../../../models/ref';
import style from './Progressbar.module.scss';

function Progressbar({objectRef}: RefProps) {
  return <div
    className={style.progressbar}
    ref={objectRef}
    role='progressbar'
    aria-valuemin={0}
    aria-valuemax={100}
  ></div>;
}

export default Progressbar;
