import { Button, Theme, createStyles, makeStyles, withStyles } from "@material-ui/core";

export const StyledButton = withStyles((theme) => ({
    outlined: {
        textTransform: "none"
    },
    contained: {
        backgroundColor: "red",
        color: "white",
        textTransform: "none"
    }
}))(Button)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        error: {
            color: "red", 
            fontWeight: 300, 
            fontSize: "10px"
        },
        select: {
            marginTop: "9px",
            "& .MuiSelect-outlined.MuiSelect-outlined": {
                width: "210px",
                paddingRight: "0px",
                [theme.breakpoints.down(835)]: {
                    width: "116px"
                },
                [theme.breakpoints.down(524)]: {
                    width: "90px",
                    fontSize: "12px"
                }
            }
        },
        textArea: {
            marginTop: theme.spacing(1),
            padding: "0.7rem",
            fontSize: "1.2rem",
            fontFamily: "Roboto",
            [theme.breakpoints.down(524)]: {
                fontSize :"12px"
            },
        },
        title: {
            color: "#6E7191",
            fontSize: "1 rem"
        },
        text: {
            fontWeight: 400,
            fontSize: "1 rem"
        },
        avatar: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        accordion: {
            "&.MuiAccordion-root": {
                margin: "10px"
            }
        },
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: "1.5rem",
            fontWeight: 550,
        },
        textField: {
            [theme.breakpoints.down(835)]: {
                width: "130px"
            },
            [theme.breakpoints.down(524)]: {
                width: "100px"
            },
            "& .MuiOutlinedInput-inputMarginDense": {
                [theme.breakpoints.down(524)]: {
                    fontSize: "12px"
                }
            }

        }
    }),
);

export default useStyles;