import { useState } from 'react';
import { useAppSelector } from '../state/hooks';
import { useActions } from '../hooks/useActions';

const RepositoriesList: React.FC = () => {
    const [term, setTerm] = useState('');
    const { searchRepositories } = useActions();
    const { data, error, loading } = useAppSelector((state) => state.repositories);
    console.log(data);
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // stop form refresh
        event.preventDefault(); 

        searchRepositories(term)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={term} onChange={e => setTerm(e.target.value)}/>
                <button>Search</button>
            </form>
            {error && <h3>{error}</h3>}
            {loading && <h3>Loading...</h3>}
            {data && 
                    <ul>
                        {data.map((name, index)=><li key={index}>{name}</li>)}
                    </ul>
            }
        </div>
    ) 
};

export default RepositoriesList;