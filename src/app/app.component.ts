import { Component } from '@angular/core';
import { Currency } from './interfaces';
import { ServiceApiService } from './service-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LSI-recruitment-task';

  currencies: Currency[] = [];
  filteredCurrencies: Currency[] | null;
  value: Date = new Date();

  constructor(private serviceApi: ServiceApiService) {}

  ngOnInit() {
    this.getCurrentDataFromApi();
    this.getDayDataFromApi(new Date());
  }

  getCurrentDataFromApi() {
    this.serviceApi.getCurrentData().subscribe((data) => {
      this.currencies = data[0].rates;
    });
  }

  getDayDataFromApi(date: Date) {
    this.serviceApi.getDayData(date).subscribe((data) => {
      if (data.status === 400 || data.status === 404) {
        this.filteredCurrencies = null;
        this.value = new Date();
      }
      this.filteredCurrencies = data[0].rates;
    });
  }

  clear() {
    this.filteredCurrencies = null;
  }

  chooseDate(date: Date) {
    this.getDayDataFromApi(date);
  }

  chooseTheme(theme: 'light' | 'dark'): void {
    if (theme === 'light' && document.body.classList.contains('dark-theme')) {
      document.body.classList.toggle('dark-theme');
    }

    if (theme === 'dark' && !document.body.classList.contains('dark-theme')) {
      document.body.classList.toggle('dark-theme');
    }
  }
}
