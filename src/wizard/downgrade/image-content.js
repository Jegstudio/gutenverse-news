const ImageContent = () => {
    const { pluginVersion = '' } = GVNewsDowngrade || {}

    return <div className="content-images">
        <div className="image-item">
            <PrevIcon />

            <p>Previous Version</p>
            <p className="ver">2.0.1</p>
        </div>
        <div className="downgrade-wrapper">
            <div className="downgrade-icon">
                <ArrowIcon />
            </div>
        </div>

        <div className="image-item">
            <CurrentIccon />
            <p>Current Version</p>
            <p className="ver">{pluginVersion}</p>
        </div>
    </div>
}

const ArrowIcon = () => {
    return <svg className="arrow" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="29" height="29" rx="14.5" fill="#EAECF0" />
        <rect x="2" y="2" width="29" height="29" rx="14.5" stroke="white" stroke-width="4" />
        <path d="M21.75 16.5L11.5417 16.5" stroke="#99A2A9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15.334 20.5834L11.2507 16.5001L15.334 12.4167" stroke="#99A2A9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

}

const PrevIcon = () => {
    return <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="80" rx="40" fill="#D0D5DD" />
        <path d="M59.6289 59.7439H25.2773L19.8789 24.9871H30.1836V19.8757H59.6289V59.7439ZM35.0898 54.6326H47.8496V51.5662H35.0898V54.6326ZM49.8125 54.6326H54.7207V51.5662H49.8125V54.6326ZM30.1836 53.4177V31.1208H26.7207L30.1836 53.4177ZM35.0898 48.4998H47.8496V45.4324H35.0898V48.4998ZM49.8125 48.4998H54.7207V45.4324H49.8125V48.4998ZM35.0898 42.366H47.8496V39.2986H35.0898V42.366ZM49.8125 39.2986V42.366H54.7207V39.2986H49.8125ZM35.0898 36.2322H54.7207V24.9871H35.0898V36.2322Z" fill="white" />
    </svg>

}


const CurrentIccon = () => {
    return <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="80" rx="40" fill="url(#paint0_linear_23373_12793)" />
        <path d="M59.6289 59.7439H25.2773L19.8789 24.9871H30.1836V19.8757H59.6289V59.7439ZM35.0898 54.6326H47.8496V51.5662H35.0898V54.6326ZM49.8125 54.6326H54.7207V51.5662H49.8125V54.6326ZM30.1836 53.4177V31.1208H26.7207L30.1836 53.4177ZM35.0898 48.4998H47.8496V45.4324H35.0898V48.4998ZM49.8125 48.4998H54.7207V45.4324H49.8125V48.4998ZM35.0898 42.366H47.8496V39.2986H35.0898V42.366ZM49.8125 39.2986V42.366H54.7207V39.2986H49.8125ZM35.0898 36.2322H54.7207V24.9871H35.0898V36.2322Z" fill="white" />
        <defs>
            <linearGradient id="paint0_linear_23373_12793" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
                <stop stop-color="#3B57F7" />
                <stop offset="1" stop-color="#5CD0DA" />
            </linearGradient>
        </defs>
    </svg>


}

export default ImageContent;