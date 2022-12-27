import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarAddComponent } from './star-add.component';

describe('StarAddComponent', () => {
  let component: StarAddComponent;
  let fixture: ComponentFixture<StarAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
