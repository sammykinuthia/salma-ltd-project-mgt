import Joi from 'joi';

const createProjectSchema = Joi.object({
    name: Joi.string().required().messages(
        {
            'any.required': 'Date is required',
            'name.base': 'Invalid name format'
        }),
    description: Joi.string().required().messages(
        {
            'any.required': 'Description is required',
            'description.base': 'Invalid description format'
        }),
    

    start_date: Joi.date().min('now').required().messages(
        {
            'date.base': 'Invalid date format',
            'date.min': 'Start Date cannot be before today',
            'any.required': 'Start Date is required', 
        }
    ),

    end_date: Joi.date().min(Joi.ref('start_date')).required().messages(
        {
            'date.base': 'Invalid date format',
            'date.min': 'End Date cannot be before start date',
            'any.required': 'End Date is required', 
        }
    )
   
})


export {createProjectSchema}