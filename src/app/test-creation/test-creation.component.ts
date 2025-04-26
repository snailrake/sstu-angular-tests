import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { MatDividerModule }   from '@angular/material/divider';

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

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  addQuestion(): void {
    const q = this.fb.group({
      text: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ]),
      correctAnswer: [0, Validators.required],
      points: [1, [Validators.required, Validators.min(1)]]
    });
    this.questions.push(q);
  }

  removeQuestion(i: number): void {
    this.questions.removeAt(i);
  }

  options(i: number): FormArray {
    return this.questions.at(i).get('options') as FormArray;
  }

  addOption(i: number): void {
    this.options(i).push(this.fb.control('', Validators.required));
  }

  removeOption(qIndex: number, oIndex: number): void {
    this.options(qIndex).removeAt(oIndex);
  }

  submit(): void {
    if (this.form.invalid) return;
    this.testService.saveTest(this.form.value as Test);
    this.form.reset();
    this.questions.clear();
    this.addQuestion();
    alert('Тест сохранён!');
  }
}
