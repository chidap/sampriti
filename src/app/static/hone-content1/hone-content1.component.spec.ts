import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoneContent1Component } from './hone-content1.component';

describe('HoneContent1Component', () => {
  let component: HoneContent1Component;
  let fixture: ComponentFixture<HoneContent1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoneContent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoneContent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
