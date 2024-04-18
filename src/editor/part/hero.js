import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useEffect, useState }  from '@wordpress/element';
import { MetaModule2, MetaModule3, MetaCategory } from './meta';
import { ModuleOverlay, ModuleSkeleton } from './placeholder';

/**
 *
 * @param { index, margin, post, attr } param0
 * @returns
 */
const HeroElement = ({ index, margin, post, attr }) => {
    return (
        <article className={`gvnews_post gvnews_hero_item_${index + 1}`}>
            <div className="gvnews_block_container">
                <span className="gvnews_postformat_icon"></span>
                <div className="gvnews_thumb">
                    <a>
                        <div className="thumbnail-container thumbnail-background">
                            <div
                                className="lazyloaded"
                                style={{
                                    backgroundImage: 'url(' + post.thumbnail.url + ')',
                                }}></div>
                        </div>
                    </a>
                </div>
                <div className="gvnews_postblock_content">
                    <MetaCategory post={post} />
                    <div className="gvnews_post_info">
                        <h2 className="gvnews_post_title">
                            <a>{post.title.replace(/&#8217;/g, '\'')}</a>
                        </h2>
                        <div className="gvnews_post_meta">
                            {index === 0 ? <MetaModule3 post={post} attr={attr} /> : <MetaModule2 post={post} attr={attr} />}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

/**
 * Hero Empty
 *
 * @param {index, margin} param0
 * @returns {JSX.Element}
 */
const HeroEmpty = ({ index, margin }) => {
    return (
        <article className={`gvnews_post gvnews_hero_item_${index + 1}`} style={{ padding: `0 0 ${margin}px ${margin}px` }}>
            <div className="gvnews_block_container"></div>
        </article>
    );
};

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
 * Hero Content Wrapper
 *
 * @param { index, attr, heightDesktop, heroMargin, heroType, postData, numberPostShow } param0
 * @returns {JSX.Element}
 */
const HeroContentWrapper = ({ index, attr, heightDesktop, heroMargin, heroType, postData, numberPostShow }) => {
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

/**
 * Hero Item
 *
 * @param {index, margin, post, attr} param0
 * @returns {JSX.Element}
 */
const HeroItem = ({ index, margin, post, attr }) => {
    if (!post) {
        return <HeroEmpty {...{ index, margin }} />;
    }
    return <HeroElement {...{ index, margin, post, attr }} />;
};

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
        for (let i = parentIndex; i < limit; i++) {
            let off = pagination * numberPostShow - numberPostShow + index;
            let item = <HeroItem index={index} post={postData[off]} attr={attr} margin={heroMargin} />;
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
            secondBlock.push(<HeroItem index={index} post={postData[off]} attr={attr} margin={heroMargin} />);
            index++;
        }
        content = secondBlock;
    }

    return <>{content}</>;
};

/**
 * Hero View
 *
 * @param { rows, heroType, heroStyle, enableslider, blockWidth, autoplay, autoplayDelay } param0
 * @returns {JSX.Element}
 */
const HeroView = ({ rows, heroType, heroStyle, enableslider, blockWidth, autoplay, autoplayDelay }) => {
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

/**
 * Hero Element
 *
 * @param {heroType, numberPostShow, columnWidth, heroSliderRef} props
 * @param {sliderItem, numberPost, postOffset, contentType, uniqueContent, includeOnly, postType, includePost, excludePost, includeCategory, excludeCategory, includeAuthor, includeTag, excludeTag, sortBy, dateType, dateFormat, dateFormatCustom, heroStyle, enableslider, autoplay, autoplayDelay, heroMargin, heightDesktop} props
 * @returns {JSX.Element}
 */
const Hero = (props) => {
    const { heroType, numberPostShow, columnWidth, heroSliderRef } = props;
    const {
        sliderItem,
        numberPost,
        postOffset,
        contentType,
        uniqueContent,
        includeOnly,
        postType,
        includePost,
        excludePost,
        includeCategory,
        excludeCategory,
        includeAuthor,
        includeTag,
        excludeTag,
        sortBy,
        dateType,
        dateFormat,
        dateFormatCustom,
        heroStyle,
        enableslider,
        autoplay,
        autoplayDelay,
        heroMargin,
        heightDesktop,
    } = props;

    const [moduleOption, setModuleOption] = useState(false);
    const [postBulk, getPost] = useState(false);
    const [blockWidth, getWidth] = useState(8);
    const [postData, getTrim] = useState(false);
    const [loadPost, loadMore] = useState(16);
    const [postCount, setPostCount] = useState(0);
    const [overlay, setOverlay] = useState(false);
    const [slider, initSlider] = useState(false);
    const [block, setBlock] = useState(false);

    useEffect(() => {
        if (columnWidth == 'auto') {
            // todo add auto width detection?
            getWidth(8);
        } else {
            getWidth(columnWidth);
        }
    }, [columnWidth]);

    useEffect(() => {
        let off = !isNaN(parseInt(postOffset)) ? parseInt(postOffset) : 0;
        let num = parseInt(sliderItem * numberPostShow);
        let count = parseInt(postCount);
        if (postBulk && postBulk.length) {
            if (postBulk.slice(off, num + off).length) {
                if (postBulk.slice(off, num + off).length < num && loadPost <= count) {
                    loadMore(loadPost * sliderItem);
                }
                getTrim(postBulk.slice(off, parseInt(num + off)));
            } else {
                if (count > off) {
                    loadMore(loadPost * sliderItem);
                } else {
                    if (count != postCount) {
                        loadMore(count);
                    }
                }
                getTrim(false);
            }
        } else {
            getTrim(false);
        }
    }, [numberPost, postBulk, postOffset, sliderItem]);

    useEffect(() => {
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/module-option'),
        }).then((data) => {
            const parsedData = JSON.parse(data);
            setModuleOption(parsedData);
            if (parsedData.option.post_count) {
                setPostCount(parsedData.option.post_count.publish);
            }
        });
    }, []);

    useEffect(() => {
        postBulk ? setOverlay(true) : null;
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-post'),
            method: 'POST',
            data: {
                attr: {
                    contentType,
                    uniqueContent,
                    includeOnly,
                    postType,
                    numberPost: loadPost,
                    includePost,
                    excludePost,
                    includeCategory,
                    excludeCategory,
                    includeAuthor,
                    includeTag,
                    excludeTag,
                    sortBy,
                },
            },
        })
            .then((data) => {
                getPost(JSON.parse(data));
            })
            .catch((e) => {
                console.error(e.message);
            })
            .finally(() => {
                setOverlay(false);
            });
    }, [
        contentType,
        includeOnly,
        postType,
        includePost,
        excludePost,
        includeCategory,
        excludeCategory,
        includeAuthor,
        includeTag,
        excludeTag,
        sortBy,
        loadPost,
    ]);

    const resetBlock = () => {
        if (postData && postData.length && moduleOption) {
            const attr = {
                option: moduleOption,
                date: {
                    type: dateType,
                    format: dateFormat,
                    custom: dateFormatCustom,
                },
            };
            const rows = [];
            for (let i = 0; i < sliderItem; i++) {
                rows.push(
                    <HeroContentWrapper
                        {...{
                            heightDesktop,
                            heroMargin,
                            heroType,
                            postData,
                            numberPostShow,
                        }}
                        index={i}
                        attr={attr}
                    />
                );
            }
            setBlock(
                <HeroView
                    {...{
                        rows,
                        heroType,
                        heroStyle,
                        enableslider,
                        blockWidth,
                        autoplay,
                        autoplayDelay,
                    }}
                />
            );
        } else if (postBulk && moduleOption) {
            setBlock(<div className="gvnews_empty_module">{moduleOption.string.no_content}</div>);
        }
    };

    useEffect(() => {
        resetBlock();
    }, [blockWidth, moduleOption, dateType, dateFormat, dateFormatCustom, heroStyle]);

    useEffect(() => {
        setBlock(false);
        setTimeout(function () {
            resetBlock();
        });
    }, [postData, enableslider, autoplay, autoplayDelay, sliderItem, heroMargin, heightDesktop]);

    return (
        <>
            {block ? block : <ModuleSkeleton />}
            {overlay && <ModuleOverlay />}
            {slider && gvnews.hero.init(heroSliderRef.current)}
            {slider && gvnews.hero.heroSlider(heroSliderRef.current)}
            {slider && initSlider(false)}
        </>
    );
};

