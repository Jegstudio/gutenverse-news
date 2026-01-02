import { __ } from '@wordpress/i18n';
import { formatDateString } from '../utils/date-util';
import { timeDifference } from '../utils/date-util';
import { applyFilters } from '@wordpress/hooks';
import { renderIcon } from 'gutenverse-core/helper';

const MetaAuthor = props => {
    if (props.post.author) {
        return <div className="gvnews_meta_author">
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
    const { post, attr, showIcon = true, customIcon = false } = props;
    const typeDate = attr.option.option.date_type;
    let date = new Date(post.date[typeDate] * 1000).toISOString();
    let timestamp = post.date[typeDate] * 1000;
    const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg>';

    return <div className="gvnews_meta_date">
        <a>
            {showIcon && (
                <>
                    {renderIcon('far fa-clock', 'svg', btoa(icon))}&nbsp;
                </>
            )}
            {'custom' == attr.date.format ? formatDateString(date, attr.date.custom) : 'ago' == attr.date.format ? timeDifference(timestamp) : formatDateString(date, attr.option.option.date_format)}
        </a>
    </div>;
};

const MetaComments = props => {
    const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"></path></svg>';

    return <div className="gvnews_meta_comment">
        <a>
            {renderIcon('far fa-comment','svg',btoa(icon))}&nbsp;
            {props.post.comment} {props.showText && __('Comments', 'gutenverse-news')}
        </a>
    </div>;
};

const MetaCategory = props => {
    return <div className="gvnews_post_category">
        <span><a>{props.post.category.name}</a></span>
    </div>;
};

const MetaModule1 = (props) => {
    const { post, attr } = props;
    const { option } = attr.option;
    if (option && !option.meta_show) {
        return null;
    }

    return (
        <div className="gvnews_post_meta">
            { applyFilters('gvnews.part.meta', [], {post, option}) }
            {option.meta_author && <MetaAuthor {...props} />}
            {option.meta_date && <MetaDate {...props} />}
            {option.meta_comment && <MetaComments {...props} />}
        </div>
    );
};

const MetaModule2 = (props) => {
    const { post, attr } = props;
    const { option } = attr.option;
    if (option && !option.meta_show) {
        return null;
    }

    return (
        <div className="gvnews_post_meta">
            { applyFilters('gvnews.part.meta', [], {post, option}) }
            {option.meta_date && <MetaDate {...props} />}
        </div>
    );
};

const MetaModule3 = (props) => {
    const { post, attr } = props;
    const { option } = attr.option;
    if (option && !option.meta_show) {
        return null;
    }

    return (
        <div className="gvnews_post_meta">
            { applyFilters('gvnews.part.meta', [], {post, option}) }
            {option.meta_author && <MetaAuthor {...props} />}
            {option.meta_date && <MetaDate {...props} />}
        </div>
    );
};


export { MetaModule1, MetaModule2, MetaModule3, MetaAuthor, MetaDate, MetaComments, MetaCategory };
