import { compose } from '@wordpress/compose';
import { useEffect, useRef } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { isNotEmpty } from 'gutenverse-core/helper';
import PanelDeprecated from '../../panels/panel-deprecated';
import DeprecatedOverlay from '../../part/deprecated-overlay';

const ExampleComments = () => {

    const { imgDir } = window['GVNewsConfig'];

    return (
        <div id="comments" className="gvnews-comments">
            <h3 className="comments-title">
                Comments
                <span className="count">3</span>
            </h3>
            <div className="gvnews-commentlist-container">
                <ol className="commentlist">
                    {/* Start Comment walker, see class-comment-walker.php */}
                    <li id="comment-10" className="comment byuser comment-author-admin bypostauthor even thread-even depth-1 parent">
                        <article id="div-comment-10" className="comment-body">
                            <footer className="comment-meta">
                                <div className="comment-author vcard">
                                    <img
                                        alt=""
                                        src={`${imgDir}/author.png`}
                                        className="avatar avatar-55 photo"
                                        height="55"
                                        width="55"
                                    />
                                    <b className="fn">
                                        <a href="javascript:void(0);" className="url" rel="ugc" >admin</a>
                                    </b>{' '}
                                    <span className="says">says:</span>
                                </div>
                                <div className="comment-metadata">
                                    <a href="#comment-10">
                                        <time dateTime="2025-07-01T10:05:01+00:00">
                                            July 1, 2025 at 10:05 am
                                        </time>
                                    </a>{' '}
                                    <span className="edit-link">
                                        <a className="comment-edit-link" href="javascript:void(0);">
                                            Edit
                                        </a>
                                    </span>
                                </div>
                            </footer>
                            <div className="comment-content">
                                <p>comment 1</p>
                            </div>
                            <div className="reply">
                                <a
                                    className="comment-reply-link"
                                    href="#respond"
                                    aria-label="Reply to admin"
                                >
                                    Reply
                                </a>
                            </div>
                        </article>
                        <ul className="children">
                            <li
                                id="comment-11"
                                className="comment byuser comment-author-admin bypostauthor odd alt depth-2"
                            >
                                <article id="div-comment-11" className="comment-body">
                                    <footer className="comment-meta">
                                        <div className="comment-author vcard">
                                            <img
                                                alt=""
                                                src={`${imgDir}/author.png`}
                                                className="avatar avatar-55 photo"
                                                height="55"
                                                width="55"
                                            />
                                            <b className="fn">
                                                <a href="javascript:void(0);" className="url">admin</a>
                                            </b>{' '}
                                            <span className="says">says:</span>
                                        </div>
                                        <div className="comment-metadata">
                                            <a href="#comment-11">
                                                <time dateTime="2025-07-01T10:05:10+00:00">
                                                    July 1, 2025 at 10:05 am
                                                </time>
                                            </a>{' '}
                                            <span className="edit-link">
                                                <a className="comment-edit-link" href="javascript:void(0);">Edit</a>
                                            </span>
                                        </div>
                                    </footer>
                                    <div className="comment-content">
                                        <p>reply1</p>
                                    </div>
                                    <div className="reply">
                                        <a rel="nofollow" className="comment-reply-link" href="#respond" aria-label="Reply to admin">Reply</a>
                                    </div>
                                </article>
                            </li>
                        </ul>
                    </li>
                </ol>
            </div>
        </div>
    );
};

const FormLogin = (props) => {

    const {
        currentUser
    } = props;

    return <>
        <div id="respond" className="comment-respond">
            <h3 id="reply-title" className="comment-reply-title">
                {__('Leave a Reply', 'gutenverse-news')}
                <small>
                    <a rel="nofollow" id="cancel-comment-reply-link" href="javascript:void(0);" style={{ display: 'none' }} >{__('Cancel reply', 'gutenverse-news')}</a>
                </small>
            </h3>
            <form onSubmit="event.preventDefault();" id="commentform" className="comment-form">
                <p className="logged-in-as">
                    {__('Logged in as ', 'gutenverse-news')}
                    {`${currentUser.name}. `}
                    <a href="javascript:void(0);">{__('Edit your profile ', 'gutenverse-news')}</a>.
                    <a href="javascript:void(0);">{__('Log out? ', 'gutenverse-news')}</a>
                    <span className="required-field-message">
                        {__(' Required fields are marked', 'gutenverse-news')}
                        <span className="required"> *</span>
                    </span>
                </p>
                <p className="comment-form-comment">
                    <label htmlFor="comment">
                        {__('Comment', 'gutenverse-news')}
                        <span className="required"> *</span>
                    </label>
                    <textarea id="comment" name="comment" cols="45" rows="8" maxLength="65525" required="required"></textarea>
                </p>
                <p className="form-submit">
                    <input name="submit" type="submit" id="submit" className="submit" value="Post Comment" onClick={e => e.preventDefault()}/>
                </p>
            </form>
        </div>
    </>;
};

const FormNotLogin = () => {
    return (
        <div id="respond" className="comment-respond">
            <h3 id="reply-title" className="comment-reply-title">
                Leave a Reply{' '}
                <small>
                    <a rel="nofollow" id="cancel-comment-reply-link" href="javascript:void(0);" style={{ display: 'none' }}>
                        Cancel reply
                    </a>
                </small>
            </h3>

            <form id="commentform" className="comment-form">
                <p className="comment-notes">
                    <span id="email-notes">Your email address will not be published.</span>{' '}
                    <span className="required-field-message">
                        Required fields are marked<span className="required"> *</span>
                    </span>
                </p>

                <p className="comment-form-comment">
                    <label htmlFor="comment">
                        {__('Comment', 'gutenverse-news')}
                        <span className="required"> *</span>
                    </label>
                    <textarea id="comment" name="comment" cols="45" rows="8" maxLength="65525" required="required"></textarea>
                </p>

                <p className="comment-form-author">
                    <label htmlFor="author">
                        Name<span className="required"> *</span>
                    </label>{' '}
                    <input id="author" name="author" type="text" size="30" maxLength="245" autoComplete="name"/>
                </p>

                <p className="comment-form-email">
                    <label htmlFor="email">
                        Email<span className="required"> *</span>
                    </label>{' '}
                    <input id="email" name="email" type="email" size="30" maxLength="100" aria-describedby="email-notes" autoComplete="email" required/>
                </p>

                <p className="comment-form-url">
                    <label htmlFor="url">Website</label>{' '}
                    <input id="url" name="url" type="url" size="30" maxLength="200" autoComplete="url"/>
                </p>

                <p className="comment-form-cookies-consent">
                    <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox"/>{' '}
                    <label htmlFor="wp-comment-cookies-consent">
                        Save my name, email, and website in this browser for the next time I comment.
                    </label>
                </p>

                <p className="form-submit">
                    <input name="submit" type="submit" id="submit" className="submit" value="Post Comment" onClick={e => e.preventDefault()} />
                </p>
            </form>
        </div>
    );
};

const PostComment = compose(
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
        separatorStyle,
        __isLogin,
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
            'gvnews-post-comment',
            'guten-element',
            'gvnews-deprecated-block',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const currentUser = wp.data.select('core').getCurrentUser();

    const Form = () => {
        if (isNotEmpty(__isLogin)) {
            return <FormLogin currentUser={currentUser} />;
        }

        return <FormNotLogin />;
    };

    return <>
        <PanelDeprecated title="Post Comment" />
        <div  {...blockProps}>
            <ExampleComments />
            {separatorStyle !== 'none' && <hr className={'separator'}></hr>}
            <Form />
            <DeprecatedOverlay />
        </div>
    </>;
});

export default PostComment;