import time
from pubnub.pubnub import PubNub
from pubnub.pnconfiguration import PNConfiguration
from pubnub.callbacks import SubscribeCallback
from block import Block

pnconfig = PNConfiguration()
pnconfig.subscribe_key = 'sub-c-a8adc5b2-34b9-4ea9-adb6-6b1eb93eaa3c'
pnconfig.publish_key = 'pub-c-e91561ad-28ed-437b-b242-b201cde9636f'
# pubnub = PubNub(pnconfig)


CHANNELS = {
    'TEST': 'TEST',
    'BLOCK': 'BLOCK'
}

class Listener(SubscribeCallback):
    def __init__(self,blockchain):
        self.blockchain = blockchain
    def message(self,pubnub,message_object):
        print(f'\n Channel: {message_object.channel}: {message_object.message}')
        if message_object.channel == CHANNELS['BLOCK']:
            block = Block.from_json(message_object.message)
            potential_chain = self.blockchain.chain[:]
            potential_chain.append(block)
            try:
                self.blockchain.replace_chain(potential_chain)
                print('\n-- Successfully replaced the local chain')
            except Exception as e:
                print(f'\n--Did not replace chain: {e}')


class PubSub():
    def __init__(self,blockchain):
        self.pubnub = PubNub(pnconfig)
        self.pubnub.subscribe().channels(CHANNELS.values()).execute()
        self.pubnub.add_listener(Listener(blockchain))

    def publish(self,channel,message):
        self.pubnub.publish().channel(channel).message(message).sync()

    def broadcast_block(self,block):
        """
        Broadcast a block object to all nodes.
        """
        self.publish(CHANNELS['BLOCK'], block.to_json())

def main():
    pubsub = PubSub()
    time.sleep(1)
    pubsub.publish(CHANNELS['TEST'],{'foo':'bar'})

if __name__ == '__main__':
    main()
