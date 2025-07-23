import { InspectorControls } from '@wordpress/block-editor';

const PanelDeprecated = () => {

    return (
        <InspectorControls>
            <div className="gutenverse-panel-wrapper" >
                <div className="deprecared-blocks-panel">
                    <p> This block has been deprecated and will be removed in the next Gutenverse News plugin update. Please replace it with another Gutenverse News block that is not deprecated.</p>
                </div>
            </div>

        </InspectorControls>

    );
}


export default PanelDeprecated;