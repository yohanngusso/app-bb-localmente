import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, CardNewItem, Grid, Typography, CustomList } from "../components";

import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SettingsIcon from '@mui/icons-material/Settings';

import baby from '../assets/img/baby.png';
import { useLoaderData, useNavigate } from "react-router-dom";
import { ACTIONS } from "../constants/actions";
import { useEffect, useState } from "react";
import { get, list } from "../services/localStorageDb";
import { calculateDuration, getUser } from "../utils/core";
import { useAppContext } from "../Context";

const Home: React.FC = () => {
    const { translate } = useAppContext();
    const navigate = useNavigate();
    const theme = useTheme();
    const user = getUser();
    const [data, setData] = useState([]);
    const [profile, setProfile] = useState({});

    const loadData = async () => {
        const d = await list("action_students");
        const profile = await get("profile_students", [{field: "user_id", value: user.id}]);
        setProfile(profile);

        if(d) {
            setData(d);
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    return  <>
                <Grid container ={true}
                    sx={{
                        height: '25vh'
                    }}
                >
                    <Grid item={true} size={{xs: 12}}>
                        <Grid
                            container={true}
                            sx={{
                                marginTop: '1em'
                            }}>
                            <Grid
                                item={true}
                                size={{xs: 4}}
                                sx={{
                                    ...styles.centerBox
                                }}
                            >
                                <IconButton
                                    onClick={() => navigate('/dashboard')}
                                    sx={{
                                        ...styles.iconButton,
                                        border: `2px solid ${theme.palette.primary.main}`
                                    }}
                                >
                                    <SignalCellularAltIcon
                                        sx={{
                                            ...styles.icon,
                                            color: `${theme.palette.primary.main}`
                                        }}
                                    />
                                </IconButton>
                                <Box sx={styles.boxText}>
                                <Typography sx={{
                                        ...styles.centerText,
                                        ...styles.text2
                                    }}>{profile?.height} {translate("cm")}</Typography>
                                    <Typography sx={{
                                        ...styles.centerText,
                                        ...styles.text3
                                    }}>{translate("height")}</Typography>
                                </Box>
                            </Grid>
                            <Grid
                                item={true}
                                size={{xs: 4}}
                                sx={{
                                    ...styles.centerBox
                                }}
                            >
                                <Avatar
                                    src={baby}
                                    sx={{
                                        height: 90,
                                        width: 90
                                    }}
                                />
                                <Box sx={styles.boxText}>
                                <Typography sx={{
                                        ...styles.centerText,
                                        ...styles.text1
                                    }}>{profile?.name}</Typography>
                                    <Typography sx={{
                                        ...styles.centerText
                                    }}>{profile?.birth ? calculateDuration(profile?.birth, "days") : 0} {translate("days")}</Typography>
                                </Box>
                            </Grid>
                            <Grid
                                item={true}
                                size={{xs: 4}}
                                sx={{
                                    ...styles.centerBox
                                }}
                            >
                                <IconButton
                                    onClick={() => navigate('/settings')}
                                    sx={{
                                        ...styles.iconButton,
                                        border: `2px solid ${theme.palette.primary.main}`
                                    }}
                                >
                                    <SettingsIcon
                                        sx={{
                                            ...styles.icon,
                                            color: `${theme.palette.primary.main}`
                                        }}
                                    />
                                </IconButton>
                                <Box sx={styles.boxText}>
                                    <Typography sx={{
                                        ...styles.centerText,
                                        ...styles.text2
                                    }}>{profile?.weight} {translate("kg")}</Typography>
                                    <Typography sx={{
                                        ...styles.centerText,
                                        ...styles.text3
                                    }}>{translate("weight")}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item={true} size={{xs: 12}}
                        sx={{
                            position: 'relative',
                            bottom: '-13px'
                        }}
                    >
                        <Grid container={true}>
                            {
                                ACTIONS.map((action, idx) => {
                                    return  <Grid
                                            index={idx}
                                            sx={{
                                                padding: 1
                                            }}
                                            item={true} size={{xs: 4}}>
                                                <CardNewItem
                                                    title={translate(action.title)}
                                                    Icon={action.Icon}
                                                    color={action.color}
                                                    actionType={action.actionType}
                                                />
                                            </Grid>
                                })
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container ={true}
                    sx={{
                        height: '75vh',
                        backgroundColor: theme.palette.primary.main
                    }}
                >
                    <Grid item={true} size={{xs: 12}}
                        sx={{
                            height: '58vh',
                            marginTop: '150px',
                            overflow: 'auto'
                        }}
                    >
                        <CustomList items={data} />
                    </Grid>
                </Grid>
            </>  
};

const styles = {
    centerBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    iconButton: {
        height: '2.5em',
        width: '2.5em',
    },
    icon: {
        fontSize: '1.5em'
    },
    centerText: {
        textAlign: 'center'
    },
    boxText: {
        marginTop: '.5em'
    },
    text1: {
        wordBreak: 'break-all',
        fontSize: '1.2em',
        fontWeight: '500',
        fontFamily: '"Lato", sans-serif',
    },
    text2: {
        wordBreak: 'break-all',
        fontSize: '.8em',
        fontWeight: '600',
        fontFamily: '"Lato", sans-serif',
    }, 
    text3: {
        wordBreak: 'break-all',
        fontSize: '.8em',
        fontWeight: '400',
    }
}

export default Home;