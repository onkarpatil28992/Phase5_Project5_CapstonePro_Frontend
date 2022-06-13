import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutForDeliveryOrdersComponent } from './out-for-delivery-orders.component';

describe('OutForDeliveryOrdersComponent', () => {
  let component: OutForDeliveryOrdersComponent;
  let fixture: ComponentFixture<OutForDeliveryOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutForDeliveryOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutForDeliveryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
