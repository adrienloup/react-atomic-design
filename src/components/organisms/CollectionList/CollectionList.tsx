import {FrameProps} from '../../../models/frame';
import ItemCollection from '../../atoms/Item/ItemCollection/ItemCollection';
import List from '../../molecules/List/List';
import style from './CollectionList.module.scss';

function CollectionList({data, objectRef, click}: FrameProps) {

  const collectionList = () => {
    return data?.collection_list.map(
      (item: {
        id: string,
        title: [{text: string}],
        image: {url: string, alt: string},
        route: [{text: string}]
      }) => (
        <ItemCollection
          key={item.id}
          label={item.title[0]?.text}
          image={item.image}
          route={`${item.route[0]?.text}`}
          click={click!}
        />
      )
    );
  };

  return (
    <div
      className={style['collection-list']}
      ref={objectRef}
    >
      <List
        cssClass={style}
        list={collectionList()}
      />
    </div>
  );
}

export default CollectionList;