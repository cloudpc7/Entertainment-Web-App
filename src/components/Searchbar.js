import { useContext } from 'react';
import  MovieContext  from '../MovieContext';
import { Form, Image, Container  } from 'react-bootstrap';
import searchBar from '../assets/icon-search.svg';
import '../styles/search/search.scss';

const Searchbar = () => {
    const {input, searchMsg, handleSearchInput } = useContext(MovieContext);
   
    return (
        <Container className="search-container">
            <div className="search-btn" type="submit" >
                <Image className="search-img" src={searchBar} alt="magnifying glass" />
            </div>
                <Form className="search-form">
                    <Form.Group>
                        <Form.Control 
                            type="search"
                            placeholder="Search for movies or TV series"
                            className="search-bar border-0"
                            arai-label="Search"
                            value={input}
                            onChange={handleSearchInput}
                        />
                        {
                            searchMsg && 
                                <span className="error-message">{searchMsg}</span>
                        }
                    </Form.Group>
                </Form>
        </Container>
    )
}

export default Searchbar;