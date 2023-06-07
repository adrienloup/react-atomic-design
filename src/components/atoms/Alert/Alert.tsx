import {LabelProps} from '../../../models/label';
import style from './Alert.module.scss';

function Alert({label}: LabelProps) {
  return <div className={style.alert}>{label}</div>;
}

export default Alert;
