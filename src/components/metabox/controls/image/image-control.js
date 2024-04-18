import React, { Fragment, useEffect, useState } from 'react';
import { useInstanceId } from '@wordpress/compose';
import { ControlHeadingSimple } from 'gutenverse-core/controls';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Trash } from 'react-feather';
import { compose } from 'redux';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { UploadSvg, TimesSvg } from '../../../../assets/metabox-icons';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { RawHTML } from '@wordpress/element';

const ALLOWED_MEDIA_TYPES = ['image'];

const ImageControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = {},
        onValueChange,
        onStyleChange,
        description = '',
    } = props;

    const {id: imageId, image: image} = value;
    const id = useInstanceId(ImageControl, 'inspector-image-control');

    const onSelectMedia = (media) => {
        const mediaObject = {id: media.id, image: media.url };
        onValueChange(mediaObject);
        onStyleChange(mediaObject);
    };

    const onRemoveMedia = () => {
        onValueChange({});
    };

    const handleDrop = async (event) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await apiFetch({
                    path: addQueryArgs('/wp/v2/media', { context: 'edit' }),
                    method: 'POST',
                    body: formData,
                });

                if (response.id && response.source_url) {
                    const { id, source_url: url } = response;
                    onSelectMedia({ id, url });
                } else {
                    console.error('Failed to upload media');
                }
            } catch (error) {
                console.error('Error uploading media:', error);
            }
        }
    };

    return (
        <div id={id} className={`gutenverse-control-wrapper gvnews-control-image ${Object.keys(value).length ? 'image-selected' : 'image-empty'}`}>
            <ControlHeadingSimple
                id={`${id}-radio-image`}
                label={label}
            />
            <span className="gvnews-metabox-control-description top-description">
                <RawHTML>{description}</RawHTML>
            </span>
            <div
                className={'control-body'}
                onDrop={handleDrop}
            >
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={onSelectMedia}
                        allowedTypes={ALLOWED_MEDIA_TYPES}
                        value={value.id}
                        render={({ open }) => (
                            <Fragment>
                                <div
                                    className="gvnews-image-control-preview"
                                    onDrop={handleDrop}
                                >
                                    {imageId ? (
                                        <img src={image} alt="Uploaded" />
                                    ) : (
                                        <Fragment>
                                            <UploadSvg />
                                            <div className="gvnews-image-control-preview-text">
                                                <span>{__('Drag and drop to upload ', 'gutenverse-news')}</span>
                                                <span className="gvnews-image-control-preview-choose" onClick={open}>{__('Choose Image', 'gutenverse-news')}</span>
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                                <div className={'gvnews-image-control-button'} >
                                    <button
                                        className={'select-image'}
                                        onClick={open}>
                                        {__('Choose Image', 'gutenverse-news')}
                                    </button>
                                    {image && <button className={'gvnews-image-control-remove'} onClick={onRemoveMedia}><TimesSvg /></button>}
                                </div>
                            </Fragment>
                        )}
                    />
                </MediaUploadCheck>
            </div>
        </div>

    );
};

export default compose(withParentControl, withDeviceControl)(ImageControl);