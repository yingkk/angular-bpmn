import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';


interface Field {
  icon?: string;
  label?: string;
  properties?: string[];
  styles?: string[];
  code?: string;
  // key?: string;
  // label?: string;
  // required?: boolean;
  // order?: number;
  // controlType?: string;
}

@Component({
  selector: 'app-dragform',
  templateUrl: './dragform.component.html',
  styleUrls: ['./dragform.component.scss']
})
export class DragformComponent implements OnInit {
  fields: Field[] = [
    {
      icon: 'fa fa-pencil',
      label: '单行输入框',
      code: `
      <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired>单行输入框</nz-form-label>
      <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Please input your name!">
        <input
          nz-input
          type="text"
          id="name"
          name="name"
        />
      </nz-form-control>
    `
    },
    {
      icon: 'fa fa-paint-brush',
      label: '多行输入框'
    },
    {
      icon: 'fa fa-dot-circle-o',
      label: '单选框'
    },
    {
      icon: 'fa fa-check-square-o',
      label: '复选框'
    },
    {
      icon: 'fa fa-toggle-down',
      label: '下拉框'
    }
  ];
  items: SafeHtml[] = [];

  settingRadio = '1';
  currentDragField: Field;

  constructor(private sanitized: DomSanitizer) { }

  ngOnInit() {
  }

  onRadioValueChange(val) {
    this.settingRadio = val;
  }

  onDragStart(e, item) {
    console.log('dragstart');
    this.currentDragField = item;
    // e.dataTransfer.setData('Text', e.target.id);
    // e.dataTransfer.setData('text/html', this.currentDragField.code);

  }

  onDragOver(e) {
    console.log('dragover');
    e.preventDefault();
  }

  onDrop(e) {
    console.log('drop');
    e.preventDefault();
    const data = e.dataTransfer.getData('text/html');
    const item: SafeHtml = this.sanitized.bypassSecurityTrustHtml(this.currentDragField.code);
    this.items.push(item);
    // this.items.push(data)


    // e.dataTransfer.clearData();
  }
}
