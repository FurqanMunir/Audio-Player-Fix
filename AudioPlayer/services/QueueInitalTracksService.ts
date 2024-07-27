import TrackPlayer, {RepeatMode} from 'react-native-track-player';

export const QueueInitalTracksService = async (): Promise<void> => {
  await TrackPlayer.add([
    {
      url: 'https://pagalnew.com/mp3-songs/bollywood-mp3-songs/galliyan-returns-ek-villain-returns-128-kbps-sound.mp3',
      title: 'Pure (Demo)',
      artist: 'David Chavez',
     
      duration: 28,
    },
  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};