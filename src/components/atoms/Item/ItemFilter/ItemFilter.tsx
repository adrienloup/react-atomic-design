import Button from '../../Button/Button';
import style from './ItemFilter.module.scss';

function ItemFilter({id, label, actived, click}: any) {
  return (
    <li className={`${style.item}`}>
      <Button
        cssClass={`${style.button} ${(actived ? style.actived: '')}`}
        label={label}
        click={() => click(id)}
      />
    </li>
  );
}

export default ItemFilter;
