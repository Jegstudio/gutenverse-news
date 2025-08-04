import { createRoot, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const loadWizard = () => {
    const drongradeContainter = document.getElementById('gutenverse-news-downgrade-wizard');

    if (drongradeContainter) {
        const root = createRoot(drongradeContainter);
        root.render(<DowngradeWizard />);
    }
};

const DowngradeWizard = () => {

    const [isDisable, setIsDisable] = useState(true);

    const doDowngrade = () => {

        managePlugin()
            .then((result) => {
                pluginStore('setProgressBar', 80);
                if (result) {
                    console.log(result);
                } else {
                    console.log('ERROR');
                }
            })
            .catch((error) => {
                let message = false;
                if (error) {
                    message = error.message;
                }
                console.log(error);

            });

        console.log('DO DOWNGRADE');
        console.log(isDisable)
        console.log('END OF DO DOWNGRADE');

    }
    return <div className='gvnews-wizard-wrapper'>
        <div className='gvnews-wizard'>
            <div className="wizard-body">
                <h1 className="content-title">Downgrade Gutenverse News Plugin</h1>
                <p className="content-desc">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
                <div className="check-box-input">
                    <label className="control-title" htmlFor="disable-auto-update">
                        Disable autp update
                        <input id="disable-auto-update" type="checkbox" checked={isDisable} onChange={e => setIsDisable(e.target.checked)} />
                    </label>
                </div>
                <div className="content-action">
                    <div class="downgrade-button" onClick={() => doDowngrade()}>Downgrade</div>
                </div>

            </div>
        </div>

    </div>
}

export const managePlugin = () => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gvnews-client/v1/downgradePlugin',
            method: 'POST',
            data: {
                nonce: 'nonceAPI',
            },
        })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

window.addEventListener('load', () => {
    loadWizard();
});