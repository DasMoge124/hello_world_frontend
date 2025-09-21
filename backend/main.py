from flask import Flask, request, jsonify
# from auth import do_the_login, show_the_login_form
from flask_cors import CORS, cross_origin  # <- import CORS


app = Flask(__name__)
CORS(app, supports_credentials=True)  # <- enable CORS with credentials support

@app.route('/login', methods=['POST'])
def login():
        data = request.get_json()
        return do_the_login(data)

def do_the_login(data):
    print("Login data received:", data)
    return jsonify({"status": "success", "message": "Logged in!"})
    
#@app.route('/user', methods=['GET', 'POST'])
#def login():
#   if request.method == 'POST':
#       return add_new_user()
#   else:
#       return get_user()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)