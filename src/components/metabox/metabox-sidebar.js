import React from 'react';
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import { LogoColor, LogoWhite } from 'gutenverse-core/icons';
import { CategoryIcon as Placeholder } from '../../assets/block-icons';
import MetaboxOptions from './metabox-options';
import { isFSE } from 'gutenverse-core/helper';
import SearchResult from './search-result';
import { MagnifyingSvg } from '../../assets/metabox-icons';


const MetaboxSidebar = (props) => {

    const Sidebar = isFSE() ? wp.editSite.PluginSidebar : wp.editPost.PluginSidebar;

    const [stage, setStage] = useState([]);

    const searchInputRef = useRef();


    const initialMetaboxes = window.GutenverseNewsMetabox || [];

    const [metaboxes, setMetaboxes] = useState(initialMetaboxes || []);
    const [searchActive, setSearchActive] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setMetaboxes(stage.length ? findMetabox(initialMetaboxes, stage) : initialMetaboxes);
    }, [stage]);

    const findMetabox = (stage, idArray) => {
        let parent = stage.find(item => item.id === idArray[0].id);

        if (parent) {
            let child = parent;
            for (let i = 1; i < idArray.length; i++) {
                child = child.fields.find(field => field.id === idArray[i].id);
                if (!child) {
                    return null;
                }
            }

            return child;
        }

        return null;
    };

    const handleSearchButtonClicked = () => {
        setSearchActive(!searchActive);
    };

    const handleSearchInputRef = (node) => {
        searchInputRef.current = node;
        if (searchActive && node) {
            node.focus();
        }
    };

    return <Sidebar
        className="gvnews-sidebar"
        name="gvnews-sidebar"
        title={<div className={'gvnews-sidebar-heading'}><span className={`gvnews-metabox-search-button ${searchActive && 'search-opened'}`} onClick={() => handleSearchButtonClicked()}><MagnifyingSvg /></span>{searchActive ?
            <div className={'gvnews-metabox-search-input'}>
                <input
                    id="gvnews-metabox-search-input-text"
                    type="text"
                    ref={handleSearchInputRef}
                    className="control-input-text"
                    placeholder={__('Search here...', 'gutenverse-news')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div> : <span>Gutenverse News</span>}</div>}
        icon={<div className={'gutenverse-icon gvnews'}>
            <span className="logo-color"><Placeholder /></span>
            <span className="logo-white"><Placeholder /></span>
        </div>}
        closeLabel={'GVNews Metabox Close'}
    >
        <PanelBody>
            <div className="gvnews-metabox-content">
                {searchActive && search.length > 2 ?
                    <SearchResult {...{
                        initialMetaboxes,
                        search,
                        setSearchActive,
                        setStage,
                    }} /> :
                    <MetaboxOptions {...{
                        stage,
                        metaboxes,
                        setStage,
                        ...props
                    }}
                    />}
            </div>
        </PanelBody>
    </Sidebar>;
};

export default MetaboxSidebar;