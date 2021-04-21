># @thunder_fury/from-validate

## Installation
```
  $ npm i -D @thunder_fruy/from-validate
```
## import
```ts
import { Validate } from '@thunder_fury/form-validate';
const { Validate } = require('@thunder_fury/form-validate');
```
---

---
## Method

|  Method  |  return  |  Description  |
| ---- | ---- | ---- |
|  Validate.check(element, string )  | 　object   |　The input element and the string of the validation type can be specified as parameters. <br> Returns the existence and validity type of an object.  |
|  Validate.errorMsg( string )  | string   |　If an error type is specified, an error message is returned.  |
|  Validate.message  | string   |　 You can specify the label of the input element and the key of the error type. The returned value is the string of the error message. |


## validate key type

|  validate method  |  Description  | 
| ---- | ---- | 
|  required  |  Check if there is a value  | 
|  en  |   English Type check | 
|  email  |   Emmail Type check | 
|  number  |   Number Type check | 
|  maxLength:num  |  string max length check  |
|  minLength:num  |  string min length check  |
|  max:num  |  max number check  |
|  min:num  |  min number check  |

### html data setting 
The code below is an example code to check minimum 3 characters in required field and maximum 5 characters in maximum string.<br>

```html
  <input 
    type="text"
    data-validate-type='minLength:3 maxLength:5 required'
  >
```


---

## customize Error message
- You can customize the message by setting the message in the validation method key.
- {maxLength}・{minLength}・{max}・{min} The set number is returned, and {name} is the field passed by the user.
```ts

Validate.message = {
  required: '{name}msg ...',
  maxLength: '{name}...{maxLength}...',
  minLength: '{name}...{minLength}...',
  max:'{name}...{max}...',
  min:'{name}...{min}...',
  // ... skip ...
}
```

- Example of message setting in Korean
```ts
Validate.message = {
  required: '{name}필드는 필수 항목입니다',
  maxLength:'{name}필드는 {maxLength}글자 이하로 입력해주세요',
  min:'{name}필드는 {min}이상 입력해주세요',
  // ... skip ...
}
```

- Example of message setting in Japanese
```ts
Validate.message = {
  required: '{name}項目は必須です。',
  maxLength:'{name}は{maxLength}文字以下で入力してください',
  min:'{name}は{min}以上入力してください',
  // ... skip ...
}
```

---
## Example of use
The code below is an example usage.<br>
First you need to set the arguments to pass to the Validato method.<br>
If the input type is verified and an error is returned for that type, an error message is displayed.<br>


### class
``` ts
class FormScreen {
  constructor() {}
  changedInput(elm: HTMLInputElement ) :void {
    switch (elm.nodeName) {
      case 'INPUT':
      case 'SELECT':
        let element = (<HTMLInputElement>elm)
        validateResult = Validate.check(element.value, validateMethod);
        break;
      default:
        break;
    }
    if(validateResult.isError) {
      let errorMsg = Validate.errorMsg(validateResult.key, labelName, validateResult.params);
      errorElm.innerHTML = errorMsg
    } else {
      errorElm.innerHTML = ''
    }
  }
}

//handling
const formScreen = new FormScreen
validateTypeStr.forEach((elm: HTMLInputElement) => {
  elm.addEventListener('change', (e): void =>  {
    let eventTarget = e.target as HTMLInputElement;
    formScreen.changedInput(eventTarget);
  });
});
```

### React
```ts

import React from "react"
import { Validate } from '@thunder_fury/form-validate'
const InputValidateTest = () => {
  const validateCheck = (e) => {
    let validateResult: any = Validate.check(e.value, e.getAttribute('data-validate-type'))
    let errorMsgElm = document.querySelector('[date-error-msg]')
    if(validateResult.isError) {
      let errorMsg = Validate.errorMsg(validateResult.key, e.getAttribute('data-label-name'), validateResult.params);
      errorMsgElm.innerHTML = errorMsg
    } else {
      errorMsgElm.innerHTML = ''
    }
  }
  return (
    <>
      <input
        type="text"
        data-label-name="お名前"
        data-validate-type="required"
        onChange={(e)=>{validateCheck(e.target)}}
      />
      <p date-error-msg="" />
    </>
  )
}
export default InputValidateTest

```