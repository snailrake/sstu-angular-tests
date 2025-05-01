import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { TestService, Test } from '../services/test.service';

@Component({
  selector: 'app-test-taker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatButtonModule],
  templateUrl: './test-taker.component.html',
  styleUrls: ['./test-taker.component.css'],
})
export class TestTakerComponent implements OnInit {
  test!: Test;
  currentQuestionIndex = 0;
  score = 0;
  name = '';
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
    this.name = prompt('Введите ваше имя') || 'Студент';
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.testService.getTests().subscribe((tests) => {
      this.test = tests[id];
      this.startTimer(this.test.timeLimit);
    });
  }

  startTimer(minutes: number) {
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

  next() {
    if (this.form.value.answer === this.test.questions[this.currentQuestionIndex].correctAnswer) {
      this.score += this.test.questions[this.currentQuestionIndex].points;
    }
    this.currentQuestionIndex++;
    this.form.reset();
  }

  finish() {
    // начисляем за последний вопрос, если остался незавершённым
    if (this.form.valid && this.currentQuestionIndex < this.test.questions.length) {
      if (this.form.value.answer === this.test.questions[this.currentQuestionIndex].correctAnswer) {
        this.score += this.test.questions[this.currentQuestionIndex].points;
      }
    }
    clearInterval(this.tickInterval);
    this.testService.saveResult({ name: this.name, score: this.score }).subscribe(() => {
      alert(
        `Тест завершён: ${this.score} из ${this.test.questions.reduce(
          (acc, q) => acc + q.points,
          0,
        )}`,
      );
      this.router.navigate(['/student']);
    });
  }

  get currentQuestion() {
    return this.test.questions[this.currentQuestionIndex];
  }

  get isLast() {
    return this.currentQuestionIndex === this.test.questions.length - 1;
  }
}
