import { Validate } from './src/parts/Validate';
import { Display } from './src/parts/Display';
export class FormScreen extends Display {
  sbumit(form: HTMLFormElement) :void{
    form.submit();
  }
  changedInput(elm: HTMLInputElement ) :void {
    const validate = new Validate;
    let labelName = (<string>elm.getAttribute('data-label-name'));
    let validateMethod = (<string> elm.getAttribute('data-validate-type'));
    let parentElement = elm.parentElement as HTMLElement;
    let errorElm: any = parentElement.querySelector('[date-error-msg]');
    let validateResult: any;
    switch (elm.nodeName) {
      case 'INPUT':
      case 'SELECT':  
        let selectElm = (<HTMLInputElement>elm);
        validateResult = validate.check(selectElm.value, validateMethod, labelName);
        break;
      default:
        break;
    }
    if(validateResult.isError) {
      errorElm.innerHTML = validateResult.errorMsg;
    } else {
      errorElm.innerHTML = validateResult.errorMsg;
    }
  }
  getTempletePath(): string {
    return '';
  }
}