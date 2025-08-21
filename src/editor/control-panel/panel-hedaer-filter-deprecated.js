import { WarningIconSVG } from '../../assets/block-icons';

export const headerFilterPanelDeprecated = () => {
    return [{
        component: LockedConditionControl,
    }];
};


const LockedConditionControl = ({ isOpen }) => {
    if (isOpen) {
        return <div className="deprecated-blocks-panel">
            <div className="deprecated-icon">
                <WarningIconSVG />
            </div>
            <div className="deprecated-desc">
                <h5>Header Filter Option is Deprecated</h5>
                <p> This option is no longer supported and will be removed in the next update.</p>
            </div>
        </div>;
    }

    return '';
};
