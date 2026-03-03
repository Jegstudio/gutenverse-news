import { __ } from '@wordpress/i18n';
import { MetaAuthor, MetaCategory } from './meta';
import { formatDateString, timeDifference } from '../utils/date-util';
import { renderIcon } from 'gutenverse-core/helper';

const clockSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg>';

const SliderCaption = (props) => {
    const { withElipsis = true, withMeta = true, withReadmore = false} = props;
    const TitleTag = props.attr?.titleTag || 'h3';

    return (
        <div className="gvnews_slide_caption">
            <div className="gvnews_caption_container">
                <MetaCategory post={props.post} />
                <TitleTag className="gvnews_post_title">
                    <a>{props.post.title.replace(/&#8217;/g, '\'')}</a>
                </TitleTag>
                {props.excerpt && <p className="gvnews_post_excerpt">{props.post.excerpt
                    .replace('&hellip;', '')
                    .split(' ')
                    .splice(0, props.attr.length)
                    .join(' ') + (withElipsis ? props.attr.elipsis : '')}</p>}
                {props.post && withMeta && <SliderMeta {...props} />}
                {withReadmore && <a href="javascript:void(0);" className="gvnews_readmore">
                    {__('Read more', 'gutenverse-news')}
                </a>}
            </div>
            {props.navigation && <div className="gvnews_block_nav">
                {(() => {
                    const iconNext = props.nextButtonIcon || '';
                    const iconNextType = props.nextButtonIconType || 'icon';
                    const iconNextSVG = props.nextButtonIconSVG || '';

                    const iconPrev = props.prevButtonIcon || '';
                    const iconPrevType = props.prevButtonIconType || 'icon';
                    const iconPrevSVG = props.prevButtonIconSVG || '';

                    const finalNextIcon = (iconNextType === 'svg' && !iconNextSVG) ? '' : iconNext;
                    const finalPrevIcon = (iconPrevType === 'svg' && !iconPrevSVG) ? '' : iconPrev;

                    return (
                        <>
                            <a className="prev">
                                {renderIcon(finalPrevIcon, iconPrevType, iconPrevSVG)}
                                <span>{__('prev', 'gutenverse-news')}</span>
                            </a>
                            <a className="next">
                                <span>{__('next', 'gutenverse-news')}</span>
                                {renderIcon(finalNextIcon, iconNextType, iconNextSVG)}
                            </a>
                        </>
                    );
                })()}
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
                    {props.date && props.blockType !== 'slider-8' && (
                        <>
                            {renderIcon('far fa-clock', 'svg', btoa(clockSVG))}&nbsp;
                        </>
                    )}
                    <a>
                        {'custom' == props.attr.date.format ? formatDateString(date, props.attr.date.custom) : 'ago' == props.attr.date.format ? timeDifference(timestamp) : formatDateString(date, props.attr.option.option.date_format)}
                    </a>
                </div>}
        </div>
    );
};

export { SliderCaption, SliderMeta };
