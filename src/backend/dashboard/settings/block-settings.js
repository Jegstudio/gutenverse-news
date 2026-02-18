import { __ } from '@wordpress/i18n';
import { ControlCheckbox, ControlSelect } from 'gutenverse-core/backend';
import { applyFilters } from '@wordpress/hooks';

const BlockSettings = ({ settingValues, updateSettingValues, saving, saveData }) => {
    /* option default value */
    const { block_settings = {}, features = [] } = settingValues;
    const {
        date_type = 'published',
    } = block_settings;

    const updateValue = (id, value) => {
        updateSettingValues('block_settings', id, value);
    };

    const additionalMenu = [];

    return <>
        <div className="template-tab-body" style={{ paddingTop: '10px' }}>
            <ControlSelect
                id={'date_type'}
                title={__('Post Date Type', '--gctd--')}
                description={__('Pick time Unit', '--gctd--')}
                value={date_type}
                updateValue={updateValue}
                options={[
                    {
                        label: __('Published', '--gctd--'),
                        value: 'published'
                    },
                    {
                        label: __('Modified', '--gctd--'),
                        value: 'modified'
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