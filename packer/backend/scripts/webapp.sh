#!/bin/bash
set -e

#creating a folder where we need unzip the backend
sudo mkdir /home/csye7230/backend

#unzipping the zip file
sudo unzip /tmp/backend_main.zip -d /home/csye7230/backend

#removing zip the backend_main
sudo rm /tmp/backend_main.zip

#installing the libraries
sudo npm install --prefix /home/csye7230/backend/
 
#changing the ownership
sudo chown -R csye7230:csye7230 /home/csye7230/backend/

#displaying the ownership
sudo ls -al /home/csye7230/backend/

#moving the weapp.service to systemd path
sudo cp /home/csye7230/backend/backend.service /etc/systemd/system/backend.service

#reloading the system services
sudo systemctl daemon-reload

#starting and enalbing the backend
sudo systemctl start backend
sudo systemctl enable backend  