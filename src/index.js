import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Button extends React.Component {
  render() {
    return (
      <button className={this.props.class === "CE" ? 'square-limpa' : 'square'} onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Calc extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      v1: 0,
      v2: 0,
      op: "",
      telaText: "",
    }
  }

  renderButton(i) {
    if(i === 'CE'){
      return <Button value={i} class="CE" onClick={() => this.handleClick(i)}/>;
    }else{
      return <Button value={i} onClick={() => this.handleClick(i)}/>;
    }
  }
  handleClick(i){
    if(i === '-' || i === '+' || i === '*' || i === '/'){
      const text = parseFloat(this.state.telaText);
      this.setState({v1:text,op:i,telaText:""});
    }else if(i === '='){
      const text = parseFloat(this.state.telaText)
      this.setState({v2:text}, () =>{
        const total = eval(this.state.v1+this.state.op+this.state.v2);
        this.setState({telaText:total}); 
      });
    }else if(i === 'CE'){
      this.telaWrite("");
      console.log(this.state.telaText);

    }else if(i === 'C'){
      this.setState({v1:0,v2:0,op:"",telaText:""}, () => {
        console.log(this.state)
      });
    }else{
      this.telaWrite(i);
    }
  }

  telaWrite(i){
    let telaText;
    i === "" ? telaText = "" : telaText = this.state.telaText;

    this.setState({
      telaText: telaText+i,
    })
  }

  render() {

    return (
      <center>
      <div className="calc">
        <div className="board-row">
            <textarea type="text" name="tela" id="tela" maxLength="11" value={this.state.telaText} disabled></textarea>
        </div>
        {/* <div>
            <button className="square-tudo">C</button>
            <button className="square-limpa">CE</button>
        </div> */}
        <div className="board-row">
            {this.renderButton('C')}
            {this.renderButton('CE')}
        </div>
        <div className="board-row">
            {this.renderButton('7')}
            {this.renderButton('8')}
            {this.renderButton('9')}
            {this.renderButton('/')}
          </div>
          <div className="board-row">
            {this.renderButton('4')}
            {this.renderButton('5')}
            {this.renderButton('6')}
            {this.renderButton('*')}
          </div>
          <div className="board-row">
            {this.renderButton('1')}
            {this.renderButton('2')}
            {this.renderButton('3')}
            {this.renderButton('-')}
          </div>
          <div className="board-row">
            {this.renderButton('0')}
            {this.renderButton('.')}
            {this.renderButton('=')}
            {this.renderButton('+')}
          </div>
      </div>
      </center>
    );
  }
}
ReactDOM.render(
  <Calc />,
  document.getElementById('root')
);