// import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props){
  function anchorClick(e){
    e.preventDefault();
    props.onChangeMode();
  }
  return <header>
  <h1><a href="/" onClick={anchorClick}>{props.title}</a></h1>
</header>
}

function Nav(props){
  const lis = [];
  // props.topics
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={linkClick}>{t.title}</a>
    </li>);
  }

  function linkClick(e){
    e.preventDefault();
    props.onChangeMode(e.target.id);
  }
  return <nav>
  <ol>
    {lis}
  </ol>
</nav>
}

function Article(props){
  return <article>
    <h2>{props.title}</h2>
    <p>{props.body}</p>
  </article>
}

function App() {
  const [mode , setMode] = useState('WELCOME');
  const [id , setId] = useState(null);
  const topics = [
    {id:1, title: 'HTML', body:'Html is ....'},
    {id:2, title: 'CSS', body:'Css is ....'},
    {id:3, title: 'JavaScript', body:'JavaScript is ....'}
  ]
  let content = null
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, web"></Article>;
  } else if (mode === 'READ') {
    let title = 'Read';
    let body = 'Hello, Read';
    const aryIdx = topics.findIndex((item) => item.id === parseInt(id));
    if(aryIdx > -1) {
      title = topics[aryIdx].title;
      body = topics[aryIdx].body;
    }
    content = <Article title={title} body={body}></Article>;
  }

  function HeaderClick(){
    setMode('WELCOME');
  }
  function NavClick(id){
    setMode('READ');
    setId(id);
  }
  return (
    <div>
      <Header title="React" onChangeMode={HeaderClick} />
      <Nav topics={topics} onChangeMode={NavClick}></Nav>
      {content}
    </div>
  );
}

export default App;
