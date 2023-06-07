import {ProductProps} from '../../../../models/product';
import Image from '../../Image/Image';
import Button from '../../Button/Button';
import New from '../../New/New';
import style from './ItemProduct.module.scss';

function ItemProduct({cssClass, title, description, image, isNew, route, click}: ProductProps) {
  return (
    <div className={`${style.item} ${cssClass.item}`}>
      <div className={`${style['item_image']}`}>
        <Image
          url={image.url ? image.url : './../../../vite.svg'}
          alt={image.alt}
        />
        {isNew && <New cssClass={cssClass['item_new']} label={'New'} />}
      </div>
      <div className={`${style['item_figcaption']} ${cssClass['item_figcaption']}`}>
        <strong>{title ? title : 'No Title'}</strong>
        <p>{description ? description : 'No Description'}</p>
        {route && <Button
          cssClass={`${style['item_button']} ${cssClass['item_button']}`}
          label='View product'
          click={() => click(`/react-atomic-design/product/${route}`)}
        />}
      </div>
    </div>
  );
}

export default ItemProduct;
