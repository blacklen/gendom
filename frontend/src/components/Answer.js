import React, { Component } from 'react';
import axios from "../axios";
class Answer extends Component {
  state = {
    data: {},
    display: "none",
    displayTip : "none",
    displayAnswer: "block"
  }

  componentDidMount (){
    axios.get(`http://localhost:6969/api/questions`).then(data =>{
      this.setState({data : data.data});
    })
    .catch(err => console.log(err))
  }

  onClickYes = ()=>{
    axios.put(`http://localhost:6969/api/questions/vote`,{bool: "yes", id: this.state.data._id})
    .then(data =>{
      console.log(data)
    })
    .catch(err => console.log(err))
    let data = this.state.data;
    data.yes = data.yes + 1;
    this.setState({data , display : "block" , displayTip : "block", displayAnswer: "none"});
  }

  onClickNo = ()=>{
    axios.put(`http://localhost:6969/api/questions/vote`,{bool: "no", id: this.state.data._id})
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
           
           <header class="s-header">

              <div class="header-logo">
                      <img src="logo.png" alt="Homepage"/>
              </div>

           </header>


       
        <div id="home" class="s-home target-section" data-parallax="scroll" data-image-src="hero-bg.jpg" data-natural-width="3000" data-natural-height="2000" data-position-y="center">

            <div class="overlay"></div>

          <div class="home-content">

            <div className="row home-content__main">
                <div>
                  <h1>
                      {this.state.data.question}
                  </h1>
                </div>
            </div>
            
          </div>
          <div class="home-content__buttons" style = {{ position: "relative",marginTop: "74%",right: "90%", display: this.state.displayAnswer }}>
                <a onClick={this.onClickYes} href="#about" className="btn-icon-thumbs-up">
                <i class="fas fa-thumbs-up fa-7x"></i>
              </a>
              <a onClick = {this.onClickNo} href="#about" className="btn-icon-thumbs-down">
                <i class="fas fa-thumbs-down fa-7x"></i>
              </a>
              <a onClick={this.reload} className="smoothscroll btn btn--stroke btn-icon-another-question" style={{ marginRight: "230%"}}>
              Câu hỏi khác
            </a>
          </div>
           
        </div>

        <section id='about' class="s-about">
        
        <div class="row about-stats stats block-1-3 block-m-1-2 block-mob-full" data-aos="fade-up">
                
            <div class="col-block stats__col ">
                <div class="stats__count">{yes}%</div>
                <h5>Phần trăm đồng ý</h5>
            </div>
            <div class="col-block stats__col">
                <div class="stats__count">{no}%</div>
                <h5>Phần trăm không đồng ý</h5>
            </div>
            <div class="col-block stats__col">
                <div class="stats__count">{count}</div>
                <h5>Tổng số người bình chọn</h5>
            </div>

        </div>

        <div class="row section-header has-bottom-sep" data-aos="fade-up">
            <div class="col-full">
                <h1 class="display-1 display-1--light">Bạn có biết?</h1>
            </div>
        </div>

        <div class="row about-desc" data-aos="fade-up">
            <div class="col-full">
                <p dangerouslySetInnerHTML={{ __html: this.state.data.tip }}>
                </p>

                <a href="#home" onClick={this.reload} className=" smoothscroll btn" id="another-question" style={{background : "transparent", color: "white", borderColor: "white"}}>
                  Câu hỏi khác
                </a>
            </div>
        </div>


        <div class="about__line"></div>

        </section>

        <footer>
        <div className="row text-center">
            <div className="col-xs-6">
                <p>MỘT SẢN PHẨM CỦA <a href="#home"> MUỐI </a></p>
                <p style={{marginTop: "-8%", marginBottom: "0%"}}>© Copyright SheCodes Hackathon 2018</p> 
            </div>
        </div>
        </footer>

        <div aria-hidden="true" class="pswp" role="dialog" tabindex="-1">

        <div class="pswp__bg"></div>
        <div class="pswp__scroll-wrap">

            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>

            <div class="pswp__ui pswp__ui--hidden">
                <div class="pswp__top-bar">
                    <div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" title=
                    "Share"></button> <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title=
                    "Zoom in/out"></button>
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div>
                </div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button> <button class="pswp__button pswp__button--arrow--right" title=
                "Next (arrow right)"></button>
                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>
            </div>

        </div>

        </div> 

        <div id="preloader">
        <div id="loader">
            <div class="line-scale-pulse-out">
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