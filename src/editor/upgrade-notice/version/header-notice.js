import { __ } from '@wordpress/i18n';

export const HeaderNotice = ({ version }) => {
    const { gutenverseNewsssetURL: assetURL } = window['GutenverseDashboard'];

    return (
        <div className="custom-notice-header">
            <img src={`${assetURL}/img/dashboard-notice-header.png`} />
            <h3 className="upgrade-notice-title">
                {__('Gutenverse News', 'gutenverse-news')}
                &nbsp;
                <span>{__('Version ', 'gutenverse-news')} {version} </span>
                <Blink />
            </h3>
        </div>
    );
};

const Blink = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="30" height="32" viewBox="0 0 30 32" fill="none">
        <path d="M10.8868 21.7738C13.1677 15.0164 15.0163 13.1676 21.7738 10.8869C15.0163 8.6063 13.1677 6.75738 10.8868 0C8.6063 6.75738 6.75726 8.6063 0 10.8869C6.75726 13.1676 8.6063 15.0164 10.8868 21.7738Z" fill="url(#paint0_linear_19155_7941)" />
        <path d="M23.371 20.1211C22.1267 23.8075 21.1182 24.8162 17.4316 26.0604C21.1182 27.3045 22.1267 28.3132 23.371 31.9996C24.6151 28.3132 25.6238 27.3045 29.3102 26.0604C25.6238 24.8162 24.6151 23.8075 23.371 20.1211Z" fill="url(#paint1_linear_19155_7941)" />
        <defs>
            <linearGradient id="paint0_linear_19155_7941" x1="2.84402" y1="-8.40377" x2="32.5066" y2="36.4187" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFCB78" />
                <stop offset="1" stopColor="#FFCB78" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear_19155_7941" x1="18.9832" y1="15.5365" x2="35.1654" y2="39.9891" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFCB78" />
                <stop offset="1" stopColor="#FFCB78" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
}
