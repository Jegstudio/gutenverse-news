import { __ } from '@wordpress/i18n';
import { ControlCheckbox } from 'gutenverse-core/backend';
import { applyFilters } from '@wordpress/hooks';

const BlockSettings = ({ settingValues, updateSettingValues, saving, saveData }) => {
    /* option default value */
    const { block_settings = {} } = settingValues;
    const {
        show_block_meta = true,
        show_author_meta = true,
        show_date_meta = true,
        show_comment_meta = true,
        show_view_meta = true,
        show_rating_meta = true,
    } = block_settings;

    const updateValue = (id, value) => {
        updateSettingValues('block_settings', id, value);
    };

    const additionalMenu = [];

    return <div>
        <div className="template-tab-body" style={{ paddingTop: '30px' }}>
            <ControlCheckbox
                id={'show_block_meta'}
                title={__('Show Block Meta', '--gctd--')}
                description={__('Show meta for block.', '--gctd--')}
                value={show_block_meta}
                updateValue={updateValue}
            />
            {show_block_meta && <>
                <ControlCheckbox
                    id={'show_author_meta'}
                    title={__('Show Block Meta - Author', '--gctd--')}
                    description={__('Show author on meta block.', '--gctd--')}
                    value={show_author_meta}
                    updateValue={updateValue}
                />
                <ControlCheckbox
                    id={'show_date_meta'}
                    title={__('Show Block Meta - Date', '--gctd--')}
                    description={__('Show date on meta block.', '--gctd--')}
                    value={show_date_meta}
                    updateValue={updateValue}
                />
                <ControlCheckbox
                    id={'show_comment_meta'}
                    title={__('Show Block Meta - Comment', '--gctd--')}
                    description={__('Show comment icon on meta block.', '--gctd--')}
                    value={show_comment_meta}
                    updateValue={updateValue}
                />
                {applyFilters('gutenverse.dashboard.news.block', additionalMenu, { block_settings: block_settings, updateValue: updateValue })}
            </>}
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