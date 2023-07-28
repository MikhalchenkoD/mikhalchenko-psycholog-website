from flask import Flask, request
import requests
from flask_cors import CORS
from module import create_database_tables, add_client_to_db

app = Flask(__name__)
CORS(app)

create_database_tables()


@app.route('/client', methods=['POST'])
def add_client():
    name = request.form.getlist('name')
    email = request.form.getlist('email')
    message = request.form.getlist('message')

    if not all([name, email, message]):
        return "Некорректные данные. Пожалуйста, заполните все поля.", 400

    result = add_client_to_db(name[0], email[0], message[0])

    if isinstance(result, bool) and result:
        response = send_user_to_bot(name[0], email[0], message[0])

        if response.ok:
            return f"Клиент {name[0]} успешно добавлен и отправлен в Telegram.", 201
        else:
            return f"Клиент {name[0]} успешно добавлен, но произошла ошибка при отправке в Telegram.", 201

    else: 
        return f"Ошибка при добавлении клиента: {result}", 500


def send_user_to_bot(name: str, email: str, message: str):
    telegram_token = "6186492434:AAEGjP1ivaUaGMheq6-O-Y0Pay6Dv3SFRXo"  # Замените на свой API токен бота
    chat_id = "1447559272"  # Замените на ID вашего чата, куда будут отправляться уведомления

    message_text = f"Новый клиент: {name}\nEmail: {email}\nСообщение: {message}"
    url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
    data = {
        "chat_id": chat_id,
        "text": message_text
    }

    response = requests.post(url, data=data)

    return response


if __name__ == "__main__":
    app.run()
