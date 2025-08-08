import HeroItemComponent from './hero-item-component';

/**
 * Hero Content
 *
 * @param { heroType, index: parentIndex, attr, heroMargin, postData, numberPostShow } param0
 * @returns {JSX.Element}
 */
const HeroContent = ({ heroType, index: parentIndex, attr, heroMargin, postData, numberPostShow }) => {
    let content,
        firstBlock = [],
        secondBlock = [];
    let index = 0;
    let limit = numberPostShow;
    let pagination = parentIndex + 1;

    if (['1', '2', '3', '4', '5', '6', '10', '11', '12'].includes(heroType)) {
        for (let i = parentIndex; i < (limit + parentIndex); i++) {
            let off = pagination * numberPostShow - numberPostShow + index;
            let item = <HeroItemComponent index={index} post={postData[off]} attr={attr} margin={heroMargin} />;
            if (i === parentIndex) {
                firstBlock.push(item);
            } else {
                secondBlock.push(item);
            }
            index++;
        }
        content = (
            <>
                {firstBlock}
                <div className="gvnews_heroblock_scroller">{secondBlock}</div>
            </>
        );
    } else {
        for (let i = parentIndex; i < limit; i++) {
            let off = pagination * numberPostShow - numberPostShow + index;
            secondBlock.push(<HeroItemComponent index={index} post={postData[off]} attr={attr} margin={heroMargin} />);
            index++;
        }
        content = secondBlock;
    }

    return <>{content}</>;
};

/**
 * Hero Content Wrapper
 *
 * @param { index, attr, heightDesktop, heroMargin, heroType, postData, numberPostShow } param0
 * @returns {JSX.Element}
 */
const HeroContentWrapperComponent = ({ index, attr, heightDesktop, heroMargin, heroType, postData, numberPostShow }) => {
    return 'skew' === heroType ? (
        <div className="gvnews_heroblock_wrapper_skew">
            <div
                className="gvnews_heroblock_wrapper"
                style={{
                    height: `${heightDesktop}px`,
                }}>
                <HeroContent {...{ heroType, index, attr, heroMargin, postData, numberPostShow }} />
            </div>
        </div>
    ) : (
        <div
            className="gvnews_heroblock_wrapper"
            style={{
                height: `${heightDesktop}px`
            }}>
            <HeroContent {...{ heroType, index, attr, heroMargin, postData, numberPostShow }} />
        </div>
    );
};

export default HeroContentWrapperComponent;