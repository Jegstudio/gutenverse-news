import { MetaAuthor, MetaCategory } from './meta';
import { formatDateString, timeDifference } from '../utils/date-util';

const SliderCaption = (props) => {
    const { withElipsis = true, withMeta = true, withReadmore = false} = props;
    return (
        <div className="gvnews_slide_caption">
            <div className="gvnews_caption_container">
                <MetaCategory post={props.post} />
                <h2 className="gvnews_post_title">
                    <a>{props.post.title.replace(/&#8217;/g, '\'')}</a>
                </h2>
                {props.excerpt && <p className="gvnews_post_excerpt">{props.post.excerpt
                    .replace('&hellip;', '')
                    .split(' ')
                    .splice(0, props.attr.length)
                    .join(' ') + (withElipsis ? props.attr.elipsis : '')}</p>}
                {props.post && withMeta && <SliderMeta {...props} />}
                {withReadmore && <a href="javascript:void(0);" className="gvnews_readmore">
                    Read more
                </a>}
            </div>
            {props.navigation && <div className="gvnews_block_nav">
                <a className="prev">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">{'<!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->'}<path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg>
                    prev
                </a>
                <a className="next">
                    next
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">{'<!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->'}<path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg>                    <i className="fas fa-angle-right"></i>
                </a>
            </div>}
        </div>
    );
};

const SliderMeta = (props) => {
    if (!props.attr.option.option.meta_show) {
        return <></>;
    }
    const dateAttr = props?.attr?.date;

    let date = new Date(props.post.date[dateAttr.type] * 1000).toISOString();
    let timestamp = props.post.date[dateAttr.type] * 1000;

    return (
        <div className="gvnews_post_meta">
            {!props.date && props.attr.option.option.meta_author && <MetaAuthor {...props} />}
            {props.attr.option.option && props.attr.option.option.meta_date &&
                <div className="gvnews_meta_date">
                    {props.date && <i className="far fa-clock">&nbsp;</i>}
                    <a>
                        {'custom' == props.attr.date.format ? formatDateString(date, props.attr.date.custom) : 'ago' == props.attr.date.format ? timeDifference(timestamp) : formatDateString(date, props.attr.option.option.date_format)}
                    </a>
                </div>}
        </div>
    );
};

export { SliderCaption, SliderMeta };
