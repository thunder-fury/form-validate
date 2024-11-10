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
## Method

|  Method  |  return  |  Description  |
| ---- | ---- | ---- |
|  Validate.check({value, labelName, validateTypes })  | 　{isError, errorMessage}   |　You can specify strings for input element and field name resolution types as parameters. An error exists and returns an error message as an object.  |


## validate key type

|  validate method  |  Description  | 
| ---- | ---- | 
|  required  |  Check if there is a value  | 
|  en  |   English Type check | 
|  email  |   Emmail Type check | 
|  number  |   Number Type check | 
|  maxLength:num  |  string max length check  |
|  minLength:num  |  string min length check  |
|  maxNumber:num  |  max number check  |
|  minNumber:num  |  min number check  |


---

## customize Error message
- You can customize the message by setting the message in the validation method key.
- {maxLength}・{minLength}・{maxNumber}・{minNumber} The set number is returned, and {labelName} is the field passed by the user.
```ts
## default Messages
  required: '{labelName} field is required。',
  en: '{labelName} field can only contain English characters.',
  email: 'Please enter a valid {labelName} address.',
  number: '{labelName} field can only contain numbers.',
  maxLength: '{labelName} field must be {maxLength} characters or less.',
  minLength: '{labelName} field must be at least {minLength} characters.',
  maxNumber: '{labelName} must be {maxNumber} or less.',
  minNumber: '{labelName} must be {minNumber} or more.'
```

- Example of error message setting in Korean
```ts
Validate.message = {
  required: '{labelName}필드는 필수 항목입니다',
  maxLength:'{labelName}필드는 {maxLength}글자 이하로 입력해주세요',
  min:'{labelName}필드는 {min}이상 입력해주세요',
  // ... skip ...
}
```

- Example of error message setting in Japanese
```ts
Validate.message = {
  required: '{name}項目は必須です。',
  maxLength:'{name}は{maxLength}文字以下で入力してください',
  minNumber:'{name}は{minNumber}以上入力してください',
  // ... skip ...
}
```

---
## Example of use
The code below is an example usage.<br>
First you need to set the arguments to pass to the Validate method.<br>
If the input type is verified and an error is returned for that type, an error message is displayed.<br>


### request
```javascript
const result = Validate.check({'val', 'labelName', 'minLength:3 maxLength:5 required' });
```
### response 
```javascript
return {
  errorMessage: "name field must be at least 3 characters."
  isError: true
}
```
