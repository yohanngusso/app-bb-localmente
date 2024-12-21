import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

const adjustDateTimeForTimezone = (dateString) => {
    if (!dateString) return new Date().toDateString();

    const dateUTC = dayjs.utc(dateString);
    const dateInUTCMinus = dateUTC.tz('America/Sao_Paulo');

    return dayjs(dateInUTCMinus.format());
};

const calculateDuration = (startDate, type) => {
    const today = dayjs().startOf('day');
    const startUtc = dayjs.utc(startDate);

    switch(type) {
        case "days":
        return dayjs.duration(today - startUtc).asDays();

        case "hours":
        return dayjs.duration(today - startUtc).asHours();

        default:
        return dayjs.duration(today - startUtc).asMinutes();
    }
}

const validateSignIn = (data) => {
    const fields = [];
    
    if (!data.email.value) {
        fields.push("message-email-required");
    } else if (!/\S+@\S+\.\S+/.test(data.email.value)) {
        fields.push("message-email-invalid-format");
    }

    if (!data.password.value) {
        fields.push("message-password-required");
    }

    return fields;
}

const validateSignUp = (data) => {
    const fields = [];
    
    if (!data.email.value) {
        fields.push("message-email-required");
    } else if (!/\S+@\S+\.\S+/.test(data.email.value)) {
        fields.push("message-email-invalid-format");
    }

    if (!data.password.value) {
        fields.push("message-password-required");
    }

    if (!data.confirmPassword.value) {
        fields.push("message-confirm-password-required");
    } else if (data.password.value !== data.confirmPassword.value) {
        fields.push("message-password-not-match");
    }

    return fields;
}

const handleChange = (value, field, data, setData) => {
    setData({
        ...data,
        [field]: {
            value,
            error: false,
            helperText: ""
        }
    });
}

const getUser = () => {
    const user = localStorage.getItem("session");
    if(user) {
        return JSON.parse(user).user
    }
    return null;
}


export {
    handleChange,
    adjustDateTimeForTimezone,
    getUser,
    calculateDuration,
    validateSignIn,
    validateSignUp
}