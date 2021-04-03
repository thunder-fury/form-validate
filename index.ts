export class Validate {
  constructor() {}
  static check(value:string, validateMethod: string): object | string {
    const validateTypes = validateMethod.split(' ');
    let checkResult: {isError: boolean, type: string} = {
      isError:  false,
      type:  '',
    }
    validateTypes.forEach((validateType: string) => {
      if(!checkResult.isError) {
        const kinds = validateType.split(':');
        switch (kinds[0]) {
          case 'required':
            if(value === '') {
              this.getErrorType(checkResult, true, kinds[0])
            }
            break
          case 'en':
            if(!/^[a-zA-Z ]*$/.test(value)) {
              this.getErrorType(checkResult, true, kinds[0])
            }
            break;
          case 'email':
            if(!/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/.test(value)) {
              this.getErrorType(checkResult, true, kinds[0])
            }
            break;
          case 'number':
            if(!/^[0-9]*$/.test(value)) {
              this.getErrorType(checkResult, true, kinds[0])
            }
            break;
          case 'maxLength':
            if(value.length > parseInt(kinds[1]) ) {
              this.getErrorType(checkResult, true, kinds[0])
            }
            break;
          case 'minLength':
            if(value.length > parseInt(kinds[1]) ) {
              this.getErrorType(checkResult, true, kinds[0])
            }
            break;
          case 'max':
            if(parseInt(value) > parseInt(kinds[1]) ) {
              this.getErrorType(checkResult, true, kinds[0])
            }
            break;
          case 'min':
            if(parseInt(value) < parseInt(kinds[1]))
            this.getErrorType(checkResult, true, kinds[0])
            break;
        }
      } 
    });
    return checkResult;
  }
  static getErrorType(checkResult: {isError: boolean, type: string}, boolean:boolean, type: string): void {
    checkResult.isError = boolean;
    checkResult.type = type;
  }

  static msg: any = null
  static readonly defMessges: any = {
    required: 'This field is required',
    en: 'Only English can be entered',
    email:'Please enter a valid email address',
    number: 'Only Number can be entered',
    max: 'The number of inputs has been exceeded',
    min: 'Insufficient number of inputs',
    maxLength: 'Input has been exceeded',
    minLength: 'Insufficient input'
  }
  static errorMsg(type: string ) {
    let errorMsg:string = ''
    let error =  Object.assign(this.defMessges, this.msg);
    errorMsg = `${error[type]}`
    return errorMsg;
  }
}