import {LabelProps} from '../../../models/label';
import style from './Coming.module.scss';

function Coming({label}: LabelProps) {
  return <div className={style.coming}>{label}</div>;
}

export default Coming;
