import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { DefaultLayout } from 'gutenverse-core/components';
const { assetsDir } = window['GVNewsConfig'];

const LockedNewsMetaAuthorDonation = ({ isOpen }) => {
    const id = useInstanceId(LockedNewsMetaAuthorDonation, 'inspector-locked-news-essential');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-essential gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__('Unlock Author Donation', 'gutenverse-pro')}
            description={__('Empower your writers! Upgrade to unlock the Author Donation feature, allowing your readers to support their favorite authors directly.', 'gutenverse-pro')}
            img="/video/post-meta-donation.mp4"
            assetDir={assetsDir}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedNewsMetaAuthorDonation;
