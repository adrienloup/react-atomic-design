import {useRef, useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {DataProps} from '../../models/data';
import ItemHighlight from '../../components/atoms/Item/ItemHighlight/ItemHighlight';
import ItemProduct from '../../components/atoms/Item/ItemProduct/ItemProduct';
import Progressbar from '../../components/atoms/Progressbar/Progressbar';
import Transition from '../../components/atoms/Transition/Transition';
import Header from '../../components/molecules/Header/Header';
import Footer from '../../components/molecules/Footer/Footer';
import Filter from '../../components/molecules/Filter/Filter';
import Scroll from '../../components/atoms/Scroll/Scroll';
import Cursor from '../../components/atoms/Cursor/Cursor';
import Coming from '../../components/atoms/Coming/Coming';
import List from '../../components/molecules/List/List';
import clamp from '../../utils/clamp';
import style from './Shop.module.scss';
import transitionStyle from '../../components/atoms/Transition/Transition.module.scss';

function Shop({data}: DataProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const page = useRef<HTMLDivElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLElement>(null);
  const footer = useRef<HTMLElement>(null);
  const progressbar = useRef<HTMLDivElement>(null);
  const transition = useRef<HTMLDivElement>(null);
  const size = useRef([0,0,0,0,0]);
  const [actived, setActived] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  useEffect(() => {
    onResize();
    onScroll();
  });

  const onResize = () => {
    size.current = [
      page.current!.clientWidth,
      page.current!.clientHeight,
      main.current!.clientHeight,
      footer.current!.clientHeight,
      main.current!.clientHeight + footer.current!.clientHeight
    ];
    scroll.current!.style.height = size.current[4] + 'px';
    onScroll();
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

  const productList = () => {
    return data?.product_list.filter((product: {filter_id: number}) => (
      actived !== 0 ? product.filter_id === actived : product
    ));
  };

  const highlightList = () => {
    return data?.highlight_list.filter((highlight: {filter_id: number}) => (
      actived !== 0 ? highlight.filter_id === actived : highlight
    ));
  };

  const productListed = () => {
    return productList().map(
      (item: {
        id: number,
        title: [{text: string}],
        description: [{text: string}],
        image: {url: string, alt: string},
        new: boolean,
        route: [{text: string}]
      }) => (
        <ItemProduct
          key={item.id}
          cssClass={style}
          title={item.title[0]?.text}
          description={item.description[0]?.text}
          image={item.image}
          isNew={item.new}
          route={`${item.route[0]?.text}`}
          click={(route: string) => handleRoute(route)}
        />
      )
    );
  };

  const highlightListed = () => {
    return highlightList().map(
      (item: {
        id: number,
        image: {url: string, alt: string}
      }) => (
        <ItemHighlight
          key={item.id}
          cssClass={style}
          image={item.image}
        />
      )
    );
  };

  const list = () => {
    const group = [];

    actived !== 0
      ? (
        group.push([
          ...highlightListed(),
          ...productListed()
        ])
      ) : (
        group.push(listed([
          ...highlightListed(),
          ...productListed()
        ]))
      );

    return group;
  };

  const listed = (item: object[]) => {
    let i = item.length;
    while (--i > 0) {
      const index = Math.floor(Math.random() * (i + 1));
      [item[index], item[i]] = [item[i], item[index]];
    }
    return item;
  };

  const handleRoute = (route: string) => {
    if (location.pathname === route) return;
    transition.current?.classList.remove(`${transitionStyle.done}`);
    transition.current?.classList.add(`${transitionStyle.start}`);
    setTimeout(() => {
      page.current!.scrollTo(0,0);
      navigate(route);
    }, 800);
  };

  const handleId = (id: number) => {
    setActived(id);
  };

  return (
    <div
      className={style.page}
      ref={page}
      onScroll={onScroll}
    >
      <Header
        data={data}
        click={(route: string) => handleRoute(route)}
      />
      <main
        className={style.main}
        ref={main}
        role='main'
      >
        <h1 className={style.title}>
          {productListed().length} {productListed().length > 1 ? 'Items' : 'Item'}
        </h1>
        <Filter
          list={data?.filter_list}
          actived={actived}
          click={(id: number) => handleId(id)}
        />
        {productListed().length > 0
          ? (<>
              <List
                cssClass={style}
                list={list()}
              />
            </>)
          : <div className={style.empty}>No item found</div>
        }
        <Coming label='More Coming Soon' />
      </main>
      <Footer
        data={data}
        objectRef={footer}
        click={(route: string) => handleRoute(route)}
      />
      <Progressbar objectRef={progressbar} />
      <Transition objectRef={transition} />
      <Scroll objectRef={scroll} />
      <Cursor />
    </div>
  );
}

export default Shop;