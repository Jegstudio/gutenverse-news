import { MetaAuthor, MetaCategory } from './meta';
import { formatDateString, timeDifference } from '../utils/date-util';

const SliderCaption = (props) => {
    const {
        withElipsis = true,
        withMeta = true,
        withReadmore = false,
        nextButtonIcon = 'fas fa-angle-right',
        prevButtonIcon = 'fas fa-angle-left',
    } = props;
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
                    <i className={prevButtonIcon}></i>
                    <span>prev</span>
                </a>
                <a className="next">
                    <span>next</span>
                    <i className={nextButtonIcon}></i>
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
