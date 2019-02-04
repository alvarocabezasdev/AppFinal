import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscribenosPage } from './escribenos.page';

describe('EscribenosPage', () => {
  let component: EscribenosPage;
  let fixture: ComponentFixture<EscribenosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscribenosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscribenosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
