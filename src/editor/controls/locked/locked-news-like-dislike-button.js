import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { DefaultLayout } from 'gutenverse-core/components';
const { assetsDir } = window['GVNewsConfig'];

const LockedNewsLikeDislikeButton = ({ isOpen }) => {
    const id = useInstanceId(LockedNewsLikeDislikeButton, 'inspector-locked-news-like-dislike-button');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-like-dislike-button gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__('Unlock Like/Dislike Feature', 'gutenverse-pro')}
            description={__('Engage your audience! Upgrade to unlock the Like/Dislike feature and get valuable feedback on your content.', 'gutenverse-pro')}
            img="/video/like-dislike.mp4"
            assetDir={assetsDir}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedNewsLikeDislikeButton;
