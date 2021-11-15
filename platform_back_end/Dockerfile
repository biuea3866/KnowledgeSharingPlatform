FROM python:3.8.10

ENV PYUTHONUNBUFFERED 1

RUN apt-get -y update
RUN apt-get -y install vim

RUN mkdir /srv/KnowledgeSharingPlatform
ADD . /srv/KnowledgeSharingPlatform

WORKDIR /srv/KnowledgeSharingPlatform

RUN pip3 install --upgrade pip
RUN pip3 install -r requriements.txt

# EXPOSE 8000
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]