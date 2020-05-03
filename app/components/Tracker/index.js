import React, {useState, useRef, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import MenuSelector from "../MenuSelector";
import SodaCounter from "../SodaCounter";
import Button from '@material-ui/core/Button';
import {withAuth} from "../withAuth";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        padding: 40
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));


// const GetStarted = (props) => (<div>Test</div>);
const Tracker = (props) => {
    const classes = useStyles();
    const [soda, setSoda] = useState('Soda')
    const [cupSize, setCupSize] = useState('Cup Size')
    const [n, setN] = useState(1);

    // TODO: these should be the result of an API call
    const sodaOptions = [
        {id: 'dr-pepper', displayText: 'Dr Pepper'},
        {id: 'coke', displayText: 'Coke'}
    ]
    const sizeOptions = [
        {id: 'can', displayText: 'Can (8oz)'},
        {id: 'plastic', displayText: 'Plastic Bottle (16oz)'}
    ]

    const isValid = () => (soda !== 'Soda' && cupSize !== 'Cup Size' && n >= 1)

    const handleSubmit = () => {
        if (isValid()) {
            console.log('soda ', soda)
            console.log('cupSize ', cupSize)
            console.log('n ', n)
            // TODO: call api to save new entry for today's date
        }
        else {
            // TODO: flash error message
            alert('Please select a soda, its size, and quantity.')
        }
    }

    return (
        <div className={classes.root}>
            <MenuSelector {...{item: soda, setItem: setSoda, options: sodaOptions}} />
            <MenuSelector {...{item: cupSize, setItem: setCupSize, options: sizeOptions}} />
            <SodaCounter {...{n, setN}}/>
            <Button onClick={handleSubmit} disableElevation size='large' variant='contained'
                    color='primary'>Submit</Button>
        </div>
    );
}

export default withAuth(Tracker);