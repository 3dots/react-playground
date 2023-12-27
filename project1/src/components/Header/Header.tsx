import atomImg from '@/assets/react-core-concepts.png';
import styles from './Header.module.scss';

export function Header() {

    const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

    function genRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    const randText = () => {
        return reactDescriptions[genRandomInt(reactDescriptions.length)];
    };

    return (
        <header className={styles.header}>
            <img src={atomImg} alt="Stylized atom" />
            <h1>React Essentials</h1>
            <p>
                {randText()} React concepts you will need for almost any app you are
                going to build!
            </p>
        </header>
    );
}