># @thunder_fury/from-validate

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

---
## Method

|  Method  |  return  |  Description  |
| ---- | ---- | ---- |
|  Validate.check(element, string )  | 　object   |　The input element and the string of the validation type can be specified as parameters. <br> Returns the existence and validity type of an object.  |
|  Validate.errorMsg( string )  | string   |　If an error type is specified, an error message is returned.  |
|  Validate.msg  | string   |　 You can specify the label of the input element and the key of the error type. The returned value is the string of the error message. |


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
    data-validate-type='required maxLength:5 minLength:3'
  >
```


---

## customize Error message
You can customize the message by setting the message in the validation method key.
```ts

Validate.message = {
  required: 'msg ...',
  en: 'msg ...'
  // ... skip ...
}

```

---
## Example of use
The code below is an example usage.<br>
First you need to set the arguments to pass to the Validato method.<br>
If the input type is verified and an error is returned for that type, an error message is displayed.<br>

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
      let errorMsg = Validate.errorMsg(validateResult.type)
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

