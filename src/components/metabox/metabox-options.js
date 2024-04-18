import React from 'react';
import { useRef, useState, useEffect } from '@wordpress/element';
import Control from './control';
import { checkDependency } from './dependency';
import MetaboxSection from './metabox-section';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { ControlHeadingSimple } from 'gutenverse-core/controls';
import { ChevronLeft } from 'react-feather';

const MetaboxControls = (props) => {
    const { stage, metaboxes, setStage, meta, setMeta } = props;

    if (stage.length) {
        if (metaboxes.fields) {
            return metaboxes.fields.map((field, key) => {
                if (checkDependency(field, meta[stage[0].id])) {
                    switch (field.type) {
                        case 'group':
                            return <GroupedControl {...props} {...field}/>;
                        case 'tab':
                            return <MetaboxSection {...props} metaboxes={[field]}/>;
                        default:
                            return <Control key={`${stage[0].id}-${field.id}`} {...field} metaboxId={stage[0].id} meta={meta} setMeta={setMeta} />;
                    }
                }
            });
        }
    } else {
        return <MetaboxSection {...props} metaboxes={metaboxes} meta={meta} setMeta={setMeta} />;
    }
    return null;
};

const GroupedControl = (control) => {
    const { label, description, fields, stage, meta, setMeta } = control;
    const firstParent = stage[0];
    return <div className="gutenverse-control-wrapper gvnews-control-grouped">
        {(label || description) && <ControlHeadingSimple
            label={label}
            description={description}
        />}
        <div className="control-body">
            {fields.map((field) => {
                if('group' === field.type) {
                    return <GroupedControl key={`${firstParent.id}-${field.id}`} {...control} {...field}  />;
                } else {
                    return <Control key={`${firstParent.id}-${field.id}`} {...field} metaboxId={firstParent.id} meta={meta} setMeta={setMeta} />;
                }
            })}
        </div>
    </div>;
};

const MetaboxOptions = (props) => {
    const { stage, setStage } = props;
    const activeStage = stage[stage.length - 1];

    const postType = useSelect(
        (select) => select('core/editor').getCurrentPostType(),
        []
    );
    const postId = useSelect(
        (select) => select('core/editor').getCurrentPostId(),
        []
    );

    const [meta, setMeta] = useEntityProp('postType', postType, 'meta', postId);

    const popStage = () => {
        const newStage = [...stage];
        newStage.pop();
        setStage(newStage);
    };

    return <div className="gvnews-metabox-options">
        {stage.length ? <div className="gvnews-metabox-subheading">
            <div className="gvnews-metabox-subheading-title">
                <ChevronLeft size={20} className="gvnews-metabox-subheading-back-button" onClick={() => popStage()} />
                <span>{activeStage.label}</span>
            </div>
            {activeStage.description &&<span className="gvnews-metabox-subheading-description">
                {activeStage.description}
            </span>}
        </div> : null}
        <ul className="gvnews-metabox-sections">
            <MetaboxControls {...props} meta={meta} setMeta={setMeta} />
        </ul>
    </div>;
};

export default MetaboxOptions;