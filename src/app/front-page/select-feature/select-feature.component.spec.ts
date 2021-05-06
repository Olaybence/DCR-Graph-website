import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFeatureComponent } from './select-feature.component';

describe('SelectFeatureComponent', () => {
  let component: SelectFeatureComponent;
  let fixture: ComponentFixture<SelectFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
