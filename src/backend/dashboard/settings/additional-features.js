import { __ } from '@wordpress/i18n';
import { ControlCheckbox } from 'gutenverse-core/backend';
import { IconPaywallSVG } from '../../../assets/dashboard-icons';
import apiFetch from '@wordpress/api-fetch';
import { applyFilters } from '@wordpress/hooks';
import { useState } from '@wordpress/element';

const AdditionalFeatures = ({ settingValues, updateSettingValues, saving, saveData, setPopupActive, setInstallPopup }) => {

    const [features, setFeatures] = useState(settingValues.features || []);
    const updateValue = (id, value) => {
        let newFeatures = [...features];
        if (!value) {
            const index = newFeatures.indexOf(id);
            if (index !== -1) {
                newFeatures.splice(index, 1);
            }
        } else {
            if (!newFeatures.includes(id)) {
                newFeatures.push(id);
            }
        }
        setFeatures(newFeatures);
    };

    const updateFeatures = () => {
        apiFetch({
            path: '/gvnews-essential/v1/activateFeature',
            method: 'POST',
            data: {
                features: features
            }
        }).then((response) => {
            updateSettingValues(features);
        }).catch((err) => {
            console.log(err);
        });
    };

    const showUpgradePopup = (id, value) => {
        setPopupActive(true);
    };

    const featureList = [
        {
            id: 'paywall',
            title: 'Paywall',
            desc: 'Flexible and Design-Friendly Contact Form builder plugin for WordPress',
            icon: <IconPaywallSVG />,
        },
        {
            id: 'view_counter',
            title: 'View Counter',
            desc: 'Flexible and Design-Friendly Contact Form builder plugin for WordPress',
            icon: <IconPaywallSVG />,
        },
        {
            id: 'post_review',
            title: 'Post Review',
            desc: 'Flexible and Design-Friendly Contact Form builder plugin for WordPress',
            icon: <IconPaywallSVG />,
        },
        {
            id: 'like_dislike_button',
            title: 'Like & Dislike Post',
            desc: 'Flexible and Design-Friendly Contact Form builder plugin for WordPress',
            icon: <IconPaywallSVG />,
        },
        {
            id: 'post_autoload',
            title: __('Post Autoload', 'gutenverse-news'),
            desc: __('Automatically load the next post when the user reaches the end of the current post.', 'gutenverse-news'),
            icon: <IconPaywallSVG />,
        },
        {
            id: 'bookmark',
            title: 'Bookmark Post',
            desc: 'Flexible and Design-Friendly Contact Form builder plugin for WordPress',
            icon: <IconPaywallSVG />,
        },
    ]

    return (
        <div>
            <div className="template-tab-body additional-features" style={{ paddingTop: '30px' }}>
                {featureList.map((feature) => (
                    <Feature key={feature.id} {...feature} updateValue={updateValue} value={features.includes(feature.id)} showUpgradePopup={showUpgradePopup} setInstallPopup={setInstallPopup} />
                ))}
            </div>
            <SaveButton saving={saving} updateFeatures={updateFeatures} showUpgradePopup={showUpgradePopup} setInstallPopup={setInstallPopup} />
            {/* <div className="actions">
                {saving ? <div className="gutenverse-button">
                    {__('Saving...', '--gctd--')}
                </div> : <div className="gutenverse-button" onClick={() => updateFeatures()}>
                    {__('Save Changes', '--gctd--')}
                </div>}
            </div> */}
        </div>
    );
};

const SaveButton = (props) => {

    const SaveButton = applyFilters('gutenverse.news.feature.save', () =>
        <div className="actions">
            <div className="gutenverse-button" onClick={() => props.showUpgradePopup()}>
                {__('Save Changes', '--gctd--')}
            </div>
        </div>, props);
    return <SaveButton />;
};

const Feature = (props) => {

    const FeatureCard = applyFilters('gutenverse.news.feature.card', () =>
        <div className="feature-card locked">
            <p className="pro-label">PRO</p>
            <div className="card-body">
                <div className="card-icon">
                    {props.icon}
                </div>
                <h1 className="card-title">{props.title}</h1>
                <p className="card-desc">{props.desc}</p>
            </div>
            <div className="card-action">
                <ControlCheckbox
                    id={props.id}
                    title={__('Enable Feature', '--gctd--')}
                    value={props.value}
                    updateValue={props.showUpgradePopup}
                />
            </div>
        </div>, props);
    return <FeatureCard />;
};



export default AdditionalFeatures;
