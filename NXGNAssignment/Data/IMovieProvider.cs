using NXGNAssignment.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NXGNAssignment.Data
{
    public interface IMovieProvider
    {
        IEnumerable<Movie> GetMovies();
        int UpdateMovie(Movie movie);
        int DeleteMovie(int id);
        Movie GetMovie(int id);
        int AddMovie(Movie movie);
    }
}
