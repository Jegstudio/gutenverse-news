import HeroArchiveComponent from './hero-components/hero-archive-component';
import HeroComponent from './hero-components/hero-component';

const HeroHandler = (props) => {
    const { type = 'block', heroType } = props;
    let numberPostShow;

    if (['13'].includes(heroType)) {
        numberPostShow = 1;
    } else if (['9', 'skew'].includes(heroType)) {
        numberPostShow = 2;
    } else if (['4', '5', '8'].includes(heroType)) {
        numberPostShow = 3;
    } else if (['1', '3', '6', '7'].includes(heroType)) {
        numberPostShow = 4;
    } else if (['2', '11', '12'].includes(heroType)) {
        numberPostShow = 5;
    } else if (['10'].includes(heroType)) {
        numberPostShow = 7;
    } else if (['14'].includes(heroType)) {
        numberPostShow = 8;
    }

    return 'archive' === type ? <HeroArchiveComponent {...{ ...props, numberPostShow }} /> : <HeroComponent {...{ ...props, numberPostShow }} />;
};

export { HeroHandler };