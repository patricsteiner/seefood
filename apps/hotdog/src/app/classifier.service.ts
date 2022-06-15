import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";
import {HotdogClassification} from "@seefood/api-interfaces";

@Injectable({
  providedIn: 'root'
})
export class ClassifierService {

  constructor(private http: HttpClient) {}

  classifyHotdog(file: File): Observable<HotdogClassification> {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);

    return this.http.post<HotdogClassification>("/api/classify", uploadData)
      .pipe(
        // For demo purposes
        delay(5000)
      );
  }
}
