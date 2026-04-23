import { __ } from '@wordpress/i18n';
import { ControlCheckbox, ControlSelect } from 'gutenverse-core/backend';

const BlockSettings = ({ settingValues, updateSettingValues, saving, saveData }) => {
    /* option default value */
    const { block_settings = {}, features = [] } = settingValues;
    const {
        date_type = 'published',
        recursive_category = false,
    } = block_settings;

    const updateValue = (id, value) => {
        updateSettingValues('block_settings', id, value);
    };

    return <>
        <div className="template-tab-body" style={{ paddingTop: '10px' }}>
            <ControlSelect
                id={'date_type'}
                title={__('Post Date Type', '--gctd--')}
                description={__('Choose which post date type that you want to show for global post date meta.', '--gctd--')}
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
            <ControlCheckbox
                id={'recursive_category'}
                title={__('Enable Recursive Category', '--gctd--')}
                description={__('Enables recursive category queries when retrieving post lists based on categories in Gutenverse News blocks.', '--gctd--')}
                value={recursive_category}
                updateValue={updateValue}
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