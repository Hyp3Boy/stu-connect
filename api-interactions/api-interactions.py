from dataclasses import dataclass
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


def get_uuid():
    return uuid4().hex


@dataclass
class Interaction(db.Model):
    id: str
    student_id: str
    views: int
    likes: int

    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    student_id = db.Column(db.String(32), db.ForeignKey(
        "student.id"), nullable=False)
    views = db.Column(db.Integer, default=0)
    likes = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f"<Interaction for Student {self.student_id}>"


with app.app_context():
    db.create_all()


@app.route("/interactions/<student_id>", methods=["GET", "POST"])
def interactions(student_id):
    if request.method == "GET":
        interaction = Interaction.query.filter_by(
            student_id=student_id).first()
        if not interaction:
            return jsonify({"error": "Interaction not found"}), 404
        return jsonify(interaction)
    elif request.method == "POST":
        data = request.get_json()
        interaction = Interaction.query.filter_by(
            student_id=student_id).first()
        if not interaction:
            interaction = Interaction(student_id=student_id)
            db.session.add(interaction)
        interaction.views += data.get("views", 0)
        interaction.likes += data.get("likes", 0)
        db.session.commit()
        return jsonify(interaction)


if __name__ == "__main__":
    app.run(debug=True, port=5003)
