import {FrameProps} from '../../../models/frame';
import style from './History.module.scss';

function History({data, objectRef}: FrameProps) {
  const title = (data?.frame4) ? data?.frame4[0]?.title[0]?.text : 'No Title';
  const descriptions = (data?.frame4) && data?.frame4[0]?.description?.length > 0
    ? data?.frame4[0].description
    : [{text: 'No Description'}];

  return (
    <div
      className={style.history}
      ref={objectRef}
    >
      <h2 className={style.title}>{title}</h2>
      <div className={style.description}>
        {descriptions.map(
          (description:
            {text: string},
            index: number
          ) => <p key={index}>{description.text}</p>
        )}
      </div>
    </div>
  );
}

export default History;