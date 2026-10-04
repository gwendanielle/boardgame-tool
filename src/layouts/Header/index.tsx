import Logo from '@/assets/logo/logo@3x.png';
import styles from './style.module.scss';

const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <img src={Logo} alt="Logo" width={240}/>
        </div>
    );
}
export default Header;