const HeroArchive = (props) => {
    const { heroType, numberPostShow, columnWidth, heroSliderRef } = props;
    const {
        sliderItem,
        numberPost = numberPostShow * 2,
        postOffset,
        dateFormat,
        dateFormatCustom,
        heroStyle,
        enableslider,
        autoplay,
        autoplayDelay,
        heroMargin,
        heightDesktop,
    } = props;

    const [moduleOption, setModuleOption] = useState(false);
    const [postBulk, getPost] = useState(false);
    const [blockWidth, getWidth] = useState(8);
    const [postData, getTrim] = useState(false);
    const [loadPost, loadMore] = useState(16);
    const [postCount, setPostCount] = useState(0);
    const [overlay, setOverlay] = useState(false);
    const [slider, initSlider] = useState(false);
    const [block, setBlock] = useState(false);

    useEffect(() => {
        if (columnWidth == 'auto') {
            // todo add auto width detection?
            getWidth(8);
        } else {
            getWidth(columnWidth);
        }
    }, [columnWidth]);

    useEffect(() => {
        let off = !isNaN(parseInt(postOffset)) ? parseInt(postOffset) : 0;
        let num = parseInt(sliderItem * numberPostShow);
        let count = parseInt(postCount);
        if (postBulk && postBulk.length) {
            if (postBulk.slice(off, num + off).length) {
                if (postBulk.slice(off, num + off).length < num && loadPost <= count) {
                    loadMore(loadPost * sliderItem);
                }
                getTrim(postBulk.slice(off, parseInt(num + off)));
            } else {
                if (count > off) {
                    loadMore(loadPost * sliderItem);
                } else {
                    if (count != postCount) {
                        loadMore(count);
                    }
                }
                getTrim(false);
            }
        } else {
            getTrim(false);
        }
    }, [numberPost, postBulk, postOffset, sliderItem]);

    useEffect(() => {
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/module-option'),
        }).then((data) => {
            const parsedData = JSON.parse(data);
            setModuleOption(parsedData);
            if (parsedData.option.post_count) {
                setPostCount(parsedData.option.post_count.publish);
            }
        });
    }, []);

    useEffect(() => {
        postBulk ? setOverlay(true) : null;
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-posts-archive'),
            method: 'POST',
            data: {
                attr: {
                    numberPost: loadPost,
                },
            },
        })
            .then((data) => {
                getPost(JSON.parse(data));
            })
            .catch((e) => {
                console.error(e.message);
            })
            .finally(() => {
                setOverlay(false);
            });
    }, [loadPost]);

    const resetBlock = () => {
        if (postData && postData.length && moduleOption) {
            const attr = {
                option: moduleOption,
                date: {
                    format: dateFormat,
                    custom: dateFormatCustom,
                },
            };
            const rows = [];
            for (let i = 0; i < sliderItem; i++) {
                rows.push(
                    <HeroContentWrapper
                        {...{
                            heightDesktop,
                            heroMargin,
                            heroType,
                            postData,
                            numberPostShow,
                        }}
                        index={i}
                        attr={attr}
                    />
                );
            }
            setBlock(
                <HeroView
                    {...{
                        rows,
                        heroType,
                        heroStyle,
                        enableslider,
                        blockWidth,
                        autoplay,
                        autoplayDelay,
                    }}
                />
            );
        } else if (postBulk && moduleOption) {
            setBlock(<div className="gvnews_empty_module">{moduleOption.string.no_content}</div>);
        }
    };

    useEffect(() => {
        resetBlock();
    }, [blockWidth, moduleOption, dateFormat, dateFormatCustom, heroStyle, heroType]);

    useEffect(() => {
        setBlock(false);
        setTimeout(function () {
            resetBlock();
        });
    }, [postData, enableslider, autoplay, autoplayDelay, sliderItem, heroMargin, heightDesktop]);

    return (
        <>
            {block ? block : <ModuleSkeleton />}
            {overlay && <ModuleOverlay />}
            {slider && gvnews.hero.init(heroSliderRef.current)}
            {slider && gvnews.hero.heroSlider(heroSliderRef.current)}
            {slider && initSlider(false)}
        </>
    );
};

/**
 * Hero Handler
 *
 * @param { type, heroType, columnWidth, state } props
 * @returns {JSX.Element}
 */
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

    return 'archive' === type ? <HeroArchive {...{ ...props, numberPostShow }} /> : <Hero {...{ ...props, numberPostShow }} />;
};

export { HeroHandler };
