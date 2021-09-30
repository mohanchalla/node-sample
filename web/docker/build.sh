CURRENT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cp -r ../models "${CURRENT_DIR}"/context
cp -r ../node_modules "${CURRENT_DIR}"/context
cp -r ../public "${CURRENT_DIR}"/context
cp -r ../schema "${CURRENT_DIR}"/context
cp -r ../views "${CURRENT_DIR}"/context
cp ../package.json "${CURRENT_DIR}"/context
cp ../server.js "${CURRENT_DIR}"/context

function cleanUp() {
  # Remove the binary from the context
  if [[ -d "${CURRENT_DIR}"/context/models ]]; then
    rm -rf "${CURRENT_DIR}"/context/models
  fi
  if [[ -d "${CURRENT_DIR}"/context/node_modules ]]; then
    rm -rf "${CURRENT_DIR}"/context/node_modules
  fi
  if [[ -d "${CURRENT_DIR}"/context/public ]]; then
    rm -rf "${CURRENT_DIR}"/context/public
  fi
  if [[ -d "${CURRENT_DIR}"/context/schema ]]; then
    rm -rf "${CURRENT_DIR}"/context/schema
  fi
  if [[ -d "${CURRENT_DIR}"/context/views ]]; then
    rm -rf "${CURRENT_DIR}"/context/views
  fi
  if [[ -f "${CURRENT_DIR}"/context/package.json ]]; then
    rm "${CURRENT_DIR}"/context/package.json
  fi
  if [[ -f "${CURRENT_DIR}"/context/server.js ]]; then
    rm "${CURRENT_DIR}"/context/server.js
  fi
}

trap cleanUp SIGINT SIGTERM

cd "${CURRENT_DIR}"/context || exit
docker build \
  -t test/node-app:1.0.0 \
  .

cleanUp