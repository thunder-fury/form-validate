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
              checkResult.isError = true;
              checkResult.type = 'required'
            }
          case 'en':
            if(!/^[a-zA-Z ]*$/.test(value)) {
              checkResult.isError = true;
              checkResult.type = 'en'
            }
            break;
        }
      }
    });
    return checkResult;
  }
  static messges: any = null
  static defaultMsg(labelName: string, key: string): string {
    const errorMsg = labelName + this.messges[key].msg
    return errorMsg;
  }
}