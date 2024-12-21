import { useEffect, useState } from "react";
import { AppBar, Grid, Typography } from "../components";
import { Card, CardContent } from "@mui/material";
import { useAppContext } from "../Context";
import { list } from "../services/localStorageDb";
import { Box } from "@mui/material";
import dayjs from "dayjs";

const Dashboard: React.FC = () => {
    const { translate } = useAppContext();
    const [data, setData] = useState([]);
    const [stats, setStats] = useState({
        sleep: { total: 0, average: 0 },
        diaper: { wet: 0, dirty: 0, both: 0, clean: 0 },
        feeding: { bottle: 0, breast: 0 }
    });

    const loadData = async () => {
        const actions = await list("action_students");
        if (actions) {
            setData(actions);
            processData(actions);
        }
    }

    const processData = (actions) => {
        // Processar dados de sono
        const sleepActions = actions.filter(a => a.action_type === 1 && a.end_date);
        const totalSleepHours = sleepActions.reduce((acc, action) => {
            const duration = dayjs(action.end_date).diff(dayjs(action.start_date), 'hour', true);
            return acc + duration;
        }, 0);

        // Processar dados de fralda
        const diaperActions = actions.filter(a => a.action_type === 3);
        const diaperStats = {
            wet: diaperActions.filter(a => a.type === 1).length,
            dirty: diaperActions.filter(a => a.type === 2).length,
            both: diaperActions.filter(a => a.type === 3).length,
            clean: diaperActions.filter(a => a.type === 4).length
        };

        // Processar dados de alimentação
        const feedingActions = actions.filter(a => a.action_type === 2);
        const feedingStats = {
            bottle: feedingActions.filter(a => a.type === 1).length,
            breast: feedingActions.filter(a => a.type === 2).length
        };

        setStats({
            sleep: {
                total: totalSleepHours.toFixed(1),
                average: (totalSleepHours / (sleepActions.length || 1)).toFixed(1)
            },
            diaper: diaperStats,
            feeding: feedingStats
        });
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <AppBar title={translate('dashboard')} />
            <Box sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                    {/* Card de Sono */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {translate('sleep-stats')}
                                </Typography>
                                <Typography>
                                    {translate('total-sleep')}: {stats.sleep.total} {translate('hours')}
                                </Typography>
                                <Typography>
                                    {translate('average-sleep')}: {stats.sleep.average} {translate('hours-per-sleep')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Card de Fraldas */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {translate('diaper-stats')}
                                </Typography>
                                <Typography>
                                    {translate('diaper-wet')}: {stats.diaper.wet}
                                </Typography>
                                <Typography>
                                    {translate('diaper-dirty')}: {stats.diaper.dirty}
                                </Typography>
                                <Typography>
                                    {translate('diaper-both')}: {stats.diaper.both}
                                </Typography>
                                <Typography>
                                    {translate('diaper-clean')}: {stats.diaper.clean}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Card de Alimentação */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {translate('feeding-stats')}
                                </Typography>
                                <Typography>
                                    {translate('eat-bottle')}: {stats.feeding.bottle}
                                </Typography>
                                <Typography>
                                    {translate('eat-bosom')}: {stats.feeding.breast}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Dashboard;