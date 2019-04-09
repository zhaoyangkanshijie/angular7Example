import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylePipeComponent } from './style-pipe.component';

describe('StylePipeComponent', () => {
  let component: StylePipeComponent;
  let fixture: ComponentFixture<StylePipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylePipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylePipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
