import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Card from "./Card";
import "./Card.css"


const Base_URL= 'https://deckofcardsapi.com/api/deck/';


const Deck = () => {
    const [deck, setDeck] = useState(null);
    const[draw, setDraw] = useState([]);
    // const[newCard, setNewCard] = useState(0);
    const timerId  = useRef(null);
    const [card, setCard] = useState();
    const [autoDraw, setAutoDraw] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const apiRes = await axios.get(`${Base_URL}/new/shuffle`)
            setDeck(apiRes.data)
        }
        fetchData();
    }, [setDeck]);

    useEffect(function renderDrawnCard() {
        async function drawCard() {
            let deck_id = deck;
            const drawRes = await axios.get(`${Base_URL}/${deck_id}/draw/`);
            if(drawRes.data.remaining === 0) {
                setAutoDraw(false);
                alert("Error: no cards remaining!");
                console.log(drawRes.data.remaining);
            }
            const card = drawRes.data.cards[0];
            setDraw(apiRes => [...apiRes,
                {
                    id:card.code,
                    name: card.suit + " " + card.value,
                    image: card.image
                }
            ]);
        }
        // drawCard();
    });
    useEffect(() => {
        if (autoDraw && !timerId.current) {
            console.log("DRAWING CARD...");
        timerId.current = setInterval(() => {
            setCard(c => c + 1);
            // await drawCard();
        }, 1000);
    }
        return function clearTimer() {
            console.log("Unmount deck", timerId.current);
            clearInterval(timerId.current);
        };
 
    }, [deck,  setAutoDraw, autoDraw]);

    const toggle = () => {
        setAutoDraw(isAuto => !isAuto);
    };
    const cards = draw.map(c => (
        <Card key={c.id} name={c.name} image={c.image} />
    ))


    return (
        <div className="Deck">
        <h1 className="section-header">Deck of Cards</h1>
            <button className="draw-card" onClick={toggle}>
                {autoDraw ? "Stop drawing" : "Start drawing"} 
            </button>
          {/* {deck ? autoDraw : null} */}
          <div className="Deck-cardarea">{cards}</div>
        </div>
    );
}

export default Deck;