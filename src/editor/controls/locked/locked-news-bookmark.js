import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { DefaultLayout } from 'gutenverse-core/components';
const { assetsDir } = window['GVNewsConfig'];

const LockedNewsBookmark = ({ isOpen }) => {
    const id = useInstanceId(LockedNewsBookmark, 'inspector-locked-news-like-dislike-button');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-like-dislike-button gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__('Unlock Bookmark Feature', 'gutenverse-pro')}
            description={__('Allow your readers to save their favorite posts. Upgrade to unlock the Bookmark feature and keep your audience engaged with personalized reading lists.', 'gutenverse-pro')}
            img="/video/bookmark.mp4"
            assetDir={assetsDir}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedNewsBookmark;
