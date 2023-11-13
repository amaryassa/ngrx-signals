import { Directive, Output, inject } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: 'form',
  standalone: true,
})
export class FormDirective<T> {
  // Inject its own `NgForm` instance
  private readonly ngForm = inject(NgForm, { self: true });
  // Use the valueChanges of the form as the output
  @Output() public readonly formValueChange = this.ngForm.form.valueChanges;
}
