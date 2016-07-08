var Button = React.createClass({
render:function(){
  return (
    <div>
      <button>Submit</button>
    </div>
    );
  }
});

var SearchBox = React.createClass({
  render : function(){
    return(
      <div>
        <input type = "text" value="search box" />
        <Button />
      </div>
    );
  }
});

var ResultList = React.createClass({
  render :function () {
    return(
      <div>
      <li>list 1</li>
      <li>list 2</li>
      <li>list 3</li>
      <li>list 4</li>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
console.log("fffffffffffffff");
  return {
    SearchResults : []
  };
},

  render : function(){
    return (
      <div>
        <SearchBox />
        <ResultList />
      </div>
    );
  },

  showResults: function(response){
    this.setState({
      SearchResults: response.results
    })
    console.log("ttttttttttttttt");
    console.log(response);
  },

  search: function (url) {
    console.log("eeeeeeeeeeeeeeee");
    $.ajax({
      type : "GET",
      dataType : 'jsonp',
      url : url,
      success: function(response){
        this.showResults(response);
      }.bind(this)
    });
  },

  componentDidMount(){
    console.log("qqqqqqq");
   this.search('https://itunes.apple.com/search?term=fun');
}

});

ReactDOM.render(<App />, document.getElementById('main-container'));
console.log("oooooooooo");
