import { useEffect, useState } from 'react';
import './SingleCard.css';

const SingleCard = () => {

    const cardImages = [
        { "src": "/img/helmet-1.png" ,"matched" : false},
        { "src": "/img/potion-1.png","matched" : false },
        { "src": "/img/ring-1.png" ,"matched" : false},
        { "src": "/img/scroll-1.png" ,"matched" : false},
        { "src": "/img/shield-1.png" ,"matched" : false},
        { "src": "/img/sword-1.png" ,"matched" : false},
      ];
    
      const [cards,setCards] = useState([])
      const [turns,setTurns] = useState(0);
      const [choiceOne,setChoiceOne] = useState(0);
      const [choiceTwo,setChoiceTwo] = useState(0);
    
    
    
      // New Game Object
    
      const shuffleCards  = () => {
    
        const shuffledCards  = [ ...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card)=>({ ...card, id : Math.random()}));
    
        setCards(shuffledCards);
        setTurns(0);
    
      };
    

    const handleChoice = (card) => {

        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

    };

    const setMatched = (prevCards) => {

        return prevCards.map(card => {
            return card.src === choiceOne.src? {...card, "matched" : true } : card;
        });
        

    };
    useEffect(()=>{
        
        if (choiceOne && choiceTwo) {

            if(choiceOne.src === choiceTwo.src){

                setCards( setMatched(cards) );
                resetTurns();

            }
            else{
                resetTurns();
            }
        }


    },[choiceOne,choiceTwo]);

    console.log(cards);

    const handleClick = (card) => {

        handleChoice(card);

    };
    const resetTurns = () => {

        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prev => prev + 1);

    };

    return ( 

        <div className="App">
        <h1> Memory Game </h1>
        {<div className="card-grid">
  
        {cards.map((card) => {
  
          return (

            <div className="card" key={card.id}>

                <div className = {
                    (card === choiceOne || card.matched)  ? "flipped" : ""
                }>

                    <img src={card.src} className="front" alt="card front" />
                    
                    <img src="/img/cover.png" onClick={()=>{
                        handleClick(card);
                    }} className="back" alt="card back" />
                
                </div>
            </div>

          )
        })}
      </div>}   
      <button onClick={shuffleCards}>Start A New Game</button>
      <p>Number of Turns is : {turns}</p>
      </div>
     );
}
 
export default SingleCard;