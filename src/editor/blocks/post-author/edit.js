import { compose } from '@wordpress/compose';
import { useEffect, useState, useRef, Fragment } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { ModuleOverlay } from '../../part/placeholder';
import { select } from '@wordpress/data';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar } from 'gutenverse-core/components';
import getBlockStyle from './styles/block-style';

const PostAuthor = compose(
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
    const [authorData, setAuthorData] = useState(false);
    const [content, setContent] = useState(false);
    const authorId = select('core/editor').getEditedPostAttribute('author');

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'guten-element',
            'gvnews-block-wrapper',
            'gvnews-post-author',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useEffect(() => {
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-post-author'),
            method: 'POST',
            data: {
                attr: {
                    author: [authorId]
                }
            },
        }).then((data) => {
            setAuthorData(JSON.parse(data));
        }).catch((e) => {
            console.error(e.message);
        }).finally(() => {
        });
    }, [
        authorId,
    ]);

    useEffect(() => {
        if (authorData.length) {
            setContent(authorData.map((author, index) => {
                const metas = author.meta ? author.meta.map((meta, key) => {
                    return (
                        <a key={index} className="url" href="#" onClick={(e) => e.preventDefault()}>
                            <i className={`fa ${meta.value}`}></i>
                        </a>
                    );
                }) : (
                    <a href="#" onClick={(e) => e.preventDefault()} className="url">
                        <i className="fa fa-globe"></i>
                    </a>
                );
                return (
                    <div key={index} className="gvnews-authorbox">
                        <div className="gvnews-author-image">
                            <img
                                src={author.avatar}
                                className="avatar avatar-80 photo"
                            />
                        </div>
                        <div className="gvnews-author-content">
                            <h3 className="gvnews-author-name">
                                <a>{author.name}</a>
                            </h3>
                            <p className="gvnews-author-desc">{author.desc}</p>
                            <div className="gvnews-author-socials">
                                {metas}
                            </div>
                        </div>
                    </div>
                );
            }));
        } else {
            setContent(
                <div className="gvnews-authorbox">
                    <div className="gvnews-author-image">
                        <img
                            alt="admin"
                            srcSet="https://secure.gravatar.com/avatar/33e54dec0cd79fc4b5e911c15f836c46ec8d0e452ecd3ca5f707bce0a3540a3b?s=96&amp;d=mm&amp;r=g"
                        />
                    </div>
                    <div className="gvnews-author-content">
                        <h3 className="gvnews-author-name">
                            <a href="#" onClick={(e) => e.preventDefault()} >admin</a>
                        </h3>
                        <p className="gvnews-author-desc">Example Description</p>
                        <div className="gvnews-author-socials" >
                            <a href="#" onClick={(e) => e.preventDefault()} className="url">
                                <i className="fa fa-globe"></i>
                            </a>
                        </div>
                    </div>
                </div>
            );
        }
    }, [authorData]);

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            {content ? content : <ModuleOverlay />}
        </div>
    </>;
});

export default PostAuthor;