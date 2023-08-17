import { Box, Grid, Icon, MenuItem, TextField } from '@mui/material'
import { FormFieldError } from './error/FormFieldErrors'
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { currencies } from '../utils/units';
import { PurpleButton } from './button/Buttons';
import { purple } from '@mui/material/colors';
import { Dispatch, SetStateAction } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface IngredientProps {
    id: number;
    min: number;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    setIngredients: Dispatch<SetStateAction<any[]>>;
    setValue: UseFormSetValue<FieldValues>
}

export const Ingredient = (props: IngredientProps) => {
    const { register, errors, id, min, setIngredients, setValue } = props;
    return (
        <Grid item xs={12} >
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    mt: 1,
                }}
            >
                <TextField
                    key={`ingredients.${id}.name`}
                    id={`ingredients.${id}.name`}
                    defaultValue=""
                    variant="outlined"
                    fullWidth
                    type='text'
                    placeholder="Ingredient"
                    {...register(
                        `ingredients.${id}.name`,
                        { required: true, min: min })}
                />
                {FormFieldError({
                    errors,
                    fieldname: `ingredients.${id}.name`,
                    placeholder: 'Ingredient',
                    min: min
                })}
                <TextField
                    key={`ingredients.${id}.quantity`}
                    id={`ingredients.${id}.quantity`}
                    defaultValue=""
                    variant="outlined"
                    type='number'
                    placeholder="Quantity"

                    {...register(
                        `ingredients.${id}.quantity`,
                        { required: true, pattern: /^[0-9]*$/, min: min })}
                />
                {FormFieldError({
                    errors,
                    fieldname: `ingredients.${id}.quantity`,
                    placeholder: 'Quantity',
                    min: min
                })}

                <TextField
                    key={`ingredients.${id}.unit`}
                    id={`ingredients.${id}.unit`}
                    select
                    defaultValue="pack"
                    variant="outlined"
                    // widen
                    sx={{
                        width: '100px'
                    }}
                    {...register(
                        `ingredients.${id}.unit`,
                        { required: true })}
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                    {FormFieldError({ errors, fieldname: `ingredients.${id}.unit` })}
                </TextField>
                <PurpleButton
                    variant='contained'
                    height='50px'
                    children={<Icon component={DeleteIcon} />}
                    type='button'
                    onClick={() => {
                        // remove ingredient from ingredients array
                        setIngredients((prevIngredients: any[]) => {
                            return prevIngredients.filter((ingredient) => ingredient.id !== id)
                        })
                        // remove ingredient from form
                        setValue(`ingredients.${id}.name`, '')
                        setValue(`ingredients.${id}.quantity`, '')
                        setValue(`ingredients.${id}.unit`, '')
                    }}
                    backgroundColor={purple[800]}
                />
            </Box>

        </Grid >
    )
}
