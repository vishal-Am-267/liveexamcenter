import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicWiseQuestionsComponent } from './topic-wise-questions.component';

describe('TopicWiseQuestionsComponent', () => {
  let component: TopicWiseQuestionsComponent;
  let fixture: ComponentFixture<TopicWiseQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicWiseQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicWiseQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
