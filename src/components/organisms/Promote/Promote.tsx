import {FrameProps} from '../../../models/frame';
import style from './Promote.module.scss';

function Promote({data, objectRef}: FrameProps) {
  const title = (data?.frame2) ? data?.frame2[0]?.title[0]?.text.split(' ') : false;
  const images = [
    data?.frame2[0]?.image1?.url,
    data?.frame2[0]?.image2?.url,
    data?.frame2[0]?.image3?.url
  ];

  const list = (words: string[]) => {
    const groups = [];
    for (let i = 0; i < words.length; i += 3) {
      groups.push(words.slice(i, i + 3).join(' '));
    }
    return groups;
  };

  const listed = (words: string[]) => {
    return words.map((word: string, i: number) => {
      const _word = word.split(' ').map((word: string, j: number) => {
        return <span key={j}>{word}{j === 1 ? <span><em style={{backgroundImage: `url(${images[i]})`}}></em></span> : ''}</span>;
      });
      return _word;
    });
  };

  return (
    <div
      className={style.promote}
      ref={objectRef}
    >
      <div className={style.title}>{listed(list(title))}</div>
    </div>
  );
}

export default Promote;
