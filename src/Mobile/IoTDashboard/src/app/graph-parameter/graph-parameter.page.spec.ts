import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphParameterPage } from './graph-parameter.page';

describe('GraphParameterPage', () => {
  let component: GraphParameterPage;
  let fixture: ComponentFixture<GraphParameterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphParameterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphParameterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
