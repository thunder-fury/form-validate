class Validate {
  constructor() {}
  static check(value:string, validateMethod: string): object | string {
    const validateTypes = validateMethod.split(' ');
    let error =  Object.assign(this.defMessges, this.msg);
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
            if(!/^[0-9]*$/.test(value)) {//숫자가 아닐경우 에러 메세지 반환
              this.getErrorType(checkResult, true, kinds[0])
            }
            break;
          case 'maxLength':
            if(parseInt(value) > parseInt(kinds[1]) ) {
              this.getErrorType(checkResult, true, kinds[0])
            }
            break;
          case 'minLength':
            if(parseInt(value) > parseInt(kinds[1]) ) {
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
    required: 'フィルドは必須です。',
    en: 'フィルドは英語飲み入力できます。',
    email:'フィルドの形式が間違っています。',
    number: 'は数字で入力してください',
    max: '文字以下で入力してください',
    min: '文字以下で入力してください'
  }
  static errorMsg(labelName: string, type: string ) {
    let errorMsg:string = ''
    let error =  Object.assign(this.defMessges, this.msg);
    errorMsg = `${labelName}${error[type]}`
    return errorMsg;
  }
}