import { compose } from '@wordpress/compose';
import { useEffect, useRef }  from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { HeroHandler } from '../../part/hero';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const HeroSkewBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const { attributes, setElementRef, isSelected } = props;

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

    const heroSliderRef = useRef();

    useEffect(() => {
        if (heroSliderRef.current) {
            setElementRef(heroSliderRef.current);
        }
    }, [heroSliderRef.current]);

    const blockProps = useBlockProps({
        className: classnames('gvnews-block',
            'gvnews-block-wrapper', 'gvnews-hero-skew', elementId, animationClass, displayClass),
        ref: heroSliderRef,
    });

    return (
        <>
            <PanelController panelList={panelList} {...props} />
            <div {...blockProps}>
                <div className="gvnews-raw-wrapper gvnews-editor">
                    <div className="gvnews-element-overlay" style={{ pointerEvents: isSelected ? 'none' : 'auto' }}></div>
                    <HeroHandler
                        {...{
                            heroType: 'skew',
                            heroSliderRef,
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

export default HeroSkewBlock;
