import {useState, useRef, useEffect} from 'react';
import {MenuProps} from '../../../models/menu';
import ItemLink from '../../atoms/Item/ItemLink/ItemLink';
import Button from '../../atoms/Button/Button';
import List from '../../molecules/List/List';
import style from './Menu.module.scss';

function Menu({data, click}: MenuProps) {
  const [actived, setActived] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menu = ref.current;
    const mouseLeave = () => setActived(false);
    if (!menu) return;
    menu.addEventListener('mouseleave', mouseLeave);
    return () => menu.removeEventListener('mouseleave', mouseLeave);
  }, []);
  
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
      click={click!}
    />
  ));

  return (
    <div
      className={`${style.menu} ${actived ? style.actived : ''}`}
      ref={ref}
    >
      <Button
        cssClass={style.button}
        ariaLabel={actived ? 'Close Menu' : 'Show Menu'}
        ariaExpanded={actived}
        click={() => setActived(actived => !actived)}
      />
      <nav
        role='navigation'
        className={style.navigation}
      >
        <List
          tag={true}
          cssClass={style}
          list={[
            ...listed(data?.collection_list, '/react-atomic-design/collection/'),
            ...listed([
              {id: 0, title: [{text: 'One Beauty Shop'}], route: [{text: '/react-atomic-design/shop'}]},
              {id: 1, title: [{text: 'Contact Us'}], route: [{text: '/react-atomic-design/contact'}]},
              {id: 2, title: [{text: 'The Sitemap'}], route: [{text: '/react-atomic-design/sitemap'}]}
            ], '')
          ]}
        />
      </nav>
    </div>
  );
}

export default Menu;
