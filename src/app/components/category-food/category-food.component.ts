import { Component, OnInit } from '@angular/core';
import { ServicService } from '../servic.service';

@Component({
  selector: 'app-category-food',
  templateUrl: './category-food.component.html',
  styleUrls: ['./category-food.component.css'],
})
export class CategoryFoodComponent implements OnInit {
  inputValue: string = '';
  allFoodData: any = [];
  allcategoryData: any = [];
  searchFood: any = [];
  searchResult: any = [];
  foodID: string = '';
  detailsShow: any = [];
  detailsResult: any = [];
  detailsUrl: any = '';
  sourceUrl: any = '';
  catergoryClickFood: any = '';
  catergoryClickFoodID: any = '';

  detailsDiv: boolean = true;
  showDiv: boolean = true;

  constructor(private dataservice: ServicService) { }

  ngOnInit(): void {
    this.callAPI();
  }

  callAPI() {
    this.dataservice.getData().subscribe((data) => {
      this.allFoodData = data;
      this.allcategoryData = this.allFoodData.categories;

      // this.allcategoryData.forEach((element: any) => {
      //   // console.log(element);

      // });





      this.showDiv = true;
      this.detailsDiv = false;
    });
  }

  onClickFood(category: any){

    this.catergoryClickFood = category;

    console.log(this.catergoryClickFood);

    this.dataservice.searchData(this.catergoryClickFood).subscribe((data) => {
      this.searchFood = data;

        this.searchResult = this.searchFood.meals;
        // console.log(this.searchResult);
        this.showDiv = false;


    });





  }

  search() {
    console.log(this.inputValue);
    if(this.inputValue == '')
    {
      alert('Please Type Something')

    }
    else{
      this.dataservice.searchData(this.inputValue).subscribe((data) => {
        this.searchFood = data;
        if(this.searchFood.meals == null){
          alert('No Result Found')

        }
        else{
          this.searchResult = this.searchFood.meals;
          // console.log(this.searchResult);
          this.showDiv = false;
        }

      });
    }

  }

  loadDetails(idMeal: any) {
    console.log(idMeal);
    this.dataservice.showDetails(idMeal).subscribe((data) => {
      this.detailsShow = data;
      this.detailsResult = this.detailsShow.meals[0];
    });
    this.detailsDiv = true;
  }

  onclickShowMore() {
    this.detailsResult = this.detailsShow.meals[0].strSource;
    window.location.href = this.detailsResult;
  }
}
