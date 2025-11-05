import { MetaCategory } from './meta';

const ThumbModule = (props) => {
    const imageSize = props.imageSize? props.imageSize : {};
    return <div className="gvnews_thumb">
        <a href="javascript:void(0)">
            <div className={`${props.classes}  thumbnail-container size-${imageSize.dimension? imageSize.dimension : props.size}`}>
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
        {props.cat && props.post.category.name && <MetaCategory {...props} />}
    </div>;
};

export default ThumbModule;