import React from 'react';
import { useInstanceId } from '@wordpress/compose';
import { ControlHeadingSimple } from 'gutenverse-core/controls';
import { compose } from 'redux';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { RawHTML } from '@wordpress/element';

const ImageRadioControl = props => {
    const {
        label,
        onValueChange,
        onStyleChange,
        options,
        value,
        description
    } = props;

    const id = useInstanceId(ImageRadioControl, 'inspector-radio-image-control');

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    return (
        <div id={id} className={'gutenverse-control-wrapper gvnews-control-image-radio'}>
            <ControlHeadingSimple
                id={`${id}-radio-image`}
                label={label}
            />
            <span className="gvnews-metabox-control-description top-description">
                <RawHTML>{description}</RawHTML>
            </span>
            <div className={'control-body'}>
                {options.map(item => {
                    return (
                        <div key={item.value} className="gvnews-control-image-radio-option">
                            <label className={`${value === item.value ? 'active' : ''}`}>
                                <input
                                    id={`${id}-radio-image`}
                                    onClick={() => onChange(item.value)}
                                    type={'radio'}
                                    value={item.value}
                                />
                                {item.image}
                            </label>
                            {item.label && <span className="gvnews-control-image-radio-option-label">{item.label}</span>}
                        </div>

                    );
                })}
            </div>
        </div>
    );
};

export default compose(withParentControl, withDeviceControl)(ImageRadioControl);