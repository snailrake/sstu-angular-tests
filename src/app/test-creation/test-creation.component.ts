// src/app/features/test-creation/test-creation.component.ts
import { Component, OnInit }    from '@angular/core';
import { CommonModule }         from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms';

import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatInputModule }       from '@angular/material/input';
import { MatButtonModule }      from '@angular/material/button';
import { MatIconModule }        from '@angular/material/icon';
import { MatDividerModule }     from '@angular/material/divider';

import { TestService, Test }    from '../services/test.service';

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
    MatDividerModule
  ],
  templateUrl: './test-creation.component.html',
  styleUrls: ['./test-creation.component.css']
})
export class TestCreationComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([])
    });
    this.addQuestion();
  }

  // Ссылку на массив вопросов из формы
  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  // Добавить новый вопрос (с двумя пустыми вариантами по умолчанию)
  addQuestion(): void {
    const questionGroup = this.fb.group({
      text: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ]),
      correctAnswer: [0, Validators.required],
      points: [1, [Validators.required, Validators.min(1)]]
    });
    this.questions.push(questionGroup);
  }

  // Удалить вопрос по индексу
  removeQuestion(i: number): void {
    this.questions.removeAt(i);
  }

  // Ссылку на массив вариантов конкретного вопроса
  options(qIndex: number): FormArray {
    return this.questions.at(qIndex).get('options') as FormArray;
  }

  // Добавить вариант к вопросу
  addOption(qIndex: number): void {
    this.options(qIndex).push(this.fb.control('', Validators.required));
  }

  // Удалить вариант вопроса
  removeOption(qIndex: number, oIndex: number): void {
    this.options(qIndex).removeAt(oIndex);
  }

  // Сохранить тест через HTTP POST в mock-API
  submit(): void {
    console.log('submit() called, form valid?', this.form.valid);
    if (this.form.invalid) {
      console.warn('Form invalid, not sending request');
      return;
    }

    const newTest: Test = this.form.value;
    this.testService.saveTest(newTest)
      .subscribe({
        next: res => {
          console.log('JSON-server ответил:', res);
          this.form.reset();
          this.questions.clear();
          this.addQuestion();
          alert('Тест сохранён в mock-db!');
        },
        error: err => {
          console.error('Ошибка при сохранении теста:', err);
          alert('Не удалось сохранить тест. Проверьте консоль.');
        }
      });
  }

}
