import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Card from "./Card";


const Base_URL= 'https://deckofcardsapi.com/api/deck';

const Deck = () => {
    const [deck, setDeck] = useState(null);
    const[draw, setDraw] = useState([]);
    const[newCard, setNewCard] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const apiRes = await axios.get(`${Base_URL}/new/shuffle`)
            setDeck(apiRes.data)
        }
        fetchData();
    }, [setDeck]);
 


}

export default Deck;