from flask import Blueprint
from flask import render_template, jsonify, request

mod = Blueprint('pages', __name__, )


@mod.route('/', methods=["GET", "POST"])
def index():
    return render_template('index.html')


@mod.route('/demo1', methods=["GET", "POST"])
def demo1():
    return render_template('demo1.html')


@mod.route('/fetch', methods=["GET", "POST"])
def fetch_file():
    filepath = request.args.get('path')
    if not filepath:
        return "No path passed", 403
    try:
        content = open(filepath, "rb").read()
    except:
        return "Error reading file", 403

    return jsonify(content=content)


@mod.route('/save', methods=["GET", "POST"])
def save_file():
    filepath = request.args.get('path')
    content = request.args.get('content')

    if not filepath:
        return "No path passed", 403

    if not content:
        return "No content passed", 403

    try:
        with open(filepath, "wb") as f:
            f.write(content)
            message = "File saved successfully"
    except:
        return "Error writing file", 403

    return jsonify(content=message)
