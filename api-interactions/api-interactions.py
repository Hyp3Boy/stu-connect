from dataclasses import dataclass
from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from uuid import uuid4
import redis

app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:utec@44.220.10.5:8001/dev"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SESSION_TYPE"] = "redis"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_USER_SIGNER"] = True
app.config["SESSION_REDIS"] = redis.from_url("redis://localhost:6379")

app.secret_key = "my_secret_key"

cors = CORS(
    app,
    resources={r"/*": {"origins": "http://localhost:3000"}},
    supports_credentials=True,
)
bcrypt = Bcrypt(app)
server_session = Session(app)
db = SQLAlchemy(app)


def get_uuid():
    return uuid4().hex


@dataclass
class Student(db.Model):
    id: str
    email: str
    username: str
    password: str
    descripcion: str
    curso: str
    celular: str
    imagen: str

    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.Text, nullable=False)
    descripcion = db.Column(db.String(250), nullable=False)
    curso = db.Column(db.String(100), nullable=False)
    celular = db.Column(db.String(9), nullable=False)
    imagen = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f"<Username {self.username}>"

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)


@dataclass
class Interaction(db.Model):
    id: str
    student_id: str
    views: int
    likes: int

    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    student_id = db.Column(db.String(32), db.ForeignKey("student.id"), nullable=False)
    views = db.Column(db.Integer, default=0)
    likes = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f"<Interaction for Student {self.student_id}>"


with app.app_context():
    db.create_all()


@app.route("/interactions/<student_id>", methods=["GET", "POST"])
def interactions(student_id):
    if request.method == "GET":
        interaction = Interaction.query.filter_by(student_id=student_id).first()
        if not interaction:
            return jsonify({"error": "Interaction not found"}), 404
        return jsonify(interaction)
    elif request.method == "POST":
        data = request.get_json()
        interaction = Interaction.query.filter_by(student_id=student_id).first()
        if not interaction:
            interaction = Interaction(student_id=student_id)
            db.session.add(interaction)
        interaction.views = data["views"]
        interaction.likes = data["likes"]
        db.session.commit()
        return jsonify(interaction)


if __name__ == "__main__":
    app.run(debug=True, port=5003, host="0.0.0.0")
