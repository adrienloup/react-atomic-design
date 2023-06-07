import {FooterProps} from '../../../models/footer';
import ItemLink from '../../atoms/Item/ItemLink/ItemLink';
import List from '../../molecules/List/List';
import style from './Footer.module.scss';

function Footer({data, objectRef, click}: FooterProps) {

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
    <footer
      className={style.footer}
      role='contentinfo'
      ref={objectRef}
    >
      <div className={style.inner}>
        <h2 className={style.title}>Collections</h2>
        <List
          tag={true}
          cssClass={style}
          list={listed(data?.collection_list, '/react-atomic-design/collection/')}
        />
      </div>
      <div className={style.inner}>
        <h2 className={style.title}>Website</h2>
        <List
          tag={true}
          cssClass={style}
          list={listed([
            {id: 0, title: [{text: 'Shop'}], route: [{text: '/react-atomic-design/shop'}]},
            {id: 1, title: [{text: 'Contact'}], route: [{text: '/react-atomic-design/contact'}]},
            {id: 2, title: [{text: 'Sitemap'}], route: [{text: '/react-atomic-design/sitemap'}]}
          ], '')}
        />
      </div>
      <div className={style.copy}>One Beauty &copy;</div>
    </footer>
  );
}

export default Footer;
