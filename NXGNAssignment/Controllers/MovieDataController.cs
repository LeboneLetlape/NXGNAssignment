using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NXGNAssignment.Data;

namespace NXGNAssignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieDataController : ControllerBase
    {
        private readonly IMovieProvider movieProvider;

        public MovieDataController(IMovieProvider movieProvider)
        {
            this.movieProvider = movieProvider;
        }

        // GET: api/MovieData
        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            return movieProvider.GetMovies().ToList();
        }

        // GET: api/MovieData/5
        [HttpGet("{id}")]
        public Movie Get(int id)
        {
            return movieProvider.GetMovie(id);
        }

        // POST: api/MovieData
        [HttpPost]
        public string Post([FromBody] Movie movie)
        {
            if(MovieExists(movie.Name))
            {
                return "User Exists";
            }
            else
            {
                movieProvider.AddMovie(movie);
            }
            return null;
        }

        // PUT: api/MovieData/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Movie movie)
        {
            movieProvider.UpdateMovie(movie);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            movieProvider.DeleteMovie(id);
        }

        private bool MovieExists(string name)
        {
            return movieProvider.GetMovies().Count(e => e.Name == name) > 0;
        }
    }
}
