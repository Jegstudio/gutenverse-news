import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { DefaultLayout } from 'gutenverse-core/components';
const { assetsDir } = window['GVNewsConfig'];

const LockedNewsAuthorDonation = ({ isOpen }) => {
    const id = useInstanceId(LockedNewsAuthorDonation, 'inspector-locked-news-essential');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-essential gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__('Unlock Author Donation', 'gutenverse-pro')}
            description={__('Empower your writers! Upgrade to unlock the Author Donation feature, allowing your readers to support their favorite authors directly.', 'gutenverse-pro')}
            img={`${assetsDir}/video/author-box-donation.mp4`}
            useFullUrl={true}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedNewsAuthorDonation;
