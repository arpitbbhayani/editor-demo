from flask import Blueprint
from flask import render_template, request, make_response

mod = Blueprint('demo2', __name__, )


@mod.route('/', methods=["GET"])
def index():
    return render_template('demo2_input.html')


@mod.route('/download', methods=['POST'])
def download():
    filename = request.form.get('filename')
    content = request.form.get('content')
    if not content:
        return "No content passed", 403

    if not filename:
        return "No filename passed", 403

    response = make_response(content)
    response.headers["Content-Disposition"] = "attachment;filename=" + filename
    return response


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
