import { Box, Grid, TextField } from '@mui/material'
import { FieldErrors, FieldValues, UseFieldArrayRemove, UseFormRegister } from 'react-hook-form';
import { PurpleButton } from './button/Buttons';
import { purple } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';

interface IngredientProps {
    id: number;
    min: number;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    remove: UseFieldArrayRemove;
}

export const Ingredient = (props: IngredientProps) => {
    const { register, errors, id, min, remove } = props;

    const insertIngredient = (key: string) => {
        if (errors['ingredients'] && errors['ingredients'][id] && errors['ingredients'][id][key] && errors['ingredients'][id][key].message) {
            // console.log(errors['ingredients'][id][key].message)
            return (<span className="error-msg">{errors['ingredients'][id][key].message}</span>)
        } else {
            return null
        }
    }

    return (
        <Grid item xs={12} >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    gap: 1,
                    padding: 1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <TextField
                        key={`ingredients.${id}.quantity`}
                        id={`ingredients.${id}.quantity`}
                        defaultValue=""
                        variant="outlined"
                        type='number'
                        placeholder="Quantity"
                        inputProps={{
                            step: "0.01",
                            min: min,
                        }}
                        {...register(
                            `ingredients.${id}.quantity`,
                            { required: 'Quantity is required', min: { value: min, message: `Min value is ${min}` } })}
                    />
                    {
                        insertIngredient('quantity')
                    }
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <TextField
                        key={`ingredients.${id}.unit`}
                        id={`ingredients.${id}.unit`}
                        defaultValue="pack"
                        variant="outlined"
                        placeholder='Unit'
                        
                        {...register(
                            `ingredients.${id}.unit`,
                            { required: 'Unit is required' })}
                    />
                    {
                        insertIngredient('unit')
                    }
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
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
                            { required: 'Name is required' })}
                    />

                    {
                        insertIngredient('name')
                    }
                </Box>
                <PurpleButton
                    variant='contained'
                    height='50px'
                    children={
                        <DeleteIcon
                            sx={{
                                color: 'white',
                            }}
                        />

                    }
                    type='button'
                    onClick={() => {
                        remove(id)
                    }}
                    backgroundColor={purple[800]}
                />
            </Box>


            {/* {errors['ingredients'] && errors['ingredients'][0].name.message && (
                <span className="error-msg">Name is required</span>
            )} */}
        </Grid >
    )
}

