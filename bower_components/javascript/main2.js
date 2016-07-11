var ResultItems = React.createClass({
  render :function(){
    return(
      <div>
      <li>{this.props.Title}</li>
      <li>{this.props.Year}</li>
      <li>{this.props.Rated}</li>
      <li>{this.props.Released}</li>
      <li>{this.props.Genre}</li>
      <li>{this.props.Runtime}</li>
      <li>{this.props.Director}</li>
      <li>{this.props.Writer}</li>
      <li>{this.props.Actors}</li>
      <li>{this.props.Plot}</li>
      <li>{this.props.Language}</li>
      <li>{this.props.Country}</li>
      <li>{this.props.Awards}</li>
      <li><img src= {this.props.Poster}/></li>
      <li>{this.props.Metascore}</li>
      <li>{this.props.imdbRating}</li>
      <li>{this.props.imdbVotes}</li>
      <li>{this.props.Type}</li>
      <li>{this.props.Response}</li>
      </div>
    );
  }
});

var ResultList = React.createClass({
  render :function () {

   console.log(this.props.searchResults);
    var resultItems = this.props.searchResults.map(function(result){
      return <ResultItems key={result.imdbID}  Title= {result.Title}
      Year= {result.Year} Rated= {result.Rated} Released= {result.Released} Runtime= {result.Runtime}
      Genre= {result.Genre} Director={result.Director} Writer= {result.Writer} Actors= {result.Actors}
      Plot= {result.Plot} Language= {result.Language} Country={result.Country} Awards= {result.Awards}
      Poster= {result.Poster} Metascore= {result.Metascore} imdbRating= {result.imdbRating}
      imdbVotes= {result.imdbVotes} Type= {result.Type} Response= {result.Response} />
    });
    return(
      <ul>{resultItems}</ul>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
  //console.log("fffffffffffffff");
  return {
    SearchResults : []
  };
},

showResults: function(response){
  this.setState({
    SearchResults: [response]
  })
  //console.log("ttttttttttttttt");
},

search: function (url) {
  //console.log("eeeeeeeeeeeeeeee");
  $.ajax({
    type : "GET",
    dataType : 'jsonp',
    url : url,
    success: function(response){
      //console.log(response);
      this.showResults(response);
    }.bind(this)
  });
},

render:function(){
return(  <div>
  <SearchBox search={this.search}/>
  <ResultList searchResults={this.state.SearchResults} />
  </div>
);
}

  /*componentDidMount(){
    console.log("qqqqqqq");
   this.search('https://itunes.apple.com/search?term=fun');
}*/

});

var SearchBox = React.createClass({
  createAjax:function(e){
   e.preventDefault();
   var query = ReactDOM.findDOMNode(this.refs.query).value;
   var year = ReactDOM.findDOMNode(this.refs.year).value;
   var category = ReactDOM.findDOMNode(this.refs.category).value;
   var url = 'http://www.omdbapi.com/?t='+query+'&y='+year+'&plot='+category+'&r=json';
   //var url = 'http://www.omdbapi.com/?t=harry&y=&plot=short&r=json';
   console.log(url);
   this.props.search(url)
  },

  render : function(){
    return(
    <div id="searchbox">
    <form className=""  onSubmit={this.createAjax}>
    <input type="text" ref="query" placeholder="Search Your movie"  />
    <input type="text" ref="year" placeholder="Year" />
    <select ref="category">
                  <option value="short">short</option>
                  <option value="full">full</option>
              </select>
      <input type="submit" value="submit" />
      </form>
    </div>
  );
  }
});

ReactDOM.render(<App />, document.getElementById('main-container'));
