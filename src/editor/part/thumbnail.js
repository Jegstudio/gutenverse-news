import React from 'react';
import {MetaCategory} from './meta';

const ThumbModule = (props) => {
    return <div className="gvnews_thumb">
        {props.post.thumbnail.url &&  <a>
            <div className={`${props.classes}  thumbnail-container size-${props.size}`}>
                <img src={props.post.thumbnail.url} style={{objectFit: 'cover', verticalAlign: 'middle', maxHeight: '100%', maxWidth: '100%'}} className="lazyloaded"/>
            </div>
        </a>}
        {props.cat && props.post.category.name && <MetaCategory {...props} />}
    </div>;
};

export default ThumbModule;