import { createContext, useContext, useEffect, useState } from 'react';
import { Alert, Snackbar, Grid } from './components';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

const AppContext = createContext();

export function AppProvider({ children }) {
    const { t, i18n } = useTranslation();
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [language, setLanguage] = useState(localStorage.getItem("language") || "pt-BR");
    const [snackMessage, setSnackMessage] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");

    const timeoutDuration = 2000;

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    const showSnackMessage = (message) => {
        setSnackMessage(message);
        setTimeout(() => {
            setSnackMessage("");
        }, timeoutDuration);
    };

    const showAlertMessage = (message, type) => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
            setAlertMessage("");
        }, timeoutDuration);
    };

    const changeLanguage = (value) => {
        setLanguage(value);
        localStorage.setItem("language", value);
    };

    const translate = (key) => {
        return t(key);
    };

    const value = {
        language,
        changeLanguage,
        translate,
        showSnackMessage,
        showAlertMessage,
        snackMessage,
        alertMessage,
        alertType
    };

    return (
        <div className="app-background">
            <AppContext.Provider value={value}>
                <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                    {children}
                    <Snackbar
                        autoHideDuration={2000}
                        onClose={() => setSnackMessage("")}
                        open={!!snackMessage}
                        message={snackMessage}
                    />
                    { alertMessage
                    ?   <Grid container={true}
                            sx={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '100%',
                                padding: 2
                            }}
                        >
                            <Grid item={true} size={{ xs: 12 }}>
                                <Alert variant="filled" severity={alertType}>{alertMessage}</Alert> 
                            </Grid>
                        </Grid>
                    : null }
                </ThemeProvider>
            </AppContext.Provider>
        </div>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export default AppProvider;