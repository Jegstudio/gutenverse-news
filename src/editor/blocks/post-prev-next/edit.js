import { compose } from '@wordpress/compose';
import { useEffect, useState, Fragment }  from '@wordpress/element';
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
import { ModuleOverlay } from '../../part/placeholder';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useRef } from '@wordpress/element';

const PostPrevNext = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
    } = attributes;

    const blockStyleRef = useRef();

    useEffect(() => {
        if (blockStyleRef.current) {
            setElementRef(blockStyleRef.current);
        }
    }, [blockStyleRef]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [prevNextData, setPrevNextData] = useState(false);
    const [content, setContent] = useState(false);
    const currentId = wp.data.select('core/editor').getCurrentPostId();

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-prev-next',
            elementId,
            animationClass,
            displayClass,
        ),
    });

    useEffect(() => {
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-post-prev-next'),
            method: 'POST',
            data: {
                id: currentId
            },
        }).then((data) => {
            setPrevNextData(JSON.parse(data));
        }).catch((e) => {
            console.error(e.message);
        }).finally(() => {
        });
    }, [
        currentId,
    ]);

    useEffect(() => {
        if(prevNextData.previous || prevNextData.next){
            setContent(<Fragment>
                {prevNextData.previous && <a className="post prev-post">
                    <span className="caption">{__('Previous Post', 'gutenverse-news')}</span>
                    <h3 className="post-title">{prevNextData.previous.title}</h3>
                </a>}
                {prevNextData.next && <a className="post next-post">
                    <span className="caption">{__('Next Post', 'gutenverse-news')}</span>
                    <h3 className="post-title">{prevNextData.next.title}</h3>
                </a>}
            </Fragment>);
        } else {
            setContent(<>
                <a href="#" className="post prev-post">
                    <span className="caption">Previous Post</span>
                    <h3 className="post-title">Lorem ipsum dolor sit amet consectetur adipiscing elit conubia nostra</h3>
                </a>
                <a href="#" className="post next-post">
                    <span className="caption">Next Post</span>
                    <h3 className="post-title">Nunc eu iaculis mi nulla facilisi aenean a risus sed luctus arcu </h3>
                </a>
            </>);
        }
        
    }, [prevNextData]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps} ref={blockStyleRef}>
            <div className="gvnews_custom_prev_next_wrapper gvnews_prev_next_container">
                <div className="gvnews_prevnext_post">
                    {content ? content : <ModuleOverlay />}
                </div>
            </div>
        </div>
    </>;
});

export default PostPrevNext;