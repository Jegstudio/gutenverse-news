import ReactDOM from 'react-dom';
import Metabox from './metabox';
import domReady from '@wordpress/dom-ready';
import elementChange from 'element-change';

elementChange('#site-editor', () => {
    ReactDOM.render(
        <>
            <Metabox />
        </>
        , document.getElementById('gutenverse-news-root'));
});

domReady(() => {
    ReactDOM.render(
        <>
            <Metabox />
        </>
        , document.getElementById('gutenverse-news-root'));
});
