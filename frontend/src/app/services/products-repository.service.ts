import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsRepositoryService {
  constructor(private http: HttpClient) { }

  async getData() {
    try {
      return await this.http.get('../assets/mock/mock-products.json').toPromise();
    } catch (error) {
      return "[]";
    }
  }

}
