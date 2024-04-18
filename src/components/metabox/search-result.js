import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ChevronRight } from 'react-feather';
import Icon from './icon';

const SearchResult = ({ initialMetaboxes, search, setSearchActive, setStage }) => {

    function findFields(objArr, keyword) {
        let results = [];

        const traverse = (obj, breadcrumb) => {
            if (typeof obj !== 'object' || obj === null) {
                return;
            }
            const { id, icon, label, description = false } = obj;
            Object.keys(obj).forEach(key => {
                if (key === 'label' || key === 'description') {
                    if (obj[key].toLowerCase().includes(keyword.toLowerCase())) {
                        results.push({ ...obj, breadcrumb });
                    }
                } else {
                    traverse(obj[key], [...breadcrumb, { id: id, icon: icon, label: label, description: description }]);
                }
            });
        };
        objArr.forEach(obj => traverse(obj, []));

        //group fields base on metabox and remove duplicate metabox in the result
        let uniqueResults = { length: 0, result: [] };
        results.forEach(result => {
            const firstParent = result.breadcrumb[0];
            if (firstParent) {
                const { id, icon, label, description = false } = firstParent;
                const isMetaboxExist = uniqueResults.result.some((r) => r.id === id);
                uniqueResults.length++;
                if (!isMetaboxExist) {
                    uniqueResults.result.push({ id: id, icon: icon, description: description, fields: [result] });
                } else {
                    uniqueResults.result.forEach(item => {
                        if (item.id === id) {
                            item.fields.push(result);
                        }
                    });
                }
            }
        });
        return uniqueResults;
    }

    const foundMetabox = findFields(initialMetaboxes, search);

    return <div className="gvnews-metabox-search-result">
        <span className="gvnews-metabox-search-result-length">{foundMetabox.length} Options Found ...</span>
        {foundMetabox.result.map((metabox) => {
            const { id, icon, fields } = metabox;
            return <div key={id} className="gvnews-metabox-search-result-item" >
                {<div className={`gvnews-metabox-search-result-item-icon ${!icon && 'empty-icon'}`}>{<Icon iconName={icon} />}</div>}
                <div className="gvnews-metabox-search-result-item-fields">
                    <SearchItemField {...{
                        fields,
                        setSearchActive,
                        setStage
                    }} />
                </div>
            </div>;
        })}
    </div>;
};

const SearchItemFieldBreadcrumb = ({ breadcrumb }) => {
    return <span className="gvnews-metabox-search-result-item-breadcrumb">{breadcrumb.map((section, index) => {
        const angle = index + 1 === breadcrumb.length ? '' : <ChevronRight size={10} />;
        return <Fragment key={index}>
            {section.label}
            {angle}
        </Fragment>;
    })}</span>;
};

const SearchItemField = ({ fields, setSearchActive, setStage }) => {
    const handleSearchResultClick = (breadcrumb) => {
        setSearchActive(false);
        setStage(breadcrumb);
    };

    return fields.map((field, key) => {
        const { breadcrumb, type, id, label, description = false } = field;
        const filteredBreadcrumb = breadcrumb.filter(item => item.id !== undefined);
        return <div key={id} className="gvnews-metabox-search-result-item-field" onClick={() => { handleSearchResultClick('tab' === type ? [...filteredBreadcrumb, { id: id, label: label, description: description }] : filteredBreadcrumb); }} >
            <SearchItemFieldBreadcrumb breadcrumb={filteredBreadcrumb} />
            <span className="gvnews-metabox-search-result-item-title">{label}</span>
            {description && <span className="gvnews-metabox-search-result-item-description">{description}</span>}
        </div>;
    });
};

export default SearchResult;


