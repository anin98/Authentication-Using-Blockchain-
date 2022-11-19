from main import Blockchain
import random

authenticate = Blockchain()

authenticate.create_new_data(str(24),'Anindita','anin@gmail.com','pass')
authenticate.create_block(str(2382),'asgs22e','12gs12bw')

prevhash = 'gsywgywgy12354'
nonce = str(random.randint(1,600))

currentBlockData = {
    "id": str(24),
    "name": 'Anindita',
    "email": 'anin@gmail.com',
    "password": 'pass'
}

print(authenticate.hashBlock(prevhash,currentBlockData,nonce));
