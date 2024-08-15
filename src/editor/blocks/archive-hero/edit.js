import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useEffect, useRef } from '@wordpress/element';
import { HeroHandler } from '../../part/hero';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const ArchiveHero = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef,
        isSelected
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

    const heroSliderRef = useRef();

    useEffect(() => {
        if (heroSliderRef.current) {
            setElementRef(heroSliderRef.current);
        }
    }, [heroSliderRef.current]);

    const blockProps = useBlockProps({
        className: classnames('gvnews-block',
            'gvnews-block-wrapper', 'gvnews-archive-hero', elementId, animationClass, displayClass),
    });

    return (
        <>
            <PanelController panelList={panelList} {...props} />
            <div {...blockProps}>
                <div className="guten-raw-wrapper gvnews-editor">
                    <div className="gvnews-element-overlay" style={{ pointerEvents: isSelected ? 'none' : 'auto' }}></div>
                    <HeroHandler
                        {...{
                            type: 'archive',
                            heroType: heroType,
                            heroSliderRef,
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
                        }}
                    />
                </div>
            </div>
        </>
    );
});

export default ArchiveHero;
