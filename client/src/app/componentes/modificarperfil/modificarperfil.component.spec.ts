import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarperfilComponent } from './modificarperfil.component';

describe('ModificarperfilComponent', () => {
  let component: ModificarperfilComponent;
  let fixture: ComponentFixture<ModificarperfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarperfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
