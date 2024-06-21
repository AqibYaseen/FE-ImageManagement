import { FormControl } from '@angular/forms';

export type TImageRequestForm = {
  user: FormControl<string>;
  description: FormControl<string>;
  image: FormControl<File>;
};
