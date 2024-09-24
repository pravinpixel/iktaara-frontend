// import React, { useState } from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

type VideoPlayerProps = {
  videoUrl: string;
  onClose: () => void;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onClose }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent className="video-content">
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <iframe
          width="500px"
          height="300"
          src={videoUrl}
          title="YouTube video player"
          allowFullScreen
          className="video-player-width"
        ></iframe>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
