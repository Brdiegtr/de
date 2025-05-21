import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesdetallesComponent } from './imagenesdetalles.component';

describe('ImagenesdetallesComponent', () => {
  let component: ImagenesdetallesComponent;
  let fixture: ComponentFixture<ImagenesdetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagenesdetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenesdetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
