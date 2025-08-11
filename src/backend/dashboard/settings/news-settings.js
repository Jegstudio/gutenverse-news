import AdditionalFeatures from "./additional-features";
import BlockSettings from './block-settings';

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
    }
    const updateGVNewsFeatures = (value) => {
        updateSettingValues('gvnews_settings', 'features', value);
    }

    switch (subSettings) {
        case 'block_settings':
            return <BlockSettings {...props} settingValues={gvnews_settings} updateSettingValues={updateGVNewsSettings} />;
        case 'additional_features':
            return <AdditionalFeatures  {...props} settingValues={gvnews_settings} updateSettingValues={updateGVNewsFeatures} />
        default:
            break;
    }
    return '';
}