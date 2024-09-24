import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { Autocomplete, Box, Container, Fab, TextField } from '@mui/material';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import Audio from 'osmd-audio-player';
import { PlaybackEvent } from 'osmd-audio-player/dist/PlaybackEngine';
import { Fragment, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import { LearnScoreType } from '@/types/product';

export default function Score({ books }: LearnScoreType) {
  const [audio] = useState(new Audio());
  // audio.playbackSettings = {
  //   masterVolume: 10000,
  //   bpm: 100,
  // };

  const [loading, setLoading] = useState<boolean | null>(null);
  const [playState, setPlayState] = useState('INIT');
  const [audioOptions, setAudioOptions] = useState({
    label: 'Veritical',
    value: false,
  });

  async function play(playState: string) {
    if (!loading) {
      if (playState !== 'PLAYING') {
        await audio.play();
      } else {
        audio.pause();
      }
    }
  }

  function stop() {
    if (!loading) {
      audio.stop();
    }
  }

  audio.on(PlaybackEvent.STATE_CHANGE, (state: string) => {
    setPlayState(state);
  });
  audio.on(PlaybackEvent.ITERATION, (d: any[]) => {
    d.length === 0 && audio.stop();
  });

  async function loadSheet(selectedfiles: string) {
    setLoading(true);
    try {
      const parent = document.getElementById('renderid');
      const child = document.getElementById('id');
      if (child) {
        parent?.removeChild(child);
        audio.stop();
      }
      const div: HTMLDivElement = document.createElement('div');
      div.setAttribute('id', 'id');
      parent?.appendChild(div);
      const osmd = new OpenSheetMusicDisplay(div, {
        followCursor: true,
        autoResize: false,
        renderSingleHorizontalStaffline: audioOptions.value as boolean,
        spacingBetweenTextLines: 0,
      });

      await osmd.load(selectedfiles);
      await osmd.render();
      await audio.loadScore(osmd as any);
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading !== null && (
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            zIndex: 1000,
            display: 'flex',
            gap: '10px',
          }}
        >
          <Fab
            color="primary"
            aria-label="play"
            size="small"
            onClick={() => play(playState)}
          >
            {loading ? (
              <Spinner />
            ) : playState !== 'PLAYING' ? (
              <PlayArrowIcon />
            ) : (
              <PauseIcon />
            )}
          </Fab>

          <Fab color="primary" aria-label="stop" size="small" onClick={stop}>
            <StopIcon />
          </Fab>
        </div>
      )}
      <Container
        sx={{
          width: '100%',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: '20%',
            display: 'flex',
            gap: '20px',
            flexDirection: 'column',
            '& li': {
              cursor: 'pointer',
            },
          }}
        >
          <Autocomplete
            fullWidth
            options={[
              {
                label: 'Horizontal',
                value: true,
              },
              {
                label: 'Veritical',
                value: false,
              },
            ]}
            clearIcon={<></>}
            value={audioOptions}
            onChange={(e, values) => {
              if (values) {
                setAudioOptions(values);
              }
            }}
            renderInput={(params) => <TextField {...params} label={'Layout'} />}
          ></Autocomplete>
          <p>
            {Object.entries(books).map(([key, value]) => (
              <Fragment key={key}>
                <p>{key}</p>
                <ul>
                  {value?.map((val) => (
                    <li key={val.value} onClick={() => loadSheet(val.value)}>
                      {val.label}
                    </li>
                  ))}
                </ul>
              </Fragment>
            ))}
          </p>
        </Box>

        <div
          style={{
            margin: ' 0 0 0 0',
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              overflow: 'auto',
              height: 'calc(100vh - 110px)',
              scrollbarWidth: 'none',
            }}
            id={'renderid'}
          ></div>
        </div>
      </Container>
      {/* <Footer /> */}
    </div>
  );
}
