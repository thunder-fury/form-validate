type ParamsType = {
  [type: string]: string
}
type ResultValType = {
  isError: boolean
  valInfo?: object
}
type GetErrorType = {
  validateKey: string
  labelName: string
  params: ParamsType
}
type CheckType = {
  value: string
  labelName: string
  validateTypes: string
}
export class Validate {
  static customMessage: { [key: string]: string } | null = null
  static readonly defaultMessages: { [key: string]: string } = {
    required: '{labelName} field is required。',
    en: '{labelName} field can only contain English characters.',
    email: 'Please enter a valid {labelName} address.',
    number: '{labelName} field can only contain numbers.',
    maxLength: '{labelName} field must be {maxLength} characters or less.',
    minLength: '{labelName} field must be at least {minLength} characters.',
    maxNumber: '{labelName} must be {maxNumber} or less.',
    minNumber: '{labelName} must be {minNumber} or more.',
  }

  static check({ value, labelName, validateTypes }: CheckType): {} | string {
    const validateTypesSplit = validateTypes.split(' ')
    let resultVal: ResultValType = { isError: true, valInfo: {} }
    console.log(value)
    const validations: {
      [key: string]: (value: string, length?: string) => boolean
    } = {
      en: (value) => /^[a-zA-Z ]*$/.test(value),
      email: (value) =>
        /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/.test(
          value
        ),
      number: (value) => /^[0-9]*$/.test(value),
      minLength: (value, length) => value.length >= parseInt(length || '0'),
      maxLength: (value, length) => value.length <= parseInt(length || '0'),
      minNumber: (value, length) => parseInt(value) >= parseInt(length || '0'),
      maxNumber: (value, length) => parseInt(value) <= parseInt(length || '0'),
      required: (value) => value.trim() !== '',
    }

    const hasError = validateTypesSplit.some((validateType) => {
      const [validateKey, length] = validateType.split(':')
      const isValid = validations[validateKey]?.(value, length)
      console.log('length', length)
      if (!isValid) {
        resultVal = this.getErrorType({
          validateKey,
          labelName,
          params: { [validateKey]: length },
        })
        return true
      }
      return false
    })

    return hasError ? resultVal : { isError: false }
  }

  static getErrorType({ validateKey, labelName, params }: GetErrorType) {
    return {
      isError: true,
      errorMessage: this.errorMsg({ validateKey, labelName, params }),
    }
  }

  static errorMsg({ validateKey, labelName, params }: GetErrorType): string {
    const messages = { ...this.defaultMessages, ...(this.customMessage || {}) }
    params['labelName'] = labelName

    return messages[validateKey].replace(
      /{\w+}/g,
      (placeholder) =>
        params[placeholder.substring(1, placeholder.length - 1)] || placeholder
    )
  }
}
