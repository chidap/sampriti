import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContent2Component } from './home-content2.component';

describe('HomeContent2Component', () => {
  let component: HomeContent2Component;
  let fixture: ComponentFixture<HomeContent2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeContent2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
