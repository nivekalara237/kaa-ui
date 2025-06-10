import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  input,
  OnInit,
  Optional,
  Output,
  Self,
  ViewEncapsulation
} from '@angular/core';
import {AbstractInputComponent} from '../shared/abstract-input.component';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'ka-file-input, ui-file-input',
  standalone: false,
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'transition-all duration-300'
  }
})
export class FileInputComponent extends AbstractInputComponent implements OnInit {
  @Output() fileSelected = new EventEmitter<File>();
  label = input<string>();

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isImage = false;
  errorMessage = '';
  // Configuration (can be @Input() properties)
  acceptedTypes = 'image/*,.pdf,.doc,.docx';
  maxSizeMB = 5;

  constructor(
    @Optional() @Self() protected ngControl: NgControl,
  ) {
    super(inject(ChangeDetectorRef), ngControl);
    if (ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  override compiledClasses(): string {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File) {
    this.errorMessage = '';

    // Validate file size
    if (file.size > this.maxSizeMB * 1024 * 1024) {
      this.errorMessage = `File is too large. Maximum size is ${this.maxSizeMB}MB.`;
      return;
    }

    // Validate file type
    const acceptedTypes = this.acceptedTypes.split(',');
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const isAccepted = acceptedTypes.some(type => {
      if (type === 'image/*') {
        return file.type.startsWith('image/');
      }
      return type.toLowerCase() === fileExtension;
    });

    if (!isAccepted) {
      this.errorMessage = `Invalid file type. Accepted types: ${this.acceptedTypes.replace(/\*/g, '').replace(/,/g, ', ')}.`;
      return;
    }

    this.selectedFile = file;
    this.isImage = file.type.startsWith('image/');

    if (this.isImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

    this.fileSelected.emit(file);
    this.updateValue(file, true);
  }

  removeFile() {
    this.previewUrl = null;
    this.selectedFile = null;
    this.fileSelected.emit(null!);
  }
}
