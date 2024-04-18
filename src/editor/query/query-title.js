import { RichText, Warning } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useEffect, useState }  from '@wordpress/element';

const SUPPORTED_TYPES = [ 'archive', 'post' ];

const QueryTitle = props => {
    const { type, blockProps, titleRef } = props;

    const level = 1;
    const TagName = `h${ level }`;
    if ( ! SUPPORTED_TYPES.includes( type ) ) {
        return (
            <div { ...blockProps }>
                <Warning>{ __( 'Provided type is not supported.', 'gutenverse-news') }</Warning>
            </div>
        );
    }
    let titleElement;
    if ( 'archive' === type ) {
        const { setAttributes } = props;
        const [title, setTitle] = useState('Archive type: ');

        const onChangeTitleRichtext = (value)=>{
            setTitle(value.replace(/Name/g, ''));
        };

        useEffect( () => {
            setAttributes({title});
        }, [title] );

        titleElement = (
            <>
                <div className={`gvnews_${type}_title_wrapper`}>
                    <RichText
                        ref={titleRef}
                        identifier="content"
                        value={title + 'Name'}
                        onChange={(value) => onChangeTitleRichtext(value)}
                        placeholder={__( 'Write title...', 'gutenverse-news')}
                        tagName={TagName}
                        multiline={false}
                        {...blockProps}
                        className="gvnews_archive_title"
                    />
                </div>
            </>
        );
    }
    if ( 'post' === type ) {
        titleElement = (
            <>
                <div className={'gvnews_custom_title_wrapper'}>
                    <TagName className="gvnews_post_title" ref={titleRef}>
                        { __( 'This is dummy title and will be replaced with real title of your post', 'gutenverse-news') }
                    </TagName>
                </div>
            </>
        );
    }
    return (
        <div { ...blockProps }>
            {titleElement}
        </div>
    );
};

export default QueryTitle;