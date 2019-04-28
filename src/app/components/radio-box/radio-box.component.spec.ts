import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioBoxComponent } from './radio-box.component';

describe('RadioBoxComponent', () => {
  let component: RadioBoxComponent;
  let fixture: ComponentFixture<RadioBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
