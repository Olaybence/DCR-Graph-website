import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanualPageComponent } from './usermanual-page.component';

describe('UsermanualPageComponent', () => {
  let component: UsermanualPageComponent;
  let fixture: ComponentFixture<UsermanualPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermanualPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermanualPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
