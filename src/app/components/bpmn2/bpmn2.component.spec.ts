import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bpmn2Component } from './bpmn2.component';

describe('Bpmn2Component', () => {
  let component: Bpmn2Component;
  let fixture: ComponentFixture<Bpmn2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bpmn2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bpmn2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
