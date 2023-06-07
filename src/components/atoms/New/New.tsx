import {NewProps} from '../../../models/new';
import style from './New.module.scss';

function New({cssClass, label}: NewProps) {
  return <div className={`${style.new} ${cssClass}`}>{label}</div>;
}

export default New;
