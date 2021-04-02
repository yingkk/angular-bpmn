import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from 'protractor';
import { FormElementBase } from '../../init/FormElementBase';

@Component({
  selector: 'app-dynamic-form-prop',
  templateUrl: './dynamic-form-prop.component.html',
  styleUrls: ['./dynamic-form-prop.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[style.height]': '"100%"',
    '[style.width]': '"100%"'
  }
})
export class DynamicFormPropComponent implements OnInit {
  @Input() element: FormElementBase<string>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.element.key].valid; }
  constructor() { }

  ngOnInit() {
  }

}
