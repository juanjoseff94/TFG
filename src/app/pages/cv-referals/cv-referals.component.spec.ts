import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvReferalsComponent } from './cv-referals.component';

describe('CvReferalsComponent', () => {
  let component: CvReferalsComponent;
  let fixture: ComponentFixture<CvReferalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvReferalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvReferalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
