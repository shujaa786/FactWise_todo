import { Grid, InputBase,  createStyles, Theme, makeStyles} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import React from "react";
import ControlledAccordions from "components/Card";
import useStyles from "./use_Styles";

const Home = () => {
    const classes = useStyles();
    const [search, setSearch]  = React.useState("")  
    
    const onSearch = (e: any) => {
        setSearch(e.target.value)
    }


    return (
        <Grid container direction="column" className={classes.main} spacing={4}>
            <Grid item>
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search User"
              onChange={onSearch}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

            </Grid>
            <Grid item>
                <ControlledAccordions value = {search}/>
            </Grid>
        </Grid>
    )
}

export default Home;