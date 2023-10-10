import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Select, Slide, TextField, TextareaAutosize } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import useStyles, { StyledButton } from "./use_Styles"

export type celebrityProps = {
    id: number;
    name: string;
    dob: number;
    gender: string;
    email: string;
    picture: string;
    country: string;
    description: string;
}[];

export type editCelebrityProps = {
    id: number;
    name: string;
    dob: number;
    gender: string;
    email: string;
    picture: string;
    country: string;
    description: string;
}

export default function ControlledAccordions(props: { value: string }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [data, setData] = React.useState<celebrityProps>()
    const [editId, setEditId] = React.useState("")
    const [deleteId, setDeleteId] = React.useState("")
    const [flag, setFlag] = React.useState(false)
    const [editDetails, setEditDetails] = React.useState<editCelebrityProps>()

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleClickOpen = (id: string) => {
        setOpen(true);
        setDeleteId(id)
    };

    async function fetchData() {
        const resp = await import('../../assets/celebrities.json');
        const newData = resp.default.map((acc: any) => {
            let obj: any = {}
            for (let val of Object.keys(acc)) {
                if (val === "first") {
                    obj["name"] = acc.first
                } else if (val === "last") {
                    obj["name"] = acc.first + " " + acc.last
                } else if (val === "dob") {
                    obj[val] = new Date().getFullYear() - parseInt(acc[val].split(" ")[0])
                } else {
                    obj[val] = acc[val as any]
                }
            }
            return obj
        })
        setData(newData)
    }
    const onEditData = (id: string, value: editCelebrityProps) => {
        setEditDetails(value)
        setEditId(id)
    }
    const onDeleteData = () => {
        const deletedData = data?.filter((curr: any) => {
            return `${curr.id}` !== editId
        })
        setFlag(false)
        setData(deletedData);
        setDeleteId("")
        setOpen(false);
        setExpanded(false)
    }
    const onNameChange = (e: any) => {
        if (e.target.name === "name" && e.target.value) {
            const data = /^[A-Za-z\s]+$/ ///^[a-zA-Z]+\s/
            if (data.test(e.target.value)) {
                setEditDetails((prevState: any) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                }))
            }
        } else {
            setEditDetails((prevState: any) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));

        }
        setFlag(true)
    }
    React.useEffect(() => {
        if (!data) {
            fetchData()
        }
    }, [])

    const onUpdateData = () => {
        const updatedData = data?.map((curr: any) => {
            if (`${curr.id}` === editId) {
                return editDetails
            } else {
                return curr;
            }
        })
        setFlag(false)
        setData(updatedData);
        setExpanded(false)
        setEditId("")
    }
    const onCancel = () => {
        setEditId("")
    }
    const filterOptions = data?.filter((res) => {
        return res.name.toLowerCase().includes(props.value.toLowerCase())
    })
    return (
        <>
            <div className={classes.root}>
                {filterOptions && filterOptions.map((dt, index) => {
                    return (
                        <Accordion expanded={expanded === `${index}`} onChange={handleChange(`${index}`)} className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Grid container direction="row" spacing={4}>
                                    <Grid item>
                                        <Avatar alt={dt?.name} src={dt.picture} />
                                    </Grid>
                                    <Grid item>
                                        {`${dt.id}` === editId ? (
                                            <>
                                                <TextField
                                                    margin="dense"
                                                    value={editDetails?.name}
                                                    onChange={onNameChange}
                                                    type="text"
                                                    name='name'
                                                    variant='outlined'
                                                />
                                                {!editDetails?.name &&
                                                    <Typography className={classes.error}>
                                                        *Name field is required</Typography>}
                                            </>
                                        ) : (
                                            <Typography className={classes.secondaryHeading}>{dt?.name}</Typography>
                                        )}
                                    </Grid>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container direction='column'>
                                    <Grid item>
                                        <Grid container direction='row' justify='space-between' alignItems='flex-start' spacing={1}>
                                            <Grid item>
                                                <Typography className={classes.title}>Age</Typography>
                                                {`${dt.id}` === editId ? (
                                                    <>
                                                        <TextField
                                                            margin="dense"
                                                            value={editDetails?.dob}
                                                            onChange={onNameChange}
                                                            name='dob'
                                                            type="number"
                                                            variant='outlined'
                                                            className={classes.textField}
                                                        />
                                                        {!editDetails?.dob && <Typography  className={classes.error}>*Age field is required</Typography>}
                                                    </>

                                                ) : (
                                                    <Typography className={classes.text}>{`${dt?.dob} Years`}</Typography>
                                                )}
                                            </Grid>
                                            <Grid item>
                                                <Typography className={classes.title}>Gender</Typography>
                                                {`${dt.id}` === editId ? (
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        variant='outlined'
                                                        margin="dense"
                                                        value={editDetails?.gender}
                                                        onChange={onNameChange}
                                                        name='gender'
                                                        className={classes.select}
                                                    >
                                                        <MenuItem value="male">
                                                            male
                                                        </MenuItem>
                                                        <MenuItem value="female">female</MenuItem>
                                                        <MenuItem value="transgender">transgender</MenuItem>
                                                        <MenuItem value="rather not say">rather not say</MenuItem>
                                                        <MenuItem value="other">other</MenuItem>
                                                    </Select>

                                                ) : (
                                                    <Typography className={classes.text}>{dt.gender}</Typography>
                                                )}

                                            </Grid>
                                            <Grid item>
                                                <Typography className={classes.title}>Country</Typography>
                                                {`${dt.id}` === editId ? (
                                                    <>
                                                        <TextField
                                                            margin="dense"
                                                            value={editDetails?.country}
                                                            onChange={onNameChange}
                                                            name='country'
                                                            type="text"
                                                            variant='outlined'
                                                            className={classes.textField}
                                                        />
                                                        {!editDetails?.country && <Typography  className={classes.error}>*Country field is required</Typography>}
                                                    </>
                                                ) : (
                                                    <Typography className={classes.text}>{dt.country}</Typography>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction='column'>
                                            <Typography className={classes.title}>Description</Typography>
                                            {`${dt.id}` === editId ? (
                                                <>
                                                    <TextareaAutosize
                                                        value={editDetails?.description}
                                                        onChange={onNameChange}
                                                        name='description'
                                                        rowsMin={3}
                                                        className={classes.textArea}
                                                    />
                                                    {!editDetails?.description && <Typography  className={classes.error}>*Description field is required</Typography>}
                                                </>
                                            ) : (
                                                <Typography className={classes.text}>
                                                    {dt.description}
                                                </Typography>
                                            )}

                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        {`${dt.id}` === editId ? (
                                            <Grid container direction='row' justify='flex-end'>
                                                <IconButton onClick={onCancel} title="Cancel">
                                                    <CancelOutlinedIcon
                                                        htmlColor='green' />
                                                </IconButton>
                                                {flag && editDetails?.name && editDetails?.dob && editDetails?.country && editDetails?.description && editDetails?.gender ? (
                                                    <IconButton onClick={onUpdateData} title="Save">
                                                        <CheckCircleOutlineIcon htmlColor='green' />
                                                    </IconButton>

                                                ) : (
                                                    <IconButton disabled title="Disabled">
                                                        <CheckCircleOutlineIcon htmlColor='green' />
                                                    </IconButton>
                                                )}

                                            </Grid>
                                        ) : (
                                            <Grid container direction='row' justify='flex-end'>
                                                <IconButton onClick={() => handleClickOpen(`${dt.id}`)} title="Delete">
                                                    <DeleteIcon htmlColor='green' />
                                                </IconButton>
                                                {dt.dob < 18 ? (
                                                    <IconButton disabled>
                                                        <EditIcon htmlColor='blue' />
                                                    </IconButton>
                                                ) : (
                                                    <IconButton onClick={() => onEditData(`${dt.id}`, dt)} title="Edit">
                                                        <EditIcon htmlColor='blue' />
                                                    </IconButton>
                                                )}
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </div >
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <Grid container direction="row" justify='space-between'>
                    <Grid item style={{ marginRight: "60px" }}>
                        <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to delete?"}</DialogTitle>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="close" onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <DialogContent>
                    <DialogActions>
                        <StyledButton onClick={() => setOpen(false)} variant='outlined'>
                            Cancel
                        </StyledButton>
                        <StyledButton onClick={onDeleteData} variant='contained'>
                            Delete
                        </StyledButton>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
}
