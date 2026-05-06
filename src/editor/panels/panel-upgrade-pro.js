import { InspectorControls } from '@wordpress/block-editor';
import { WarningIconSVG } from '../../assets/block-icons';
import { activeTheme, clientUrl, upgradeProUrl } from 'gutenverse-core/config';
import { getUpgradeProps } from 'gutenverse-core/helper';


const PanelUpgradePro = ({ title }) => {

    return (
        <InspectorControls>
            <div className="gutenverse-panel-wrapper" >
                <div className="deprecated-blocks-panel">
                    <div className="deprecated-icon">
                        <WarningIconSVG />
                    </div>
                    <div className="deprecated-desc">
                        <h5>This Block Is a Pro Feature</h5>
                        <p>This block is now available in Gutenverse Pro. Upgrade to Pro to keep it active and unlock enhanced features.</p>
                        <a {...getUpgradeProps(`${upgradeProUrl}?utm_source=gutenverse-news&utm_medium=blockProNotice&utm_client_site=${clientUrl}&utm_client_theme=${activeTheme}`)} >Upgrade to Pro</a>
                    </div>
                </div>
            </div>

        </InspectorControls>

    );
}


export default PanelUpgradePro;
