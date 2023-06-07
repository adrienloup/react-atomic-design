import {RelatedProps} from '../../../models/related';
import ItemProduct from '../../atoms/Item/ItemProduct/ItemProduct';
import List from '../../molecules/List/List';
import style from './Related.module.scss';

function Related({title, list, click}: RelatedProps) {

  const listed = () => {
    return list.map(
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
          click={click!}
        />
      )
    );
  };

  return (
    <div className={style.related}>
      <h2 className={style.title}>{title}</h2>
      {list.length > 0 ?
        <List
          cssClass={style}
          list={listed()}
        />
      : <div className={style.empty}>No item found</div>}
    </div>
  );
}

export default Related;
