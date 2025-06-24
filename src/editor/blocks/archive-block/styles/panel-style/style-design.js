import { isNotEmpty } from 'gutenverse-core/helper';

const designStyle = (props) => {
    const {
        data,
        elementId,
        attributes
    } = props;

    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.${elementId} .gvnews_post .gvnews_post_title > a`,
    });

    isNotEmpty(attributes['metaTypography']) && data.push({
        'type': 'typography',
        'id': 'metaTypography',
        'selector': `.${elementId} .gvnews_post > .gvnews_post_meta`,
    });

    isNotEmpty(attributes['contentTypography']) && data.push({
        'type': 'typography',
        'id': 'contentTypography',
        'selector': `.${elementId} .gvnews_post > .gvnews_post_excerpt`,
    });

    return data;
};

export default designStyle;