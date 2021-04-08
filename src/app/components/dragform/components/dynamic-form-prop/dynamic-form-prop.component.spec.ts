import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormPropComponent } from './dynamic-form-prop.component';

describe('DynamicFormPropComponent', () => {
  let component: DynamicFormPropComponent;
  let fixture: ComponentFixture<DynamicFormPropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormPropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
