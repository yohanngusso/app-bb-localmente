import { useEffect } from "react";
import { DateTimePicker, Grid, TextField } from "../..";
import { handleInputChange } from "../../../utils/action";
import { adjustDateTimeForTimezone } from "../../../utils/core";

const Sleep = ({data, setData, translate}) => {
    useEffect(() => {
        setData({...data, 'action_type': 1})
    }, [])
    
    return  <Grid container={true} spacing={2}>
                <Grid item={true} size={{xs: 12}}>
                    <DateTimePicker
                        value={data?.start_date ? adjustDateTimeForTimezone(data?.start_date) : null}
                        name="start_date"
                        label={translate("data-hour-start")}
                        ampm={false}
                        format="DD/MM/YYYY HH:mm"
                        fullWidth={true}
                        onChange={(value) => {handleInputChange('start_date', new Date(value.toString()), data, setData)}}
                    />
                </Grid>
                <Grid item={true} size={{xs: 12}}>
                    <DateTimePicker
                        value={data?.end_date ? adjustDateTimeForTimezone(data?.end_date) : null}
                        name="end_date"
                        label={translate("data-hour-end")}
                        ampm={false}
                        format="DD/MM/YYYY HH:mm"
                        fullWidth={true}
                        onChange={(value) => {handleInputChange('end_date', new Date(value.toString()), data, setData)}}
                    />
                </Grid>
                <Grid item={true} size={{xs: 12}}>
                    <TextField
                        value={data?.observation ? data?.observation : ""}
                        name="observation"
                        label={translate("observation")}
                        onChange={(event) => {handleInputChange('observation', event.target.value, data, setData)}}
                        multiline={true}
                        rows={6}
                        fullWidth={true}
                    />
                </Grid>
            </Grid>
}

export default Sleep;