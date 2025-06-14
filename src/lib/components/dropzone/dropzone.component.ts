import {
  booleanAttribute,
  Component,
  HostListener,
  inject,
  input,
  numberAttribute,
  OnInit,
  output,
  ViewEncapsulation
} from '@angular/core';
import {AbstractUIComponent} from '../abstract.component';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {BadgeComponent} from '../badge/badge.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {HttpClient, HttpClientModule, HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';

type UploadedFile = {
  file: File,
  preview: string,
  type?: string,
  progress?: number;
  uploading?: boolean;
  error?: string;
};

type OnFileChangeEvent = {
  eventType: 'DROPPED' | 'PICKED' | 'DELETED',
  data: any
};

type HttpOptions = {
  enabled: boolean,
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH';
  body?: any,
  formFileName?: 'file' | string,
  headers?: { [key: string]: string | string[] };
  params?: {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>
  }
};

@Component({
  selector: 'ka-dropzone, ui-dropzone',
  imports: [
    NgIf,
    NgForOf,
    BadgeComponent,
    DecimalPipe,
    HttpClientModule,
  ],
  templateUrl: './dropzone.component.html',
  styleUrl: './dropzone.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: []
})
export class DropzoneComponent extends AbstractUIComponent implements OnInit {

  formats = input<string[]>(['*/*']);
  onlyImage = input(false, {transform: booleanAttribute});
  multiple = input(true, {transform: booleanAttribute});
  displayIndicator = input(true, {transform: booleanAttribute});
  maxFiles = input(98, {transform: numberAttribute});
  maxFileSizeMB = input(32, {transform: numberAttribute}); // Taille maximale par fichier (en MB)
  httpOptions = input<HttpOptions>()
  // onFile = output<any>();
  onChange = output<OnFileChangeEvent>();
  protected errorMessage: string | null = null;

  // Configurations des limites
  protected uploadedFiles: UploadedFile[] = [];
  protected isDragging = false;
  protected _formats = [] as string[];
  protected _supportedFormats = "";

  private http = inject(HttpClient);

  public get files() {
    return this.uploadedFiles;
  }

  override compiledClasses(): string {
    const builder = new StringBuilder();
    if (this.nativeClassName()) {
      builder.append(this.nativeClassName());
    }
    return twMerge(builder.segments());
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.elementClass = this.compiledClasses();
    if (this.onlyImage()) {
      this._formats = ["image/*"];
      this._supportedFormats = "PNG, JPG, JPEG, WEBP, HEIC, BNP";
    } else {
      this._formats = this.formats();
      this._supportedFormats = this._formats.map(value => value.split("/")[1])
        .join(", ");
    }
  }

  // Gestion du drag and drop
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  // Gestion du drop
  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
    this.isDragging = false;
  }

  // Gestion de la sélection via input
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  // Suppression d'un fichier
  removeFile(index: number) {
    const file = this.uploadedFiles.at(index);
    this.uploadedFiles.splice(index, 1);
    this.onChange.emit({
      eventType: 'DELETED',
      data: {index, file}
    });
  }

  @HostListener("window:paste", ["$event"])
  onPaste($event: ClipboardEvent) {
    const items = $event.clipboardData?.files;
    if (items) {
      this.handleFiles(items);
    }
  }

  private simulateUpload(file: File): Promise<void> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const fileIndex = this.uploadedFiles.findIndex(f => f.file === file);
        if (fileIndex >= 0) {
          this.uploadedFiles[fileIndex].progress! += 10 + Math.random() * 20;
          if (this.uploadedFiles[fileIndex].progress! >= 100) {
            this.uploadedFiles[fileIndex].progress = 100;
            this.uploadedFiles[fileIndex].uploading = false;
            clearInterval(interval);
            resolve();
          }
        }
      }, 300);
    });
  }

  private serverUploadFile = (
    file: File,
    index: number
  ): void => {
    const config = this.httpOptions();
    if (!config) return;
    const formData = new FormData();
    const fileFieldName: string = config?.formFileName ? config?.formFileName : 'file';
    formData.append(fileFieldName, file);
    if (config?.body) {
      delete config.body.file;
      Object.values(config.body).forEach((value, idx) => {
        formData.append(Object.keys(config.body).at(idx)!, value + "");
      });
    }

    this.http.request(config?.method || 'POST', config?.url, {
      reportProgress: true,
      observe: "events",
      body: formData,
      headers: config.headers,
      params: config.params,
    }).subscribe({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.files[index].progress = Math.round(100 * event.loaded / (event.total || 1));
        } else if (event.type === HttpEventType.Response) {
          this.files[index].uploading = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.files[index].error = err.message || 'Upload Failed';
        this.files[index].uploading = false;
      },
      complete: () => {
      }
    })
  };

  private handleFiles(files: FileList) {
    this.errorMessage = null;

    // Vérification du nombre de fichiers
    if (this.files.length + files.length > this.maxFiles()) {
      this.errorMessage = `Your can upload a maximum ${this.maxFiles()} of files.`;
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Vérification du type de fichier
      if (this.onlyImage() && !file.type.match('image.*')) {
        this.errorMessage = 'Only image are allowed (JPEG, PNG, WEBP).';
        continue;
      }

      // Vérification de la taille du fichier
      if (file.size > this.maxFileSizeMB() * 1024 * 1024) {
        this.errorMessage = `The maximum file size is ${this.maxFileSizeMB()}MB.`;
        continue;
      }

      if (file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const newFile: UploadedFile = {
            file: file,
            preview: e.target.result,
            type: file.type,
            progress: 0,
            uploading: true
          };
          this.files.push(newFile);
        };
        reader.readAsDataURL(file);
      } else {
        this.uploadedFiles.push({
          file: file,
          type: file.type,
          preview: null!
        });
      }

      if (this.httpOptions()) {
        this.serverUploadFile(file, i);
      } else {
        this.simulateUpload(file)
          .finally(() => console.log("Uploaded"));
      }
    }

    this.onChange.emit({
      eventType: this.isDragging ? 'DROPPED' : 'PICKED',
      data: {files: Array.from(files)}
    });
  }
}
