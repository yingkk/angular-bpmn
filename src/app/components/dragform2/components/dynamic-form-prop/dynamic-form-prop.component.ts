import { AfterContentChecked, AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from 'protractor';
import { Observable } from 'rxjs';
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
  // get selectedList(): string[] {
  //   return this.element.value ? this.element.value.split(',') : [];
  // }
  selectedList: string[] = [];
  get isValid() { return this.form.controls[this.element.key].valid; }
  constructor() { }

  ngOnInit() {
    // TODO  dragform2 component has changed current element property after this component init, and in this component cant deep sync
    console.log(this.element)
  }

}
