import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Record } from 'src/core/models/record.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'list-csv';
  records: Record[] = [];
  selectedFile: File[] = [];
  error: { message: string } = null;
  success: { message: string } = null;
  processing: { message: string; status: boolean } = {
    message: '',
    status: false,
  };

  constructor(private _appService: AppService) {}

  ngOnInit() {
    this.processing.message = 'Please wait....';
    this.processing.status = true;
    this._appService.getRecords().subscribe((records) => {
      this.processing.status = false;
      this.records = records;
    });
  }

  fileSelected(event) {
    console.log('..here............', event);
    this.error = null;
    this.selectedFile[0] = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile.length) {
      this.processing.message =
        'Please wait while we are processing your file...';
      this.processing.status = true;
      this._appService.uploadFile(this.selectedFile[0]).subscribe(
        (uploaded) => {
          this.success = { message: 'File Processed Successfully!' };
          this.processing.status = false;
          setTimeout(() => {
            this.success = null;
          }, 5000);
          this.records = this.records.concat(uploaded);
        },
        (error) => {
          this.error = error.error;
          console.log('..error............', error);
        }
      );
    }
  }
}
