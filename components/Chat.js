import React from 'react'
import { useState } from 'react';
import { Fab } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Bot from './Bot'



function Chat() {
  const [showModal, setShowModal] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    const response = await fetch(`/api/generatePost`, {
      method: 'POST',
      body: JSON.stringify({ prompt: prompt })
    });
    const json = await response.json();
    console.log(json)
    setAnswer(json.chat)
    setLoading(false)
    setPrompt("")
  }

  const handleClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Fab color="primary" aria-label="chat" style={{ position: 'fixed', bottom: '10px', right: '10px' }} onClick={handleClick}>
        <ChatBubbleIcon  />
      </Fab>

      {showModal && <Card sx={{ minWidth: 320 }} className='max-w-xs fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <CardActions>
          <Button size="small" onClick={handleClose}>Close</Button>
        </CardActions>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Chat with our AI Helpers
          </Typography>
          <Bot
            prompt={prompt}
            setPrompt={setPrompt}
            answer={answer}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </CardContent>
        
      </Card>}

    </div>
  )
}

export default Chat

