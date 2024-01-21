function searchMovie() {
  $("#movie-list").html("");
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      "apikey": "fc3e0f91",
      "s": $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;

        $.each(movies, function (i, data) {
          $("#movie-list").append(`
          <div class="col-md-4">
          <div class="card">
            <img src="`+ data.Poster + `" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">`+ data.Title + `</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">`+ data.Year + `</h6>
                <a href="#" class="card-link  see-detail" data-bs-toggle="modal" 
                data-bs-target="#exampleModal" data-id="`+ data.imdbID + `">See Details</a>
              </div>
            </div>
            </div>
          `);
        });

        $("#search-input").val('');

      } else {
        $("#movie-list").html(`
            <div class="col">
              <h1 class="text-center">` + result.Error + `</h1>
            </div>
        `);
      };
    },
  });
}

//handle search movie ketika tombol search di klik
$("#search-btn").on("click", function () {
  searchMovie();
});


//handle search movie ketika di enter
$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    searchMovie();
  };
});

$("#movie-list").on("click", ".see-detail", function () {
  // console.log($(this).data("id"));
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      "apikey": "fc3e0f91",
      "i": $(this).data("id")
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(`
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4 col-lg-4">
                <img src="`+ movie.Poster + `" alt="" class="img-fluid">
              </div>
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item"><h3>`+ movie.Title + `</h3></li>
                  <li class="list-group-item">Released : `+ movie.Released + `</li>
                  <li class="list-group-item">Genre : `+ movie.Genre + `</li>
                  <li class="list-group-item">Director : `+ movie.Director + `</li>
                  <li class="list-group-item">Actors : `+ movie.Actors + `</li>
                  <li class="list-group-item">Plot : `+ movie.Plot + `</li>
                </ul>
              </div>
            </div>
          </div>
        `)
      }
    }

  });
});

