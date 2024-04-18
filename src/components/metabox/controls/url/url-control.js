import React, { useState } from 'react';
import { useInstanceId } from '@wordpress/compose';
import { ControlHeadingSimple } from 'gutenverse-core/controls';
import { compose } from 'redux';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { GlobeSvg } from '../../../../assets/metabox-icons';

const UrlControl = ({
    label,
    allowDeviceControl,
    placeholder = 'http://',
    value = allowDeviceControl ? {} : '',
    onValueChange,
    onStyleChange,
    description = '',
}) => {
    const id = useInstanceId(UrlControl, 'inspector-text-control');

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    const [focused, setFocused] = useState(false);

    const handleInputFocus = () => {
        setFocused(true);
    };

    const handleInputBlur = () => {
        setFocused(false);
    };

    return <div id={id} className={`gutenverse-control-wrapper gvnews-control-url ${focused && 'focused'}`}>
        <ControlHeadingSimple
            id={`${id}-text`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'control-url'}>
                <div className="url-input">
                    <span className="url-input-icon">
                        <GlobeSvg />
                    </span>
                    <input
                        id={`${id}-text`}
                        type="url"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        className="control-input-text url-input-field"
                        placeholder={placeholder}
                        value={value === undefined ? '' : value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(UrlControl);