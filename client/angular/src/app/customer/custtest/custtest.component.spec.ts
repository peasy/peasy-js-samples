import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusttestComponent } from './custtest.component';

describe('CusttestComponent', () => {
  let component: CusttestComponent;
  let fixture: ComponentFixture<CusttestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusttestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusttestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
