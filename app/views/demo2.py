from flask import Blueprint
from flask import render_template, request

mod = Blueprint('demo2', __name__, )


@mod.route('/', methods=["GET"])
def index():
    return render_template('demo2_input.html')


@mod.route('/editor', methods=["POST"])
def editor():
    highlighter_map = {
        'yaml': 'yaml',
        'yml': 'yaml'
    }
    datafile = request.files.get('datafile')

    filename = datafile.filename
    fileext = filename.split('.')[-1]
    content = datafile.read()
    highlighter = highlighter_map.get(fileext) or "default"

    return render_template('demo2.html', content=content,
                           highlighter=highlighter)
