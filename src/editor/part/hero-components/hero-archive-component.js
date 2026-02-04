import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useEffect, useState } from '@wordpress/element';
import { ModuleOverlay, ModuleSkeleton } from '../placeholder';
import HeroViewComponent from './hero-view-component';
import HeroContentWrapperComponent from './hero-content-wrapper';
import { getModuleOptions } from '../../utils/helper';

const defaultOptions = getModuleOptions();

const HeroArchiveComponent = (props) => {
    const { heroType, numberPostShow, heroSliderRef } = props;
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
        attributes,
    } = props;

    const {
        showMeta = true,
        showMetaDate = true,
        showMetaAuthor = true,
        postTitleHtmlTag = 'h2',
        gutenversePreviewBlock = ''
    } = attributes;

    const metaSettings = {
        meta_show: showMeta,
        meta_date: showMetaDate,
        meta_author: showMetaAuthor && (heroType === '1' || heroType === '2' || heroType === '3' || heroType === '4' || heroType === '5' || heroType === '6' || heroType === '13')
    };

    const moduleOption = {
        ...defaultOptions,
        option: {
            ...defaultOptions.option,
            ...metaSettings
        }
    };


    const [rawPosts, setRawPosts] = useState(false);
    const [postData, setPostData] = useState(false);
    const [postsLimit, setPostsLimit] = useState(16);
    const [overlay, setOverlay] = useState(false);
    const [shouldInitSlider, setShouldInitSlider] = useState(false);
    const [blockContent, setBlockContent] = useState(false);


    useEffect(() => {
        let offset = !isNaN(parseInt(postOffset)) ? parseInt(postOffset) : 0;
        let itemsToDisplay = parseInt(sliderItem * numberPostShow);
        let totalAvailablePosts = parseInt(moduleOption.option.post_count);

        if (!rawPosts || !rawPosts.length) {
            setPostData(false);
            return;
        }

        const rawPostsSlice = rawPosts.slice(offset, parseInt(itemsToDisplay + offset));
        if (rawPostsSlice.length) {
            if (rawPostsSlice.length < itemsToDisplay && postsLimit <= totalAvailablePosts) {
                setPostsLimit(postsLimit * sliderItem);
            }
            setPostData(rawPostsSlice);
        } else {
            if (totalAvailablePosts > offset) {
                setPostsLimit(postsLimit * sliderItem);
            } else {
                if (totalAvailablePosts != moduleOption.option.post_count) {
                    setPostsLimit(totalAvailablePosts);
                }
            }
            setPostData(false);
        }
    }, [numberPost, rawPosts, postOffset, sliderItem]);

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

        rawPosts ? setOverlay(true) : null;
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-posts-archive'),
            method: 'POST',
            data: {
                attr: {
                    numberPost: postsLimit,
                },
            },
        })
            .then((data) => {
                setRawPosts(JSON.parse(data));
            })
            .catch((e) => {
                console.error(e.message);
            })
            .finally(() => {
                setOverlay(false);
            });
    }, [postsLimit]);

    const resetBlock = () => {
        if (postData && postData.length) {
            const attr = {
                option: moduleOption,
                date: {
                    format: dateFormat,
                    custom: dateFormatCustom,
                },
                postTitleHtmlTag,
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
            setBlockContent(
                <HeroViewComponent
                    {...{
                        rows,
                        heroType,
                        heroStyle,
                        enableslider,
                        autoplay,
                        autoplayDelay,
                    }}
                />
            );
        } else {
            setBlockContent(<div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div>);
        }
    };

    useEffect(() => {
        if (gutenversePreviewBlock === 'noContent') {
            setBlockContent(<div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div>);
            return;
        }
        resetBlock();
    }, [
        dateFormat,
        dateFormatCustom,
        heroStyle,
        heroType,
        showMeta,
        showMetaDate,
        showMetaAuthor,
        postTitleHtmlTag,
        gutenversePreviewBlock
    ]);

    useEffect(() => {
        setBlockContent(false);
        setTimeout(function () {
            resetBlock();
        });
    }, [postData, enableslider, autoplay, autoplayDelay, sliderItem, heroMargin, heightDesktop]);

    return (
        <>
            {blockContent ? blockContent : <ModuleSkeleton />}
            {overlay && <ModuleOverlay />}
            {shouldInitSlider && window.gvnewsHeroSlider(heroSliderRef.current)}
            {shouldInitSlider && setShouldInitSlider(false)}
        </>
    );
};

export default HeroArchiveComponent;