import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WathListComponent } from './wath-list.component';

describe('WathListComponent', () => {
  let component: WathListComponent;
  let fixture: ComponentFixture<WathListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WathListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WathListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
