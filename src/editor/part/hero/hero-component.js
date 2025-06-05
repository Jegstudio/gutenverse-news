import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useEffect, useState }  from '@wordpress/element';
import { ModuleOverlay, ModuleSkeleton } from '../placeholder';
import HeroContentWrapperComponent from './hero-content-wrapper';
import HeroViewComponent from './hero-view-component';

/**
 * Hero Element
 *
 * @param {heroType, numberPostShow, columnWidth, heroSliderRef} props
 * @param {sliderItem, numberPost, postOffset, contentType, uniqueContent, includeOnly, postType, includePost, excludePost, includeCategory, excludeCategory, includeAuthor, includeTag, excludeTag, sortBy, dateType, dateFormat, dateFormatCustom, heroStyle, enableslider, autoplay, autoplayDelay, heroMargin, heightDesktop} props
 * @returns {JSX.Element}
 */
const HeroComponent = (props) => {
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
                    <HeroContentWrapperComponent
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
                <HeroViewComponent
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

export default HeroComponent;