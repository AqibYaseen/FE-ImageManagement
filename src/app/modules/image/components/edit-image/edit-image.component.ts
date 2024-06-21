import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TImageRequestForm } from '../../types/image.form.types';
import { ImageService } from '../../services/image.service';
import {
  TImageRequest,
  TImageResponse,
  TImageUpdateRequest,
} from '../../types/image.types';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss'],
})
export class EditImageComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EditImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TImageResponse
  ) {}

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
    this.form.patchValue(this.data);
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const fd = this.form.value;

    const data: TImageUpdateRequest = {
      dateCreated: this.data.dateCreated,
      description: this.form.value.description!,
      id: this.data.id,
      url: this.form.value.url!,
      user: this.form.value.user!,
    };
    this.dialogRef.close(data);
  }
}
