const DeprecatedOverlay = () => {
    const handleLearnMoreClick = (e) => {
        e.preventDefault();
        document.body.classList.add('gvnews-deprecated-popup', 'gvnews-deprecated-blocks');
    };
    return (
        <div className="deprecated-block-content">
            <span>
                <svg
                    width="19"
                    height="17"
                    viewBox="0 0 19 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18.06 15.682L10.0437 0.713169C9.98868 0.617647 9.90947 0.538307 9.81404 0.483139C9.7186 0.427972 9.61032 0.398926 9.50009 0.398926C9.38986 0.398926 9.28158 0.427972 9.18614 0.483139C9.09071 0.538307 9.0115 0.617647 8.95649 0.713169L0.94109 15.682C0.888058 15.7754 0.860555 15.8811 0.861345 15.9886C0.862135 16.096 0.89119 16.2013 0.94559 16.294C1.05809 16.4839 1.26239 16.6 1.48379 16.6H17.5164C17.6248 16.5996 17.7314 16.5712 17.8257 16.5176C17.92 16.464 17.9988 16.387 18.0546 16.294C18.1091 16.2014 18.1383 16.0961 18.1393 15.9887C18.1402 15.8813 18.1129 15.7755 18.06 15.682ZM10.4001 14.8H8.60009V13H10.4001V14.8ZM10.4001 11.65H8.60009V5.79997H10.4001V11.65Z"
                        fill="#EEBC0D"
                    />
                </svg>
                <p>
                    <b>Deprecated</b>: This block is no longer supported.
                </p>
            </span>
            <p className="note">*This notice is not visible to general users on the frontend.</p>
            <a href="javascript:void(0);" onClick={handleLearnMoreClick}>Learn More</a>
        </div>
    );
};

export default DeprecatedOverlay;