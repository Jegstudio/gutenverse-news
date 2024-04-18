import React, {Fragment, useEffect} from 'react';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import Icon from './icon';
import { ChevronRightSvg } from '../../assets/metabox-icons';

const MetaboxSection = ({ setStage, stage, metaboxes, setMetaboxes }) => {

    const updateStage = (newStage) => {
        setStage([...stage, newStage]);
    };

    return metaboxes.length ? <>
        {metaboxes.map(metabox=>{
            const { id, label, icon, type, description = false } = metabox;
            return <li key={id} onClick={() => updateStage({id: id, label:label, description: description})}>
                {label}
                {icon && <Icon iconName={icon} />}
                {type && 'tab' === type && <ChevronRightSvg size={13   } />}
            </li>;
        })}
    </> : null;
};

export default MetaboxSection;
