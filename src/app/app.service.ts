import { Injectable } from '@angular/core';
import { ApiService } from 'src/core/services/api.service';
import { ApiEndPoints } from 'src/core/constants/endpoints.constants';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private _apiService: ApiService) {}

  uploadFile(file: any, formDataPayload: any = {}) {
    const formData = new FormData();
    formData.append('csv', file);
    Object.keys(formDataPayload).forEach((key) => {
      formData.append(key, formDataPayload[key]);
    });

    console.log(formData);

    return this._apiService
      .post(`${ApiEndPoints.uploadCsvFile}`, formData)
      .pipe(
        map((data) => {
          console.log('After Upload Data...', data);
          return data;
        })
      );
  }

  getRecords(): Observable<any> {
    return this._apiService.get(`${ApiEndPoints.recodrs}`).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
