import {FrameProps} from '../../../models/frame';
import style from './Qualify.module.scss';

function Qualify({data, objectRef}: FrameProps) {
  const title = (data?.frame3) ? data?.frame3[0]?.title[0]?.text.split(' ') : false;

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
        return <span key={j}>{word}</span>;
      });
      return <span key={i}>{_word}</span>
    });
  };

  return (
    <div
      className={style.qualify}
      ref={objectRef}
    >
      <div className={style.title}>{listed(list(title))}</div>
    </div>
  );
}

export default Qualify;
