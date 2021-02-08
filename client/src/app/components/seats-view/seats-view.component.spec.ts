import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsViewComponent } from './seats-view.component';

describe('SeatsViewComponent', () => {
  let component: SeatsViewComponent;
  let fixture: ComponentFixture<SeatsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
