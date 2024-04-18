import React, {Fragment, useEffect} from 'react';
import { __ } from '@wordpress/i18n';
import { Edit3 } from 'react-feather';
import { applyFilters } from '@wordpress/hooks';
import { ShareSvg, CogsSvg, TagsSvg } from '../../assets/metabox-icons';

const Icon = ({iconName}) => {

    const IconComponents = {
        ShareSvg,
        CogsSvg,
        TagsSvg
    };

    const EmptyIcon = () => {
        return null;
    };

    const IconComponent = IconComponents[iconName] ? IconComponents[iconName] : EmptyIcon;

    return <IconComponent/>;
};

export default Icon;
