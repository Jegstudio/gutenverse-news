import { __ } from '@wordpress/i18n';
import { ControlCheckbox, ControlSelect } from 'gutenverse-core/backend';
import { applyFilters } from '@wordpress/hooks';

const BlockSettings = ({ settingValues, updateSettingValues, saving, saveData }) => {
    /* option default value */
    const { block_settings = {}, features = [] } = settingValues;
    const {
        date_type = 'published',
        image_load = 'normal',
    } = block_settings;

    const updateValue = (id, value) => {
        updateSettingValues('block_settings', id, value);
    };

    return <>
        <div className="template-tab-body" style={{ paddingTop: '10px' }}>
            <ControlSelect
                id={'image_load'}
                title={__('Image Load', '--gctd--')}
                description={__('Pick time Unit', '--gctd--')}
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