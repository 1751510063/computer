class Display extends React.Component {
    render() {
        let {sum} = this.props;
        return (
            <div className="display">
                {sum}
            </div>
        )
    }
}

class Keyword extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false,
        }
    }
    render() {
        let {keys,add} = this.props;
        let lis =  keys.map(v => {
            v.active = false;
            return <li key={v.id}>
                <div className='btn'  onClick={() => add(v)}>{v.num}</div>
            </li>
        })
        return (
            <div className="keyword">
                <ul>{lis}</ul>
            </div>
        )
    }

}

class Computer extends React.Component {
    constructor() {
        super();
        this.state = {
            add: this.add.bind(this),
            words: '',
            sum: '0'
        }
    }
    add(n) {
        if (n.type == 'number') {
            this.setState({
                sum:this.state.words + n.num,
                words: this.state.words + n.num
            })
        } else if(n.type == 'fun'){
            this.setState({
                sum:this.state.sum + n.num,
                words: this.state.sum + n.num
            })
        }else if (n.type == 'eval') {
            var reg=/^[+-]?\d+(\.?\d{0,2})([%+*/-]?\d+(\.?\d{0,2}))+$/;
            let r=null;
            if(reg.test(this.state.words)){
                r = eval(this.state.words);
            }else {
                alert('请输入正确的格式');
                return;
            }
            this.setState({
                words: '',
                sum: r
            });
        } else if (n.type == 'delete') {
            this.setState({
                sum: this.state.words.slice(0, -1),
                words: this.state.words.slice(0, -1)
            })
        } else if (n.type == 'clear') {
            this.setState({
                words: '',
                sum:'0'
            })
        }
    }

    render() {
        let key = [
            {id: 18, num: 'C', type: 'clear'},
            {id: 17, num: '←', type: 'delete'},
            {id: 20, num: '%', type: 'fun'},
            {id: 4, num: '+', type: 'fun'},
            {id: 1, num: 1, type: 'number'},
            {id: 2, num: 2, type: 'number'},
            {id: 3, num: 3, type: 'number'},
            {id: 8, num: '-', type: 'fun'},
            {id: 5, num: 4, type: 'number'},
            {id: 6, num: 5, type: 'number'},
            {id: 7, num: 6, type: 'number'},
            {id: 12, num: '*', type: 'fun'},
            {id: 9, num: 7, type: 'number'},
            {id: 10, num: 8, type: 'number'},
            {id: 11, num: 9, type: 'number'},
            {id: 14, num: '/', type: 'fun'},
            {id: 29, num: '00', type: 'number'},
            {id: 15, num: '.', type: 'fun'},
            {id: 13, num: 0, type: 'number'},
            {id: 16, num: '=', type: 'eval'},

        ];
        let {sum} = this.state;
        return (
            <div className="computer">
                <Display sum={sum}/>
                <Keyword keys={key} add={this.state.add}/>
            </div>
        )
    }
}

ReactDOM.render(<Computer/>, document.getElementById('app'))