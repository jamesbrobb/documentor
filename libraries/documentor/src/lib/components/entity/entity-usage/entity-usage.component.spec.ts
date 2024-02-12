import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityUsageComponent } from './entity-usage.component';

describe('EntityUsageComponent', () => {
  let component: EntityUsageComponent;
  let fixture: ComponentFixture<EntityUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityUsageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
