import { useEffect } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import MetaboxSidebar from './metabox-sidebar';

const Metabox = () => {
    useEffect(() => {
        registerPlugin('gvnews-metabox', { render: () => <MetaboxSidebar /> });
    }, []);
};

export default Metabox;