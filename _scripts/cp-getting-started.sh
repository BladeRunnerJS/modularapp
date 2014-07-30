#!/bin/sh

promptyn () {
    while true; do
        read -p "$1 " yn
        case $yn in
            [Yy]* ) return 0;;
            [Nn]* ) return 1;;
            * ) echo "Please answer yes or no (y/n).";;
        esac
    done
}

create_getting_started () {
  mkdir target

  echo "Removing any files from previous build"
  rm -rf target/*

  echo "Copying files"
  cp -r chat-bladeset target
  cp -r default-aspect target
  cp -r libs target
  cp app.conf target
  cp README.md target

  echo "Deleted blade files"
  rm -rf target/chat-bladeset/blades/input
  rm -rf target/chat-bladeset/blades/messages
  rm -rf target/chat-bladeset/blades/usercard

  echo "Getting Started files now in the modularapp/target directory"
}

if promptyn "Are you in the modularapp directory? Please only proceed if you are. Do you wish to proceed? (y/n)"; then
    create_getting_started
else
    echo "Exiting..."
fi
