import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { TestService, Test } from '../services/test.service';

@Component({
  selector: 'app-test-creation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './test-creation.component.html',
  styleUrls: ['./test-creation.component.css'],
})
export class TestCreationComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private testService: TestService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      timeLimit: [5, [Validators.required, Validators.min(1)]], // по умолчанию 5 мин
      questions: this.fb.array([]),
    });
    this.addQuestion();
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  options(qIndex: number): FormArray {
    return this.questions.at(qIndex).get('options') as FormArray;
  }

  addQuestion(): void {
    const q = this.fb.group({
      text: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
      ]),
      correctAnswer: [0, [Validators.required, Validators.min(0)]],
      points: [1, [Validators.required, Validators.min(1)]],
    });
    this.questions.push(q);
  }

  removeQuestion(i: number): void {
    this.questions.removeAt(i);
  }

  addOption(qIndex: number): void {
    this.options(qIndex).push(this.fb.control('', Validators.required));
  }

  removeOption(qIndex: number, oIndex: number): void {
    this.options(qIndex).removeAt(oIndex);
  }

  submit(): void {
    if (this.form.invalid) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    const newTest: Test = this.form.value;
    this.testService.saveTest(newTest).subscribe({
      next: () => {
        alert('Тест сохранён в mock-db!');
        this.form.reset({ title: '', timeLimit: 5 });
        this.questions.clear();
        this.addQuestion();
      },
      error: (err) => {
        console.error(err);
        alert('Ошибка при сохранении. См. консоль.');
      },
    });
  }
}
