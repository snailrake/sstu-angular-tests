import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { TestService, Test } from '../services/test.service';

@Component({
  selector: 'app-test-taker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './test-taker.component.html',
  styleUrls: ['./test-taker.component.css'],
})
export class TestTakerComponent implements OnInit {
  test!: Test;
  currentQuestionIndex = 0;
  score = 0;
  username = '';
  timer = 0;
  form: FormGroup;
  private tickInterval!: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
  ) {
    this.form = this.fb.group({
      answer: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    const user = this.getUserFromLocalStorage();
    this.username = user?.username || 'Студент';

    const testId = Number(this.route.snapshot.paramMap.get('id'));
    this.testService.getTests().subscribe(allTests => {
      this.test = allTests[testId];
      this.startTimer(this.test.timeLimit);
    });
  }

  getUserFromLocalStorage() {
    try {
      const raw = localStorage.getItem('currentUser');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  startTimer(minutes: number): void {
    this.timer = minutes * 60;
    this.tickInterval = setInterval(() => {
      if (this.timer <= 0) {
        clearInterval(this.tickInterval);
        this.finish();
      } else {
        this.timer--;
      }
    }, 1000);
  }

  next(): void {
    const ans = +this.form.value.answer;
    if (ans === this.currentQuestion.correctAnswer) {
      this.score += this.currentQuestion.points;
    }
    this.currentQuestionIndex++;
    this.form.reset();
  }

  finish(): void {
    if (this.form.valid) {
      const ans = +this.form.value.answer;
      if (ans === this.currentQuestion.correctAnswer) {
        this.score += this.currentQuestion.points;
      }
    }
    clearInterval(this.tickInterval);

    this.testService.saveResult({
      name: this.username,
      score: this.score,
      testId: this.test.id!
    }).subscribe(() => {
      const maxScore = this.test.questions.reduce((sum, q) => sum + q.points, 0);
      alert(`Тест завершён: ${this.score} из ${maxScore}`);
      this.router.navigate(['/student']);
    });
  }

  get currentQuestion() {
    return this.test.questions[this.currentQuestionIndex];
  }

  get isLast(): boolean {
    return this.currentQuestionIndex === this.test.questions.length - 1;
  }
}
