import { Component, OnInit } from '@angular/core';


interface Field {
  icon?: string;
  title?: string;
  properties?: string[];
  styles?: string[];
  code?: string;
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
      title: '单行输入框',
      code: `<nz-form-item>
      <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="password" nzRequired>单行输入框</nz-form-label>
      <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Please input your password!">
        <input
          nz-input
          type="text"
          id="password"
          name="inputName"
        />
      </nz-form-control>
    </nz-form-item>`
    },
    {
      icon: 'fa fa-paint-brush',
      title: '多行输入框'
    },
    {
      icon: 'fa fa-dot-circle-o',
      title: '单选框'
    },
    {
      icon: 'fa fa-check-square-o',
      title: '复选框'
    },
    {
      icon: 'fa fa-toggle-down',
      title: '下拉框'
    }
  ];

  settingRadio = '1';
  currentDragField: Field;

  constructor() { }

  ngOnInit() {
  }

  onRadioValueChange(val) {
    this.settingRadio = val;
  }

  onDragStart(e, item) {
    console.log('dragstart');
    this.currentDragField = item;
    e.dataTransfer.setData('text/html', this.currentDragField.code);
  }

  onDragOver(e) {
    console.log('dragover');
    e.preventDefault();
  }

  onDrop(e) {
    console.log('drop');
    e.preventDefault();
    const data = e.dataTransfer.getData('text/html');
    e.target.appendChild('<p>哈哈哈哈哈</p>');
  }
}
