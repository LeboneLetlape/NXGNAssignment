import { Component, Inject, OnInit } from '@angular/core';
import { RestApi } from "../shared/rest-api";
import { HttpClient } from '@angular/common/http';
import 'datatables.net'
import * as $ from 'jquery';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html'
})

export class ListMovieComponent implements OnInit{

  Movie: any = [];
  public tableWidget: any;

  constructor(public restApi: RestApi) {
    this.loadMovies(); this.initDatatable();
  }

  ngOnInit() {
    this.loadMovies();
  }


  ngAfterViewInit() {
    this.initDatatable();
  }

  

  private initDatatable(): void {
    this.loadMovies();
    const exampleId: any = $('#example');
    this.tableWidget = exampleId.DataTable({
      "order": [[3, 'asc']]});
  }

  

  // Get movie list
  loadMovies() {
    return this.restApi.GetMovies().subscribe((data: {}) => {
      this.Movie = data;

    })
  }

  // Delete movie
  deleteMovie(id) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.restApi.DeleteMovie(id).subscribe(data => {
        this.loadMovies()
      })
    }
  }
}
