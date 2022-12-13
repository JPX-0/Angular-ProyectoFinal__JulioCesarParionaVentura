import { _isNumberValue } from '@angular/cdk/coercion';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { getRegExp, getYears } from '../utils/index.utils';

export class My_Validators {

  static age(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { _myTime, _currentTime } = getYears(control.value);
      if((_currentTime - _myTime >= min) && (_currentTime - _myTime <= max)) return null;
      return { minAge: true };
    }
  }

  static url(control: FormControl): ValidationErrors | null {
    // const { _rx_url } = getRegExp.test();
    // if(_rx_url.test(control.value) || control.value == "") return null;
    // return { url: true };
    return null;
  }

  static nameFormat(control: FormControl): ValidationErrors | null {
    const { _rx_names, _rx_name } = getRegExp.match();
    const value = control.value || "";
    if(value.match(_rx_names) || value.match(_rx_name)) return null;
    return { nameFormat: true };
  }

  static passwordEqual(password1: string, password2: string) {
    return (formGroup: FormGroup) => {
      const _password1 = formGroup.controls[password1];
      const _password2 = formGroup.controls[password2];
      if((_password1.errors && !_password1.errors?.["passwordEqual"]) || (_password2.errors && !_password2.errors?.["passwordEqual"])) return;
      if(_password1.value === _password2.value) {
        _password1.setErrors(null);
        _password2.setErrors(null);
      } 
      else {
        _password1.setErrors({ passwordEqual: true });
        _password2.setErrors({ passwordEqual: true });
      } 
    }
  }

  contsructor() {}

}