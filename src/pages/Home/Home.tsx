import {useRef, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {DataProps} from '../../models/data';
import CollectionList from '../../components/organisms/CollectionList/CollectionList';
import ProductList from '../../components/organisms/ProductList/ProductList';
import Progressbar from '../../components/atoms/Progressbar/Progressbar';
import Transition from '../../components/atoms/Transition/Transition';
import Promote from '../../components/organisms/Promote/Promote';
import Qualify from '../../components/organisms/Qualify/Qualify';
import History from '../../components/organisms/History/History';
import Header from '../../components/molecules/Header/Header';
import Footer from '../../components/molecules/Footer/Footer';
import Scroll from '../../components/atoms/Scroll/Scroll';
import Cursor from '../../components/atoms/Cursor/Cursor';
import Hero from '../../components/organisms/Hero/Hero';
import clamp from '../../utils/clamp';
import lerp from '../../utils/lerp';
import qualifyStyle from '../../components/organisms/Qualify/Qualify.module.scss';
import promoteStyle from '../../components/organisms/Promote/Promote.module.scss';
import historyStyle from '../../components/organisms/History/History.module.scss';
import transitionStyle from '../../components/atoms/Transition/Transition.module.scss';
import style from './Home.module.scss';

function Home({data}: DataProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const page = useRef<HTMLDivElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLElement>(null);
  const footer = useRef<HTMLElement>(null);
  const pageSize = useRef([0,0,0,0,0]);
  const hero = useRef<HTMLDivElement>(null);
  const promote = useRef<HTMLDivElement>(null);
  const qualify = useRef<HTMLDivElement>(null);
  const collection = useRef<HTMLDivElement>(null);
  const history = useRef<HTMLDivElement>(null);
  const progressbar = useRef<HTMLDivElement>(null);
  const transition = useRef<HTMLDivElement>(null);
  const promoteSize = useRef([0,0]);
  const qualifySize = useRef([0,0]);
  const historySize = useRef([0,0]);
  // REQUEST: const scrollTop = useRef(0);
  // REQUEST: const request = useRef(0);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    // REQUEST: request.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', onResize);
      // REQUEST: cancelAnimationFrame(request.current);
    };
  });

  useEffect(() => {
    onResize();
    onScroll();
  });

  const onResize = () => {
    pageSize.current = [
      page.current!.clientWidth,
      page.current!.clientHeight,
      main.current!.clientHeight,
      footer.current!.clientHeight,
      main.current!.clientHeight + footer.current!.clientHeight
    ];
    promoteSize.current = [
      promote.current!.offsetTop,
      promote.current!.clientHeight
    ];
    qualifySize.current = [
      qualify.current!.offsetTop,
      qualify.current!.clientHeight
    ];
    historySize.current = [
      history.current!.offsetTop,
      history.current!.clientHeight
    ];
    scroll.current!.style.height = pageSize.current[4] + 'px';
    onScroll();
  };
  
  const onScroll = () => {
    const sequence1 = clamp(0, 1, (page.current!.scrollTop - (pageSize.current[2] - pageSize.current[1] - pageSize.current[3])) / (pageSize.current[3] * 2));
    const sequence2 = clamp(0, 1, page.current!.scrollTop / (pageSize.current[4] - pageSize.current[1]));
    const sequence3 = clamp(0, 1, page.current!.scrollTop / pageSize.current[1]);
    const positionY1 = (sequence1 * pageSize.current[3]) + (pageSize.current[2] - pageSize.current[3]);
    const positionY2 = sequence3 * pageSize.current[1] * 0.4;
    const positionX = sequence3 * pageSize.current[1] * 0.1;
    const width = sequence2 * pageSize.current[0];
    const opacity = -sequence3 + 1;
    footer.current!.style.transform = `translate3d(0,${positionY1}px,0)`;
    progressbar.current!.style.width = `${width}px`;
    progressbar.current!.setAttribute('aria-valuenow', `${(width * 100 / pageSize.current[0]).toFixed()}`);
    hero.current!.querySelector('h1')!.style.transform = `translate3d(0,${-positionY2}px,0)`;
    hero.current!.querySelector('h1')!.style.opacity = `${opacity}`;
    hero.current!.querySelectorAll('img')[0]!.style.transform = `translate3d(${-positionX}px,${positionY2 * 0.9}px,0)`;
    hero.current!.querySelectorAll('img')[1]!.style.transform = `translate3d(0,${positionY2 * 0.9}px,0)`;
    hero.current!.querySelectorAll('img')[2]!.style.transform = `translate3d(${positionX}px,${positionY2 * 0.9}px,0)`;

    lerp(
      promote.current!,
      promoteSize.current[0] - pageSize.current[1],
      promoteSize.current[0] + promoteSize.current[1],
      promoteStyle.actived,
      page.current!.scrollTop
    );

    lerp(
      qualify.current!,
      qualifySize.current[0] - pageSize.current[1],
      qualifySize.current[0] + qualifySize.current[1],
      qualifyStyle.actived,
      page.current!.scrollTop
    );

    lerp(
      history.current!,
      historySize.current[0] - pageSize.current[1],
      historySize.current[0] + historySize.current[1],
      historyStyle.actived,
      page.current!.scrollTop
    );

    // REQUEST: scrollTop.current = page.current!.scrollTop;
  };

  const onClick = (route: string) => {
    if (location.pathname === route) return;
    transition.current?.classList.remove(`${transitionStyle.done}`);
    transition.current?.classList.add(`${transitionStyle.start}`);
    setTimeout(() => navigate(route), 800);
  };

  // REQUEST: const animate = () => {
  //   request.current = requestAnimationFrame(animate);
  //   const sequence = clamp(0, 1, (scrollTop.current - (size.current[1] - size.current[0] - size.current[2])) / (size.current[2] * 2));
  //   const positionY = (sequence * size.current[2]) + (size.current[1] - size.current[2]);
  //   footer.current!.style.transform = `translate3d(0,${positionY}px,0)`;
  // };

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
        <Hero
          data={data}
          objectRef={hero}
        />
        <Promote
          data={data}
          objectRef={promote}
        />
        <ProductList
          data={data}
          click={(route: string) => onClick(route)}
        />
        <Qualify
          data={data}
          objectRef={qualify}
        />
        <CollectionList
          data={data}
          objectRef={collection}
          click={(route: string) => onClick(route)}
        />
        <History
          data={data}
          objectRef={history}
        />
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

export default Home;
