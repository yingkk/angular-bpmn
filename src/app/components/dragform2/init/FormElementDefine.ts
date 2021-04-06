import { FormElementBase } from './FormElementBase';

export class FormElementCheckBox extends FormElementBase<string> {
    controlType = 'checkbox';
}

export class FormElementRadio extends FormElementBase<string> {
    controlType = 'radio';
}

export class FormElementSelect extends FormElementBase<string> {
    controlType = 'select';
}

export class FormElementTextarea extends FormElementBase<string> {
    controlType = 'textarea';
}

export class FormElementText extends FormElementBase<string> {
    controlType = 'text';
    type = this.type ? this.type : 'text';
}

export class FormElementNumber extends FormElementBase<string> {
    controlType = 'number';
}
