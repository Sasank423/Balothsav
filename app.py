from flask import Flask, request, send_file
from flask_cors import CORS

import pandas as pd
import qrcode

from io import BytesIO

from gglsheet import Google_Sheets 

events = [
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

gs = Google_Sheets()
gs.get_sheet()

def qr_code(data):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill='black', back_color='white')

    img_io = BytesIO()
    img.save(img_io, 'PNG')
    img_io.seek(0)

    return img_io

app = Flask(__name__)
CORS(app)


@app.route('/submit',methods=['POST'])
def add():
    data = request.json
    l = list(data.values())
    l[-2] = events[int(l[-2])]
    l.insert(0, len(gs.df) + 1)
    gs.write(l)
    d = f'Id : {l[0]}\nName : {l[1]}\nClass : {l[2]}\nSchool : {l[3]}\nEvent : {l[4]}\nCategory : {l[5]}'
    
    qr = qr_code(d)
    return send_file(qr, mimetype='image/png')



if __name__ == '__main__':
    app.run(debug=True)