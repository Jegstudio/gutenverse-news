import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { compose } from '@wordpress/compose';
import { useEffect, useRef } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { HeroHandler } from '../../part/hero';
import getHeroStyle from '../../control-panel/panel-styles/hero-style';
import PanelDeprecated from '../../panels/panel-deprecated';
import DeprecatedOverlay from '../../part/deprecated-overlay';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { gutenverseProActive } from '../../utils/helper';

const HeroSkewBlock = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        setAttributes,
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
            'gvnews-block-wrapper', 'gvnews-hero-skew', elementId, animationClass, displayClass),
        ref: elementRef,
    });
    const isDeprecated = !gutenverseProActive;
    const wrapperClass = `gvnews-raw-wrapper gvnews-editor${isDeprecated ? ' gvnews-deprecated-block' : ''}`;

    return (
        <>
            {isDeprecated ? (
                <PanelDeprecated title="Hero Skew" />
            ) : (
                <>
                    <CopyElementToolbar {...props} />
                    <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
                </>
            )}

            <div {...blockProps}>
                <div className={wrapperClass}>
                    <div className="gvnews-element-overlay" style={{ pointerEvents: isSelected ? 'none' : 'auto' }}></div>
                    <HeroHandler
                        {...{
                            heroType: 'skew',
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
                            attributes,
                            setAttributes,
                        }}
                    />
                    {isDeprecated && <DeprecatedOverlay />}
                </div>
            </div>
        </>
    );
});

export default HeroSkewBlock;
