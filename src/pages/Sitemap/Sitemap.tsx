import {useRef, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {DataProps} from '../../models/data';
import Progressbar from '../../components/atoms/Progressbar/Progressbar';
import Transition from '../../components/atoms/Transition/Transition';
import ItemLink from '../../components/atoms/Item/ItemLink/ItemLink';
import Header from '../../components/molecules/Header/Header';
import Footer from '../../components/molecules/Footer/Footer';
import Scroll from '../../components/atoms/Scroll/Scroll';
import Cursor from '../../components/atoms/Cursor/Cursor';
import Coming from '../../components/atoms/Coming/Coming';
import List from '../../components/molecules/List/List';
import clamp from '../../utils/clamp';
import transitionStyle from '../../components/atoms/Transition/Transition.module.scss';
import style from './Sitemap.module.scss';

function Sitemap({data}: DataProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const page = useRef<HTMLDivElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLElement>(null);
  const footer = useRef<HTMLElement>(null);
  const progressbar = useRef<HTMLDivElement>(null);
  const transition = useRef<HTMLDivElement>(null);
  const size = useRef([0,0,0,0,0]);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  useEffect(() => {
    onResize();
    onScroll();
  });

  const listed = (list: {
    id: number;
    title: [{text: string;}];
    route: [{text: string;}];
  }[], directory: string) => list.map((item) => (
    <ItemLink
      key={item.id}
      cssClass={style}
      label={item.title[0]?.text}
      route={`${directory}${item.route[0]?.text}`}
      click={(route: string) => onClick(route)}
    />
  ));

  const onResize = () => {
    size.current = [
      page.current!.clientWidth,
      page.current!.clientHeight,
      main.current!.clientHeight,
      footer.current!.clientHeight,
      main.current!.clientHeight + footer.current!.clientHeight
    ];
    scroll.current!.style.height = size.current[4] + 'px';
  };
  
  const onScroll = () => {
    const sequence1 = clamp(0, 1, (page.current!.scrollTop - (size.current[2] - size.current[1] - size.current[3])) / (size.current[3] * 2));
    const sequence2 = clamp(0, 1, page.current!.scrollTop / (size.current[4] - size.current[1]));
    const positionY = (sequence1 * size.current[3]) + (size.current[2] - size.current[3]);
    const width = sequence2 * size.current[0];
    footer.current!.style.transform = `translate3d(0,${positionY}px,0)`;
    progressbar.current!.style.width = `${width}px`;
    progressbar.current!.setAttribute('aria-valuenow', `${(width * 100 / size.current[0]).toFixed()}`);
  };

  const onClick = (route: string) => {
    if (location.pathname === route) return;
    transition.current?.classList.remove(`${transitionStyle.done}`);
    transition.current?.classList.add(`${transitionStyle.start}`);
    setTimeout(() => navigate(route), 800);
  };

  return (
    <div
      className={style.page}
      ref={page}
      onScroll={onScroll}
    >
      <Header
        data={data}
        click={(route: string) => onClick(route)}
      />
      <main
        className={style.main}
        ref={main}
        role='main'
      >
        <h1 className={style.title}>The Sitemap</h1>
        <div className={style.inner}>
          <h2 className={style.subtitle}>Products</h2>
          <List
            tag={true}
            cssClass={style}
            list={listed(data?.product_list, '/react-atomic-design/product/')}
          />
        </div>
        <div className={style.inner}>
          <h2 className={style.subtitle}>Collections</h2>
          <List
            tag={true}
            cssClass={style}
            list={listed(data?.collection_list, '/react-atomic-design/collection/')}
          />
        </div>
        <div className={style.inner}>
          <h2 className={style.subtitle}>Website</h2>
          <List
            tag={true}
            cssClass={style.list}
            list={listed([
              {id: 0, title: [{text: 'One Beauty Shop'}], route: [{text: '/shop'}]},
              {id: 1, title: [{text: 'Contact Us'}], route: [{text: '/contact'}]},
              {id: 2, title: [{text: 'The Sitemap'}], route: [{text: '/sitemap'}]}
            ], '')}
          />
        </div>
        <Coming label='More Coming Soon' />
      </main>
      <Footer
        data={data}
        objectRef={footer}
        click={(route: string) => onClick(route)}
      />
      <Progressbar objectRef={progressbar} />
      <Transition objectRef={transition} />
      <Scroll objectRef={scroll} />
      <Cursor />
    </div>
  );
}

export default Sitemap;