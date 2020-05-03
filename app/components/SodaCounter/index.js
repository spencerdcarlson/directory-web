import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    counterButton: {
        width: '100%',
        height: 100,
        margin: 10
    }
}));

export default function SodaCounter({n, setN}) {
    const classes = useStyles();
    const handleClick = (diff) => {
        const result = n + diff;
        if (result <= 1) setN(1);
        else setN(result);
    }

    return (
        <>
                <Button className={classes.counterButton} disableElevation size='large' variant='contained'
                        color='primary' onClick={() => handleClick(1)}>+</Button>
                <Button disabled={n <= 1} disableElevation size='large' variant='contained' color='secondary'
                                 className={classes.counterButton} onClick={() => handleClick(-1)}>-</Button>
            <Typography variant="h1">{n}</Typography>
        </>
    );
}