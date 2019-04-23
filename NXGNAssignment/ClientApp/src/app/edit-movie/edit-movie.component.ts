import { Component, OnInit } from '@angular/core';
import { RestApi } from "../shared/rest-api";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html'
})


export class EditMovieComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  movieData: any = {};

  constructor(
    public restApi: RestApi,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.restApi.GetMoviesById(this.id).subscribe((data: {}) => {
      this.movieData = data;
    })
  }

  // Update movie data
  updateMovie() {
    if (window.confirm('Are you sure, you want to update?')) {
      this.restApi.EditMovie(this.id, this.movieData).subscribe(data => {
        this.router.navigate([''])
      })
    }
  }
}
