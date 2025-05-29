import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesinloguearComponent } from './homesinloguear.component';

describe('HomesinloguearComponent', () => {
  let component: HomesinloguearComponent;
  let fixture: ComponentFixture<HomesinloguearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomesinloguearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomesinloguearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
