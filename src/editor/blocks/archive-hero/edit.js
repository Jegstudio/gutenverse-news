import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationEditor, useInitializeIconToSvg } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useEffect, useRef } from '@wordpress/element';
import { HeroHandler } from '../../part/hero';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { CopyElementToolbar, InspectorControls } from 'gutenverse-core/components';

const ArchiveHero = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef,
        isSelected,
        setAttributes,
    } = props;

    const {
        elementId,
        heroType,
        heroStyle,
        heroMargin,
        heroHeightDesktop,
        dateFormat,
        dateFormatCustom,
        columnWidth,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useInitializeIconToSvg({
        elementId,
        attributes,
        setAttributes,
        icons: [
            { type: 'galleryFormatIconType', svg: 'galleryFormatIconSVG' },
            { type: 'videoFormatIconType', svg: 'videoFormatIconSVG' },
        ],
    });

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const blockProps = useBlockProps({
        className: classnames('gvnews-block',
            'gvnews-block-wrapper', 'gvnews-archive-hero', elementId, animationClass, displayClass),
        ref: elementRef
    });


    return (
        <>
            <CopyElementToolbar {...props} />
            <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
            <InspectorControls>
            </InspectorControls>
            <div {...blockProps}>
                <div className="gvnews-raw-wrapper gvnews-editor">
                    <div className="gvnews-element-overlay" style={{ pointerEvents: isSelected ? 'none' : 'auto' }}></div>
                    <HeroHandler
                        {...{
                            type: 'archive',
                            heroType: heroType,
                            elementRef,
                            columnWidth,
                            sliderItem: 2,
                            postOffset: 0,
                            dateType: null,
                            dateFormat,
                            dateFormatCustom,
                            heroStyle,
                            enableslider: false,
                            autoplay: false,
                            autoplayDelay: 1000,
                            heroMargin,
                            heightDesktop: heroHeightDesktop,
                            attributes,
                        }}
                    />
                </div>
            </div>
        </>
    );
});

export default ArchiveHero;
