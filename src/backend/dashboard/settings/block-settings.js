import { __ } from '@wordpress/i18n';
import { ControlCheckbox, ControlSelect } from 'gutenverse-core/backend';
import { applyFilters } from '@wordpress/hooks';

const BlockSettings = ({ settingValues, updateSettingValues, saving, saveData }) => {
    /* option default value */
    const { block_settings = {}, features = [] } = settingValues;
    const {
        meta_show = true,
        meta_author = true,
        meta_date = true,
        meta_comment = true,
        meta_rating = true,
        meta_views = true,
        date_type = 'published',
    } = block_settings;

    const updateValue = (id, value) => {
        updateSettingValues('block_settings', id, value);
    };

    const additionalMenu = [];

    return <div>
        <div className="template-tab-body" style={{ paddingTop: '10px' }}>
            <ControlCheckbox
                id={'meta_show'}
                title={__('Show Block Meta', '--gctd--')}
                description={__('Show meta for block.', '--gctd--')}
                value={meta_show}
                updateValue={updateValue}
            />
            {meta_show && <>
                <ControlCheckbox
                    id={'meta_author'}
                    title={__('Show Block Meta - Author', '--gctd--')}
                    description={__('Show author on meta block.', '--gctd--')}
                    value={meta_author}
                    updateValue={updateValue}
                />
                <ControlCheckbox
                    id={'meta_date'}
                    title={__('Show Block Meta - Date', '--gctd--')}
                    description={__('Show date on meta block.', '--gctd--')}
                    value={meta_date}
                    updateValue={updateValue}
                />
                <ControlCheckbox
                    id={'meta_comment'}
                    title={__('Show Block Meta - Comment', '--gctd--')}
                    description={__('Show comment icon on meta block.', '--gctd--')}
                    value={meta_comment}
                    updateValue={updateValue}
                />
                {applyFilters('gutenverse.dashboard.news.block', additionalMenu, { block_settings: block_settings, updateValue: updateValue, features })}
            </>}

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
    </div>;
};

export default BlockSettings;