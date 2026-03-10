import { gvnewsEssentialsActive } from "../utils/helper";
import { MetaCategory } from './meta';
import { renderIcon } from 'gutenverse-core/helper';

const ThumbModule = (props) => {
    const imageSize = props.imageSize ? props.imageSize : {};
    const onLoad = props.onLoad || (() => { });
    const {
        overlayIconData = {
            show: false,
            gallery: {
                icon: '',
                type: 'icon',
                svg: '',
            },
            video: {
                icon: '',
                type: 'icon',
                svg: '',
            },
        },
        post = {}
    } = props;
    const { format = 'standard' } = post;

    let withOverlayIcon = overlayIconData.show && gvnewsEssentialsActive;
    if (format === 'standard') withOverlayIcon = false;
    const type = overlayIconData[format]?.type || 'icon';
    const icon = overlayIconData[format]?.icon || '';
    const svg = overlayIconData[format]?.svg || '';
    if (type === 'svg' && !svg) withOverlayIcon = false;
    if (type === 'icon' && !icon) withOverlayIcon = false;

    return <div className={`gvnews_thumb ${withOverlayIcon ? 'with-overlay-icon' : ''}`}>
        <a href="javascript:void(0)">
            <div className={`${props.classes}  thumbnail-container size-${imageSize.dimension ? imageSize.dimension : props.size} ${imageSize.class ? imageSize.class : ''}`}>
                {post.thumbnail.url &&
                    <>
                        <img
                            src={post.thumbnail.url}
                            style={{
                                objectFit: 'cover',
                                verticalAlign: 'middle',
                                maxHeight: '100%',
                                maxWidth: '100%',
                            }}
                            height={imageSize.height}
                            width={imageSize.width}
                            className="lazyloaded"
                            onLoad={onLoad}
                        />
                        <div className="gvnews-thumb-overlay"></div>
                    </>
                }
            </div>
        </a>
        {props.cat && post.category.name && <MetaCategory {...props} />}
        {
            withOverlayIcon &&
            <div className="gvnews-thumb-overlay-icon">
                {renderIcon(icon, type, svg)}
            </div>
        }
    </div>;
};

export default ThumbModule;