import { InspectorControls } from '@wordpress/block-editor';
import { WarningIconSVG } from '../../assets/block-icons';

const PanelDeprecated = ({ title }) => {

    return (
        <InspectorControls>
            <div className="gutenverse-panel-wrapper" >
                <div className="deprecated-blocks-panel">
                    <div className="deprecated-icon">
                        <WarningIconSVG />
                    </div>
                    <div className="deprecated-desc">
                        <h5>{title} Is Deprecated</h5>
                        <p> This block is no longer supported and will be removed in the next update.</p>
                        <p>Please replace it with a supported <b>Gutenverse</b> block to ensure your layout working properly.</p>
                    </div>
                </div>
            </div>

        </InspectorControls>

    );
}


export default PanelDeprecated;