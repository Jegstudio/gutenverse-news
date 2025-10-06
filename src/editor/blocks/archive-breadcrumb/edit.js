import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useRef, useEffect } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import PanelDeprecated from '../../panels/panel-deprecated';
import DeprecatedOverlay from '../../part/deprecated-overlay';

const ArchiveBreadcrumb = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef
    } = props;

    const {
        elementId
    } = attributes;

    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-archive-breadcrumb',
            'gvnews-deprecated-block',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    return <>
        <PanelDeprecated title="Archive Breadcrumb" />
        <div {...blockProps}>
            <div className={'gvnews-archive-breadcrumb'}>
                <div id="breadcrumbs">
                    <span>
                        <a href="" target="_self">Home</a>
                    </span>
                    <i className="fas fa-chevron-right"></i>
                    <span>
                        <a href="" target="_self">Category</a>
                    </span>
                    <i className="fas fa-chevron-right"></i>
                    <span className="breadcrumb_last_link">
                        <a href="" target="_self">Child Category</a>
                    </span>
                </div>
            </div>
            <DeprecatedOverlay />
        </div>
    </>;
});

export default ArchiveBreadcrumb;