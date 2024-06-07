#!/bin/bash

DEBUG=1 # Force debug on until we are happy, this should be false

if [ "$1" == "--debug" ]; then
  DEBUG=1
fi

debug() {
  if [ $DEBUG -eq 1 ]; then
    echo "DEBUG: $1"
  fi
}

run_command() {
  if [ $DEBUG -eq 1 ]; then
    $@
  else
    $@ > /dev/null 2>&1
  fi
}

generate_password() {
  openssl rand -base64 12
}

sed_inplace() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i "" "$1" "$2"
  else
    sed -i "$1" "$2"
  fi
}

wait_for_db() {
  echo "Waiting for the database to be ready..."
  until nc -z -v -w30 $1 $2
  do
    echo "Waiting for database connection..."
    sleep 1
  done
  echo "Database is up and running!"
}

echo "Initiating ARMA HQ Deployment..."

if [ -f .env ]; then
  read -p "Environment file already exists. Do you want to set up the environment again? (yes/no): " setup_env
else
  setup_env="yes"
fi

if [[ "$setup_env" == "yes" ]]; then
  echo "Copying environmental parameters..."
  run_command rm -rf .env
  run_command cp .env.example .env

  read -p "Do you want to set custom database information? (yes/no): " set_custom_db

  if [[ "$set_custom_db" == "yes" ]]; then
    db_user="root"

    read -p "Enter database name (default: headquarters): " db_name
    db_name=${db_name:-headquarters}

    read -p "Enter user password (default: generated password): " db_pass
    if [[ -z "$db_pass" ]]; then
      db_pass=$(generate_password)
      run_command Generated user password: $db_pass
    fi

    read -p "Enter database host (default: localhost): " db_host
    db_host=${db_host:-localhost}
  else
    db_name="headquarters"
    db_user="root"
    db_pass=$(generate_password)
    db_host="localhost"
    echo "Using default database name: $db_name"
    echo "Generated user password: $db_pass"
  fi

  echo "Generating access token..."
  ACCESS_TOKEN=$(node api/secret.js)

  if [ -z "$ACCESS_TOKEN" ]; then
    echo "Mission failed: Unable to generate access token."
    exit 1
  fi

  echo "Configuring environment settings..."
  run_command sed_inplace "s/^DB_NAME=.*/DB_NAME=$db_name/" .env
  run_command sed_inplace "s/^DB_USER=.*/DB_USER=$db_user/" .env
  run_command sed_inplace "s/^DB_PASS=.*/DB_PASS=$db_pass/" .env
  run_command sed_inplace "s/^DB_HOST=.*/DB_HOST=$db_host/" .env
  run_command sed_inplace "s/^ACCESS_TOKEN_SECRET=.*/ACCESS_TOKEN_SECRET=$ACCESS_TOKEN/" .env

  echo "Environmental setup complete. Proceeding to the next objective..."
else
  echo "Skipping environment setup..."
  export $(grep -v '^#' .env | xargs)
  db_name=$DB_NAME
  db_user=$DB_USER
  db_pass=$DB_PASS
  db_host=$DB_HOST
fi

echo "Neutralizing any existing docker containers..."
docker ps -a | grep 'arma-headquarters' | awk '{print $1}' | xargs -r docker rm -f > /dev/null 2>&1

echo "Reinforcing dependencies..."
run_command npm install
run_command npm run install:api

echo "Preparing database for deployment..."
wait_for_db $db_host 3306

echo "Commencing database operation..."
run_command npm run db:migrate

echo "Seeding database with critical intel..."
run_command npm run db:seed

echo "Deployment complete! ARMA HQ is operational."

echo "Launching ARMA HQ..."

echo '
       d8888 8888888b.  888b     d888        d8888      888    888  .d88888b.
      d88888 888   Y88b 8888b   d8888       d88888      888    888 d88P" "Y88b
     d88P888 888    888 88888b.d88888      d88P888      888    888 888     888
    d88P 888 888   d88P 888Y88888P888     d88P 888      8888888888 888     888
   d88P  888 8888888P"  888 Y888P 888    d88P  888      888    888 888     888
  d88P   888 888 T88b   888  Y8P  888   d88P   888      888    888 888 Y8b 888
 d8888888888 888  T88b  888   "   888  d8888888888      888    888 Y88b.Y8b88P
d88P     888 888   T88b 888       888 d88P     888      888    888  "Y888888"
                                                                          Y8b'
npm run start