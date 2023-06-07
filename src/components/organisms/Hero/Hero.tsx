import {FrameProps} from '../../../models/frame';
import Image from '../../atoms/Image/Image';
import Arrow from '../../atoms/Arrow/Arrow';
import style from './Hero.module.scss';

function Hero({data, objectRef}: FrameProps) {
  const title = (data?.frame1) ? data?.frame1[0]?.title[0]?.text.split(' ') : false;
  const image1 = (data?.frame1) ? data?.frame1[0]?.image1?.url : false;
  const image2 = (data?.frame1) ? data?.frame1[0]?.image2?.url : false;
  const image3 = (data?.frame1) ? data?.frame1[0]?.image3?.url : false;

  const word = (words: string[]) => {
    return words.map((word: string, index: number) => (
      <span key={index}>{word}</span>
    ));
  };

  const image = (url: string, alt: string) => {
    return (
      <Image
        url={url}
        alt={alt}
      />
    );
  };

  return (
    <div
      className={style.hero}
      ref={objectRef}
    >
      {title && <h1 className={style.title}>{word(title)}</h1>}
      <div className={style.images}>
        {image1 && image(image1, '')}
        {image1 && image(image2, '')}
        {image1 && image(image3, '')}
      </div>
      <Arrow />
    </div>
  );
}

export default Hero;