import {HeaderProps} from '../../../models/header';
import Button from '../../atoms/Button/Button';
import Menu from '../../molecules/Menu/Menu';
import style from './Header.module.scss';

function Header({data, click}: HeaderProps) {
  return (
    <header
      className={style.header}
      role='banner'
    >
      <Button
        cssClass={style.button}
        label='One'
        click={() => click('/react-atomic-design/')}
      />
      <div className={style.shadow}>Beauty</div>
      <Menu
        data={data}
        click={click}
      />
    </header>
  );
}

export default Header;
