import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragformComponent } from './dragform.component';

describe('DragformComponent', () => {
  let component: DragformComponent;
  let fixture: ComponentFixture<DragformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
