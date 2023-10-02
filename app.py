from flask import Flask, render_template, request, redirect
import sqlite3
import os
from dotenv import load_dotenv


load_dotenv()

current_dir = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_url_path="/static")
app.secret_key = os.environ.get("SECRET_KEY")


@app.route("/", methods=["GET", "POST"])
def index():
    connection = sqlite3.connect(current_dir + "/todo_app.db")
    cursor = connection.cursor()
    
    initial_query = "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, checked BOOLEAN DEFAULT false)"
    cursor.execute(initial_query)
    connection.commit()

    if request.method == 'POST':
        task = request.form['task']
        query = "INSERT INTO tasks (task) VALUES ('{task}')".format(task=task)
        cursor.execute(query)
        connection.commit()
        
    try:
        query = "SELECT * FROM tasks ORDER BY id DESC"
        cursor.execute(query)
        tasks = cursor.fetchall()
        connection.commit()
    except:
        tasks = list()
        
    return render_template("index.html", tasks=tasks)


@app.route("/delete/<int:id>", methods=["POST"])
def delete(id):
    connection = sqlite3.connect(current_dir + "/todo_app.db")
    cursor = connection.cursor()
    query = "DELETE FROM tasks WHERE id = {id}".format(id=id)
    cursor.execute(query)
    connection.commit()
    return redirect("/")


@app.route("/delete_all", methods=["POST"])
def delete_all():
    connection = sqlite3.connect(current_dir + "/todo_app.db")
    cursor = connection.cursor()
    query = "DELETE FROM tasks"
    cursor.execute(query)
    connection.commit()
    return redirect("/")


@app.route("/toggle_check/<int:id>", methods=["POST"])
def toggle_check(id):
    connection = sqlite3.connect(current_dir + "/todo_app.db")
    cursor = connection.cursor()
    query = "UPDATE tasks SET checked = NOT checked WHERE id = {id}".format(id=id)
    cursor.execute(query)
    connection.commit()
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)
