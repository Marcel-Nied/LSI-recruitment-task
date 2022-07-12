import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ServiceApiService {
  private currentURL =
    'https://api.nbp.pl/api/exchangerates/tables/A/?format=json';

  constructor(private http: HttpClient, private toastService: MessageService) {}

  ngOnInit() {
    this.getCurrentData();
  }

  getCurrentData(): Observable<any> {
    this.http.get(this.currentURL).subscribe((wartosc) => {});
    return this.http.get(this.currentURL);
  }

  getDayData(date: Date): Observable<any> {
    if (!date || typeof date !== 'object') {
      console.error('wrong date format provided');
    }

    const formattedDate = date.toISOString().split('T')[0];
    return this.http
      .get(
        `http://api.nbp.pl/api/exchangerates/tables/A/${formattedDate}/?format=json`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastService.add({
            severity: 'error',
            summary: 'Oops, something went wrong...',
            detail: error.error,
          });
          return of(error);
        })
      );
  }
}
