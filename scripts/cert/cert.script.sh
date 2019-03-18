mkdir $1/test
cd $1/test
"
# OpenSSL configuration for Root CA
[ req ]
prompt             = no
string_mask        = default
# The size of the keys in bits:
default_bits       = 4096
distinguished_name = req_distinguished_name
x509_extensions    = x509_ext
[ req_distinguished_name ]
# Note that the following are in 'reverse order' to what you'd expect to see.
countryName=CA
stateOrProvinceName=BC
organizationName=$3
organizationalUnitName=$3
commonName=$2
emailAddress=$3" > common.cnf
openssl genrsa -des3 -out myCA.key 4096
openssl req -x509 -new -nodes -key myCA.key -sha256 -days 1825 -out myCA.pem -config common.cnf
openssl genrsa -out $2.key 4096
openssl req -new -key $2.key -out $2.csr -config common.cnf
"
[ req ]
prompt             = no
string_mask        = default
# The size of the keys in bits:
default_bits       = 4096
distinguished_name = req_distinguished_name
x509_extensions    = x509_ext
[ req_distinguished_name ]
# Note that the following are in 'reverse order' to what you'd expect to see.
countryName=CA
stateOrProvinceName=BC
organizationName=$3
organizationalUnitName=$3
commonName=$2
emailAddress=$3
[ x509_ext ]
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = $2
DNS.2 = $2.192.168.1.19.xip.io" > $2.ext
openssl x509 -req -in $2.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial \
-out $2.crt -days 1825 -sha256 -extfile $2.ext -config common.cnf
echo "Hellow $1 $2"

