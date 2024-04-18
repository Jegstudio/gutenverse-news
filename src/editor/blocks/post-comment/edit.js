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
import { ModuleOverlay } from '../../part/placeholder';
import { useSelect } from '@wordpress/data';
import { select, subscribe } from '@wordpress/data';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const PostComment = compose(
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
    const [content, setContent] = useState(false);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-post-comment',
            elementId,
            animationClass,
            displayClass,
        ),
    });

    const currentUser = wp.data.select('core').getCurrentUser();

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <div className="gvnews_comment_container gvnews_custom_comment_wrapper">
                <div id="respond" className="comment-respond">
                    <h3 id="reply-title" className="comment-reply-title">
                        {__('Leave a Reply', 'gutenverse-news')}
                        <small>
                            <a rel="nofollow" id="cancel-comment-reply-link" href="#" style={{ display: 'none' }} >{__('Cancel reply', 'gutenverse-news')}</a>
                        </small>
                    </h3>
                    <form method="post" id="commentform" className="comment-form">
                        <p className="logged-in-as">
                            {__('Logged in as ', 'gutenverse-news')}
                            {`${currentUser.name}. `}
                            <a href="#">{__('Edit your profile ', 'gutenverse-news')}</a>.
                            <a href="#">{__('Log out? ', 'gutenverse-news')}</a>
                            <span className="required-field-message">
                                {__(' Required fields are marked', 'gutenverse-news')}
                                <span className="required"> *</span>
                            </span>
                        </p>
                        <p className="comment-form-comment">
                            <label htmlFor="comment">
                                {__('Comment', 'gutenverse-news')}
                                <span className="required">*</span>
                            </label>
                            <textarea id="comment" name="comment" cols="45" rows="8" maxLength="65525" required="required"></textarea>
                        </p>
                        <p className="form-submit">
                            <input name="submit" type="submit" id="submit" className="submit" value="Post Comment" />
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </>;
});

export default PostComment;