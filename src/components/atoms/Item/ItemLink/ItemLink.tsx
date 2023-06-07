import {LinkProps} from '../../../../models/link';
import Button from '../../Button/Button';
import style from './ItemLink.module.scss';

function ItemLink({cssClass, label, route, click}: LinkProps) {
  return (
    <li className={`${cssClass.item}`}>
      <Button
        cssClass={`${style.link} ${cssClass.link}`}
        label={label}
        click={() => click(`${route}`)}
      />
    </li>
  );
}

export default ItemLink;
