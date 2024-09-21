import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverystaffComponent } from './deliverystaff.component';

describe('DeliverystaffComponent', () => {
  let component: DeliverystaffComponent;
  let fixture: ComponentFixture<DeliverystaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliverystaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverystaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
