import {Container} from "@mui/material";
import SectorForm from "./components/SectorForm";
import CurrentValue from "./components/CurrentValue";
import {Grid, Paper} from '@mui/material';

function Layout() {

    return <>
        <div className={"main-bg"}>
            <Container>
                <Grid container item spacing={2} marginY={0} paddingY={7}>
                    <Grid item xs={12} sm={6}>
                        <SectorForm></SectorForm>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CurrentValue></CurrentValue>
                    </Grid>
                </Grid>
            </Container>
        </div>
    </>
}

export default Layout;