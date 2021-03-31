import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { FormElementBase } from '../init/FormElementBase';
import { FormElementText, FormElementTextarea, FormElementRadio, FormElementCheckBox, FormElementSelect } from '../init/FormElementDefine';

@Injectable()
export class FormElementService {
    getElements() {
        const elements: FormElementBase<string>[] = [

            new FormElementText({
                key: 'name',
                label: '单行文本框',
                value: '',
                required: true,
                order: 1
            }),

            new FormElementText({
                key: 'quantity',
                label: '数字文本框',
                value: '',
                required: true,
                order: 2,
                type: 'number'
            }),

            new FormElementTextarea({
                key: 'textarea',
                label: '多行文本框',
                value: '',
                required: true,
                order: 3
            }),

            new FormElementSelect({
                key: 'selected',
                label: '下拉选择框',
                options: [
                    { key: '1', value: 'Option 1' },
                    { key: '2', value: 'Option 2' },
                    { key: '3', value: 'Option 3' },
                    { key: '4', value: 'Option 4' }
                ],
                order: 4
            })
        ];
        return of(elements.sort((a, b) => a.order - b.order));
    }
}
