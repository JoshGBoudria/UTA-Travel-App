from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import socketserver
from flask import Flask, render_template
from urllib.parse import urlparse
from urllib.parse import parse_qs

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/translation_page")
def translation_page():
    return render_template("translation_page.html")

@app.route("/currency_page")
def currency_page():
    return render_template("currency_page.html")

if __name__ == "__main__":
    app.run()

