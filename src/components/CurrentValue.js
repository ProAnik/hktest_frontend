import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useData} from "../contexts/DataContext";
import {useEffect, useState} from "react";
import {fetchData} from "../axios/axiosHelper";

export default function CurrentValue({id}) {
    const {data, triggerApi} = useData();
    const [profile, setProfile] = useState();

    useEffect(() => {
        // Check if data exists and then call your API
        if (data) {
            // Replace this with your API call logic
            fetchData('/api/record/' + data)
                .then((result) => {
                    // Process the API response here
                    setProfile(result.data)
                    console.log('API data:', result.data);
                })
        }
    }, [data, triggerApi]);

    return (
        <Card sx={{width: "100%", height: "100%"}}>
            <CardContent>
                <div>
                    <Typography variant="h5" component="div" gutterBottom>
                        Your Profile
                    </Typography>
                </div>
                { profile ?
                    <div>
                        <Typography variant="subtitle1" gutterBottom>
                            <b>Name:</b> {profile?.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            <b>Sector:</b> {profile?.grand_parent ? profile?.grand_parent + ' => ' : ''}{profile?.parent ? profile?.parent + ' => ' : ''} {profile?.sector ? profile?.sector : ''}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            <b>Agree:</b> {profile?.agree == 1 ? "Agreed" : "not Agreed"}
                        </Typography>
                    </div>
                    :
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        Not Added Yet. Please Add!
                    </Typography>
                }
            </CardContent>
        </Card>
    );
}
