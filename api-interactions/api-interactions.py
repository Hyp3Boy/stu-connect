from dataclasses import dataclass
from flask import Flask, jsonify, request, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
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


db = SQLAlchemy(app)


def get_uuid():
    return uuid4().hex


@dataclass
class Course(db.Model):
    id: str
    name: str
    description: str
    instructor: str

    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    name = db.Column(db.String(345), unique=True)
    description = db.Column(db.String(250), nullable=False)
    instructor = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<Course Name {self.name}>"

    


with app.app_context():
    db.create_all()



@app.route("/course", methods=["GET"])
def route_course():
    return get_courses()


@app.route("/register", methods=["POST"])
def register_course():
    course = request.get_json()
    return post_course(course)





@app.route("/course/<id>", methods=["GET", "PUT", "DELETE"])
def route_courses_id(id):
    if request.method == "GET":
        return get_course_by_id(id)
    elif request.method == "PUT":
        course = request.get_json()
        return update_course(id, course)
    elif request.method == "DELETE":
        return delete_course(id)


@app.route("/logout", methods=["POST"])
def logout_course():
    session.pop("course_id")
    return "200"


def get_courses():
    courses = Course.query.all()
    return jsonify(courses)


def get_course_by_id(id):
    course = Course.query.get_or_404(id)
    return jsonify(course)


def post_course(course):
    email = course["email"]
    course_exists = Course.query.filter_by(email=email).first() is not None

    if course_exists:
        return jsonify({"error": "Course already exists"}), 409

    course_password = generate_password_hash(course["password"])
    course_password = base64.b64encode(course_password).decode("utf-8")

    new_course = Course(
        name=course["name"],
        description=course["description"],
        instructor=course["instructor"],
    )

    db.session.add(new_course)
    db.session.commit()
    return jsonify(new_course)


def update_course(id, new_course):
    course = Course.query.get_or_404(id)
    course.email = new_course["email"]
    course.username = new_course["username"]
    course.password = base64.b64encode(
        generate_password_hash(new_course["password"])
    ).decode("utf-8")
    course.descripcion = new_course["descripcion"]
    course.curso = new_course["curso"]
    course.celular = new_course["celular"]
    course.imagen = new_course["imagen"]
    db.session.commit()
    return jsonify(course)


def delete_course(id):
    course = Course.query.get(id)
    db.session.delete(course)
    db.session.commit()
    return "SUCCESS"


if __name__ == "__main__":
    app.run(debug=True, port=5001)
