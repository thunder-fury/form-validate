# @thunder_fury/from-validate

## _Installation_
```
  $ npm i -D @thunder_fruy/from-validate
```
## _import_
```ts
import { FormScreen } from '@thunder_fury/form-validate';
const { FormScreen } = require('@thunder_fury/form-validate');
```

## _Example_

### HTML
<!-- Let's add attribute to HTML -->
htmlにattributeのセッティングが必要
- `data-label-name`
  - ラベのネームエラーの場合valueが表示される。
- `data-validate-type`
  <!-- - If you want to make the field mandatory, the value value is required -->
  - 必須の場合は`required`valueをセッティング
  <!-- - Space separated value setting -->
  - 複数タイプを設定が可能 `例) data-validate-type='required kana`
  <!-- - The types can be identified by separating them with spaces. -->
  - attributeにセッティングをしたvalueからバリエーションのタイプを判別
- `date-error-msg`
  <!-- - The error element must be in the same indent as the input -->
  - inputと同じインデントの中エレメントを作成。
```html
<form action="#">
  <div>
    <input 
      type="text"
      data-label-name='name'
      data-validate-type='required'
    >
    <p date-error-msg></p>
  </div>
  <div>
    <input 
      type="text"
      data-label-name='email' 
      data-validate-type='required mail'
    >
    <p date-error-msg></p>
  </div>
  <div>
    <select 
      data-label-name=''
      data-validate-type="required"
    >
      <option value=""></option>
      <option value="1">AAA</option>
      <option value="2">BBB</option>
    </select>
    <p date-error-msg></p>
  </div> 
</form>
```

<!-- ### _javascript example_ -->
### _javascript使用例_
``` js
const validateTypeStr = document.querySelectorAll('[data-validate-type]');
validateTypeStr.forEach((elm) => {
  elm.addEventListener('change', (e) =>  {
    formScreen.changedInput(e.target);
  });
});

```

<!-- ### _typscript example_ -->
### _typescript使用例_
```ts
const formScreen = new FormScreen
const validateTypeStr: any = document.querySelectorAll('[data-validate-type]');
validateTypeStr.forEach((elm: HTMLInputElement) => {
  elm.addEventListener('change', (e): void =>  {
    let eventTarget = e.target as HTMLInputElement;
    formScreen.changedInput(eventTarget);
  });
});
```

<!-- ### _react example_ -->
### _React使用例_
```js
import React from "react"
import { FormScreen } from "@thunder_fury/form-validate"

const Input = () => {
  const formScreen = new FormScreen()
  const KeyUp = e => {
    formScreen.changedInput(e.target)
  }

  return (
    <div>
      <input
        type="text"
        data-label-name="お名前"
        data-validate-type="required"
        onKeyUp={KeyUp}
      />
      <p date-error-msg="" />
    </div>
  )
}
export default Input

```