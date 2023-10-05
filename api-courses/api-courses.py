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

bcrypt = Bcrypt(app)
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
class Course(db.Model):
    id: str
    name: str
    description: str
    instructor: str

    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
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


@app.route("/add_course", methods=["POST"])
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


def get_courses():
    courses = Course.query.all()
    return jsonify(courses)


def get_course_by_id(id):
    course = Course.query.get_or_404(id)
    return jsonify(course)


def post_course(course):
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
    course.name = new_course["name"]
    course.description = new_course["description"]
    course.instructor = new_course["instructor"]

    db.session.commit()
    return jsonify(course)


def delete_course(id):
    course = Course.query.get(id)
    db.session.delete(course)
    db.session.commit()
    return "SUCCESS"


if __name__ == "__main__":
    app.run(debug=True, port=5002, host="0.0.0.0")
