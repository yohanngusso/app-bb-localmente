import { useNavigate } from "react-router-dom";
import { Box, Card, Fab, Typography } from "..";
import AddIcon from '@mui/icons-material/Add';
import { useAppContext } from "../../Context";

const CardNewItem = ({title, actionType, Icon, color}) => {
    const navigate = useNavigate();
    const { translate } = useAppContext();

    return  <Card sx={{
                        borderRadius: '10%',
                        paddingTop: 2,
                        overflow: 'visible'
        
                    }}>
                <Box sx={{...styles.box}}>
                    <Icon sx={{
                        color: color,
                        fontSize: '2.5em'
                    }} />
                    <Typography
                        sx={{
                            fontSize: '.80em',
                            marginTop: '0.5em',
                            fontWeight: '700',
                            textAlign: 'center',
                            wordWrap: "break-word",
                            width: "90%"
                        }}
                    >{title}</Typography>
                </Box>
                <Box sx={{...styles.box}}>
                    <Typography
                        sx={{
                            marginTop: '0.5em',
                            fontSize: '0.8em',
                            fontWeight: '400',
                            color: "#8f8f8f"
                        }}
                    >{translate("add_something")}</Typography>
                </Box>
                <Box sx={{...styles.box}}>
                    <Fab
                        onClick={() => {
                            navigate(`new/${actionType}`)
                        }}
                        sx={{
                            color: color,
                            backgroundColor: "#fff",
                            position: 'relative',
                            bottom: '-20px'
                        }}
                    >
                        <AddIcon />
                    </Fab>
                </Box>
            </Card>
}

const styles = {
    box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

export default CardNewItem;