import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Card from "./Card";
import "./Card"


const Base_URL= 'https://deckofcardsapi.com/api/deck';


const Deck = () => {
    const [deck, setDeck] = useState(null);
    const[draw, setDraw] = useState([]);
    const[newCard, setNewCard] = useState(true);
    const timerId  = useRef(null);
    const [card, setCard] = useState(0);
    const [autoDraw, setAutoDraw] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const apiRes = await axios.get(`${Base_URL}/new/shuffle`)
            setDeck(apiRes.data)
        }
        fetchData();
    }, [setDeck]);

    useEffect(() => {
        async function drawCard() {
            let deck_id = deck;
            const drawRes = await axios.get(`${Base_URL}/${deck_id}/draw/`);
            if(drawRes.data.remaining === 0) {
                setNewCard(false);
                alert("Error: no cards remaining!");
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
    });
    useEffect(() => {
        console.log("DRAWING CARD...");
        timerId.current = setInterval(() => {
            setCard(c => c + 1);
        }, 1000);
        return function clearTimer() {
            console.log("Unmount deck", timerId.current);
            clearInterval(timerId.current);
        };
    }, [timerId, deck]);

    const toggle = (e) => {
        setAutoDraw(isAuto => !isAuto);
    };
    const cards = draw.map(c => (
        <Card key={c.id} name={c.name} image={c.image} />
    ))


    return (
        <div>
            <button onClick={toggle}>
                {autoDraw ? "Start Drawing" : "Stop Drawing"}
            </button>
        </div>
    )


}

export default Deck;