import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useEffect, useRef, useState }  from '@wordpress/element';
import { ModuleOverlay, ModuleSkeleton } from '../placeholder';
import HeroContentWrapperComponent from './hero-content-wrapper';
import HeroViewComponent from './hero-view-component';
import { getModuleOptions } from '../../utils/helper';

/**
 * Hero Element
 *
 * @param {heroType, numberPostShow, columnWidth, elementRef} props
 * @param {sliderItem, numberPost, postOffset, contentType, uniqueContent, includeOnly, postType, includePost, excludePost, includeCategory, excludeCategory, includeAuthor, includeTag, excludeTag, sortBy, dateType, dateFormat, dateFormatCustom, heroStyle, enableslider, autoplay, autoplayDelay, heroMargin, heightDesktop} props
 * @returns {JSX.Element}
 */
const HeroComponent = (props) => {
    const { heroType, numberPostShow, columnWidth, elementRef } = props;
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

    const [postBulk, getPost] = useState(false);
    const [blockWidth, getWidth] = useState(8);
    const [postData, getTrim] = useState(false);
    const [loadPost, loadMore] = useState(16);
    const [overlay, setOverlay] = useState(false);
    const [block, setBlock] = useState(false);
    const moduleOption = useRef(null);
    const postCount = useRef(0);

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
        let count = parseInt(postCount.current);
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
                    if (count != postCount.current) {
                        loadMore(count);
                    }
                }
                getTrim(false);
            }
        } else {
            getTrim(false);
        }
    }, [numberPost, postBulk, postOffset, sliderItem]);

    // useEffect(() => {
    //     apiFetch({
    //         path: addQueryArgs('/gvnews-client/v1/module-option'),
    //     }).then((data) => {
    //         const parsedData = JSON.parse(data);
    //         setModuleOption(parsedData);
    //         if (parsedData.option.post_count) {
    //             setPostCount(parsedData.option.post_count.publish);
    //         }
    //     });
    // }, []);

    useEffect(() => {

        if (moduleOption.current == null) {
            moduleOption.current = getModuleOptions();
            postCount.current = moduleOption.current.option.post_count.publish;
        }

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
        if (postData && postData.length && moduleOption.current) {
            const attr = {
                option: moduleOption.current,
                date: {
                    type: dateType,
                    format: dateFormat,
                    custom: dateFormatCustom,
                },
            };
            const rows = [];
            const maxSliderItem = Math.ceil((postData ? postData.length : 0) / numberPostShow);
            for (let i = 0; i < Math.min(sliderItem, maxSliderItem); i++) {
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
        } else if (postBulk && moduleOption.current) {
            setBlock(<div className="gvnews_empty_module">{moduleOption.current.string.no_content}</div>);
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
            {enableslider && elementRef.current && gvnews.hero.init(elementRef.current)}
            {enableslider && elementRef.current && gvnews.hero.heroSlider(elementRef.current)}
        </>
    );
};

export default HeroComponent;