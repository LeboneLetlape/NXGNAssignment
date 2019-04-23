import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi } from '../shared/rest-api'

@Component({
  selector: 'app-sdd-movie',
  templateUrl: './add-movie.component.html'
})


export class AddMovieComponent implements OnInit {

  @Input() movieDetails = { name: '', category: '', rate: 0 }


    ngOnInit(): void {
        
  }

  constructor(public restApi: RestApi, public router: Router) {

  }

  addMovie(dataMovie) {
    this.restApi.AddMovie(this.movieDetails).subscribe((data: {}) => {
      if (!data === null) {
        alert('User Exsists')
      }
      else {
        this.router.navigate([''])
      }
    })
  }
}
