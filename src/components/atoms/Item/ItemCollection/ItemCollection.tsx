import {CollectionProps} from '../../../../models/collection';
import Image from '../../Image/Image';
import Button from '../../Button/Button';
import style from './ItemCollection.module.scss';

function ItemProduct({label, image, route, click}: CollectionProps) {
  return (
    <div className={style.item}>
      <div>
        <Image
          url={image.url ? image.url : './../../../vite.svg'}
          alt={image.alt}
        />
        {route && <Button
          label={label ? label : 'No Title'}
          click={() => click(`/react-atomic-design/collection/${route}`)}
        />}
      </div>
    </div>
  );
}

export default ItemProduct;
