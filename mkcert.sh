set -e

# Check if mkcert is installed
if ! [ -x "$(command -v mkcert)" ]; then
  echo 'Error: mkcert is not installed.' >&2
  exit 1
fi

mkcert -install -cert-file certs/cert.pem -key-file certs/cert.key.pem "local.gd" "*.local.gd"
