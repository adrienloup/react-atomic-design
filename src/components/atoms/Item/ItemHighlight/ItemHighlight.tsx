import {HighlightProps} from '../../../../models/highlight';
import Image from '../../Image/Image';
import style from './ItemHighlight.module.scss';

function ItemHighlight({cssClass, image}: HighlightProps) {
  return (
    <div className={`${style.item} ${cssClass.item}`}>
      <div className={`${style['item_image']}`}>
        <Image
          url={image.url ? image.url : './../../../vite.svg'}
          alt={image.alt}
        />
      </div>
    </div>
  );
}

export default ItemHighlight;
