const DowngradeModal = ({ type = 'success', title, message, onClose, doDowngrade }) => {
    const Icon = type === 'success' ? SuccessIcon : ErrorIcon;
    const { dashboardURL = '#' } = GVNewsDowngrade || {}
    const retryDowngrade = () => {
        onClose();
        doDowngrade();
    }

    const goToDashboard = () => {
        window.location.href = dashboardURL;
    }
    return ReactDOM.createPortal(
        <div className="modal-backdrop">
            <div className="modal-notification">
                <div className="modal-body">
                    <div className="modal-icon">
                        <Icon />
                    </div>
                    <h2 className="modal-title">{title}</h2>
                    <p className="modal-message">
                        {message}
                        {('error' === type) && <>You can try again, or manually download the plugin from this <a href="https://downloads.wordpress.org/plugin/gutenverse-news.2.0.1.zip" target="__blank">link</a></>}
                    </p>
                </div>
                <div className="modal-footer">
                    {('success' === type) && <div className="modal-button primary" onClick={() => goToDashboard()}>
                        Go To Dashboard
                    </div>}
                    {('error' === type) && <>
                        <div className="modal-button secondary" onClick={onClose}>
                            Close
                        </div>
                        <div className="modal-button primary" onClick={() => retryDowngrade()}>
                            Retry Downgrade
                        </div>
                    </>}


                </div>
            </div>
        </div>,
        document.body
    );
};

const SuccessIcon = () => {
    return <svg width="65" height="66" viewBox="0 0 65 66" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="1" width="64" height="64" rx="32" fill="#F6FEF9" />
        <rect x="0.5" y="1" width="64" height="64" rx="32" stroke="#6CE9A6" />
        <path d="M30.1935 41.636L22.3533 33.7958C21.8822 33.3248 21.8822 32.5611 22.3533 32.09L24.059 30.3842C24.5301 29.9131 25.2938 29.9131 25.7648 30.3842L31.0464 35.6657L42.3588 24.3533C42.8299 23.8822 43.5936 23.8822 44.0647 24.3533L45.7704 26.0591C46.2414 26.5301 46.2414 27.2938 45.7704 27.7649L31.8993 41.6361C31.4282 42.1071 30.6645 42.1071 30.1935 41.636Z" fill="#1BC87F" />
    </svg>;
}

const ErrorIcon = () => {
    return <svg width="65" height="66" viewBox="0 0 65 66" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="1" width="64" height="64" rx="32" fill="#FEE4E2" />
        <rect x="0.5" y="1" width="64" height="64" rx="32" stroke="#F04438" />
        <path d="M42.7633 26.2625L39.7383 23.2375L33.0008 30.1125L26.2633 23.2375L23.2383 26.2625L30.1133 33L23.2383 39.7375L26.2633 42.7625L33.0008 35.8875L39.7383 42.7625L42.7633 39.7375L35.8883 33L42.7633 26.2625Z" fill="#F04438" />
    </svg>;
}

export default DowngradeModal;