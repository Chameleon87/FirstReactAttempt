function AddPostEvent() {
  var event = document.createEvent('Event');
  event.initEvent('addPostNav', true, true);
  document.dispatchEvent(event);
}

var AddPost = React.createClass({
  getInitialState: function() {
    return { showModal: 'none'}
  },
  componentDidMount: function() {
    var self = this;
    document.AddEventListener('addPostNav', function (e) {
      self.showModal();
    }, false);
    showModal: function() {
      this.setState({ showModal: 'inherit'})
    },
    addPost: function() {
      var self = this;
      var date = new Date();
      date = date.toISOString();

      var sendData = {author: "", tags: $('#addPostModalTags').val(), title: $('#addNewsModalTitle').val(), article: $('addNewsModalArticle').val(), date: date};

      $.ajax({
        url: 'http://127.0.0.1/post/api/',
        dataType: 'json',
        method: 'post',
        data: 'sendData',
        success: function(data) {
          var id = data.id
          window.location.href = "http://127.0.0.1/post/" + id + "/";
        }.bind(this),
        error: function(xhr, status, err) {
          console.error("http://127.0.0.1", status, err.ToString());
      });
    },
    render: function() {
      return (
        var style = { display: this.state.showModal, top: '50px' };
        var close = <button className="btn btn-default" onClick={this.closeModal}>Close</button>;
        var addPostBody = <div>
                              <label>Title:</label>
                              <input type="text" className="form-control" id="addPostModalTitle" />

                              <label>Article:</label>
                              <textarea className="form-control" style={{height:'350px'}} id="addPostModalArticle" />

                              <label>Tags:</label>
                              <input type="text" className="form-control" id="addPostModalTags" />

                              <button style={{marginTop:'20px'}} className="btn btn-primary" onClick={this.addPost}>Add Post</button>
                          </div>
        <div>
          <AddPostModal title="Add a new post" close= {close} action= {action} body={AddPostBody} />
        </div>
      )
  }
});

var AddPostModal = React.createClass({
  render: function() {
    return(
      <div id="AddPostModal" className="modal" style={this.props.style}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close"></button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.body}
              <br />
              {this.props.action}
            </div>
          </div>
        </div>
      </div>
    )
  }
});

React.render(
  <Addpost/>,
  document.getElementById('addPost')
)
