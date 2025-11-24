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
        showMetaAuthor = true
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


    const [postBulk, getPost] = useState(false);
    const [postData, getTrim] = useState(false);
    const [loadPost, loadMore] = useState(16);
    const [overlay, setOverlay] = useState(false);
    const [slider, initSlider] = useState(false);
    const [block, setBlock] = useState(false);


    useEffect(() => {
        let off = !isNaN(parseInt(postOffset)) ? parseInt(postOffset) : 0;
        let num = parseInt(sliderItem * numberPostShow);
        let count = parseInt(moduleOption.option.post_count);
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
                    if (count != moduleOption.option.post_count) {
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
        if (postData && postData.length) {
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
    }, [
        dateFormat,
        dateFormatCustom,
        heroStyle,
        heroType,
        showMeta,
        showMetaDate,
        showMetaAuthor
    ]);

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

export default HeroArchiveComponent;