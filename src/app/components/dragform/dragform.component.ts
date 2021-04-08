import { Component, OnInit, ViewChild } from '@angular/core';
import { FormElementBase } from './init/FormElementBase';
import { FormElementCheckBox, FormElementNumber, FormElementRadio, FormElementSelect, FormElementText, FormElementTextarea } from './init/FormElementDefine';

interface DragElement {
  icon?: string;
  type?: string;
  label?: string;
}
@Component({
  selector: 'app-dragform',
  templateUrl: './dragform.component.html',
  styleUrls: ['./dragform.component.scss'],
})
export class DragformComponent implements OnInit {

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
  activeFormElementIndex: number;


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

  onActiceIndexChange(activeIndex: number) {
    this.activeFormElementIndex = activeIndex;
    this.activeFormElement = this.elements[activeIndex];
  }


  onCheckBoxChange(val: string[]) {

    this.activeFormElement.options.forEach(t => ({
      ...t,
      checked: val.includes(t.key)
    }));
    this.activeFormElement.value = val.toString();
    // update
    this.elements.splice(this.activeFormElementIndex, 1, this.activeFormElement);
    this.elements = JSON.parse(JSON.stringify(this.elements));
  }

  handleDelElement(indexVal: number) {
    this.elements.splice(indexVal, 1);
  }

  handleClickFormName() {
    document.getElementById('formNameInput').focus();
  }

  addOption(e) {
    const temp = this.activeFormElement.options.sort((a, b) => parseInt(a.key, 10) - parseInt(b.key, 10));
    const largeKeyStr = temp[temp.length - 1].key;
    const nextKey = parseInt(largeKeyStr, 10) + 1;
    const typeName = this.activeFormElement.controlType === 'radio' ? 'Radio' : (this.activeFormElement.controlType === 'checkbox' ? 'Label' : 'Option');
    this.activeFormElement.options.push(
      { key: nextKey + '', value: typeName + ' ' + nextKey }
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
         // type: 'password',
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
          key: 'radio',
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
          key: 'checkbox',
          label: '复选框',
          value: '',
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
          mode: 'multiple',
          value: '',
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
