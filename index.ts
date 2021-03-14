export class Validate {
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
              checkResult.isError = true;
              checkResult.type = 'required'
            }
            break
          case 'en':
            if(!/^[a-zA-Z ]*$/.test(value)) {
              checkResult.isError = true;
              checkResult.type = 'en'
            }
            break;
          case 'email':
            if(!/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/.test(value)) {
              checkResult.isError = true;
              checkResult.type = 'email'
            }
            break;
          case 'number':
            if(!/^[0-9]*$/.test(value)) {
              checkResult.isError = true;
              checkResult.type = 'number'
            }
          
        }
      }
    });
    return checkResult;
  }
  static messges: any = null
  static defaultMessges: any = {
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
      msg: 'can only enter numbers.'
    }
  }
  static defaultMsg(labelName: string, key: string) {
    let errorMsg = null
    if(!this.messges[key]) {
      if(!this.defaultMessges[key]) {
        errorMsg = `An error message for labelName has been set.`
      } else {
        errorMsg = `${labelName} ${this.defaultMessges[key].msg}`
      }
    } else {
      errorMsg = `${labelName} ${this.messges[key].msg}`
    }
    return errorMsg;
  }
}