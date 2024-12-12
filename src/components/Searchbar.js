import { useState , useEffect } from 'react';
import { Form, Button, Image  } from 'react-bootstrap';
import searchBar from '../assets/icon-search.svg';
import '../styles/search/search.scss';
const Searchbar = (props) => {

    const [search, setSearch ] = useState(props);

    const handleChange = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <Button className="search-btn" type="submit" >
                <Image className="search-img" src={searchBar} alt="magnifying glass" />
            </Button>
                <Form className="search-container">
                    <Form.Group>
                        <Form.Control 
                            type="search"
                            placeholder="Search for movies or TV series"
                            className="search-bar"
                            arai-label="Search"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
        </>
    )
}

export default Searchbar;