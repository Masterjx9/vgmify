from flask import Flask, render_template, request, session, flash, redirect, url_for
import os
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_login import LoginManager, UserMixin, login_user
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.expression import func
import random
from webforms import LoginForm,  NamerForm #, PostForm, UserForm, PasswordForm
import requests
import json

# setting variables

login_manager = LoginManager()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mp3db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# login_manager.init_app(app)
app.config["SECRET_KEY"] = "my super secret key"
# app.secret_key = b'c8285d418e78c2b2bf9f77e6d277a5615c70d18a02c6ad7b8e8080bf7b511daf'

    
db = SQLAlchemy(app)
db.Model.metadata.reflect(db.engine)

class music(db.Model):
	__table__ = db.Model.metadata.tables['music']

class musicimages(db.Model):
	__table__ = db.Model.metadata.tables['images']

# class students(db.Model):
#    id = db.Column('student_id', db.Integer, primary_key = True)
#    name = db.Column(db.String(100))
#    city = db.Column(db.String(50))  
#    addr = db.Column(db.String(200))
#    pin = db.Column(db.String(10))

# def __init__(self, name, city, addr,pin):
#    self.name = name
#    self.city = city
#    self.addr = addr
#    self.pin = pin


# @login_manager.user_loader
# def load_user(user_id):
# 	return Users.query.get(int(user_id))

# @app.route('/login', methods=['GET', 'POST'])
# def login():
# 	form = LoginForm()
# 	if form.validate_on_submit():
# 		user = Users.query.filter_by(username=form.username.data).first()
# 		if user:
# 			# Check the hash
# 			if check_password_hash(user.password_hash, form.password.data):
# 				login_user(user)
# 				flash("Login Succesfull!!")
# 				return redirect(url_for('dashboard'))
# 			else:
# 				flash("Wrong Password - Try Again!")
# 		else:
# 			flash("That User Doesn't Exist! Try Again...")

# 	return render_template('login.html', form=form)



# Create Model
# class Users(db.Model, UserMixin):
# 	id = db.Column(db.Integer, primary_key=True)
# 	username = db.Column(db.String(20), nullable=False, unique=True)
# 	name = db.Column(db.String(200), nullable=False)
# 	email = db.Column(db.String(120), nullable=False, unique=True)
# 	favorite_color = db.Column(db.String(120))
# 	about_author = db.Column(db.Text(), nullable=True)
# 	date_added = db.Column(db.DateTime, default=datetime.utcnow)
# 	profile_pic = db.Column(db.String(), nullable=True)

# 	# Do some password stuff!
# 	password_hash = db.Column(db.String(128))
# 	# User Can Have Many Posts 
# 	posts = db.relationship('Posts', backref='poster')


# 	@property
# 	def password(self):
# 		raise AttributeError('password is not a readable attribute!')

# 	@password.setter
# 	def password(self, password):
# 		self.password_hash = generate_password_hash(password)

# 	def verify_password(self, password):
# 		return check_password_hash(self.password_hash, password)

# 	# Create A String
# 	def __repr__(self):
# 		return '<Name %r>' % self.name



@app.route('/')
def hello():
    return redirect("vgmplayer")

@app.route('/grvgm', methods=['GET'])
def grvgm():
	musicdata = music.query.order_by(func.random()).first()
	musicimgdata = musicimages.query.filter_by(gamealbum = musicdata.gamealbum).order_by(func.random()).first()
	if musicimgdata == None:
		musicimgdata = "https://media.idownloadblog.com/wp-content/uploads/2018/03/Apple-Music-icon-003.jpg"
	elif musicimgdata.gameart == None:
		musicimgdata = "https://media.idownloadblog.com/wp-content/uploads/2018/03/Apple-Music-icon-003.jpg"
	else:
		print(dir(musicimgdata))
		print(musicimgdata)
		print(musicimgdata.gameart)
		musicimgdata = musicimgdata.gameart

	musicobject = [{
	"name": musicdata.gametrackname,
     "path": musicdata.gamelink,
     "img": musicimgdata,
	 "album": musicdata.gamealbum,
	 "artists": musicdata.artists,
	 "platform": musicdata.platform,
	 "year": musicdata.year,
	 "genre": musicdata.genre
	}]
	print(musicobject)
	musicobject = json.dumps(musicobject)
	return musicobject

@app.route('/vgmplayer')
def vgmplayer():
	return render_template("musicplayer.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=os.environ["PORT"], threaded=True)
	# app.run()

