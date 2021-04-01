import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormElementBase } from './init/FormElementBase';
import { FormElementCheckBox, FormElementNumber, FormElementRadio, FormElementSelect, FormElementText, FormElementTextarea } from './init/FormElementDefine';
// import { FormElementService } from './service/form-element.service';

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
  formName = '表单名称';
  @ViewChild('formName', { static: false }) formNameInput: any;
  elements: FormElementBase<string>[] = [];
  list: DragElement[] = [
    {
      icon: 'fa fa-pencil',
      type: 'text',
      label: '单行文本框'
    },
    {
      icon: 'fa fa-hashtag',
      type: 'number',
      label: '数字框'
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

  activeFormElement: FormElementBase<string>;


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

    // e.dataTransfer.clearData();
  }

  onActiceIndexChange(val: number) {
    this.activeFormElement = this.elements[val];
  }

  handleClickFormName() {
    document.getElementById('formNameInput').focus();
  }

  addOption(e) {
    const temp = this.activeFormElement.options.sort((a, b) => parseInt(a.key, 10) - parseInt(b.key, 10));
    const largeKeyStr = temp[temp.length - 1].key;
    const nextKey = parseInt(largeKeyStr, 10) + 1;
    const typeName = this.activeFormElement.controlType === 'radio' ? 'Radio' : 'Label';
    this.activeFormElement.options.push(
      { key: nextKey + '', value: typeName + nextKey }
    );
  }

  delOption(curIndex: number) {
    this.activeFormElement.options.splice(curIndex, 1);
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
          required: false,
          order: 1,
          placeholder: '请输入'
        });
        break;
      case 'number':
        temp = new FormElementNumber({
          key: 'number',
          label: '数字框',
          value: '',
          required: false,
          order: 1,
          placeholder: '请输入',
        });
        break;
      case 'textarea':
        temp = new FormElementTextarea({
          key: 'textarea',
          label: '多行文本框',
          value: '',
          required: false,
          order: 2,
          placeholder: '请输入内容'
        });
        break;
      case 'radio':
        temp = new FormElementRadio({
          key: 'name',
          label: '单选框',
          value: '',
          required: false,
          order: 3,
          options: [
            { key: '1', value: 'Radio 1' },
            { key: '2', value: 'Radio 2' },
            { key: '3', value: 'Radio 3' },
          ],
        });
        break;
      case 'checkbox':
        temp = new FormElementCheckBox({
          key: 'check',
          label: '复选框',
          value: undefined,
          required: false,
          options: [
            { key: '1', value: 'Label 1' },
            { key: '2', value: 'Label 2' },
            { key: '3', value: 'Label 3' },
          ],
          order: 4
        });
        break;
      case 'select':
        temp = new FormElementSelect({
          key: 'selected',
          label: '下拉选择框',
          placeholder: '请选择',
          required: false,
          options: [
            { key: '1', value: 'Option 1' },
            { key: '2', value: 'Option 2' },
            { key: '3', value: 'Option 3' },
          ],
          order: 5
        });
        break;
    }
    elements.push(temp);
    elements.sort((a, b) => a.order - b.order);
    return elements;
  }

}
