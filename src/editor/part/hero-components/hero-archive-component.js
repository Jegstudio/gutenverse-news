import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useEffect, useRef, useState }  from '@wordpress/element';
import { ModuleOverlay, ModuleSkeleton } from '../placeholder';
import HeroViewComponent from './hero-view-component';
import HeroContentWrapperComponent from './hero-content-wrapper';
import { getModuleOptions } from '../../utils/helper';

const HeroArchiveComponent = (props) => {
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

    const [postBulk, getPost] = useState(false);
    const [blockWidth, getWidth] = useState(8);
    const [postData, getTrim] = useState(false);
    const [loadPost, loadMore] = useState(16);
    const [overlay, setOverlay] = useState(false);
    const [slider, initSlider] = useState(false);
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

    useEffect(() => {

        if (moduleOption.current == null) {
            moduleOption.current = getModuleOptions();
            postCount.current = moduleOption.current.option.post_count.publish;
        }

        postBulk ? setOverlay(true) : null;
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-posts-archive'),
            method: 'POST',
            data: {
                attr: {
                    numberPost: loadPost,
                },
            },
        }).then((data) => {
            getPost(JSON.parse(data));
        }).finally(() => {
            setOverlay(false);
        });
    }, [loadPost]);

    const resetBlock = () => {
        if (postData && postData.length && moduleOption.current) {
            const attr = {
                option: moduleOption.current,
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
            {slider && window.gvnews.hero.init(heroSliderRef.current)}
            {slider && window.gvnews.hero.heroSlider(heroSliderRef.current)}
            {slider && initSlider(false)}
        </>
    );
};

export default HeroArchiveComponent;