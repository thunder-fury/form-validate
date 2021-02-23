export class Validate {
  constructor() {}
  check(value:string, validateMethod: string, labelName: string ): string | object {
    const validateTypes = validateMethod.split(' ');
    let checkResult = {
      isError:  false,
      errorMsg:  ''
    }
    validateTypes.forEach((validateType: string) => {
      if(!checkResult.isError) {
        switch (validateType) {
          case 'required':
            if(value === '') {
              checkResult.isError = true;
              checkResult.errorMsg = labelName + 'は必須です。';
            }
        }
      }
    });
    return checkResult;
  }
}

// class ConfirmScreen extends Display {
//   getTempletePath(): string {
//     throw new Error('Method not implemented.');
//   }
// }
// class CompleteScreen extends Display {
//   getTempletePath(): string {
//     throw new Error('Method not implemented.');
//   }
// }