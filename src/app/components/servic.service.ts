import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicService {


  constructor(private _httpClient: HttpClient) { }

  getData()
  {
    return this._httpClient.get("https://www.themealdb.com/api/json/v1/1/categories.php")
  }

  searchData(search: any){
    return this._httpClient.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
  }
  showDetails(id:any){
    return this._httpClient.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  }
}
