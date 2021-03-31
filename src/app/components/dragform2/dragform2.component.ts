import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormElementBase } from './init/FormElementBase';
import { FormElementRadio, FormElementSelect, FormElementText, FormElementTextarea } from './init/FormElementDefine';
import { FormElementService } from './service/form-element.service';

interface DragElement {
  icon?: string;
  type?: string;
  label?: string;
}
@Component({
  selector: 'app-dragform2',
  templateUrl: './dragform2.component.html',
  styleUrls: ['./dragform2.component.scss'],
  // providers: [FormElementService]
})
export class Dragform2Component implements OnInit {

  settingRadio = '1';
  elements: FormElementBase<string>[] = [];
  list: DragElement[] = [
    {
      icon: 'fa fa-pencil',
      type: 'text',
      label: '单行文本框'
    },
    {
      icon: 'fa fa-paint-brush',
      type: 'textarea',
      label: '多行文本框'
    },
    {
      icon: 'fa fa-dot-circle-o',
      type: 'radio',
      label: '单选框'
    },
    {
      icon: 'fa fa-check-square-o',
      type: 'checkbox',
      label: '复选框'
    },
    {
      icon: 'fa fa-toggle-down',
      type: 'select',
      label: '下拉框'
    }
  ];


  ngOnInit() {
  }

  onRadioValueChange(val) {
    this.settingRadio = val;
  }

  onDragStart(e, item: DragElement) {
    e.dataTransfer.setData('Text', item.type);
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('Text');
    this.createFormElement(data, this.elements);
    console.log(this.elements);

    // e.dataTransfer.clearData();
  }

  createFormElement(type: string, elements: FormElementBase<string>[]) {
    if (!type) {
      return elements;
    }

    let temp: FormElementBase<string> = new FormElementBase();
    switch (type) {
      case 'text':
        temp = new FormElementText({
          key: 'name',
          label: '单行文本框',
          value: '',
          required: true,
          order: 1
        });
        break;
      case 'textarea':
        temp = new FormElementTextarea({
          key: 'textarea',
          label: '多行文本框',
          value: '',
          required: true,
          order: 2
        });
        break;
      case 'radio':
        temp = new FormElementRadio({
          key: 'name',
          label: '单选框',
          value: '',
          required: true,
          order: 3,
          options: [
            { key: '1', value: 'Radio 1' },
            { key: '2', value: 'Radio 2' },
            { key: '3', value: 'Radio 3' },
            { key: '4', value: 'Radio 4' }
          ],
        });
        break;
      case 'checkbox':
        temp = new FormElementSelect({
          key: 'check',
          label: '复选框',
          value: '',
          required: false,
          options: [
            { key: '1', value: 'Label 1' },
            { key: '2', value: 'Label 2' },
            { key: '3', value: 'Label 3' },
            { key: '4', value: 'Label 4' }
          ],
          order: 4
        });
        break;
      case 'select':
        temp = new FormElementSelect({
          key: 'selected',
          label: '下拉选择框',
          options: [
            { key: '1', value: 'Option 1' },
            { key: '2', value: 'Option 2' },
            { key: '3', value: 'Option 3' },
            { key: '4', value: 'Option 4' }
          ],
          order: 5
        });
        break;
    }
    elements.push(temp);
    elements.sort((a, b) => a.order - b.order);
    return elements;
  }


  // elements: FormElementBase<string>[] = [
  //   new FormElementText({
  //     key: 'name',
  //     label: '单行文本框',
  //     value: '',
  //     required: true,
  //     order: 1
  //   }),

  //   new FormElementText({
  //     key: 'quantity',
  //     label: '数字文本框',
  //     value: '',
  //     required: true,
  //     order: 2,
  //     type: 'number'
  //   }),

  //   new FormElementTextarea({
  //     key: 'textarea',
  //     label: '多行文本框',
  //     value: '',
  //     required: true,
  //     order: 3
  //   }),

  //   new FormElementSelect({
  //     key: 'selected',
  //     label: '下拉选择框',
  //     options: [
  //       { key: '1', value: 'Option 1' },
  //       { key: '2', value: 'Option 2' },
  //       { key: '3', value: 'Option 3' },
  //       { key: '4', value: 'Option 4' }
  //     ],
  //     order: 4
  //   })
  // ];
  // elements$: Observable<FormElementBase<any>[]>;
  // constructor(service: FormElementService) {
  //   this.elements$ = service.getElements();
  // }
}
