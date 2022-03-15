import Card from './components/Card';
import { importData, getTasksByCardID } from './helpers/toDoHelpers';

function App() {
    importData();

    let cards = window.data.cards;

    return (
        <div className='App'>
            {
                cards.map(card => {
                    let id = card.id;
                    return (
                        <Card title={card.title} id={id} tasks={getTasksByCardID(id)} key={id}/>
                    );
                })
            }
        </div>
    );
}

export default App;
