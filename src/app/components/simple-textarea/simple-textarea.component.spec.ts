import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTextareaComponent } from './simple-textarea.component';

describe('SimpleTextareaComponent', () => {
  let component: SimpleTextareaComponent;
  let fixture: ComponentFixture<SimpleTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
