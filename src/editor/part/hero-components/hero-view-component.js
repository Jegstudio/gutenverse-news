
/**
 * Hero Wrapper
 *
 * @param {heroType, heroStyle, enableSlider, blockWidth, autoplay, autoplayDelay, children} param0
 * @returns {JSX.Element}
 */
const HeroWrapper = ({ heroType, heroStyle, enableSlider, blockWidth, autoplay, autoplayDelay, children }) => {
    return (
        <div
            className={`gvnews_heroblock gvnews_heroblock_${heroType} gvnews_hero_style_${heroStyle} ${enableSlider ? 'tiny-slider' : ''} gvnews_col_${
                blockWidth == 4 ? '1' : blockWidth == 8 ? '2' : '3'
            }o3`}
            {...(autoplay ? { 'data-autoplay': true } : {})}
            {...(autoplay ? { 'data-delay': autoplayDelay } : {})}>
            {children}
        </div>
    );
};

/**
 * Hero View
 *
 * @param { rows, heroType, heroStyle, enableslider, blockWidth, autoplay, autoplayDelay } param0
 * @returns {JSX.Element}
 */
const HeroViewComponent = ({ rows, heroType, heroStyle, enableslider, blockWidth, autoplay, autoplayDelay }) => {
    return (
        <HeroWrapper
            {...{
                heroType,
                heroStyle,
                enableSlider: enableslider,
                blockWidth,
                autoplay,
                autoplayDelay,
            }}>
            <div className="gvnews_hero_wrapper">{rows}</div>
        </HeroWrapper>
    );
};

export default HeroViewComponent;