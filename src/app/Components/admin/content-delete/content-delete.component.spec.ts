import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDeleteComponent } from './content-delete.component';

describe('ContentDeleteComponent', () => {
  let component: ContentDeleteComponent;
  let fixture: ComponentFixture<ContentDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
