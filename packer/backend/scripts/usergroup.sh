#!/bin/bash
set -e

#creating a user group
sudo groupadd -f csye7230

#adding a user with nologin and adding it to csye7230 group
sudo useradd -s /usr/sbin/nologin -g csye7230 csye7230