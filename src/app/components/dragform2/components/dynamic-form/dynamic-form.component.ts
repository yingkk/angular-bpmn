import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormElementBase } from '../../init/FormElementBase';
import { FormElementControlService } from '../../service/form-element-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [FormElementControlService],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[style.height]': '"100%"',
    '[style.width]': '"100%"'
  }
})
export class DynamicFormComponent implements OnInit {

  constructor(private ecs: FormElementControlService) { }


  @Input() elements: FormElementBase<string>[];
  @Output() outActiveIndex = new EventEmitter<number>();
  @Output() outDelIndex = new EventEmitter<number>();
  form: FormGroup;

  activeIndex: number;

  ngOnInit() {
    this.form = this.ecs.toFormGroup(this.elements);
  }

  handleClick(indexVal: number, e) {
    const className = e.target.parentNode.className;
    if (className === 'dynamic-delete-button') {
      // del
      this.outDelIndex.emit(indexVal);
    } else {
      // active
      this.activeIndex = indexVal;
      this.outActiveIndex.emit(this.activeIndex);
    }
  }

}
