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

    const [blockWidth, getWidth] = useState(8);
    const [postData, getTrim] = useState(false);
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
        const timeOutId = setTimeout(() => {
            if (moduleOption.current == null) {
                moduleOption.current = getModuleOptions();
                postCount.current = moduleOption.current.option.post_count.publish;
            }

            setOverlay(true);
            apiFetch({
                path: addQueryArgs('/gvnews-client/v1/get-post'),
                method: 'POST',
                data: {
                    attr: {
                        contentType,
                        uniqueContent,
                        includeOnly,
                        postType,
                        numberPost: sliderItem ? sliderItem * numberPost : numberPost,
                        includePost,
                        excludePost,
                        includeCategory,
                        excludeCategory,
                        includeAuthor,
                        includeTag,
                        excludeTag,
                        sortBy,
                        postOffset
                    },
                },
            }).then((data) => {
                getTrim(JSON.parse(data));
            }).finally(() => {
                setOverlay(false);
            });
        }, 150);
        return () => clearTimeout( timeOutId );
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
        postOffset,
        sliderItem,
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
        } else if (moduleOption.current) {
            setBlock(<div className="gvnews_empty_module">{moduleOption.current.string.no_content}</div>);
        }
    };

    useEffect(() => {
        setBlock(false);
        setTimeout(function () {
            resetBlock();
        });
    },[
        postData,
        enableslider,
        autoplay,
        autoplayDelay,
        sliderItem,
        heroMargin,
        heightDesktop,
        blockWidth,
        moduleOption,
        dateType,
        dateFormat,
        dateFormatCustom,
        heroStyle
    ]);

    return (
        <>
            {block ? block : <ModuleSkeleton />}
            {overlay && <ModuleOverlay />}
            {enableslider && elementRef.current && window.gvnews.hero.init(elementRef.current)}
            {enableslider && elementRef.current && window.gvnews.hero.heroSlider(elementRef.current)}
        </>
    );
};

export default HeroComponent;