import React from "react";
import "./App.css";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

export default class CommentComponent extends React.Component{
    constructor(){
        super()
        this.state={
            value1:"",
            value2:"",
            show:0,
            commentusrers:0,
            commentsdetails:[]            
        }
        this.handleChange2=this.handleChange2.bind(this)
        this.addComment=this.addComment.bind(this)
    }

    handleChange2(e){ 
        this.setState({value2:e.target.value})
    }

addComment(){
    if((this.state.value2!="")){
  this.setState({show:1})
  this.setState({commentusrers:(1+this.state.commentusrers)})
  this.state.commentsdetails.push(this.state.value2);
    }
}

    render(){
        return(
        <div className="comment-div">
                       <div className="comment-input-div">Comments ({this.state.commentusrers})
                <textarea id="comment-input" type="text" placeholder="Enter Your Comment Here ...." value={this.state.value2} onChange={this.handleChange2}></textarea>
            </div>
            <span id="comment-button-span">
                <button className="comment-buttons" onClick={this.addComment}>Comment</button>
                {(this.state.show==0)?null:<CommentComponent2  details={this.state.commentsdetails}/>}

            </span>
        </div>)
    }
}


class CommentComponent2 extends React.Component{
    

    constructor(props){
       // alert("im called")
        super(props)
        this.state={
user:"",
comment:""
        }
    }

    render(){
        return<>{<p id="comments-section">{this.props.details.map((item,i)=><><p id="comment-detail">
        <i className="fa fa-user" aria-hidden="true"></i>&emsp;
        {this.props.details[i]}</p></>)}</p>}</>
        
    }
}
export {CommentComponent2}