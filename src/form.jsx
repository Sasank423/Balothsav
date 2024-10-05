import React, {useState} from "react";
//import qr1 from "./props/qrcode_with_text.png";

export default function Form () {

    const events = [
        "చిత్ర లేఖనం",
        "వక్తృత్వం",
        "తెలుగు పద్యం",
        "సంస్కృత శ్లోకం",
        "శాస్త్రీయ సంగీతం",
        "శాస్త్రీయ నృత్యం (కూచిపూడి/భరతనాట్యం) (సోలో/గ్రూప్)",
        "తెలుగులోనే మాట్లాడుదాం",
        "వేషధారణ (సాంప్రదాయ/విచిత్ర)",
        "రచన (కవిత, కథ, లేఖ)",
        "అభినయం (ఏకపాత్రాభినయం/మూకాభినయం)",
        "జనరల్ క్విజ్",
        "విశ్లేషణ (కథావిశ్లేషణ, లఘుచిత్ర విశ్లేషణ)",
        "మట్టితో బొమ్మలు చేద్దాం",
        "నాటికలు",
        "Spell bee",
        "వాద్య సంగీతం (రాగ, తాళ ప్రధానం)",
        "జానపద నృత్యం (సోలో/గ్రూప్)",
        "కథ చెబుతా, వింటారా?",
        "లలిత/జానపద గీతాలు",
        "శాస్త్ర సాంకేతిక అంశం (ప్రయోగశాల, ప్రదర్శనశాల)"
    ]

    const cats = ['Sub Junior','Junior','Senior']
    
    const [name,setName] = useState('');
    const [_class,setClass] = useState();
    const [school, setSchool] = useState('');
    const [place, setPlace] = useState('');

    const [event, setEvent] = useState('');
    const [cat, setCat] = useState('');

    const [qr, setQr] = useState(null);
    const [shift, setShift] = useState(false); //chage to flase

    function changeEvent(e) {
        setEvent(e.target.value);
    }

    function changeCat(c) {
            setCat(c);
    }

    const  handleSubmit = async (e) => {
        e.preventDefault();
        if(cat === '' || event === ''){
            alert('Please select a category/event');
        }
        else {
            try{
                const res = await fetch('http://127.0.0.1:5000/submit',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name,'class':_class,school,place,event,'cat': cats[cat]})
                })

                if(!res.ok){
                    throw new Error('Network Error')
                }

                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                setQr(url);
                setShift(true);
            } catch(err) {
                console.error(err)
            }
        }
    }

    if(shift){
        return (
            <div className="form">
                <div className="info">
                    <label className="tp">Hey {name}!!! Here is Your Unique QR code</label>
                    <img src={qr} alt="QR Code" className="qrcode"/>
                    <label className="bp">Welcome to VVIT Balotsav 2K24</label>
                </div>
            </div>)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <label className="lbl">Name of the Participant :</label>
                    <input className="ip" value={name} onChange={(e) => setName(e.target.value)} type="text"  placeholder="Enter Your Name" required />
                    <label className="lbl">Class :</label>
                    <input className="ip" type="number" value={_class} onChange={(e) => setClass(e.target.value)} placeholder="Enter Your Class" required />
                    <label className="lbl">Name of the School :</label>
                    <input className="ip" type="text" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="Enter the Name of Your School" required />
                    <label className="lbl">Name of the Place :</label>
                    <input className="ip" type="text" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Enter Your Place" required />

                    <label className="lbl">Events :</label>
                    <select className="event" value={event} onChange={changeEvent} required >
                        <option value='' disabled>Select the event you are participating </option>
                        {events.map((v,i) => (<option key={i} value={i}>{v}</option>))}
                    </select>

                    <label className="lbl">Category : </label>
                    <div className="buttons">
                        <input type="radio" checked={cat === 0} onChange={() => changeCat(0)}/>
                        <label>Sub Junior</label>

                        <input type="radio" checked={cat === 1} onChange={() => changeCat(1)}/>
                        <label>Junior</label>

                        <input type="radio" checked={cat === 2} onChange={() => changeCat(2)}/>
                        <label>Senior</label>
                    </div>
                    <button type="submit">Register</button>
                </div>
                
            </form>
            
        </>
    );
}