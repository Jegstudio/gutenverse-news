import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useEffect, useRef, useState } from '@wordpress/element';
import { ModuleOverlay, ModuleSkeleton } from '../placeholder';
import HeroContentWrapperComponent from './hero-content-wrapper';
import HeroViewComponent from './hero-view-component';
import { getModuleOptions } from '../../utils/helper';


const defaultOptions = getModuleOptions();

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
        attributes,
        setAttributes
    } = props;

    const {
        showMeta = true,
        showMetaDate = true,
        showMetaAuthor = (heroType === '1' || heroType === '2' || heroType === '3' || heroType === '4' || heroType === '5' || heroType === '6' || heroType === '13'),
        postTitleHtmlTag = 'h2',
        gutenversePreviewBlock = '',
        showMetaReview = false,
        showPostFormatIcon = false,
        galleryFormatIcon = '',
        galleryFormatIconType = 'icon',
        galleryFormatIconSVG = '',
        videoFormatIcon = '',
        videoFormatIconType = 'icon',
        videoFormatIconSVG = '',
    } = attributes;

    const metaSettings = {
        meta_show: showMeta,
        meta_date: showMetaDate,
        meta_author: showMetaAuthor,
        meta_review: showMetaReview,
    };

    const moduleOption = {
        ...defaultOptions,
        option: {
            ...defaultOptions.option,
            ...metaSettings
        }
    };

    const overlayIconData = {
        show: showPostFormatIcon,
        gallery: {
            icon: galleryFormatIcon,
            type: galleryFormatIconType,
            svg: galleryFormatIconSVG
        },
        video: {
            icon: videoFormatIcon,
            type: videoFormatIconType,
            svg: videoFormatIconSVG
        }
    };

    const [postData, getTrim] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [block, setBlock] = useState(<ModuleSkeleton />);
    const [postStart, setPostStart] = useState(0);
    const [sliderDelay, setSliderDelay] = useState(0);
    const [sliderCount, setSliderCount] = useState(0);
    const firstRender = useRef(true);

    useEffect(() => {
        if (postOffset >= 0) {
            setPostStart(parseInt(postOffset));
        } else {
            setAttributes({
                ...attributes,
                postOffset: 0
            });
        }
    }, [postOffset]);

    useEffect(() => {
        if (autoplayDelay >= 1000) {
            setSliderDelay(parseInt(autoplayDelay));
        } else {
            setAttributes({
                ...attributes,
                autoplayDelay: 3000
            });
        }
    }, [autoplayDelay]);

    useEffect(() => {
        if (sliderItem >= 1) {
            setSliderCount(parseInt(sliderItem));
        } else {
            setAttributes({
                ...attributes,
                sliderItem: 2
            });
        }
    }, [sliderItem]);


    useEffect(() => {
        const timeOutId = setTimeout(() => {

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
                        numberPost: sliderCount ? sliderCount * numberPost : numberPost,
                        includePost,
                        excludePost,
                        includeCategory,
                        excludeCategory,
                        includeAuthor,
                        includeTag,
                        excludeTag,
                        sortBy,
                        postOffset: postStart
                    },
                },
            }).then((data) => {
                getTrim(JSON.parse(data));
            }).finally(() => {
                setOverlay(false);
                if (firstRender.current) {
                    firstRender.current = false;
                }
            });
        }, 300);
        return () => clearTimeout(timeOutId);
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
        postStart,
        sliderCount,
    ]);

    const resetBlock = () => {
        if (postData && postData.length) {
            const attr = {
                option: moduleOption,
                date: {
                    type: dateType,
                    format: dateFormat,
                    custom: dateFormatCustom,
                },
                postTitleHtmlTag,
                overlayIconData,
            };
            const rows = [];
            const maxSliderItem = Math.ceil((postData ? postData.length : 0) / numberPostShow);
            for (let i = 0; i < Math.min(sliderCount, maxSliderItem); i++) {
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
                    key={Math.random().toString(36).substring(2)}
                    {...{
                        rows,
                        heroType,
                        heroStyle,
                        enableslider,
                        autoplay,
                        autoplayDelay: sliderDelay,
                    }}
                />
            );
        } else if (moduleOption) {
            setBlock(<div className="gvnews_empty_module">{moduleOption.string.no_content}</div>);
        }
    };

    useEffect(() => {
        if (firstRender.current) {
            return;
        }
        if (gutenversePreviewBlock === 'noContent') {
            setBlock(<div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div>);
            return;
        }
        resetBlock();
    }, [
        postData,
        enableslider,
        autoplay,
        sliderDelay,
        sliderCount,
        heroMargin,
        heightDesktop,
        dateType,
        dateFormat,
        dateFormatCustom,
        heroStyle,
        showMeta,
        showMetaDate,
        showMetaAuthor,
        postTitleHtmlTag,
        gutenversePreviewBlock,
        showMetaReview,
        showPostFormatIcon,
        galleryFormatIcon,
        galleryFormatIconType,
        galleryFormatIconSVG,
        videoFormatIcon,
        videoFormatIconType,
        videoFormatIconSVG,
    ]);

    useEffect(() => {
        if (firstRender.current) {
            return;
        }

        enableslider && elementRef.current && window.gvnewsHeroSlider(elementRef.current);
    }, [block]);

    return (
        <>
            {block}
            {(overlay && !firstRender.current) && <ModuleOverlay />}
        </>
    );
};

export default HeroComponent;