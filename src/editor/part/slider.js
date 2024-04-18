import React from 'react';
import { MetaModule1, MetaModule2, MetaAuthor, MetaCategory } from './meta';
import { formatDateString, timeDifference } from '../utils/date-util';

const SliderCaption = (props) => {
    return (
        <div className="gvnews_slide_caption">
            <div className="gvnews_caption_container">
                <MetaCategory post={props.post}/>
                <h2 className="gvnews_post_title">
                    <a>{props.post.title.replace(/&#8217;/g, '\'')}</a>
                </h2>
                {props.excerpt && <p className="gvnews_post_excerpt">{props.post.excerpt
                    .replace('&hellip;', '')
                    .split(' ')
                    .splice(0, props.attr.length)
                    .join(' ') + props.attr.elipsis}</p>}
                {props.post && <SliderMeta {...props}/>}
            </div>
            {props.navigation && <div className="gvnews_block_nav">
                <a  className="prev">
                    <i className="fas ffa-chevron-left"></i>
                prev
                </a>
                <a className="next">
                next
                    <i className="fas ffa-chevron-right"></i>
                </a>
            </div>}
        </div>
    );
};

const SliderMeta = (props) => {
    let date = new Date(props.post.date.modified * 1000).toISOString();
    let timestamp = props.post.date.modified * 1000;
    return (
        <div className="gvnews_post_meta">
            {!props.date && props.attr.option.option.meta_author && <MetaAuthor {...props}/>}
            {props.attr.option.option && props.attr.option.option.meta_date &&
            <div className="gvnews_meta_date">
                {props.date && <i className="fas fa-clock">&nbsp;</i>}
                <a>
                    {'custom' == props.attr.date.format ? formatDateString(date, props.attr.date.custom) : 'ago' == props.attr.date.format ? timeDifference(timestamp) : formatDateString(date, props.attr.option.option.date_format)}
                </a>
            </div>}
        </div>
    );
};

export { SliderCaption, SliderMeta };
