import * as React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { craftFiltersChange, selectFilters } from "./craftFiltersSlice";
import {stringifyUrl} from "query-string";
import {PagePath} from "../../types/pages";
import {replace} from "connected-react-router";

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

const block = 'craft-filters';

export const FilterSelect = ({ label, selectType, value, onChange, items = [], disabled }) => {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        onChange({ [selectType]: event.target.value });
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id={selectType}>{label}</InputLabel>
            <Select
                labelId={selectType}
                id={`${selectType}-select`}
                disabled={disabled}
                value={value.uniquename || ''}
                onChange={handleChange}
            >
                {items.map((item) => {
                    return (
                        <MenuItem
                            selected={item.uniquename === value.uniquename}
                            key={item.uniquename}
                            value={item.uniquename}>
                            {item.name}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
};

export const CraftFilters = () => {
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();

    const { value: typeValue, items: typeItems } = filters.type || {};
    const { value: categoriesValue, items: categoriesItems } = filters.categories || {};
    const { value: subcategoriesValue = {}, items: subcategoriesItems } = filters.subcategories || {};


    const handleChange = (value) => {
        dispatch(craftFiltersChange({
            type: typeValue?.uniquename,
            category: categoriesValue?.uniquename,
            subcategory: subcategoriesValue?.uniquename,
            ...value
        }));
    };

    return (
        <div className={block}>
            <FilterSelect
                label={'Type'}
                selectType={'type'}
                disabled={false}
                items={typeItems || []}
                value={typeValue || {}}
                onChange={handleChange}
            />
            <FilterSelect
                label={'Categories'}
                selectType={'category'}
                disabled={!categoriesItems?.length}
                items={categoriesItems || []}
                value={categoriesValue || {}}
                onChange={handleChange}
            />
            <FilterSelect
                label={'Subcategories'}
                selectType={'subcategory'}
                disabled={!subcategoriesItems?.length}
                items={subcategoriesItems || []}
                value={subcategoriesValue || {}}
                onChange={handleChange}
            />
        </div>
    )
}
