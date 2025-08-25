import { compose } from '@wordpress/compose';
import { useState, useEffect, useRef } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { select, subscribe } from '@wordpress/data';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import PanelDeprecated from '../../panels/panel-deprecated';
import DeprecatedOverlay from '../../part/deprecated-overlay';

const PostTag = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef
    } = props;

    const {
        elementId,
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
    const [tags, setTags] = useState(false);
    const [content, setContent] = useState(false);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'gvnews-post-tags',
            'gvnews-deprecated-block',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useEffect(() => {
        //get current tags from tag input on editor
        const selectedTags = select('core/editor').getEditedPostAttribute('tags');
        setTags(selectedTags);

        const unsubscribe = subscribe(() => {
            const updatedTags = select('core/editor').getEditedPostAttribute('tags');
            setTags(updatedTags);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        let includedTags = '';
        if (tags) {
            tags.forEach((item, index) => {
                includedTags += item;
                if (index + 1 < tags.length) {
                    includedTags += ', ';
                }
            });
            apiFetch({
                path: addQueryArgs('/wp/v2/tags', {
                    include: includedTags,
                }),
            }).then(data => {
                setContent(data.map((tag, index) => {
                    return <a key={index} href="#" rel="tag">{tag.name}</a>;
                }));
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [tags]);

    const DummyBlock = () => {
        return <>
            <span>Tags:</span>
            <a href="#" rel="tag">First</a>
            <a href="#" rel="tag">Second</a>
            <a href="#" rel="tag">Third</a>
            <a href="#" rel="tag">Forth</a>
            <a href="#" rel="tag">Fifth</a>
            <a href="#" rel="tag">Sixth</a>
        </>;
    };

    return <>
        <PanelDeprecated title="Post Tag" />
        <div {...blockProps}>
            {content ? <><span>Tags:</span> {content}</> : <DummyBlock />}
            <DeprecatedOverlay />
        </div>
    </>;
});

export default PostTag;