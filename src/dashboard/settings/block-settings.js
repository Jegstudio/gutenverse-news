import { __ } from '@wordpress/i18n';
import { ControlSelect } from 'gutenverse-core/backend';

const BlockSettings = ({ settingValues, updateSettingValues, saving, saveData }) => {
    /* option default value */
    const { block_settings = {}, features = [] } = settingValues;
    const {
        image_load = 'lazy_load',
    } = block_settings;

    const updateValue = (id, value) => {
        updateSettingValues('block_settings', id, value);
    };

    return <>
        <div className="template-tab-body">
            <ControlSelect
                id={'image_load'}
                title={__('Image Loading Mechanism', '--gctd--')}
                description={__('Default image load mechanism on Gutenverse News Post Blocks. if you choose the Lazy Load option, you can enable the "Use Normal Image Load" option on the spesific block.', '--gctd--')}
                value={image_load}
                updateValue={updateValue}
                options={[
                    {
                        label: __('Normal Load', '--gctd--'),
                        value: 'normal'
                    },
                    {
                        label: __('Lazy Load', '--gctd--'),
                        value: 'lazy_load'
                    }
                ]}
            />
        </div>
        <div className="actions">
            {saving ? <div className="gutenverse-button">
                {__('Saving...', '--gctd--')}
            </div> : <div className="gutenverse-button" onClick={() => saveData(['gvnews_settings'])}>
                {__('Save Changes', '--gctd--')}
            </div>}
        </div>
    </>;
};

export default BlockSettings;