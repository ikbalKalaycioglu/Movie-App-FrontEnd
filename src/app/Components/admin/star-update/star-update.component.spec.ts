import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarUpdateComponent } from './star-update.component';

describe('StarUpdateComponent', () => {
  let component: StarUpdateComponent;
  let fixture: ComponentFixture<StarUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
