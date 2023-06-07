import {useState, useRef, useEffect} from 'react';
import style from './Cursor.module.scss';

function Cursor() {
  const [mousePos, setMousePos] = useState({x: 0, y: 0});
  const [cursorPos, setCursorPos] = useState({x: 0, y: 0});
  const [distance, setDistance] = useState({x: 0, y: 0});
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    const mouseMove = (event: {clientX: number; clientY: number;}) => {
      setMousePos({x: event.clientX, y: event.clientY});
    };
    
    setDistance({x: mousePos.x - cursorPos.x, y: mousePos.y - cursorPos.y});
    setCursorPos({x: cursorPos.x += distance.x / 5, y: cursorPos.y += distance.y / 5});
    
    if (!cursor) return;
    cursor.style.left = cursorPos.x + 'px';
    cursor.style.top = cursorPos.y + 'px';

    window.addEventListener('mousemove', mouseMove);
    return () => {
      window.removeEventListener('mousemove', mouseMove, false);
    };
  }, [mousePos]);

  return (
    <div
      id='cursor'
      className={style.cursor}
      ref={ref}
    >
      <span></span>
    </div>
  );
}

export default Cursor;