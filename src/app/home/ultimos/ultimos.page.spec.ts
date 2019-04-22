import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimosPage } from './ultimos.page';

describe('UltimosPage', () => {
  let component: UltimosPage;
  let fixture: ComponentFixture<UltimosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltimosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
