import Card from './components/Card';

function App() {
    let tasks = [{
        id: 0,
        title: 'Learn React',
        isCompleted: false
    },{
        id: 1,
        title: 'Working Hard',
        isCompleted: true
    }];

    return (
        <div className='App'>
            <Card title='Card Title' id={1} tasks={tasks}/>
        </div>
    );
}

export default App;
