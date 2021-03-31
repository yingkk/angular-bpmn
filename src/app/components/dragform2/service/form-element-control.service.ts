import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormElementBase } from '../init/FormElementBase';

@Injectable()
export class FormElementControlService {
    constructor() { }

    toFormGroup(elements: FormElementBase<string>[]) {
        const group: any = {};
        if (elements.length) {
            elements.forEach(el => {
                group[el.key] = el.required ? new FormControl(el.value || '', Validators.required)
                    : new FormControl(el.value || '');
            });
        }
        return new FormGroup(group);
    }
}
