import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippedOrdersComponent } from './shipped-orders.component';

describe('ShippedOrdersComponent', () => {
  let component: ShippedOrdersComponent;
  let fixture: ComponentFixture<ShippedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippedOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
