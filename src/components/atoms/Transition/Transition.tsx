import {useState, useEffect} from 'react';
import style from './Transition.module.scss';

function Transition({objectRef}: any) {
  const [cssClass, setCssClass] = useState('start');

  useEffect(() => {
    setCssClass('end');
    const time = setTimeout(() => setCssClass('done'), 800);
    return () => clearTimeout(time);
  }, []);

  return (
    <div ref={objectRef} className={`${style.transition} ${style[cssClass]}`}>
      <div className={`${style.slide} ${style.slide1}`}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4320 2700' preserveAspectRatio='xMidYMid slice'><g transform='matrix(1,0,0,1,2493.75,1598.25)'><g transform='matrix(3,0,0,3,-240,0)'><path strokeWidth='467' d='M-788.0830078125,-600.4169921875 C-788.0830078125,-600.4169921875 779.75,-315.4169921875 779.75,-315.4169921875 C779.75,-315.4169921875 -796.75,-129.25 -796.75,-129.25 C-796.75,-129.25 -748.9539794921875,-119.81400299072266 -670.1290283203125 0' /></g></g></svg>
      </div>
      <div className={`${style.slide} ${style.slide2}`}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4320 2700' preserveAspectRatio='xMidYMid slice'><g transform='matrix(1,0,0,1,2493.75,1598.25)'><g transform='matrix(3,0,0,3,-240,0)'><path strokeWidth='467' d='M-788.0830078125,-600.4169921875 C-788.0830078125,-600.4169921875 779.75,-315.4169921875 779.75,-315.4169921875 C779.75,-315.4169921875 -796.75,-129.25 -796.75,-129.25 C-796.75,-129.25 756.583984375,177.41600036621094 756.583984375,177.41600036621094 C756.583984375,177.41600036621094 622.7230224609375,192.52099609375 433.2829895019531 0' /></g></g></svg>
      </div>
      <div className={`${style.slide} ${style.slide3}`}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4320 2700' preserveAspectRatio='xMidYMid slice'><g transform='matrix(1,0,0,1,2493.75,1598.25)'><g transform='matrix(3,0,0,3,-240,0)'><path strokeWidth='467' d='M-788.0830078125,-600.4169921875 C-788.0830078125,-600.4169921875 779.75,-315.4169921875 779.75,-315.4169921875 C779.75,-315.4169921875 -796.75,-129.25 -796.75,-129.25 C-796.75,-129.25 756.583984375,177.41600036621094 756.583984375,177.41600036621094 C756.583984375,177.41600036621094 -679.5679931640625,339.468994140625 -800.9329833984375,353.1629943847656' /></g></g></svg>
      </div>
    </div>
  );
}

export default Transition;