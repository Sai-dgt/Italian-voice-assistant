---
title: Italian Voice Assistant
emoji: 🍕
colorFrom: green
colorTo: red
sdk: docker
app_file: app.py
pinned: false
---

# DESCRIPTION

This is an Italian language assistant bot. It corrects the user if the user has made errors and answers simply or asks simple questions. This bot has 3 difficulty levels: beginner, intermediate and advanced. The user can speak in any language, but the bot only speaks in Italian. The user must first select a level, then press the recording button to record themselves, and then press it a second time to end the recording; otherwise, the recording will stop by itself after 20 seconds. The bot remembers the last three conversation turns. This language assistant is supposed to give the feeling of facing an Italian coach in a coffee shop; it is therefore voice-only with a minimal design.

# PROMPTS

To be as close as possible to a real language partner, the bot has been given a human persona, meaning it has an identity and tastes allowing her to converse on different topics such as football, art and jazz. Budgetary constraints (the prompts have to be relatively short not to spend too many tokens) limited the depth of this persona, but she's designed to be curious and ask questions when she doesn't know. At any level, she's supposed to correct Italian language errors by rephrasing them correctly, answer, comment, and ask another related question. At beginner level, she's limited to two sentences; at intermediate level, three sentences; and at advanced level, she's limited to four sentences. Her grammar and vocabulary grow more complex as level increases.

Three different prompts corresponding to the three different levels have been created. They all contain the same model personality with her tastes and behavior, but they all contain specific information pertaining to the level.

# SCRIPTS

## app.py

This script connects the frontend to the backend using FastAPI and OpenAI.

It converts the user input and level prompts to strings and the message history into a list.

It receives the audio from the user and transcribes it with Whisper. The user input, the prompt and the limited chat history are sent to "GPT-4o mini". The answer is then sent to "OpenAI TTS Standard", which sends back the audio answer that is then dispatched to the user.

Error messages will be triggered if problems occur with `/transcribe`, `/chat` or `/speak`.

**GPT-4o mini** has been chosen because it's competent with languages and inexpensive.

Tokens are capped at 200 for security reasons.

If levels are not sent in the form of strings, a 400 error is triggered.

An empty message will also trigger a 400 error.

On the server side, messages are capped at 500 characters.



## Frontend (index.html,app.js,style.css)

The UI is simple and designed to be as immersive as possible. To this effect, an image of an Italian street with a coffee shop has been created with ChatGPT for the background. This image should evoke Italy while avoiding being too gaudy.

Another image has been created to give a face to the bot. It has been created to match the bot's persona and is taken inside the coffee shop seen outside. The intent is to give a warm Italian atmosphere.

In order not to break the immersion, no instructions have been provided. Roman numerals have been used for the level buttons as they translate the idea of progression while being connected to Italy. A recording button appears once a level has been selected, and the center of this button becomes red while recording.

To minimize costs, no special efforts have been made to reduce the time between the recording and the answer, but it is under 8 seconds.

To display the thinking state, bars arranged in a wave pattern have been added. When the model is speaking, the bars shrink and grow randomly to evoke speech patterns.

# DEPENDENCIES

- fastapi
- openai
- python-dotenv
- python-multipart
- uvicorn

# HOW TO RUN

- Click on https://huggingface.co/spaces/AlxandrC/italian-voice-assistant
- Select a level between I, II and III.
- Press the record button to speak, then press it again to stop the recording. If the button is not pressed a second time, the recording will stop automatically after 20 seconds.