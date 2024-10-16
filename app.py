from flask import Flask, redirect, render_template, request, url_for, jsonify

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template('base.html')
    


app.run(debug=True)