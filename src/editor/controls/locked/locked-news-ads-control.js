
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { DefaultLayout } from 'gutenverse-core/components';
const { assetsDir } = window['GVNewsConfig'];

const LockedNewsAdsControl = ({ isOpen }) => {
    const id = useInstanceId(LockedNewsAdsControl, 'inspector-locked-ads-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-ads gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__('Unlock Ads on Article Lists', 'gutenverse-pro')}
            description={__('Increase your ad revenue by seamlessly placing advertisements within the post list in your Module block, helping you maximize visibility without disrupting the user experience.', 'gutenverse-pro')}
            img="/video/ads.mp4"
            assetDir={assetsDir}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedNewsAdsControl;