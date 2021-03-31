import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormElementBase } from '../../init/FormElementBase';
import { FormElementControlService } from '../../service/form-element-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [ FormElementControlService ],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[style.height]': '"100%"',
    '[style.width]': '"100%"'
  }
})
export class DynamicFormComponent implements OnInit {

  constructor(private ecs: FormElementControlService) { }


  @Input() elements: FormElementBase<string>[];
  form: FormGroup;

  ngOnInit() {
    this.form = this.ecs.toFormGroup(this.elements);
  }

}
