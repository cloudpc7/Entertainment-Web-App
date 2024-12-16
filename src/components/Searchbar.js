import { useState , useEffect, useRef } from 'react';
import { Form, Button, Image, Spinner, Container  } from 'react-bootstrap';
import searchBar from '../assets/icon-search.svg';
import '../styles/search/search.scss';


const Searchbar = ({movies, onSearch}) => {

    const [input, setInput] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const timeoutRef = useRef(null);

    const handleChange = (event) => {
        let value = event.target.value;
        const regExp = /^[a-zA-Z0-9\s]+$/;

        if(!regExp.test(value)) {
            setInput('');
            setErrMsg(`No results.`)
        } else {
            setInput(value);
        }
    };

    const clearInput = () => {
        setTimeout(() => {
            setInput('');
            setErrMsg('');
        }, 1000);
    }

    useEffect(() => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if(input.length > 0) {
            timeoutRef.current = setTimeout(() => {
                onSearch(input);
            }, 1000);
        } else {
        }

        if(errMsg) {
            clearInput();
        } else {
            onSearch(input);
        }

        return () => clearTimeout(timeoutRef.current);
        
    },[input,errMsg]);

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
                            onChange={handleChange}
                        />
                        {
                            errMsg && 
                                <span className="error-message">{errMsg}</span>
                        }
                    </Form.Group>
                </Form>
        </Container>
    )
}

export default Searchbar;