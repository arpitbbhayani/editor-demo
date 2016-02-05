from flask import Flask

app = Flask(__name__)

# from app import views1

from app.views import pages
from app.views import demo1
from app.views import demo2

app.register_blueprint(pages.mod)
app.register_blueprint(demo1.mod, url_prefix='/demo1')
app.register_blueprint(demo2.mod, url_prefix='/demo2')
