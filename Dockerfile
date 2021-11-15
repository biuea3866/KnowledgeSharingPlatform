FROM ubuntu:20.04

RUN sed -i 's@archive.ubuntu.com@mirror.kakao.com@g' /etc/apt/sources.list

RUN apt-get -y update && apt-get -y dist-upgrade

RUN apt-get install -y apt-utils dialog

RUN apt-get install -y python3-pip python3-dev

ENV PYTHONUNBUFFERED=0

ENV PYTHONIOENCODING=utf-8

RUN pip3 install --upgrade pip
RUN pip3 install --upgrade setuptools

RUN mkdir /config

ADD /confing/requirements.txt /config/

RUN pipe install -r /config/requirements.txt

RUN mkdir /platform_back_end

WORKDIR /platform_back_end