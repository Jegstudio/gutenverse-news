import { __ } from '@wordpress/i18n';
import { ControlCheckbox } from 'gutenverse-core/backend';
import { IconAdsSVG, IconBookmarkSVG, IconDonationSVG, IconLikeDislikeSVG, IconPaywallSVG, IconReviewSVG, IconSplitPostSVG, IconViewCounterSVG } from '../../../assets/dashboard-icons';
import apiFetch from '@wordpress/api-fetch';
import { applyFilters } from '@wordpress/hooks';
import { useState } from '@wordpress/element';

const AdditionalFeatures = (props) => {
    const { settingValues, updateSettingValues, saving, setPopupActive, setInstallPopup, setToast, setShowToast, setSaving } = props;
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
        setSaving(true);
        apiFetch({
            path: '/gvnews-essential/v1/activateFeature',
            method: 'POST',
            data: {
                features: features
            }
        }).then((response) => {
            setSaving(false);
            setToast({
                status: 'success',
                message: __('Settings Saved Successfully!', '--gctd--')
            })
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
            updateSettingValues(features);
        }).catch((err) => {
            setSaving(false);
            console.log(err);
            setToast({
                status: 'failed',
                message: __('Settings Saved Failed!', '--gctd--')
            });
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        });
    };

    const showUpgradePopup = (id, value) => {
        setInstallPopup({ active: true, url: '' });
    };

    const featureList = [
        {
            id: 'paywall',
            title: 'Paywall',
            desc: 'Restrict your premium content to subscribers only or you can allowing user to read yur premium content by unlcok post sytem.',
            icon: <IconPaywallSVG />,
            requiredPlugins: [{ slug: 'woocommerce', name: 'WooCommerce' }],
        },
        {
            id: 'view_counter',
            title: 'View Counter',
            desc: 'Add view counter on your posts and allowing you to show most popular posts on your site.',
            icon: <IconViewCounterSVG />,
        },
        {
            id: 'post_review',
            title: 'Post Review',
            desc: 'Create a review type post and allowing you to filter list posts based on review score.',
            icon: <IconReviewSVG />,
        },
        {
            id: 'like_dislike_button',
            title: 'Like & Dislike Post',
            desc: 'Add like and dislike features on your posts.',
            icon: <IconLikeDislikeSVG />,
        },
        {
            id: 'post_split',
            title: 'Post Split',
            desc: 'Split your long content into multiple pages to increase page views and ad impressions or adding table of contents on your posts.',
            icon: <IconSplitPostSVG />,
        },
        {
            id: 'bookmark',
            title: 'Bookmark Post',
            desc: 'Allowing users to save their favorite posts with a bookmark button.',
            icon: <IconBookmarkSVG />,
        },
        {
            id: 'author_donation',
            title: 'Author Donation',
            desc: 'Adding donation button on single post, to give donation to your post author',
            icon: <IconDonationSVG />,
        },
        {
            id: 'ads',
            title: 'Ads',
            desc: 'Add advertisements to your posts and pages with more customization options for Gutenverse News.',
            icon: <IconAdsSVG />,
        },
    ];

    return (
        <div>
            <div className="template-tab-body additional-features">
                {featureList.map((feature) => (
                    <Feature key={feature.id} {...feature} updateValue={updateValue} value={features.includes(feature.id)} showUpgradePopup={showUpgradePopup} setInstallPopup={setInstallPopup} />
                ))}
            </div>
            <SaveButton saving={saving} updateFeatures={updateFeatures} showUpgradePopup={showUpgradePopup} setInstallPopup={setInstallPopup} />
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
    const [showNotice, setShowNotice] = useState(false);

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
        </div>, { ...props, showNotice, setShowNotice });
    return <FeatureCard />;
};



export default AdditionalFeatures;
