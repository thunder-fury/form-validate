export class Validate {
  constructor() {}
  static check(value:string, validateMethod: string): object | string {
    const validateTypes = validateMethod.split(' ');
    let resultVal = {isError: false, valInfo: null};
    validateTypes.forEach((validateType: string) => {
        const kinds = validateType.split(':');
        switch (kinds[0]) {
          case 'en':
            if(!/^[a-zA-Z ]*$/.test(value)) {
              resultVal = this.getErrorType(kinds[0], {});
            }
            break;
          case 'email':
            if(!/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/.test(value)) {
              resultVal = this.getErrorType(kinds[0], {});
            }
            break;
          case 'number':
            if(!/^[0-9]*$/.test(value)) {
              resultVal = this.getErrorType(kinds[0], {});
            }
            break;
          case 'minLength':
            if(value.length < parseInt(kinds[1]) ) {
              resultVal = this.getErrorType(kinds[0], {minLength:kinds[1]});
            }
            break;
          case 'maxLength':
            if(value.length > parseInt(kinds[1]) ) {
              resultVal = this.getErrorType(kinds[0], {maxLength:kinds[1]});
            }
            break;
          case 'max':
            if(parseInt(value) > parseInt(kinds[1]) ) {
              resultVal = this.getErrorType(kinds[0], {max:kinds[1]});
            }
            break;
          case 'min':
            if(parseInt(value) < parseInt(kinds[1])) {
              resultVal = this.getErrorType(kinds[0], {min:kinds[1]});
            }
            break;
          case 'required':
            if(value === '') {
              resultVal = this.getErrorType(kinds[0], {});
            }
            break
      } 
    });
    return resultVal;
  }
  static getErrorType(keyStr:string, params: any): any {
    return {isError: true, key: keyStr, params: params};
  }

  static msg: any = null
  static readonly defMessges: any = {
    required: '{name} field is required。',
    en: '{name} field is Only English can be entered.',
    email:'Please enter a valid {name} address',
    number: '{name} field is Only Number can be entered',
    maxLength: '{name} field is Please enter this field in {maxLength} or less',
    minLength: 'In the {name} field, enter at least {minLength} characters.',
    max: 'Please enter {name} below {max}',
    min: 'Please enter {name} at least {min}'
  }
  static errorMsg(keyStr: string, name: string, params: any): string {
    let error =  Object.assign(this.defMessges, this.msg);
    params['name'] = name;
    let errorMsg = error[keyStr].replace(/{\w+}/g, (placeholder: string) => 
      params[placeholder.substring(1, placeholder.length - 1)] || placeholder );
    return errorMsg
  }
}
