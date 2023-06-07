import {FrameProps} from '../../../models/frame';
import ItemHighlight from '../../atoms/Item/ItemHighlight/ItemHighlight';
import ItemProduct from '../../atoms/Item/ItemProduct/ItemProduct';
import Button from '../../atoms/Button/Button';
import List from '../../molecules/List/List';
import style from './ProductList.module.scss';

function ProductList({data, click}: FrameProps) {

  const productList = () => {
    return data?.product_list.map(
      (item: {
        id: number,
        title: [{text: string}],
        description: [{text: string}],
        image: {url: string, alt:string},
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
          click={click!}
        />
      )
    );
  };

  const highlightList = () => {
    return data?.highlight_list.map(
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

  const list = (item: object[]) => {
    const group = [];
    for (let i = 0; i < item.length; i++) {
      i < 3 ? group.push(item[i]) : null;
    }
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

  return (
    <div className={style['product-list']}>
      <Button
        cssClass={style.button}
        label={`${productList().length} items in One Beauty Shop`}
        click={() => click!('/react-atomic-design/shop')}
      />
      <List
        cssClass={style}
        list={listed([
          ...list(listed(highlightList())),
          ...list(listed(productList()))
        ])}
      />
    </div>
  );
}

export default ProductList;
