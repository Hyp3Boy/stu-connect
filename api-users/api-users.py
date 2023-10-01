from dataclasses import dataclass
from flask import Flask, jsonify, request, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from uuid import uuid4
import base64
import redis

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SESSION_TYPE"] = "redis"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_USER_SIGNER"] = True
app.config["SESSION_REDIS"] = redis.from_url("redis://127.0.0.1:6379")

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

    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
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


with app.app_context():
    db.create_all()


@app.route("/@me")
def get_current_student():
    student_id = session.get("student_id")

    if not student_id:
        return jsonify({"error": "Unauthorize"}), 401

    student = Student.query.filter_by(id=student_id).first()
    return jsonify({"id": student_id, "email": student.email})


@app.route("/student", methods=["GET"])
def route_student():
    return get_students()


@app.route("/register", methods=["POST"])
def register_student():
    student = request.get_json()
    return post_student(student)


@app.route("/login", methods=["POST"])
def login_student():
    email = request.json["email"]
    password = request.json["password"]

    student = Student.query.filter_by(email=email).first()

    if student is None or not bcrypt.check_password_hash(
        base64.b64decode(student.password), password
    ):
        return jsonify({"error": "Email or password is incorrect"}), 401

    session["student_id"] = student.id

    return jsonify(student)


@app.route("/student/<id>", methods=["GET", "PUT", "DELETE"])
def route_students_id(id):
    if request.method == "GET":
        return get_student_by_id(id)
    elif request.method == "PUT":
        student = request.get_json()
        return update_student(id, student)
    elif request.method == "DELETE":
        return delete_student(id)


@app.route("/logout", methods=["POST"])
def logout_student():
    session.pop("student_id")
    return "200"


def get_students():
    students = Student.query.all()
    return jsonify(students)


def get_student_by_id(id):
    student = Student.query.get_or_404(id)
    return jsonify(student)


def post_student(student):
    email = student["email"]
    student_exists = Student.query.filter_by(email=email).first() is not None

    if student_exists:
        return jsonify({"error": "Student already exists"}), 409

    student_password = bcrypt.generate_password_hash(student["password"])
    student_password = base64.b64encode(student_password).decode("utf-8")

    new_student = Student(
        email=student["email"],
        username=student["username"],
        password=student_password,
        descripcion=student["descripcion"],
        curso=student["curso"],
        celular=student["celular"],
        imagen=student["imagen"],
    )

    db.session.add(new_student)
    db.session.commit()
    return jsonify(new_student)


def update_student(id, new_student):
    student = Student.query.get_or_404(id)
    student.email = new_student["email"]
    student.username = new_student["username"]
    student.password = base64.b64encode(
        bcrypt.generate_password_hash(new_student["password"])
    ).decode("utf-8")
    student.descripcion = new_student["descripcion"]
    student.curso = new_student["curso"]
    student.celular = new_student["celular"]
    student.imagen = new_student["imagen"]
    db.session.commit()
    return jsonify(student)


def delete_student(id):
    student = Student.query.get(id)
    db.session.delete(student)
    db.session.commit()
    return "SUCCESS"


if __name__ == "__main__":
    app.run(debug=True, port=5001)
