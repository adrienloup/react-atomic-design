import {ListProps} from '../../../models/list';

function List({tag, cssClass, list}: ListProps) {
  const Tag = (tag) ? 'ul' : 'div';
  return <Tag className={cssClass.list}>{list}</Tag>;
}

export default List;