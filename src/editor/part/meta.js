import React from 'react';
import { __ } from '@wordpress/i18n';
import { formatDateString } from '../utils/date-util';
import { timeDifference } from '../utils/date-util';
import { RawHTML } from '@wordpress/element';

const MetaAuthor = props => {
    if(props.post.author){
        return  <div className="gvnews_meta_author">
            <span className="by">
                {props.attr.option.string && props.attr.option.string.by}&nbsp;
            </span>
            <a>
                {props.post.author.name}
            </a>
        </div>;
    }
};

const MetaDate = props => {
    const {post, attr, showIcon = true, customIcon = false} = props;
    let date = new Date(post.date.modified * 1000).toISOString();
    let timestamp = post.date.modified * 1000;

    return  <div className="gvnews_meta_date">
        <a>
            {showIcon && <i className={customIcon ? customIcon : 'fas fa-clock'}>&nbsp;</i>}
            {'custom' == attr.date.format ? formatDateString(date, attr.date.custom) : 'ago' == attr.date.format ? timeDifference(timestamp) : formatDateString(date, attr.option.option.date_format)}
        </a>
    </div>;
};

const MetaComments = props => {
    return  <div className="gvnews_meta_comment">
        <a>
            <i className="far fa-comment">&nbsp;</i>
            {props.post.comment} {props.showText && __('Comments', 'gutenverse-news')}
        </a>
    </div>;
};

const MetaCategory = props => {
    return  <div className="gvnews_post_category">
        <span><a>{props.post.category.name}</a></span>
    </div>;
};

const MetaModule1 = (props) => {
    const {post, attr} = props;
    const {option} =  attr.option;
    if ( option && !option.meta_show ) {
        return null;
    }

    return (
        <div className="gvnews_post_meta">
            {option.meta_author && <MetaAuthor {...props}/>}
            {option.meta_date && <MetaDate {...props}/>}
            {option.meta_comment && <MetaComments {...props}/>}
        </div>
    );
};

const MetaModule2 = (props) => {
    const {post, attr} = props;
    const {option} =  attr.option;
    if ( option && !option.meta_show ) {
        return null;
    }

    return (
        <div className="gvnews_post_meta">
            {option.meta_date && <MetaDate {...props}/>}
        </div>
    );
};

const MetaModule3 = (props) => {
    const {post, attr} = props;
    const {option} =  attr.option;
    if ( option && !option.meta_show ) {
        return null;
    }

    return (
        <div className="gvnews_post_meta">
            {option.meta_author && <MetaAuthor {...props}/>}
            {option.meta_date && <MetaDate {...props}/>}
        </div>
    );
};


export {MetaModule1, MetaModule2, MetaModule3, MetaAuthor, MetaDate, MetaComments, MetaCategory};