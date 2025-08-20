import AdditionalFeatures from './additional-features';
import BlockSettings from './block-settings';
import { applyFilters } from '@wordpress/hooks';

export const NewsSettings = (props) => {
    const { subSettings = 'block_settings', settingValues = {}, updateSettingValues } = props;
    const {
        gvnews_settings = {}
    } = settingValues;

    const updateGVNewsSettings = (setting, id, value) => {

        updateSettingValues('gvnews_settings', [setting], {
            ...gvnews_settings[setting],
            [id]: value
        });
    };

    let content = '';
    switch (subSettings) {
        case 'block_settings':
            return <BlockSettings {...props} settingValues={gvnews_settings} updateSettingValues={updateGVNewsSettings} />;
        case 'additional_features':
            const updateGVNewsFeatures = (value) => {
                updateSettingValues('gvnews_settings', 'features', value);
            }
            return <AdditionalFeatures  {...props} settingValues={gvnews_settings} updateSettingValues={updateGVNewsFeatures} />;
        default:
            break;
    }
    return applyFilters(
        'gutenverse.news.settings.content',
        content,
        subSettings,
        {
            ...props,
            settingValues: gvnews_settings,
            updateSettingValues: updateGVNewsSettings
        }
    );
};