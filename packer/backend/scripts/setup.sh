#!/bin/bash
set -e

#Making the libraries Upto Date
sudo dnf update -y

#install unzip
sudo dnf install -y unzip

#node v18.X setup
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -   
sudo dnf install -y nodejs
node --version
