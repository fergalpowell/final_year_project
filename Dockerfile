FROM python:3.5

MAINTAINER Fergal Powell

RUN apt-get -y update
RUN apt-get -y upgrade

RUN apt-get -y install libgdal-dev

RUN mkdir -p /usr/src/fyp

COPY requirements.txt /usr/src/fyp/
COPY . /usr/src/fyp

WORKDIR /usr/src/fyp

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
