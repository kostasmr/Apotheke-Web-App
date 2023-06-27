import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagPageComponent } from './bag-page.component';

describe('BagPageComponent', () => {
  let component: BagPageComponent;
  let fixture: ComponentFixture<BagPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BagPageComponent]
    });
    fixture = TestBed.createComponent(BagPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
