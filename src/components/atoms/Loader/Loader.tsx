import {useState, useRef} from 'react';
import {DataProps} from '../../../models/data';
import style from './Loader.module.scss';

function Loader({data}: DataProps) {
  const [percent, setPercent] = useState(0);
  const [bottom, setBottom] = useState(0);
  const counter = useRef(0);
  const urls: string[] = [];

  for (const key in data) {
    const element = data[key];
    if (Array.isArray(element)) {
      element.forEach((item) => {
        if (item.image && item.image.url) urls.push(item.image.url);
      });
    }
  }

  const loaded = () => {
    counter.current += 1;
    setPercent(Math.round(counter.current * 100 / urls.length));
    setBottom(Math.round(counter.current * 100 / urls.length) - 12); // Without height
    if (counter.current >= urls.length)
      document.documentElement.classList.add(`${style.loaded}`);
  };

  return (
    <div className={style.loader}>
      <div className={style.label}>One</div>
      <div
        className={style.percent}
        style={{bottom: `${bottom}%`}}
      >
        <div>{percent}%</div>
      </div>
      <div className={style.images}>
        {urls.map((url, index) => 
          <img 
            key={index}
            src={url}
            alt=''
            onLoad={loaded}
          />
        )}
      </div>
    </div>
  );
}

export default Loader;