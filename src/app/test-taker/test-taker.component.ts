// src/app/features/test-taker/test-taker.component.ts
import { Component, OnInit }      from '@angular/core';
import { CommonModule }           from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  Router,
  ActivatedRoute,
  RouterModule
} from '@angular/router';
import { MatButtonModule }        from '@angular/material/button';

import { TestService, Test }      from '../services/test.service';

@Component({
  selector: 'app-test-taker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './test-taker.component.html',
  styleUrls: ['./test-taker.component.css']
})
export class TestTakerComponent implements OnInit {
  test!: Test;
  currentQuestionIndex = 0;
  score = 0;
  name = '';
  timer = 0;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService
  ) {
    this.form = this.fb.group({
      answer: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.name = prompt('Введите ваше имя') || 'Студент';
    const idx = Number(this.route.snapshot.paramMap.get('id'));
    this.testService.getTests()
      .subscribe(tests => {
        this.test = tests[idx];
        this.startTimer();
      });
  }

  startTimer() {
    this.timer = 300;
    const tick = setInterval(() => {
      if (this.timer <= 0) {
        clearInterval(tick);
        this.finish();
      } else {
        this.timer--;
      }
    }, 1000);
  }

  next() {
    const ans = this.form.value.answer;
    // начисляем очки за текущий вопрос
    if (ans === this.test.questions[this.currentQuestionIndex].correctAnswer) {
      this.score += this.test.questions[this.currentQuestionIndex].points;
    }
    this.currentQuestionIndex++;
    this.form.reset();
  }

  finish() {
    const ans = this.form.value.answer;
    // **тут** тоже начисляем очки за последний вопрос
    if (ans === this.test.questions[this.currentQuestionIndex].correctAnswer) {
      this.score += this.test.questions[this.currentQuestionIndex].points;
    }

    this.testService.saveResult({ name: this.name, score: this.score })
      .subscribe(() => {
        alert(
          `Тест завершён: ${this.score} из ${
            this.test.questions.reduce((acc, q) => acc + q.points, 0)
          }`
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
