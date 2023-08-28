from flask import Flask, render_template, jsonify
import re
import pandas as pd

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

from .xlsx import cda
@app.route('/calendar_data')
def calendar_data():
    return jsonify(cda)

