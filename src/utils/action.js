const handleInputChange = (field, value, data, setData) => {
    setData({...data, [field]: value})
}

const selectItem = (value, key, data, setData) => {
    setData({...data, [key]: value})
}

const generateSubtitle = (item, translate) => {
    let subtitle = '';

    switch(item.action_type) {
        case 1: // Sleep
            subtitle = item.end_date ? 
                `${translate("from")} ${new Date(item.start_date).toLocaleTimeString()} ${translate("to")} ${new Date(item.end_date).toLocaleTimeString()}` :
                new Date(item.start_date).toLocaleTimeString();
            break;

        case 2: // Eat
            if (item.type === 1) {
                subtitle = translate("eat-bottle");
                if (item.quantity) {
                    subtitle += ` - ${item.quantity}ml`;
                }
            } else if (item.type === 2) {
                subtitle = translate("eat-bosom");
                if (item.side === 1) {
                    subtitle += ` - ${translate("left")}`;
                } else if (item.side === 2) {
                    subtitle += ` - ${translate("right")}`;
                } else if (item.side === 3) {
                    subtitle += ` - ${translate("both")}`;
                }
            }
            break;

        case 3: // Diaper
            switch(item.type) {
                case 1:
                    subtitle = translate("diaper-wet");
                    break;
                case 2:
                    subtitle = translate("diaper-dirty");
                    break;
                case 3:
                    subtitle = translate("diaper-both");
                    break;
                case 4:
                    subtitle = translate("diaper-clean");
                    break;
            }
            if (item.start_date) {
                subtitle += ` - ${new Date(item.start_date).toLocaleTimeString()}`;
            }
            break;
    }

    return subtitle;
}

const getTitle = (action_type) => {
    switch(action_type) {
        case '1': 
        return "sleep";

        case '2': 
        return "eat";

        case '3': 
        return "diaper";

        default: 
        return "eat";
    }
}

const validateDiaper = (data) => {
    const errors = [];

    if (!data.start_date) {
        return ['field-date-required'];
    }

    if (!data.type) {
        return ['field-diaper-type-required'];
    }

    return errors;
}

const validateSleep = (data) => {
    const errors = [];

    if (!data.start_date) {
        errors.push('field-start-date-required');
    }

    if (!data.end_date) {
        errors.push('field-end-date-required');
    }

    return errors;
}

const validateEat = (data) => {
    const errors = [];

    if (!data.start_date) {
        errors.push('field-start-date-required');
    }

    if (data.type === 2) {
        if (!data.end_date) {
            errors.push('field-end-date-required');
        }
        if (!data.side) {
            errors.push('field-side-required');
        }
    }

    if (data.type === 1) {
        if (!data.quantity) {
            errors.push('field-quantity-required');
        } else if (isNaN(data.quantity) || data.quantity <= 0) {
            errors.push('field-quantity-invalid');
        }
    }

    return errors;
};

const validateFields = (data, actionType) => {
    switch(actionType) {
        case '1':
        return validateSleep(data);

        case '2':
        return validateEat(data);

        case '3':
        return validateDiaper(data);

        default:
        return validateEat(data);
    }
}

export {
    handleInputChange,
    generateSubtitle,
    getTitle,
    selectItem,
    validateFields
}