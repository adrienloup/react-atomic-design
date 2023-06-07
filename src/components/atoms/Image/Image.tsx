import {ImageProps} from '../../../models/image';

function Image({url, alt}: ImageProps) {
  return (
    <img
      src={url}
      alt={alt}
    />
  );
}

export default Image;