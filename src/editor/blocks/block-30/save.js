
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';

const save = ((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'gvnews-block',
        'gvnews-block-wrapper',
        'gvnews-block-30',
        elementId,
        animationClass,
        displayClass
    );

    return (
        <div {...useBlockProps.save({ className })}>
            {/* Block content */}
        </div>
    );
});

export default save;