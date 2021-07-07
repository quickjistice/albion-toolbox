import * as React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory, setCategory } from "./craftFilterSlice";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);


export const CraftFilter = () => {
    const classes = useStyles();
    const category = useSelector(selectCategory);
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(setCategory(event.target.value));
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="categories">Categories</InputLabel>
                <Select
                    labelId="categories"
                    id="categories-select"
                    value={category}
                    onChange={handleChange}
                >
                    <MenuItem value={'swords'}>Swords</MenuItem>
                    <MenuItem value={'shields'}>Shields</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
