import { compose } from '@wordpress/compose';
import { useState, useEffect, useRef } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { SliderMeta } from '../../part/slider';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';
import { getDeviceType, getEditorWidth } from 'gutenverse-core/editor-helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar } from 'gutenverse-core/components';
import getCarouselStyle from '../../control-panel/panel-styles/carousel-style';
import { useSelect } from '@wordpress/data';
import { getModuleOptions, getParentColumnWidth } from '../../utils/helper';

const moduleOption = getModuleOptions();
const postCount = moduleOption ? moduleOption.option.post_count.publish : 0;

const Carousel1Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        isSelected,
        clientId,
        setBlockRef
    } = props;

    const {
        elementId,
        contentType,
        uniqueContent,
        includeOnly,
        postType,
        postOffset,
        numberPost,
        includePost,
        excludePost,
        includeCategory,
        excludeCategory,
        includeAuthor,
        includeTag,
        excludeTag,
        sortBy,
        columnWidth,
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        showNav,
        autoplay,
        hoverEffect,
        autoplayDelay,
        ncolumn,
        iMargin,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const deviceType = getDeviceType();

    const [postBulk, getPost] = useState(false);
    const [blockWidth, getWidth] = useState(8);
    const [postData, getTrim] = useState(false);
    const [loadPost, loadMore] = useState(15);
    const [overlay, setOverlay] = useState(false);
    const elementRef = useRef(null);

    const {
        getBlock,
        getBlockRootClientId
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getCarouselStyle, elementRef);

    useEffect(() => {
        let off = !isNaN(parseInt(postOffset)) ? parseInt(postOffset) : 0;
        let num = parseInt(numberPost);
        let count = parseInt(postCount);
        if (postBulk && postBulk.length) {
            if (postBulk.slice(off, num + off).length) {
                if (postBulk.slice(off, num + off).length < num && loadPost <= count) {
                    loadMore(loadPost + 15);
                }
                getTrim(postBulk.slice(off, parseInt(num + off)));
            } else {
                count > off ? loadMore(loadPost + 15) : count != postCount ? loadMore(count) : null;
                getTrim(false);
            }
        } else {
            getTrim(false);
        }
    }, [
        numberPost,
        postBulk,
        postOffset
    ]);

    useEffect(() => {
        if (columnWidth == 'auto') {
            if (deviceType === 'Desktop') {
                getWidth(getParentColumnWidth(getBlockRootClientId(props.clientId), getBlock));
            } else if (deviceType === 'Tablet') {
                getWidth(8);
            } else {
                getWidth(4);
            }
        } else {
            getWidth(columnWidth);
        }
    }, [
        columnWidth,
        deviceType
    ]);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    useEffect(() => {
        postBulk ? setOverlay(true) : null;
        let attr = {
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
        };
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-post'),
            method: 'POST',
            data: {
                attr: attr
            }
        }).then((data) => {
            getPost(JSON.parse(data));
        }).catch((e) => {
            console.error(e.message);
        }).finally(() => {
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
        loadPost
    ]);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-element-full',
            'gvnews-carousel-1',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const moduleData = {
        blockWidth,
        excerptLength,
        excerptEllipsis,
        moduleOption,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
    };

    function RenderContent(props) {
        return (
            <div className="gvnews_post_wrapper">
                <article className="gvnews_post">
                    <div className="gvnews_thumb">
                        <a>
                            <div className="thumbnail-container size-715">
                                <img src={props.post.thumbnail.url} style={{ objectFit: 'cover', verticalAlign: 'middle', maxHeight: '100%', maxWidth: '100%' }} className="lazyloaded" />
                            </div>
                        </a>
                    </div>
                    <div className="gvnews_postblock_content">
                        <h3 className="gvnews_post_title">
                            <a>{props.post.title.replace(/&#8217;/g, '\'')}</a>
                        </h3>
                        <SliderMeta {...props} date />
                    </div>
                </article>
            </div>
        );
    }

    function RenderColumn(props) {
        const attr = {
            option: props.moduleOption,
            length: props.excerptLength,
            elipsis: props.excerptEllipsis,
            date: {
                type: props.metaDateType,
                format: props.metaDateFormat,
                custom: props.metaDateFormatCustom,
            }
        };
        const content = [];
        if (props.postData) {
            for (let i = 0; i < props.postData.length; i++) {
                content.push(<RenderContent attr={attr} index={i} post={props.postData[i]} />);
            }
        }
        return (
            <div className="gvnews_carousel_post" data-nav={showNav ? true : ''} data-autoplay={autoplay ? true : ''} data-delay={autoplayDelay} data-items={ncolumn} data-margin={iMargin}>
                {content}
            </div>
        );
    }

    const [block, setBlock] = useState(false);
    function resetblock() {
        setBlock(
            <div className={`gvnews_postblock_carousel gvnews_postblock_carousel_1 gvnews_postblock  gvnews_col_${blockWidth == 4 ? '1' : blockWidth == 8 ? '2' : '3'}o3`}>
                {postData ? <RenderColumn {...moduleData} /> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string.no_content}</div> : <ModuleSkeleton />}
                {overlay && <ModuleOverlay />}
            </div>
        );
    }

    useEffect(() => {
        setBlock(false);
        setTimeout(function () {
            resetblock();
        });
    }, [
        blockWidth,
        excerptLength,
        excerptEllipsis,
        moduleOption,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        overlay,
        showNav,
        autoplay,
        autoplayDelay,
        hoverEffect,
        ncolumn,
        iMargin
    ]);

    let editorWidth = getEditorWidth();

    const device = useSelect((select) => {
        return select('core/editor').getDeviceType();
    }, []);

    const initSlider = () => {
        if ('function' === typeof gvnews.carousel && postData && !overlay) {
            setTimeout(function () {
                let gvnewsLibrary = window.gvnews;
                gvnewsLibrary = gvnews.library;

                var blockCarousel = elementRef.current.getElementsByClassName('gvnews_postblock_carousel');

                if (blockCarousel.length) {
                    gvnewsLibrary.forEach(blockCarousel, function (ele, i) {
                        let config = {};
                        const defaultConfig = {
                            0: {
                                items: 1,
                            },
                            321: {
                                items: 2,
                                gutter: 15
                            },
                            568: {
                                items: 3,
                                gutter: 15
                            },
                            1024: {
                                items: parseInt(ncolumn) || 3,
                            },
                        };
                        if (editorWidth) {
                            for (const breakpoint in defaultConfig) {
                                if (parseInt(breakpoint) <= editorWidth) {
                                    config = defaultConfig[breakpoint];
                                }
                            }
                        }

                        const carouselConfig = {
                            container: ele,
                            textDirection: 'ltr',
                            onInit: function (info) {
                                if ('undefined' !== typeof info.nextButton) {
                                    gvnewsLibrary.addClass(info.nextButton, 'tns-next');
                                }
                                if ('undefined' !== typeof info.prevButton) {
                                    gvnewsLibrary.addClass(info.prevButton, 'tns-prev');
                                }
                            }
                        };

                        const carousel = gvnews.carousel({
                            ...carouselConfig,
                            ...config,
                        });

                        const tnsInner = ele.querySelector('.tns-outer .tns-inner');
                        const wrapper = tnsInner.querySelector('.gvnews_carousel_post');
                        const items = wrapper.querySelectorAll('.tns-item');

                        tnsInner.style.marginRight = `-${config?.gutter}px`;
                        wrapper.style.width = `calc(100% * 16/ ${config?.items})`;

                        items.forEach((item) => {
                            item.style.width = 'calc(100% / 16)';
                            item.style.paddingRight = `${config?.gutter}px`;
                        });
                    });
                }
            }, 1000);
        }
    }

    initSlider();

    useEffect(() => {
        initSlider();
    }, [device]);

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <div className="gvnews-raw-wrapper gvnews-editor">
                <div className="gvnews-element-overlay" style={{ 'pointerEvents': isSelected ? 'none' : 'auto' }}></div>
                {block ? block : 'loading'}
            </div>
        </div>
    </>;
});

export default Carousel1Block;