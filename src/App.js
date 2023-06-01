// import logo from './logo.svg';
import './App.scss';
import {useState} from 'react';

function Header(props){
  function anchorClick(e){
    e.preventDefault();
    props.onChangeMode();
  }
  return <header className="app-header">
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
  return <nav className="app-navi">
  <ol>
    {lis}
  </ol>
</nav>
}

function Article(props){
  return <article className="app-contents">
    <h2>{props.title}</h2>
    <p>{props.body}</p>
  </article>
}

function Create(props){
  return <article className="app-contents">
    <h2>Create</h2>
    <form className="app-form" onSubmit={ event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" className="input" name="title" placeholder="title" /></p>
      <p><textarea name="body" rows="3" className="textarea" placeholder="body"></textarea></p>
      <p><input className="btn" type="submit" value="Create" /></p>
    </form>
  </article>
}

function Update(props){
  const [title, setTitle]= useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article className="app-contents">
    <h2>Update</h2>
    <form className="app-form" onSubmit={ event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type="text" className="input" name="title" placeholder="title" value={title} onChange={ event => {
        setTitle(event.target.value);
      }} /></p>
      <p><textarea name="body" rows="3" className="textarea" placeholder="body" value={body} onChange={ event => {
        setBody(event.target.value);
      }} ></textarea></p>
      <p><input type="submit" className="btn" value="Update" /></p>
    </form>
  </article>
}


function App() {
  const [mode , setMode] = useState('WELCOME');
  const [id , setId] = useState(null);
  const [topics, setTopics] = useState([
    {id:1, title: 'HTML', body:'Html is ....'},
    {id:2, title: 'CSS', body:'Css is ....'},
    {id:3, title: 'JavaScript', body:'JavaScript is ....'}
  ]);

  let content = null
  let contextControl = null;
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
    contextControl = <>
      <li>
        <a href={'/update' + id} className="btn" onClick={event => {
          event.preventDefault();
          setMode('UPDATE')
        }}>update</a>
      </li>
      <li>
        <input type="button" className="btn" value="Delete" onClick={event => {
          event.preventDefault();
          const newTopics = topics.filter((item) => item.id !== parseInt(id));
          setTopics(newTopics);
          setMode('WELCOME');
        }} />
      </li>
    </>
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      const newTopics = [...topics];
      const newId = topics.length + 1;
      newTopics.push({id: newId, title: _title, body: _body})
      setTopics(newTopics);
      setMode('READ');
      setId(newId);
    }} />;
  } else if (mode === 'UPDATE') {
    let title = 'Read';
    let body = 'Hello, Read';
    const aryIdx = topics.findIndex((item) => item.id === parseInt(id));
    if(aryIdx > -1) {
      title = topics[aryIdx].title;
      body = topics[aryIdx].body;
    }
    content = <Update title={title} body={body} onUpdate={(_title, _body) => {
      const newTopics = [...topics];
      newTopics[aryIdx].title = _title;
      newTopics[aryIdx].body = _body;
      setTopics(newTopics);
      setMode('READ');
    }} />;
  }

  function HeaderClick(){
    setMode('WELCOME');
  }
  function NavClick(id){
    setMode('READ');
    setId(id);
  }
  return (
    <section className="app">
      <Header title="React" onChangeMode={HeaderClick} />
      <Nav topics={topics} onChangeMode={NavClick}></Nav>
      <main className="app-body">
        {content}
        
      </main>
      <ul className="app-btn">
        <li>
          <a href="/create" className="btn" onClick={event => {
            event.preventDefault();
            setMode('CREATE')
          }}>create</a>
        </li>
        {contextControl}
      </ul>
    </section>
  );
}

export default App;
