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
import PanelUpgradePro from '../../panels/panel-upgrade-pro';
import UpgradeProOverlay from '../../part/upgrade-pro-overlay';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { gutenverseProActive } from '../../utils/helper';
import { CopyElementToolbar, InspectorControls } from 'gutenverse-core/components';
import { applyFilters } from '@wordpress/hooks';

const Hero9Block = compose(
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
        allowOverrideCategoryColor = false
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
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-hero-9',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const isDeprecated = !gutenverseProActive;
    const wrapperClass = `gvnews-raw-wrapper gvnews-editor${isDeprecated ? ' gvnews-deprecated-block' : ''} ${allowOverrideCategoryColor ? 'gvnews_override_category' : ''}`;

    return (
        <>
            {isDeprecated ? (
                <PanelUpgradePro title="Hero 9" />
            ) : (
                <>
                    <CopyElementToolbar {...props} />
                    <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
                    <InspectorControls>
                        {applyFilters(
                            'gutenverse.blocks-pro.upgrade-banner-professional',
                            null,
                            props
                        )}
                    </InspectorControls>
                </>
            )}
            <div {...blockProps}>
                <div className={wrapperClass}>
                    <div className="gvnews-element-overlay" style={{ 'pointerEvents': isSelected ? 'none' : 'auto' }}></div>
                    <HeroHandler
                        {...{
                            heroType: '9',
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
                    {isDeprecated && <UpgradeProOverlay />}
                </div>
            </div>
        </>
    );
});

export default Hero9Block;