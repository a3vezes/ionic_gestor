import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGastoPage } from './edit-gasto.page';

describe('EditGastoPage', () => {
  let component: EditGastoPage;
  let fixture: ComponentFixture<EditGastoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGastoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGastoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
