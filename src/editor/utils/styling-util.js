export const plainGeneratorFunction = (value, props) => {
    const {
        functionName,
        functionProps,
        attribute
    } = props;
    switch (functionName) {
        case 'modulePaginationAlign':
            const { selectTarget } = functionProps;
            if(attribute === 'start') {
                switch (selectTarget) {
                    case 'before':
                        value = 'none';
                        break;
                    case 'after':
                        value = 'block';
                        break;
                    default:
                        break;
                }
            } else if(attribute === 'end') {
                switch (selectTarget) {
                    case 'before':
                        value = 'block';
                        break;
                    case 'after':
                        value = 'none';
                        break;
                    default:
                        break;
                }
            } else if(attribute === 'space-between') {
                switch (selectTarget) {
                    case 'before':
                        value = 'none';
                        break;
                    case 'after':
                        value = 'none';
                        break;
                    default:
                        break;
                }
            } else {
                switch (selectTarget) {
                    case 'before':
                        value = 'block';
                        break;
                    case 'after':
                        value = 'block';
                        break;
                    default:
                        break;
                }
            }
            break;
        default:
            break;
    }
    return value;
};