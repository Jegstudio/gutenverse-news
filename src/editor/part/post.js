import React from 'react';
import { MetaModule1, MetaModule2, MetaModule3, MetaCategory } from './meta';

const PostTitle = (props) => {
    return (
        <h3 property="headline" className="gvnews_post_title">
            <a>{props.post.title.replace(/&#8217;/g, '\'')}</a>
        </h3>
    );
};

const PostExcerpt = (props) => {
    return (
        <div className="gvnews_post_excerpt">
            <p>
                {props.post.excerpt
                    .replace('&hellip;', '')
                    .split(' ')
                    .splice(0, props.attr.length)
                    .join(' ') + props.attr.elipsis}
            </p>{' '}
            {props.read && (
                <a className="gvnews_readmore">
                    {props.attr.option.string && props.attr.option.string.load_more}
                </a>
            )}
        </div>
    );
};

const ContentModule = (props) => {
    return (
        <div className="gvnews_postblock_content">
            {props.cat && <MetaCategory {...props} />}
            {props.title && <PostTitle {...props} />}
            {props.attr.option && props.meta == 1 ? (
                <MetaModule1 {...props} />
            ) : props.attr.option && props.meta == 2 ? (
                <MetaModule2 {...props} />
            ) : props.attr.option && props.meta == 3 ? (
                <MetaModule3 {...props} />
            ) : (
                ''
            )}
            {props.excerpt && props.post.excerpt && <PostExcerpt {...props} />}
        </div>
    );
};

export {ContentModule, PostTitle, PostExcerpt};
