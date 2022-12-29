import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorDeleteComponent } from './director-delete.component';

describe('DirectorDeleteComponent', () => {
  let component: DirectorDeleteComponent;
  let fixture: ComponentFixture<DirectorDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
