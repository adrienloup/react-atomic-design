import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {ButtonProps} from '../../../models/button';
import style from '../Cursor/Cursor.module.scss';

function Button({cssClass, label, to, href, ariaLabel, ariaExpanded, click}: ButtonProps) {
  const [cursor, setCursor] = useState(document.querySelector('#cursor'));
  const mouseEnter = () => cursor ? cursor.classList.add(`${style.scaled}`) : null;
  const mouseLeave = () => cursor ? cursor.classList.remove(`${style.scaled}`) : null;

  useEffect(() => {
    setCursor(document.querySelector('#cursor'));
  });
  
  const button = () => {
    if (to) {
      return (
        <Link
          className={cssClass}
          to={to}
        >{label}</Link>
      );
    } else if(href) {
      return (
        <a
          href={href}
          className={cssClass}
          target='_blank'
          rel='noreferrer'
          aria-label={ariaLabel}
        >{label}</a>
      );
    } else {
      return (
        <button
          type='button'
          className={cssClass}
          aria-label={ariaLabel}
          aria-expanded={ariaExpanded}
          onClick={click}
          onMouseEnter={() => mouseEnter()}
          onMouseLeave={() => mouseLeave()}
        >{label}</button>
      );
    }
  };

  return <>{button()}</>;
}

export default Button;
