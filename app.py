from flask import Flask, render_template, request, session
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
import requests

# setting variables

login_manager = LoginManager()
app = Flask(__name__)
app.config ['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.sqlite3'
login_manager.init_app(app)
app.secret_key = b'c8285d418e78c2b2bf9f77e6d277a5615c70d18a02c6ad7b8e8080bf7b511daf'

db = SQLAlchemy(app)
class students(db.Model):
   id = db.Column('student_id', db.Integer, primary_key = True)
   name = db.Column(db.String(100))
   city = db.Column(db.String(50))  
   addr = db.Column(db.String(200))
   pin = db.Column(db.String(10))

def __init__(self, name, city, addr,pin):
   self.name = name
   self.city = city
   self.addr = addr
   self.pin = pin

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/welcome')
def welcome():
    bitcoindata = requests.get("https://api.coindesk.com/v1/bpi/currentprice.json").json()
    return render_template("index.html",bitcoindata=bitcoindata)

@app.route('/iplookup', methods=['POST'])
def iplookup():
    if request.method == 'POST':
        request_json = request.json
        iplocadata = requests.get("https://freegeoip.app/json/"+str(request_json["ipaddress"])+"?apikey=cf036630-351d-11ec-bd19-7d45ee7e599d").json()
        googlemaplink = "https://maps.google.com/maps?q=loc:"+str(iplocadata["latitude"])+"+"+str(iplocadata["longitude"])+"&t=&z=8&ie=UTF8&iwloc=&output=embed"
        print(googlemaplink)
        iplookupregion = {
            "mapinfo":googlemaplink
        }
        return iplookupregion

if __name__ == "__main__":
    app.run()

