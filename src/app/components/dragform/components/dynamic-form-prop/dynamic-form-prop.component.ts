import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
export class DynamicFormPropComponent implements OnInit, OnChanges {
  @Input() element: FormElementBase<string>;
  @Input() form: FormGroup;
  selectedList: string[] = [];
  get isValid() { return this.form.controls[this.element.key].valid; }
  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.element) {
      const selectedStr = changes.element.currentValue.value;
      this.selectedList = selectedStr.split(',');
    }
  }
}
