
import { MetaModule2, MetaModule3, MetaCategory } from '../meta';

/**
 *
 * @param { index, margin, post, attr } param0
 * @returns
 */
const HeroElement = ({ index, margin, post, attr }) => {
    const TitleTag = attr?.postTitleHtmlTag || 'h2';
    return (
        <article className={`gvnews_post gvnews_hero_item_${index + 1}`}>
            <div className="gvnews_block_container">
                <span className="gvnews_postformat_icon"></span>
                <div className="gvnews_thumb">
                    <a>
                        <div className="thumbnail-container thumbnail-background">
                            <div
                                className="lazyloaded"
                                style={{
                                    backgroundImage: 'url(' + post.thumbnail.url + ')',
                                }}></div>
                        </div>
                    </a>
                </div>
                <div className="gvnews_postblock_content">
                    <MetaCategory post={post} />
                    <div className="gvnews_post_info">
                        <TitleTag className="gvnews_post_title">
                            <a>{post.title.replace(/&#8217;/g, '\'')}</a>
                        </TitleTag>
                        <div className="gvnews_post_meta">
                            {index === 0 ? <MetaModule3 post={post} attr={attr} /> : <MetaModule2 post={post} attr={attr} />}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

/**
 * Hero Empty
 *
 * @param {index, margin} param0
 * @returns {JSX.Element}
 */
const HeroEmpty = ({ index, margin }) => {
    return (
        <article className={`gvnews_post gvnews_hero_item_${index + 1}`} style={{ padding: `0 0 ${margin}px ${margin}px` }}>
            <div className="gvnews_block_container"></div>
        </article>
    );
};

/**
 * Hero Item
 *
 * @param {index, margin, post, attr} param0
 * @returns {JSX.Element}
 */
const HeroItemComponent = ({ index, margin, post, attr }) => {
    if (!post) {
        return <HeroEmpty {...{ index, margin }} />;
    }
    return <HeroElement {...{ index, margin, post, attr }} />;
};

export default HeroItemComponent;