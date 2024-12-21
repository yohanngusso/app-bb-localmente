import { Avatar, Box, Button, Grid, TextField, Typography } from "../components";
import { useAppContext } from "../Context";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/authentication";
import { useState } from "react";
import { handleChange, validateSignUp } from "../utils/core";
import logo from '../assets/img/logo.png';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const { showSnackMessage, showAlertMessage, translate } = useAppContext();
    const [data, setData] = useState({
        email: {
            value: "",
            error: false,
            helperText: ""
        },
        password: {
            value: "",
            error: false,
            helperText: ""
        },
        confirmPassword: {
            value: "",
            error: false,
            helperText: ""
        }
    })

    const handleSubmit = async () => {
        const fields = validateSignUp(data);
        if(fields.length === 0) {
            const { data: authData, error } = await signUp(data.email.value, data.password.value);
            if (error) {
                showAlertMessage(translate(error), "error");
                return;
            }
            showSnackMessage(translate("user-creation-success"));
            navigate("/");
        } else {
            const translatedErrors = fields.map(field => translate(field));
            showAlertMessage(translatedErrors.join(", "), "warning");
        }
    }

    return  <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
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
                            justifyContent: 'center'
                        }}
                        item={true} size={{xs: 12}}>
                        <Typography variant="h3">{translate("register")}</Typography>
                    </Grid>
                    <Grid 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        item={true} size={{xs: 12}}>
                        <Typography variant="h5">{translate("welcome")}</Typography>
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
                            marginTop: 4
                        }}
                        item={true} size={{xs: 12}}>
                        <TextField
                            label={translate("confirm-password")}
                            type="password"
                            fullWidth={true}
                            onChange={(event) => handleChange(event.target.value, "confirmPassword", data, setData)}
                            value={data.confirmPassword.value}
                            error={data.confirmPassword.error}
                            helperText={data.confirmPassword.helperText}
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
                        <Link to="/signin">{translate("sign-in")}</Link>
                    </Grid>
                    <Grid 
                        sx={{
                            marginTop: 4
                        }}
                        item={true} size={{xs: 12}}>
                        <Button 
                            fullWidth={true}
                            onClick={handleSubmit}>{translate("register")}</Button>
                    </Grid>
                </Grid>
            </Box>
};

export default SignUp;