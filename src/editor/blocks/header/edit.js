import { compose } from '@wordpress/compose';
import {  useState, useEffect, Fragment }  from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { RawHTML } from '@wordpress/element';
import { ModuleSkeleton } from '../../part/placeholder';
import HeaderModule from '../../part/header';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useRef } from '@wordpress/element';

const HeaderBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef,
    } = props;

    const {
        elementId,
        icon,
        title,
        second_title,
        headerType,
    } = attributes;

    const blockStyleRef = useRef();

    useEffect(() => {
        if (blockStyleRef.current) {
            setElementRef(blockStyleRef.current);
        }
    }, [blockStyleRef]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const headerData = {
        icon,
        title,
        second_title,
        headerType,
    };

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-element',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: blockStyleRef
    });

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <div className="gvnews-raw-wrapper gvnews-editor">
                <HeaderModule {...headerData} />
            </div>
        </div>
    </>;
});

export default HeaderBlock;