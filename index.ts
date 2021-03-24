class Validate {
  constructor() {}
  static check(value:string, validateMethod: string): object | string {
    const validateTypes = validateMethod.split(' ');
    let checkResult: {isError: boolean, type: string} = {
      isError:  false,
      type:  ''
    }
    validateTypes.forEach((validateType: string) => {
      if(!checkResult.isError) {
        switch (validateType) {
          case 'required':
            if(value === '') {
              this.getErrorType(checkResult, true, validateType)
            }
            break
          case 'en':
            if(!/^[a-zA-Z ]*$/.test(value)) {
              this.getErrorType(checkResult, true, validateType)
            }
            break;
          case 'email':
            if(!/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/.test(value)) {
              this.getErrorType(checkResult, true, validateType)
            }
            break;
          case 'number':
            if(!/^[0-9]*$/.test(value)) {
              this.getErrorType(checkResult, true, validateType)
            }
            break;
        }
      } 
    });
    return checkResult;
  }
  static getErrorType(checkResult: {isError: boolean, type: string}, boolean:boolean, type: string) {
      checkResult.isError = boolean;
      checkResult.type = type
  } 
  static messges: any = null
  static defMessges: any = {
    required: {
      msg: 'field is mandatory',
    },
    en: {
      msg: 'You can only enter English.'
    },
    email: {
      msg: 'It is not an email notation.'
    },
    number: {
      msg: 'は数字で入力してください',
      min: {
        length: 1,
        msg: '文字以上'
      },
      max: {
        length: 2,
        msg: '文字以下'
      },
    },
  }
  static errorMsg(labelName: string, key: string) {
    let errorMsg = null
    let error =  Object.assign(this.defMessges, this.messges);
    errorMsg = `${labelName}${error[key].msg}`
    return errorMsg;
  }
}
