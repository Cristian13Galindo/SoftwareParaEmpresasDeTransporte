FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install python-dotenv

EXPOSE 8000

CMD ["tail", "-f", "/dev/null"]