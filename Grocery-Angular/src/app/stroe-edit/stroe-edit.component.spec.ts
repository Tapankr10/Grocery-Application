import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StroeEditComponent } from './stroe-edit.component';

describe('StroeEditComponent', () => {
  let component: StroeEditComponent;
  let fixture: ComponentFixture<StroeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StroeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StroeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
