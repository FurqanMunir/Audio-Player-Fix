import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import TrackPlayer, {State, Capability} from 'react-native-track-player';
import React, {useEffect, useState} from 'react';
import {SetupService, QueueInitalTracksService} from './services';

export default function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const link =
    'https://pagalnew.com/mp3-songs/bollywood-mp3-songs/naa-tere-bin-ek-villain-returns-128-kbps-sound.mp3';
  const stepUpPlayer = async () => {
    Capability.Pause(false);
    Capability.Play(false);
    const state = await TrackPlayer.getState();
    console.log('State: ', state);
    if (state === State.Playing) {
      console.log('The player is playing');
    }
  };

  const addSongs = async () => {
    let track = {
      url: link, // Load media from the network
      title: 'Songs',
      artist: 'Purelogics',
      album: 'Purelogics',
      genre: 'Progressive House, Electro House',
      date: '2014-05-20T07:00:00+00:00', // RFC 3339
      // artwork: 'http://example.com/cover.png', // Load artwork from the network
      // duration: 402, // Duration in seconds
    };
    await TrackPlayer.add([track]);
  };

  useEffect(() => {
    async function run() {
      const isSetup = await SetupService();
      setIsPlayerReady(isSetup);

      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await QueueInitalTracksService();
      }
    }

    run();
  });
  return (
    <SafeAreaView style={styles.container}>
      <Text>App</Text>
      <Button title="Play" onPress={() => TrackPlayer.play()}></Button>
      <Button title="Pause" onPress={() => TrackPlayer.pause()}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
