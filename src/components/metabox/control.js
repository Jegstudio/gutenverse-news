import React from 'react';
import { useInstanceId } from '@wordpress/compose';
import { searchPosts, searchPages, searchCategory, searchAuthor, searchTag, searchCustomPostTemplate } from '../../editor/utils/helper';
import { checkDependency } from './dependency';
import { RawHTML } from '@wordpress/element';
import {
    AlertControl,
    AnimationControl,
    AdvanceAnimationControl,
    BackgroundControl,
    BackgroundAnimatedControl,
    BorderControl,
    BoxShadowControl,
    CheckboxControl,
    ColorControl,
    DimensionControl,
    DividerControl,
    FontControl,
    IconControl,
    IconRadioControl,
    ImageSizeControl,
    ImageFilterControl,
    NumberControl,
    RangeControl,
    RangeColumnControl,
    RepeaterControl,
    CompositeControl,
    SelectControl,
    SelectSearchControl,
    SelectSortableControl,
    SizeControl,
    SizeDoubleControl,
    ElementSelectorControl,
    TextControl,
    TextShadowControl,
    TextareaControl,
    TypographyControl,
    SwitchControl,
    HeadingControl,
    DateControl,
    GradientControl,
    AngleControl,
    LockedControl,
    LockedProNoticeControl,
    LockedSwitchControl,
    IDGeneratorControl,
    ChildIDGeneratorControl,
    DateTimeRangeControl,
    TimeRangeControl
} from 'gutenverse-core/controls';

import {
    ImageControl,
    ImageRadioControl,
    UrlControl
} from './controls';

const Control = (control) => {
    const {
        allowDeviceControl,
        alpha,
        blocks,
        cacheOptions,
        controlType,
        customOptions,
        dateFormat,
        defaultOptions,
        description,
        enableTime,
        fields,
        first,
        hideRange,
        isMulti,
        label,
        liveUpdate,
        max,
        min,
        minDate,
        id,
        noOptionsText,
        options,
        onSearch,
        overlap,
        placeholder,
        position,
        proLabel,
        showChild,
        step,
        titleFormat,
        type,
        units,
        usePreviousDevice,
        meta,
        setMeta,
        metaboxId,
    } = control;

    const onValueChange = (value) => {
        setMeta({ ...meta, [metaboxId]: { ...meta[metaboxId], [id]: value } });
    };

    const onStyleChange = (value) => {
    };

    const helperFunctions = {
        searchPosts,
        searchPages,
        searchCategory,
        searchAuthor,
        searchTag,
        searchCustomPostTemplate
    };

    const baseControlProps = {
        id: useInstanceId(TextControl, 'inspector-text-control'),
        allowDeviceControl: allowDeviceControl ? allowDeviceControl : undefined,
        alpha: alpha ? alpha : undefined,
        blocks: blocks ? blocks : undefined,
        cacheOptions: cacheOptions ? cacheOptions : undefined,
        customOptions: customOptions ? customOptions : undefined,
        dateFormat: dateFormat ? dateFormat : undefined,
        defaultOptions: defaultOptions ? defaultOptions : undefined,
        description: description ? description : undefined,
        enableTime: enableTime ? enableTime : undefined,
        fields: fields ? fields : undefined,
        first: first ? first : undefined,
        hideRange: hideRange ? hideRange : undefined,
        isMulti: isMulti ? isMulti : undefined,
        label: label ? label : undefined,
        liveUpdate: liveUpdate ? liveUpdate : undefined,
        max: max ? max : undefined,
        min: min ? min : undefined,
        noOptionsText: noOptionsText ? noOptionsText : undefined,
        options: options ? options : undefined,
        value: meta[metaboxId] ? meta[metaboxId][id] : {},
        minDate: minDate ? minDate : undefined,
        onSearch: onSearch ? helperFunctions[onSearch] : undefined,
        overlap: overlap ? overlap : undefined,
        placeholder: placeholder ? placeholder : undefined,
        position: position ? position : undefined,
        proLabel: proLabel ? proLabel : false,
        showChild: showChild ? showChild : undefined,
        step: step ? step : undefined,
        titleFormat: titleFormat ? titleFormat : undefined,
        type: controlType ? controlType : undefined,
        units: units ? (Array.isArray(units) ? JSON.parse(units) : units) : undefined,
        usePreviousDevice: usePreviousDevice ? usePreviousDevice : undefined,
        onValueChange: onValueChange,
        onStyleChange: onStyleChange,
    };

    const Components = {
        AlertControl,
        AnimationControl,
        AdvanceAnimationControl,
        BackgroundControl,
        BackgroundAnimatedControl,
        BorderControl,
        BoxShadowControl,
        CheckboxControl,
        ColorControl,
        DimensionControl,
        DividerControl,
        FontControl,
        IconControl,
        IconRadioControl,
        ImageControl,
        ImageSizeControl,
        ImageFilterControl,
        ImageRadioControl,
        NumberControl,
        RangeControl,
        TextControl,
        RangeColumnControl,
        RepeaterControl,
        CompositeControl,
        SelectControl,
        SelectSearchControl,
        SelectSortableControl,
        SizeControl,
        SizeDoubleControl,
        SwitchControl,
        ElementSelectorControl,
        TextShadowControl,
        TextareaControl,
        TypographyControl,
        UrlControl,
        HeadingControl,
        DateControl,
        GradientControl,
        AngleControl,
        LockedControl,
        LockedProNoticeControl,
        LockedSwitchControl,
        IDGeneratorControl,
        ChildIDGeneratorControl,
        DateTimeRangeControl,
        TimeRangeControl
    };

    const RenderControl = () => {
        const ControlComponent = Components[type] ? Components[type] : Components['TextControl'];

        let topDescription = false;

        let controlProps = baseControlProps;
        if ('RepeaterControl' === type || 'CompositeControl' === type) {
            const itemOptions = baseControlProps.options.map((item, key) => {
                return {
                    show: (values) => {
                        return checkDependency(item, values);
                    },
                    ...item,
                    id: item.id,
                    label: item.label ? item.label : undefined,
                    component: Components[item.type],
                };
            });
            controlProps = { ...baseControlProps, options: itemOptions };
        } else if ('ImageRadioControl' === type) {
            topDescription = true;
            const itemOptions = baseControlProps.options.map((item, key) => {
                return {
                    value: item.value,
                    image: <img src={item.image} />,
                    label: item.label ? item.label : undefined,
                };
            });
            controlProps = { ...baseControlProps, options: itemOptions };
        } else if ('IconRadioControl' === type) {
            const itemOptions = baseControlProps.options.map((item, key) => {
                return {
                    value: item.value,
                    label: item.label,
                    icon: item.icon ? React.createElement(item.icon) : undefined
                };
            });
            controlProps = { ...baseControlProps, options: itemOptions };
        } else if ('ImageControl' === type ) {
            topDescription = true;
        }

        return <div className="gvnews-metabox-control-wrapper">
            <ControlComponent {...controlProps} description={topDescription ? description : undefined} />
            {!topDescription && <span className="gvnews-metabox-control-description">
                <RawHTML>{description}</RawHTML>
            </span>}
        </div>;
    };

    return RenderControl();
};

export default Control;