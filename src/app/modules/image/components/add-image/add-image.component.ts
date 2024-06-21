import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TImageRequestForm } from '../../types/image.form.types';
import { ImageService } from '../../services/image.service';
import { TImageRequest } from '../../types/image.types';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss'],
})
export class AddImageComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<AddImageComponent>) {}

  fb = inject(NonNullableFormBuilder);
  service = inject(ImageService);
  snackBar = inject(MatSnackBar);
  imageURL: string | null = null;
  isUrlValid: boolean = false;
  checkingURL: boolean = false;

  form!: FormGroup<TImageRequestForm>;

  ngOnInit(): void {
    this.form = this.fb.group<TImageRequestForm>({
      description: this.fb.control<string>('', [Validators.required]),
      user: this.fb.control<string>('', [Validators.required]),
      url: this.fb.control<string>('', [Validators.required]),
    });

    this.form.controls.url.valueChanges.subscribe({
      next: (data) => {
        this.imageURL = data;
        this.checkingURL = true;
        this.service.checkIfURLisValid(data).subscribe({
          next: (result) => {
            this.isUrlValid = result;
            this.checkingURL = false;
          },
        });
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const fd = this.form.value;

    const payload: TImageRequest = {
      description: fd.description!,
      url: fd.url!,
      user: fd.user!,
    };

    this.service.postImage(payload).subscribe({
      next: (response) => {
        this.snackBar.open(response.message);
        if (!response.isSuccess) {
          return;
        }
        this.dialogRef.close();
      },
      error: () => {},
    });
  }
}
