import { InspectorControls } from '@wordpress/block-editor';
import { WarningIconSVG } from '../../assets/block-icons';

const handleLearnMoreClick = (e) => {
    e.preventDefault();
    document.body.classList.add('gvnews-deprecated-popup', 'gvnews-deprecated-blocks');
};

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
                        <p>This Block Is Deprecated This block is no longer supported. Please replace them soon to keep your layout working properly.</p>
                        <a href="javascript:void(0);" onClick={handleLearnMoreClick}>Learn More</a>
                    </div>
                </div>
            </div>

        </InspectorControls>

    );
}


export default PanelDeprecated;