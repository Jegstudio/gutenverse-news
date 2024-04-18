import { compose } from '@wordpress/compose';
import { useEffect, useState, useRef, Fragment } from '@wordpress/element';
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
import { ModuleOverlay } from '../../part/placeholder';
import { RawHTML } from '@wordpress/element';
import { select, useSelect } from '@wordpress/data';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const PostAuthor = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
    } = attributes;

    const { imgDir } = window['GVNewsConfig'];
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [authorData, setAuthorData] = useState(false);
    const [content, setContent] = useState(false);
    const currentId = wp.data.select('core/editor').getCurrentPostId();
    const authorId = select('core/editor').getEditedPostAttribute('author');

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-post-author',
            elementId,
            animationClass,
            displayClass,
        ),
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
                    return <a key={index} className="url">
                        <i className={`fa ${meta.value}`}></i>
                    </a>;
                }) : '';
                return (<div key={index} className="gvnews_authorbox">
                    <div className="gvnews_author_image">
                        <img src={author.avatar} className="avatar avatar-80 photo" />
                    </div>
                    <div className="gvnews_author_content">
                        <h3 className="gvnews_author_name"><a>{author.name}</a></h3>
                        <p className="gvnews_author_desc">{author.desc}</p>
                        <div className="gvnews_author_socials">
                            {metas}
                        </div>
                    </div>
                </div>);
            }));
        } else {
            setContent(<div className="gvnews_authorbox">
                    <div className="gvnews_author_image">
                        <img alt="admin" src={`${imgDir}/author.png`}/>
                    </div>
                    <div class="gvnews_author_content">
                        <h3 className="gvnews_author_name">
                            <a href="#">admin</a>
                        </h3>
                        <p></p>
                    </div>
                </div>)
        }
    }, [authorData]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <div className="gvnews_custom_share_wrapper">
                <div className="gvnews_custom_author_wrapper gvnews_author_box_container">
                    {content ? content : <ModuleOverlay />}
                </div>
            </div>
        </div>
    </>;
});

export default PostAuthor;