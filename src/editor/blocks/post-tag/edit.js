import { compose } from '@wordpress/compose';
import { useState, useEffect, useRef } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { select, subscribe } from '@wordpress/data';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const PostTag = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
    } = props;

    const {
        elementId,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [tags, setTags] = useState(false);
    const [content, setContent] = useState(false);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-post-tag',
            elementId,
            animationClass,
            displayClass,
        ),
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

    const DummyBlock = ()=> { 
        return <div className="gvnews_post_tags">
            <span>Tags:</span>
            <a href="#" rel="tag">First</a>
            <a href="#" rel="tag">Second</a>
            <a href="#" rel="tag">Third</a>
            <a href="#" rel="tag">Forth</a>
            <a href="#" rel="tag">Fifth</a>
            <a href="#" rel="tag">Sixth</a>    
        </div>
    }

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <div className="gvnews_custom_tag_wrapper">
                {content ? <div className="gvnews_post_tags">
                    <span>Tags:</span> {content} </div> : <DummyBlock />}
            </div>
        </div>
    </>;
});

export default PostTag;