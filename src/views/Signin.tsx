import { Avatar, Box, Button, Grid, TextField, Typography } from "../components";
import { useAppContext } from "../Context";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/authentication";
import { useState } from "react";
import { handleChange, validateSignIn } from "../utils/core";
import logo from '../assets/img/logo.png';

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const { showSnackMessage, showAlertMessage, translate } = useAppContext();
    const [data, setData] = useState({
        email: {
            value: "yohann.gusso@hotmail.com",
            error: false,
            helperText: ""
        },
        password: {
            value: "123456",
            error: false,
            helperText: ""
        }
    })

    const handleSubmit = async () => {
        const fields = validateSignIn(data);
        if(fields.length === 0) {
            const { data: authData, error } = await signIn(data.email.value, data.password.value);
            if (error) {
                showAlertMessage(translate(error), "error");
                return;
            }
            showSnackMessage("Login realizado com sucesso!");
            navigate("/");
        } else {
            const translatedErrors = fields.map(field => translate(field));
            showAlertMessage(translatedErrors.join(", "), "warning");
        }
    }

    return  <Box
                sx={{
                    height: '100vh',
                    paddingTop: 8
                }}
            >
                <Grid 
                    sx={{
                        padding: 2
                    }}
                    container={true}>
                    <Grid 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        item={true} size={{xs: 12}}>
                        <Avatar
                            sx={{ width: 180, height: 180 }}
                            src={logo}
                        />
                    </Grid>
                    <Grid 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 4
                        }}
                        item={true} size={{xs: 12}}>
                        <Typography variant="h3">Login</Typography>
                    </Grid>
                    <Grid 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        item={true} size={{xs: 12}}>
                        <Typography variant="h5">Seja Bem-vindo!</Typography>
                    </Grid>
                    <Grid 
                        sx={{
                            marginTop: 4
                        }}
                        item={true} size={{xs: 12}}>
                        <TextField
                            label={translate("email")}
                            fullWidth={true}
                            onChange={(event) => handleChange(event.target.value, "email", data, setData)}
                            value={data.email.value}
                            error={data.email.error}
                            helperText={data.email.helperText}
                        />
                    </Grid>
                    <Grid 
                        sx={{
                            marginTop: 4
                        }}
                        item={true} size={{xs: 12}}>
                        <TextField
                            label={translate("password")}
                            type="password"
                            fullWidth={true}
                            onChange={(event) => handleChange(event.target.value, "password", data, setData)}
                            value={data.password.value}
                            error={data.password.error}
                            helperText={data.password.helperText}
                        />
                    </Grid>
                    <Grid 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 4
                        }}
                        item={true} size={{xs: 12}}>
                        <Link to="/signup">Cadastrar</Link>
                    </Grid>
                    <Grid 
                        sx={{
                            marginTop: 4
                        }}
                        item={true} size={{xs: 12}}>
                        <Button 
                            fullWidth={true}
                            onClick={handleSubmit}>Entrar</Button>
                    </Grid>
                </Grid>
            </Box>
};

export default SignIn;