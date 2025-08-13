import { createRoot, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Loader } from 'react-feather';
import DowngradeModal from "./downgrade/modal";
import ImageContent from "./downgrade/image-content";

const loadWizard = () => {
    const drongradeContainter = document.getElementById('gutenverse-news-downgrade-wizard');

    if (drongradeContainter) {
        const root = createRoot(drongradeContainter);
        root.render(<DowngradeWizard />);
    }
};

const DowngradeWizard = () => {
    const { pluginVersion = '' } = GVNewsDowngrade || {}
    const [isDisable, setIsDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(null);

    const showSuccess = () => {
        setModal({
            type: 'success',
            title: 'Downgrade Completed',
            message: 'Plugin Gutenverse News is successfully Downgrade',
        });
    };

    const showError = (message) => {
        setModal({
            type: 'error',
            title: 'Downgrade Failed',
            message: message,
        });
    };
    const doDowngrade = () => {
        setLoading(true);
        managePlugin(isDisable)
            .then((result) => {
                if (result) {
                    setLoading(false);
                    showSuccess();
                } else {
                    showError("We’re sorry — the attempt to switch back to Gutenverse News version 2.0.1 was unsuccessful.");
                    setLoading(false);
                }
            })
            .catch((error) => {
                let message = false;
                if (error) {
                    message = error.message;
                }
                showError(message);
                setLoading(false);
            });
    }
    return <div className='gvnews-wizard-wrapper'>
        <div className='gvnews-wizard'>
            <div className="wizard-content">
                <div className="wizard-body">
                    <h1 className="content-title">Revert to Previous Version</h1>
                    <p className="content-desc">Gutenverse News version {pluginVersion} introduces major changes, including the removal of several blocks and features found in version 2.0.1. If your site depends on those deprecated elements, you can safely downgrade to version 2.0.1.</p>
                    <ImageContent />

                    <div className="content-notice">
                        <h2>⚠️ Why are some blocks and features being removed?</h2>
                        <p>We restructure every block and features we release back than because we need to ensure our survivablity. as you may already know, we are doing this full time and there is cost we need to pay for every development.</p>
                        <p>The block is not deleted, you can still access it. or you can also stick with our previous version (2.0.1). but if you think that the plugin worthy, you can support us to buy the pro version of the plugin.</p>
                    </div>
                    <div className="content-input">
                        <h5>Optional: Disable Automatic Updates</h5>
                        <div className="check-box-input">
                            <input id="disable-auto-update" type="checkbox" checked={isDisable} onChange={e => setIsDisable(e.target.checked)} />
                            <div className="input-desc">
                                <label className="control-title" htmlFor="disable-auto-update">Prevent Gutenverse News from updating automatically in the future.</label>
                                <p>Check this if you want to keep your current version and avoid losing any existing blocks or features.</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="wizard-footer">
                    <div class="downgrade-button" onClick={() => doDowngrade()}>
                        {loading && <Loader size={15} />}
                        {!loading && "Downgrade Plugin"}
                    </div>
                </div>
            </div>
        </div>
        {modal && (
            <DowngradeModal
                {...modal}
                onClose={() => setModal(null)}
                doDowngrade={doDowngrade}
            />
        )}

    </div>
}
const managePlugin = (disableAutoUpdate) => {
    const { nonceAPI = '' } = GVNewsDowngrade || {}
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gvnews-client/v1/downgradePlugin',
            method: 'POST',
            data: {
                nonce: nonceAPI,
                disableAutoUpdate: disableAutoUpdate
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