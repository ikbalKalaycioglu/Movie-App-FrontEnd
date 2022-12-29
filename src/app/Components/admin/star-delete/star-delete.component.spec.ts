import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarDeleteComponent } from './star-delete.component';

describe('StarDeleteComponent', () => {
  let component: StarDeleteComponent;
  let fixture: ComponentFixture<StarDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
