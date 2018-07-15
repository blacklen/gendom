import React, { Component } from 'react';
import axios from "../axios";
class Answer extends Component {
  state = {
    data: {},
    display: "none",
    displayTip : "none",
    displayAnswer: "block",
    question: "",
    tip:""
  }

  onChangeQuestion =(e)=>{
      this.setState({question: e.target.value})
  }

  onChangeTip =(e)=>{
    this.setState({tip: e.target.value})
    }

    onSend = ()=>{
        axios.post(`/api/questions/`,{question: this.state.question, tip: this.state.tip})
        .then(data =>{
            this.setState({
                data: data.data,
                question: "",
                tip: ""
            })
        })
        .catch(err => console.log(err))
    }
  componentDidMount (){
    axios.get(`/api/questions`).then(data =>{
      this.setState({data : data.data});
    })
    .catch(err => console.log(err))
  }

  onClickYes = ()=>{
    axios.put(`/api/questions/vote`,{bool: "yes", id: this.state.data._id})
    .then(data =>{
      console.log(data)
    })
    .catch(err => console.log(err))
    let data = this.state.data;
    data.yes = data.yes + 1;
    this.setState({data , display : "block" , displayTip : "block", displayAnswer: "none"});
  }

  onClickNo = ()=>{
    axios.put(`api/questions/vote`,{bool: "no", id: this.state.data._id})
    .then(data =>{
      console.log(data)
    })
    .catch(err => console.log(err))
    let data = this.state.data;
    data.no = data.no + 1;
    this.setState({data, display : "block" , displayAnswer: "none"});
  }

  reload = ()=>{
    window.location.reload();
  }
  render() {
    let data = this.state.data
    let yes, no;
    let count = data.yes + data.no
    if(data.yes == data.no){
      yes = 50;
      no = 50;
    }
    else{
      yes = ((data.yes*100)/(data.yes + data.no)).toFixed(0)
      no = 100 - yes;
    }
      return (
        <div>
           
           <header className="s-header">

              <div className="header-logo">
                      <img src="logo.png" style = {{width: "24%"}} alt="Homepage"/>
              </div>

           </header>


       
        <div id="home" className="s-home target-section" data-parallax="scroll" data-image-src="hero-bg.jpg" data-natural-width="3000" data-natural-height="2000" data-position-y="center">

            <div class="overlay"></div>

          <div class="home-content">

            <div className="row home-content__main">
                <div style={{marginTop: "-15%"}}>
                    <p style = {{fontFamily: "Baloo Chettan", fontSize: "20px" }}>
                      BẠN NGHĨ SAO :
                    </p>
                  <h1 style = {{fontFamily: "EB Garamond"}}>
                      {this.state.data.question}
                  </h1>
                </div>
            </div>
            
          </div>
          <div className="home-content__buttons" style = {{ position: "relative",marginTop: "74%",right: "90%", display: this.state.displayAnswer }}>
                <a onClick={this.onClickYes} href="#about" className="btn-icon-thumbs-up">
                <i className="fas fa-thumbs-up fa-7x"></i>
              </a>
              <a onClick = {this.onClickNo} href="#about" className="btn-icon-thumbs-down">
                <i className="fas fa-thumbs-down fa-7x"></i>
              </a>
              <a onClick={this.reload} className="smoothscroll btn btn--stroke btn-icon-another-question" style={{ marginRight: "230%"}}>
              Câu hỏi khác
            </a>
          </div>
           
        </div>

        <section id='about' className="s-about">
        
        <div className="row about-stats stats block-1-3 block-m-1-2 block-mob-full" data-aos="fade-up">
                
            <div className="col-block stats__col " style = {{fontFamily: "Baloo Chettan", color: "#044a13"}}>
                <div className="stats__count">{yes}%</div>
                <h5>Phần trăm đồng ý</h5>
            </div>
            <div className="col-block stats__col" style = {{fontFamily: "Baloo Chettan", color: "#044a13"}}>
                <div className="stats__count">{no}%</div>
                <h5>Phần trăm không đồng ý</h5>
            </div>
            <div className="col-block stats__col" style = {{fontFamily: "Baloo Chettan", color: "#044a13"}}>
                <div className="stats__count">{count}</div>
                <h5>Tổng số người bình chọn</h5>
            </div>

        </div>

        <div className="row section-header has-bottom-sep" data-aos="fade-up">
            <div className="col-full">
                <h1 className="display-1 display-1--light" style ={{fontFamily : "Taviraj"}}>Bạn có biết?</h1>
            </div>
        </div>

        <div className="row about-desc" data-aos="fade-up">
            <div className="col-full">
                <p style ={{fontFamily: "EB Garamond"}} dangerouslySetInnerHTML={{ __html: this.state.data.tip }}>
                </p>

                <a href="#home" onClick={this.reload} className=" smoothscroll btn" id="another-question" style={{background : "transparent", color: "white", borderColor: "white"}}>
                  Câu hỏi khác
                </a>
            </div>
        </div>


        <div className="about__line"></div>

        </section>
        <section id='send' className="s-about" style={{background: "white"}}>
            
            <div className="container ">
                <p style = {{fontFamily: "Baloo Chettan", fontSize: "20px" }}>
                    BẠN MUỐN MỌI NGƯỜI CÙNG THẢO LUẬN VỀ :
                </p>
                <div className="row">
                    <div className="col-xs-12">
                        <h2> Câu hỏi </h2>
                        <input value={this.state.question} onChange= {this.onChangeQuestion} className="form-control"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <h2> Tip </h2>
                        <textarea value = {this.state.tip} onChange= {this.onChangeTip} className="form-control" rows="3"> </textarea>
                    </div>
                </div>
                <a className="btn smoothscroll" href="#home"  onClick = {this.onSend} style ={{ marginLeft: "87%",fontFamily: "serif",fontWeight: "bold", background : "transparent", color: "black", borderColor: "black"}}>GỬI </a>
                    <div className="about__line" style = {{background: "#39b54a"}}></div>
            </div>
        </section>

        <footer>
        <div className="row text-center">
            <div className="col-xs-6" style = {{fontFamily: "EB Garamond"}}>
                <p>MỘT SẢN PHẨM CỦA <a href="#home"> MUỐI </a></p>
                <p style={{marginTop: "-8%", marginBottom: "0%"}}>© Copyright SheCodes Hackathon 2018</p> 
            </div>
        </div>
        </footer>

        <div aria-hidden="true" class="pswp" role="dialog" tabindex="-1">

        <div className="pswp__bg"></div>
        <div className="pswp__scroll-wrap">

            <div className="pswp__container">
                <div className="pswp__item"></div>
                <div className="pswp__item"></div>
                <div className="pswp__item"></div>
            </div>

            <div className="pswp__ui pswp__ui--hidden">
                <div className="pswp__top-bar">
                    <div className="pswp__counter"></div><button className="pswp__button pswp__button--close" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" title=
                    "Share"></button> <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title=
                    "Zoom in/out"></button>
                    <div className="pswp__preloader">
                        <div className="pswp__preloader__icn">
                            <div className="pswp__preloader__cut">
                                <div className="pswp__preloader__donut"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div className="pswp__share-tooltip"></div>
                </div><button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button> <button class="pswp__button pswp__button--arrow--right" title=
                "Next (arrow right)"></button>
                <div className="pswp__caption">
                    <div className="pswp__caption__center"></div>
                </div>
            </div>

        </div>

        </div> 

        <div id="preloader">
        <div id="loader">
            <div className="line-scale-pulse-out">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        </div>
        </div>
    );
  }
}

export default Answer;