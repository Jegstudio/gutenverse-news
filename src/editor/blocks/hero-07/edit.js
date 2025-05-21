import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { BlockPanelController } from 'gutenverse-core/controls';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { compose } from '@wordpress/compose';
import { useEffect, useRef } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { HeroHandler } from '../../part/hero';
import getHeroStyle from '../../control-panel/hero-style';


const Hero7Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        setBlockRef,
        clientId,
        isSelected
    } = props;

    const {
        elementId,
        enableslider,
        autoplay,
        autoplayDelay,
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
        heroStyle,
        sliderItem,
        columnWidth,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        heroMargin,
        heightDesktop,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getHeroStyle, elementRef);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const blockProps = useBlockProps({
        className: classnames('gvnews-block',
            'gvnews-block-wrapper', 'gvnews-hero-7', elementId, animationClass, displayClass),
        ref: elementRef,
    });

    return (
        <>
            <CopyElementToolbar {...props} />
            <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
            <div {...blockProps}>
                <div className="gvnews-raw-wrapper gvnews-editor">
                    <div className="gvnews-element-overlay" style={{ pointerEvents: isSelected ? 'none' : 'auto' }}></div>
                    <HeroHandler
                        {...{
                            heroType: '7',
                            elementRef,
                            columnWidth,
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
                            dateType: metaDateType,
                            dateFormat: metaDateFormat,
                            dateFormatCustom: metaDateFormatCustom,
                            heroStyle,
                            enableslider,
                            autoplay,
                            autoplayDelay,
                            heroMargin,
                            heightDesktop,
                        }}
                    />
                </div>
            </div>
        </>
    );
});

export default Hero7Block;
