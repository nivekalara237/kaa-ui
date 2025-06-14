import {FormControlDirective} from '@angular/forms';

const errorsMessageHandler = (control: FormControlDirective, errorKey: string, locale = "fr") => {
  const name = control.name! as string;
}

const errorMessage: { [key: string]: (fieldName: string, error?: any) => string } = {
  required: (fieldName) => `The field ${fieldName} is required.`,
  requiredTrue: (fieldName) => `The field ${fieldName} must be true.`,
  minlength: (fieldName, error) => `The field ${fieldName} must have at least ${error.requiredLength} characters.`,
  maxlength: (fieldName, error) => `The field ${fieldName} can have more than ${error.requiredLength} characters.`,
  pattern: (fieldName) => `The field ${fieldName} format is invalid.`,
  email: (fieldName) => `The field ${fieldName} is email address an must be valid.`,
  max: (fieldName, error) => `The value of field ${fieldName} must be greater than ${error.maxValue}.`,
  min: (fieldName, error) => `The value of field ${fieldName} must be lest than ${error.minValue}.`,
}


export {
  errorMessage
}
