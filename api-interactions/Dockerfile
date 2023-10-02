FROM python:3.8-slim

WORKDIR ./api-interactions

RUN apt-get update && apt-get install -y gcc pkg-config default-libmysqlclient-dev
RUN pip3 install dataclasses
RUN pip3 install flask
RUN pip3 install flask_bcrypt
RUN pip3 install flask_session
RUN pip3 install flask_sqlalchemy
RUN pip3 install flask_cors
RUN pip3 install uuid
RUN pip3 install redis
RUN pip3 install pymysql
RUN pip3 install mysqlclient

COPY . .

CMD ["python3", "api-interactions.py"]
