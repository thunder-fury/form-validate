# @thunder_fury/from-validate

Under Development...

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
## validate key type

|  validate method  |  Description  | defaultMessges |
| ---- | ---- | ---- |
|  required  |  Check if there is a value  | field is mandatory  |
|  en  |  check English Type | You can only enter English.  |
|  email  |  check Emmail Type  | It is not an email notation.  |
|  number  |  check Number Type  | can only enter numbers. |


## customize Error message
```ts

Validate.messges = {
  required: {
    msg: 'msg ...'
  }
  ...
}

```
---
## Method

|  Method  |  return  |  Description  |
| ---- | ---- | ---- |
|  Validate.check(element, string )  | 　object   |　The input element and the string of the validation type can be specified as parameters. <br> Returns the existence and validity type of an object.  |
|  Validate.chedefaultMsgck(string, string )  | string   |　 You can specify the label of the input element and the key of the error type. The returned value is the string of the error message.  |


### Example of use
- The input type is checked and an error message is displayed when an error is returned to that type.
``` ts
class FormScreen {
  changedInput(elm: HTMLInputElement ) :void {
    switch (elm.nodeName) {
      case 'INPUT':
        let selectElm = (<HTMLInputElement>elm)
        validateResult = Validate.check(selectElm.value, validateMethod);
        break;
      default:
        break;
    }
    if(validateResult.isError) {
      let errorMsg =Validate.defaultMsg(labelName, validateResult.type)
      errorElm.innerHTML = errorMsg
    } else {
      errorElm.innerHTML = ''
    }
  }
}

validateTypeStr.forEach((elm: HTMLInputElement) => {
  elm.addEventListener('change', (e): void =>  {
    let eventTarget = e.target as HTMLInputElement;
    formScreen.changedInput(eventTarget);
  });
});
```

