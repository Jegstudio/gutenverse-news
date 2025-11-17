import { MetaCategory } from './meta';

const ThumbModule = (props) => {
    const imageSize = props.imageSize ? props.imageSize : {};
    return <div className="gvnews_thumb">
        <a href="javascript:void(0)">
            <div className={`${props.classes}  thumbnail-container size-${imageSize.dimension ? imageSize.dimension : props.size} ${imageSize.class ? imageSize.class : ''}`}>
                {props.post.thumbnail.url &&
                    <img
                        src={props.post.thumbnail.url}
                        style={{
                            objectFit: 'cover',
                            verticalAlign: 'middle',
                            maxHeight: '100%',
                            maxWidth: '100%',
                        }}
                        height={imageSize.height}
                        width={imageSize.width}
                        className="lazyloaded"
                    />
                }
            </div>
        </a>
        <div
            className="gvnews-thumb-overlay"
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0',
                zIndex: 2,
            }}
        ></div>
        {props.cat && props.post.category.name && <MetaCategory {...props} />}
    </div>;
};

export default ThumbModule;