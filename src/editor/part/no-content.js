import { RichText } from '@wordpress/block-editor';
import { getModuleOptions } from '../utils/helper';

const NoContent = ({ attributes, setAttributes }) => {
    const options = getModuleOptions();

    if (attributes.noContentText === undefined) {
        return <div className={'gvnews_empty_module'}>{options.string && options.string.no_content}</div>;
    }

    return <RichText
        tagName={'div'}
        className={'gvnews_empty_module'}
        value={attributes.noContentText}
        onChange={(val) => setAttributes({noContentText: val})}
    />;
};

export default NoContent;