import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PujaUpdateComponent } from './puja-update.component';

describe('PujaUpdateComponent', () => {
  let component: PujaUpdateComponent;
  let fixture: ComponentFixture<PujaUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PujaUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PujaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
