import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGraphPage } from './device-graph.page';

describe('DeviceGraphPage', () => {
  let component: DeviceGraphPage;
  let fixture: ComponentFixture<DeviceGraphPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceGraphPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceGraphPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
