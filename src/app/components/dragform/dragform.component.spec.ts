import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dragform2Component } from './dragform.component';

describe('DragformComponent', () => {
  let component: Dragform2Component;
  let fixture: ComponentFixture<Dragform2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dragform2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dragform2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
