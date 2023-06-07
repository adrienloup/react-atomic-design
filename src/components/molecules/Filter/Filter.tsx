import {FilterProps} from '../../../models/filter';
import ItemFilter from '../../atoms/Item/ItemFilter/ItemFilter';
import List from '../../molecules/List/List';
import style from './Filter.module.scss';

function Filter({list, actived, click}: FilterProps) {

  const listed = (list: {
    id: number;
    title: [{text: string;}];
  }[]) => list.map(item => (
    <ItemFilter
      key={item.id}
      id={item.id}
      label={item.title[0]?.text}
      actived={actived === item.id}
      click={click}
    />
  ));

  return (
    <div className={style.filter}>
      <List
        tag={true}
        cssClass={style}
        list={[
          ...listed([{id: 0, title: [{text: 'All'}]}]),
          ...listed(list)
        ]}
      />
    </div>
  );
}

export default Filter;
