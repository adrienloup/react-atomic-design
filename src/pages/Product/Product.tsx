import {useRef, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {DataProps} from '../../models/data';
import Progressbar from '../../components/atoms/Progressbar/Progressbar';
import Transition from '../../components/atoms/Transition/Transition';
import Related from '../../components/molecules/Related/Related';
import Header from '../../components/molecules/Header/Header';
import Footer from '../../components/molecules/Footer/Footer';
import Scroll from '../../components/atoms/Scroll/Scroll';
import Cursor from '../../components/atoms/Cursor/Cursor';
import Alert from '../../components/atoms/Alert/Alert';
import Image from '../../components/atoms/Image/Image';
import New from '../../components/atoms/New/New';
import clamp from '../../utils/clamp';
import transitionStyle from '../../components/atoms/Transition/Transition.module.scss';
import style from './Product.module.scss';

function Product({data}: DataProps) {
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

  const onClick = (route: string) => {
    if (location.pathname === route) return;
    transition.current?.classList.remove(`${transitionStyle.done}`);
    transition.current?.classList.add(`${transitionStyle.start}`);
    setTimeout(() => {
      page.current!.scrollTo(0,0);
      navigate(route);
      transition.current?.classList.remove(`${transitionStyle.start}`);
      transition.current?.classList.add(`${transitionStyle.end}`);
      setTimeout(() => {
        transition.current?.classList.remove(`${transitionStyle.start}`);
        transition.current?.classList.add(`${transitionStyle.done}`)
        setTimeout(() => transition.current?.classList.remove(`${transitionStyle.end}`), 800);
      }, 800);
    }, 800);
  };

  const currentProduct = (route: string) => {
    return data?.product_list.find((product: {route: [{text: string}]}) => (
      product.route[0].text === route.split('/').pop()
    ));
  };

  const currentCollection = () => {
    return data?.collection_list.find((collection: {id: string}) => (
      collection.id === currentProduct(location.pathname)?.collection_id
    ));
  };

  const productList = () => {
    return data?.product_list.filter((product: {collection_id: number}) => (
      product.collection_id === currentProduct(location.pathname)?.collection_id
        ? product.collection_id !== null
        : null
    ));
  };

  const productListed = () => {
    return productList().filter((product: {id: number}) => (
      product.id !== currentProduct(location.pathname)?.id
    ));
  };

  const product = {
    id: currentProduct(location.pathname)?.id
      ? currentProduct(location.pathname).id
      : false,
    title: currentProduct(location.pathname)?.title[0]?.text
      ? currentProduct(location.pathname).title[0].text
      : 'No Title',
    description: currentProduct(location.pathname)?.description[0]?.text
      ? currentProduct(location.pathname).description[0].text
      : 'No Description',
    long_description: currentProduct(location.pathname)?.long_description?.length > 0
      ? currentProduct(location.pathname).long_description
      : [{text: 'No Description'}],
    ingredients: currentProduct(location.pathname)?.ingredients?.length > 0
      ? currentProduct(location.pathname).ingredients
      : [{text: 'No Ingredient'}],
    how_to_use: currentProduct(location.pathname)?.how_to_use?.length > 0
      ? currentProduct(location.pathname).how_to_use
      : [{text: 'No Step'}],
    url: currentProduct(location.pathname)?.image?.url
      ? currentProduct(location.pathname).image.url
      : './../../../vite.svg',
    price: currentProduct(location.pathname)?.price[0]?.text
      ? '£' + currentProduct(location.pathname).price[0].text
      : 'No Price',
    new: currentProduct(location.pathname)?.new
      ? currentProduct(location.pathname).new
      : false,
    collection: currentCollection()?.title[0]?.text
      ? currentCollection().title[0].text + ' Collection'
      : 'No Collection'
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
        {product.id
          ? (<>
            {product.new && <New cssClass={style.new} label={'New Product'} />}
            <div className={style.image}>
              <Image
                url={product.url}
                alt=''
              />
            </div>
            <h1 className={style.title}>{product.title}</h1>
            <div className={style.price}>{product.price}</div>
            <div className={style.description}>
              <h2 className={style.subtitle}>{product.description}</h2>
              {product.long_description.map(
                (description:
                  {text: string},
                  index: number
                ) => <p key={index}>{description.text}</p>
              )}
            </div>
            <div className={style.ingredients}>
              <h2 className={style.subtitle}>Ingredients</h2>
              {product.ingredients.map(
                (ingredient:
                  {text: string},
                  index: number
                ) => <p key={index}>{ingredient.text}</p>
              )}
            </div>
            <div className={style['how-to-use']}>
              <h2 className={style.subtitle}>How To Use</h2>
              {product.how_to_use.map(
                (step:
                  {text: string, spans: object[]},
                  index: number
                ) => (
                  step.spans?.length > 0
                    ? <div key={index}>{step.text}</div>
                    : <p key={index}>{step.text}</p>
                )
              )}
            </div>
            <Related
              title={product.collection}
              list={productListed()}
              click={(route: string) => onClick(route)}
            />
          </>)
          : <Alert label='Sorry, Product not found in One Beauty Store.' />
        }
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

export default Product;